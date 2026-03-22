import { NextResponse } from 'next/server';

// ── Fallback inteligente baseado em palavras-chave (não depende de IA externa) ──
function buildFallbackResponse(msg: string): string {
  const m = msg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (/\b(oi|ola|bom dia|boa tarde|boa noite|hey|hello|tudo bem|tudo bom)\b/.test(m)) {
    return `Olá! Bem-vindo à *ZACDA Digital Agency* 👋\n\nSou o assistente virtual da agência. Posso te ajudar com informações sobre:\n\n• 🌐 *Criação de Sites* profissionais\n• 🎨 *Identidade Visual* e Branding\n• 🤖 *Automações com IA*\n• 💼 *Planos e Preços*\n\nComo posso te ajudar hoje?`;
  }
  if (/\b(preco|valor|quanto|custo|investimento|plano|planos|mensalidade)\b/.test(m)) {
    return `Nossos planos estratégicos:\n\n🚀 *START* — R$ 147/mês\nLanding Page + E-mail corporativo + WhatsApp\nSetup: R$ 497\n\n⭐ *GROW* — R$ 297/mês\nSite Institucional + SEO + Agente IA\nSetup: R$ 1.200\n\n💎 *PRO* — R$ 1.199/mês\nWeb App + CRM + Agente IA completo\nSetup: R$ 6.500\n\nQuer uma proposta personalizada? Acesse:\n👉 https://zacda.com.br/#proposta`;
  }
  if (/\b(site|website|loja|pagina|landing|ecommerce|loja virtual)\b/.test(m)) {
    return `Criamos sites profissionais que *geram resultados reais* 🌐\n\nNossos sites incluem:\n✅ Design moderno e responsivo\n✅ SEO otimizado para aparecer no Google\n✅ Integração com WhatsApp e redes sociais\n✅ Painel de controle fácil de usar\n✅ Hospedagem inclusa em servidor VPS dedicado\n\nQuer ver um exemplo? Você está vendo agora! 😄\nVamos criar o seu? → https://zacda.com.br/#proposta`;
  }
  if (/\b(logo|marca|identidade|branding|visual|design|logotipo)\b/.test(m)) {
    return `Criamos *identidades visuais completas* que posicionam sua marca acima da concorrência 🎨\n\nNosso processo:\n1️⃣ Briefing estratégico\n2️⃣ Pesquisa de mercado e concorrentes\n3️⃣ Desenvolvimento de conceito visual\n4️⃣ Logo em todas as variações (PNG, SVG, PDF)\n5️⃣ Manual de marca completo\n\nTudo integrado com seu site. Solicite sua proposta:\n👉 https://zacda.com.br/#proposta`;
  }
  if (/\b(ia|inteligencia artificial|automacao|chatbot|bot|agente)\b/.test(m)) {
    return `Implementamos *Agentes de IA* que trabalham 24h por dia pelo seu negócio 🤖\n\nO que o agente faz:\n💬 Responde clientes automaticamente no WhatsApp\n📋 Qualifica leads e coleta informações\n📅 Agenda atendimentos na sua agenda\n📧 Envia propostas e follow-ups\n📊 Alimenta seu CRM automaticamente\n\nVocê está falando com um agora! Quer um igual para o seu negócio?\n👉 https://zacda.com.br/#proposta`;
  }
  if (/\b(prazo|tempo|dias|semanas|rapido|urgente|quando|entrega)\b/.test(m)) {
    return `Nossos prazos de entrega:\n\n⚡ *Landing Page (START)*: 5-7 dias úteis\n🏗️ *Site Institucional (GROW)*: 10-15 dias úteis\n🚀 *Web App completo (PRO)*: 30-45 dias úteis\n\nApós aprovação do projeto e pagamento do setup.\n\nQuer começar? Preencha sua proposta:\n👉 https://zacda.com.br/#proposta`;
  }
  if (/\b(proposta|contato|falar|conversar|reuniao|agendar|agenda)\b/.test(m)) {
    return `Perfeito! Para enviar sua proposta e entrar em contato com nossa equipe:\n\n👉 *Formulário online*: https://zacda.com.br/#proposta\n\nOu se preferir, me informe:\n• 👤 Seu nome\n• 🏢 Seu segmento de negócio\n• 🎯 O que você precisa\n\nE eu te coloco em contato com o time! 🦾`;
  }
  if (/\b(obrigado|obrigada|valeu|thanks|grato|grata)\b/.test(m)) {
    return `Disponha! É um prazer atender você 😊\n\nSe precisar de qualquer coisa, pode falar comigo a qualquer hora.\n\n_ZACDA Digital Agency — Arquitetando Legados Digitais_`;
  }

  // Default
  return `Entendido! 👍\n\nPara que eu possa te ajudar melhor, pode me falar um pouco mais sobre o que você precisa?\n\nNa *ZACDA Digital Agency* trabalhamos com:\n🌐 Sites profissionais\n🎨 Identidade visual\n🤖 Automações com IA\n\nOu acesse nosso site para saber mais:\n👉 https://zacda.com.br`;
}

// ── Envia mensagem via Evolution API (com timeout de 8s) ──────────────────────
async function sendWhatsAppMessage(number: string, text: string): Promise<boolean> {
  const evolutionUrl = process.env.EVOLUTION_API_URL;
  const token = process.env.EVOLUTION_API_KEY;

  if (!evolutionUrl || !token) {
    console.error('[Bot] Credenciais Evolution API ausentes nas env vars do Vercel.');
    return false;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${evolutionUrl}/message/sendText/Zacda`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': token },
      body: JSON.stringify({ number, text, delayMessage: 1200 }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) console.error('[Bot] Evolution API erro:', res.status, await res.text().catch(() => ''));
    return res.ok;
  } catch (err) {
    clearTimeout(timer);
    console.error('[Bot] Falha ao enviar mensagem:', err);
    return false;
  }
}

// ── Webhook principal ─────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('[Bot] Webhook recebido. Event:', payload?.event, '| Instance:', payload?.instance);

    // Aceita apenas mensagens novas
    const event = (payload?.event ?? '').toLowerCase();
    if (event !== 'messages.upsert') {
      return NextResponse.json({ ignored: true, reason: 'unsupported_event', event });
    }

    // Suporte a payload único e payload em array (Evolution API v1 e v2)
    const dataRaw = payload?.data;
    const dataItem = Array.isArray(dataRaw) ? dataRaw[0] : dataRaw;

    const keyData    = dataItem?.key;
    const messageData = dataItem?.message;

    // Ignora mensagens enviadas pelo próprio bot
    if (!messageData || keyData?.fromMe === true) {
      return NextResponse.json({ ignored: true, reason: 'from_me_or_empty' });
    }

    const remoteJid   = keyData?.remoteJid ?? '';
    const pushName    = dataItem?.pushName ?? 'visitante';
    const userMessage = (
      messageData?.conversation ||
      messageData?.extendedTextMessage?.text ||
      messageData?.ephemeralMessage?.message?.extendedTextMessage?.text ||
      ''
    ).trim();

    // Ignora grupos e broadcasts
    if (remoteJid.endsWith('@g.us') || remoteJid === 'status@broadcast') {
      return NextResponse.json({ ignored: true, reason: 'group_or_broadcast' });
    }

    if (!userMessage || !remoteJid) {
      console.log('[Bot] Mensagem sem texto ou sem JID. Tipo:', Object.keys(messageData ?? {}));
      return NextResponse.json({ ignored: true, reason: 'no_text_or_jid' });
    }

    console.log(`[Bot] Mensagem de ${pushName} (${remoteJid}): "${userMessage.slice(0, 80)}"`);

    // ── Tenta gerar resposta com Claude IA ────────────────────────────────────
    let replyText: string | null = null;

    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const { generateText } = await import('ai');
        const { anthropic }    = await import('@ai-sdk/anthropic');

        const systemPrompt = `Você é o ZACDA IA, assistente virtual da ZACDA Digital Agency — agência brasileira de sites, identidade visual e automações com IA.
Tom: profissional, caloroso, persuasivo. Como um consultor de vendas experiente.
Contexto: Responda APENAS sobre criação de sites, identidade visual, branding, automações com IA, preços da agência.
Planos: START R$147/mês (Landing Page), GROW R$297/mês (Site Institucional + SEO + Agente IA), PRO R$1.199/mês (Web App + CRM).
Site: https://zacda.com.br
Seja conciso (máx. 5 linhas). Use emojis com moderação. Quebre linhas para facilitar leitura no WhatsApp.
Se perguntar sobre algo fora do escopo, redirecione educadamente para a agência.`;

        const aiResult = await generateText({
          model: anthropic('claude-3-5-haiku-latest'),
          system: systemPrompt,
          prompt: `${pushName} disse: "${userMessage}"\n\nResponda de forma natural e estratégica.`,
        });

        replyText = aiResult.text?.trim() ?? null;
        console.log('[Bot] Resposta da IA gerada com sucesso.');
      } catch (aiErr) {
        console.error('[Bot] Falha na IA Claude:', aiErr);
        // Cai no fallback abaixo
      }
    } else {
      console.warn('[Bot] ANTHROPIC_API_KEY ausente. Usando respostas de fallback.');
    }

    // ── Fallback por palavras-chave se IA falhou ───────────────────────────────
    if (!replyText) {
      replyText = buildFallbackResponse(userMessage);
      console.log('[Bot] Usando resposta de fallback por keywords.');
    }

    // ── Envia a resposta ───────────────────────────────────────────────────────
    const sent = await sendWhatsAppMessage(remoteJid, replyText);
    console.log(`[Bot] Mensagem ${sent ? 'enviada' : 'FALHOU'} para ${remoteJid}`);

    return NextResponse.json({ success: true, ai: !!process.env.ANTHROPIC_API_KEY, sent });

  } catch (error) {
    console.error('[Bot] Erro crítico:', error);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
