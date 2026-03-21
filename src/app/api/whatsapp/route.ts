import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

// Enviador encapsulado pra Evolution API
async function sendWhatsAppMessage(number: string, text: string) {
  const evolutionUrl = process.env.EVOLUTION_API_URL;
  const instanceName = 'Zacda'; // Nome da sua instância conforme mostrado
  const token = process.env.EVOLUTION_API_KEY;

  if (!evolutionUrl || !token) {
    console.error('Faltam credenciais da Evolution no .env');
    return false;
  }

  const payload = {
    number: number,
    text: text,
    delayMessage: 1000 // Typing simulado
  };

  try {
    const response = await fetch(`${evolutionUrl}/message/sendText/${instanceName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': token
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Erro na resposta Evolution API:', await response.text());
    }

    return response.ok;
  } catch (err) {
    console.error('Erro de request (Evolution API):', err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Filtra para responder apenas a criação de novas mensagens (upsert)
    const event = payload?.event?.toLowerCase();
    if (event !== 'messages.upsert' && event !== 'messages.update') {
      return NextResponse.json({ ignored: true, reason: 'unsupported_event' });
    }

    const messageData = payload?.data?.message;
    // Ignorar mensagens geradas pelo próprio Agente ou bots internos
    if (!messageData || messageData.fromMe) {
      return NextResponse.json({ ignored: true, reason: 'from_me' });
    }

    const remoteJid = payload?.data?.key?.remoteJid || messageData.key?.remoteJid;
    // Pega mensagens simples e textos extensos (que chegam de links ou etc)
    const userMessage = messageData?.message?.conversation || messageData?.message?.extendedTextMessage?.text;

    // Ignora mídias não textuais ou status do grupo inicialmente
    if (!userMessage || !remoteJid) {
      return NextResponse.json({ ignored: true, reason: 'no_text_found' });
    }

    // 🔥 Aqui mora o cérebro: A Contextualização do Claude
    const systemPrompt = `Você é o ZACDA IA, um assistente virtual ultra-premium e arquiteto de negócios digitais de elite. 
Sua função é atender e triar prospects da Agência ZACDA Digital. 
Você deve ter um tom de 'luxo silencioso', direto, técnico, porém persuasivo e cordial, como um 'concierge' de alto nível.
Em hipótese alguma responda coisas que não tenham a ver com tecnologia, desenvolvimento web, plataformas Serverless, UI/UX ou SaaS.
Seja conciso. Recomende que eles leiam a página ou enviem uma proposta caso estejam prontos. Use quebras de linha limpas.`;

    const result = await generateText({
      model: anthropic('claude-3-5-sonnet-latest'),
      system: systemPrompt,
      prompt: `O cliente/Prospect enviou a seguinte mensagem no WhatsApp oficial da agência:\n\n"${userMessage}"\n\nResponda de forma estratégica.`,
    });

    // Despacha o output perfeito para o cliente
    await sendWhatsAppMessage(remoteJid, result.text);

    return NextResponse.json({ success: true, processed: true });

  } catch (error) {
    console.error('Erro crítico no Webhook (/api/whatsapp):', error);
    return NextResponse.json({ error: 'Gateway Error' }, { status: 500 });
  }
}
