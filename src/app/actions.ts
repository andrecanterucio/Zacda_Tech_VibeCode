'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitLead(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('entityName')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const phone = formData.get('phone')?.toString() || ''
  const segment = formData.get('segment')?.toString() || ''
  const digitalLink = formData.get('digital-link')?.toString() || ''
  const vision = formData.get('vision')?.toString() || ''

  const fullMessage = `Telefone: ${phone}\nSegmento: ${segment}\nLink: ${digitalLink}\n\nVisão: ${vision}`

  if (!name || !email) {
    return { error: 'O nome e e-mail são obrigatórios.' }
  }

  // 1. Salva no Banco de Dados
  const { error } = await supabase.from('leads').insert([{
    name: name,
    email: email,
    message: fullMessage
  }])

  if (error) console.error('Erro DB:', error)

  // Função auxiliar para notificação WhatsApp
  async function notifyWpp(number: string, text: string) {
    const evoUrl = process.env.EVOLUTION_API_URL
    const evoToken = process.env.EVOLUTION_API_KEY
    if (!evoUrl || !evoToken || !number) return
    try {
      await fetch(`${evoUrl}/message/sendText/Zacda`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': evoToken },
        body: JSON.stringify({ number, text, delayMessage: 1000 })
      })
    } catch (e) {
      console.error('Falha webhook wpp:', e)
    }
  }

  // 2. Limpa o telefone para o padrão WhatsApp internacional
  let cleanPhone = phone.replace(/\D/g, '')
  if (cleanPhone && cleanPhone.length > 8 && !cleanPhone.startsWith('55')) {
    cleanPhone = '55' + cleanPhone
  }

  // 3. Manda Whatsapp de Retorno para o Cliente
  if (cleanPhone) {
      await notifyWpp(
        cleanPhone, 
        `Olá ${name}! Recebemos a sua requisição na ZACDA Tech.\n\nNossa IA já iniciou uma triagem no setor corporativo de *${segment}* em cima do link fornecido, e nossa equipe entrará em contato comercial muito em breve para discutir sua arquitetura! 🦾`
      )
  }

  // 4. Manda alerta pro Admin (Seu número fixo)
  await notifyWpp(
    "5516993193919", 
    `🔥 *NOVO LEAD ZACDA CHEGOU!*\n\n*Nome:* ${name}\n*Email:* ${email}\n*Telefone:* ${phone}\n*Segmento:* ${segment}\n*Link/Insta:* ${digitalLink}\n\n*Visão Ciber-Minimalista pretendida:*\n"${vision}"`
  )

  revalidatePath('/')
  return { success: true }
}
