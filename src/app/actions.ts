'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Envia mensagem via Evolution API (timeout 8s para não estourar o limite do Vercel)
async function notifyWpp(number: string, text: string): Promise<boolean> {
  const evoUrl = process.env.EVOLUTION_API_URL
  const evoToken = process.env.EVOLUTION_API_KEY
  if (!evoUrl || !evoToken || !number) {
    console.warn('[WhatsApp] Credenciais da Evolution API ausentes. Verifique as env vars no Vercel.')
    return false
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(`${evoUrl}/message/sendText/Zacda`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': evoToken },
      body: JSON.stringify({ number, text, delayMessage: 1000 }),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`[WhatsApp] Evolution API retornou ${res.status}:`, body)
    }
    return res.ok
  } catch (e: unknown) {
    clearTimeout(timeout)
    if (e instanceof Error && e.name === 'AbortError') {
      console.error('[WhatsApp] Timeout ao conectar na Evolution API. Verifique se o servidor está online e acessível.')
    } else {
      console.error('[WhatsApp] Erro de rede:', e)
    }
    return false
  }
}

export async function submitLead(formData: FormData) {
  const name        = formData.get('entityName')?.toString().trim() || ''
  const email       = formData.get('email')?.toString().trim() || ''
  const phone       = formData.get('phone')?.toString().trim() || ''
  const segment     = formData.get('segment')?.toString().trim() || ''
  const digitalLink = formData.get('digital-link')?.toString().trim() || ''
  const vision      = formData.get('vision')?.toString().trim() || ''

  if (!name || !email) {
    return { error: 'O nome e e-mail são obrigatórios.' }
  }

  const fullMessage = [
    `Telefone: ${phone || 'Não informado'}`,
    `Segmento: ${segment}`,
    `Link: ${digitalLink}`,
    `\nVisão: ${vision}`,
  ].join('\n')

  // 1. Salva no Banco de Dados (Supabase)
  let dbOk = false
  try {
    const supabase = await createClient()
    const { error: dbError } = await supabase.from('leads').insert([{
      name, email, message: fullMessage
    }])
    if (dbError) {
      console.error('[Supabase] Erro ao inserir lead:', dbError.message, dbError.code)
    } else {
      dbOk = true
    }
  } catch (e) {
    console.error('[Supabase] Exceção:', e)
  }

  // 2. Envia e-mail para atendimento@zacda.com.br via Web3Forms
  try {
    const emailFd = new FormData()
    emailFd.append('access_key', 'c08a4935-8981-45dd-bfc3-ddadd18d016d')
    emailFd.append('subject', `[ZACDA] Novo Lead — ${name} | ${segment}`)
    emailFd.append('from_name', 'ZACDA Site')
    emailFd.append('replyto', email)
    emailFd.append('redirect', 'false')
    emailFd.append('Nome', name)
    emailFd.append('E-mail', email)
    emailFd.append('Telefone', phone || 'Não informado')
    emailFd.append('Segmento', segment)
    emailFd.append('Link Digital', digitalLink || 'Não informado')
    emailFd.append('Visao e Objetivo', vision)
    const emailRes = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: emailFd })
    if (emailRes.ok) {
      console.log('[Email] Enviado para atendimento@zacda.com.br via Web3Forms')
    } else {
      console.error('[Email] Web3Forms retornou:', emailRes.status, await emailRes.text().catch(() => ''))
    }
  } catch (e) {
    console.error('[Email] Falha ao enviar:', e)
  }

  // 3. Limpa telefone para formato WhatsApp internacional
  let cleanPhone = phone.replace(/\D/g, '')
  if (cleanPhone.length > 8 && !cleanPhone.startsWith('55')) {
    cleanPhone = '55' + cleanPhone
  }

  // 4. WhatsApp de retorno ao cliente (se tiver telefone)
  if (cleanPhone) {
    await notifyWpp(
      cleanPhone,
      `Olá ${name}! ✅ Recebemos sua requisição na ZACDA Tech.\n\nNossa IA já iniciou a triagem no setor de *${segment}* e nossa equipe entrará em contato em breve para discutir sua arquitetura digital! 🦾\n\n_— ZACDA Digital Agency_`
    )
  }

  // 5. Alerta ao admin (número fixo)
  await notifyWpp(
    '5516993193919',
    `🔥 *NOVO LEAD ZACDA!*\n\n👤 *Nome:* ${name}\n📧 *Email:* ${email}\n📱 *Telefone:* ${phone || 'Não informado'}\n🏢 *Segmento:* ${segment}\n🔗 *Link:* ${digitalLink || 'Não informado'}\n\n💬 *Objetivo:*\n"${vision}"\n\n_DB salvo: ${dbOk ? '✅' : '❌ FALHOU'}_`
  )

  revalidatePath('/')
  return { success: true }
}
