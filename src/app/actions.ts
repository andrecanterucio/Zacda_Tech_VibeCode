'use server'

import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'
import nodemailer from 'nodemailer'

// ── Transporter Zoho SMTP (singleton por request) ─────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,       // TLS via STARTTLS
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_APP_PASSWORD,
    },
    tls: { rejectUnauthorized: true },
  })
}

// ── Envia mensagem via Evolution API ──────────────────────────────────────
async function notifyWpp(number: string, text: string): Promise<boolean> {
  const evoUrl   = process.env.EVOLUTION_API_URL
  const evoToken = process.env.EVOLUTION_API_KEY
  if (!evoUrl || !evoToken || !number) return false

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
    if (!res.ok) console.error(`[WhatsApp] Evolution API retornou ${res.status}`)
    return res.ok
  } catch (e: unknown) {
    clearTimeout(timeout)
    console.error('[WhatsApp] Erro:', e instanceof Error ? e.message : e)
    return false
  }
}

// ── Envia e-mail via Zoho SMTP ─────────────────────────────────────────────
async function sendEmail(opts: {
  name: string
  email: string
  phone: string
  segment: string
  digitalLink: string
  vision: string
  dbOk: boolean
}): Promise<void> {
  if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_APP_PASSWORD) {
    console.warn('[Email] ZOHO_EMAIL ou ZOHO_APP_PASSWORD não configurados.')
    return
  }

  const { name, email, phone, segment, digitalLink, vision, dbOk } = opts

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #222;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <tr>
          <td style="background:linear-gradient(135deg,#00e5ff11,#ff1ecd11);padding:32px 40px;border-bottom:1px solid #222;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#00e5ff;letter-spacing:2px;">ZACDA</p>
            <p style="margin:4px 0 0;font-size:13px;color:#666;letter-spacing:1px;">DIGITAL AGENCY · NOVO LEAD</p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px 0;">
            <p style="margin:0;font-size:18px;font-weight:600;color:#fff;">🔥 Novo Lead Recebido</p>
            <p style="margin:8px 0 0;font-size:13px;color:#666;">Formulário de Proposta Estratégica</p>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
              <tr style="border-bottom:1px solid #1e1e1e;">
                <td style="padding:14px 20px;font-size:12px;color:#666;width:140px;font-weight:600;letter-spacing:0.5px;">NOME</td>
                <td style="padding:14px 20px;font-size:14px;color:#fff;">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid #1e1e1e;">
                <td style="padding:14px 20px;font-size:12px;color:#666;font-weight:600;letter-spacing:0.5px;">E-MAIL</td>
                <td style="padding:14px 20px;font-size:14px;color:#00e5ff;">
                  <a href="mailto:${email}" style="color:#00e5ff;text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr style="border-bottom:1px solid #1e1e1e;">
                <td style="padding:14px 20px;font-size:12px;color:#666;font-weight:600;letter-spacing:0.5px;">TELEFONE</td>
                <td style="padding:14px 20px;font-size:14px;color:#fff;">${phone || 'Não informado'}</td>
              </tr>
              <tr style="border-bottom:1px solid #1e1e1e;">
                <td style="padding:14px 20px;font-size:12px;color:#666;font-weight:600;letter-spacing:0.5px;">SEGMENTO</td>
                <td style="padding:14px 20px;font-size:14px;color:#fff;">${segment}</td>
              </tr>
              ${digitalLink ? `
              <tr style="border-bottom:1px solid #1e1e1e;">
                <td style="padding:14px 20px;font-size:12px;color:#666;font-weight:600;letter-spacing:0.5px;">LINK DIGITAL</td>
                <td style="padding:14px 20px;font-size:14px;color:#00e5ff;">
                  <a href="${digitalLink.startsWith('http') ? digitalLink : 'https://' + digitalLink}" target="_blank" style="color:#00e5ff;text-decoration:none;">${digitalLink}</a>
                  <span style="display:block;font-size:11px;color:#666;margin-top:4px;">🔍 Aguardando análise da IA</span>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding:14px 20px;font-size:12px;color:#666;font-weight:600;letter-spacing:0.5px;vertical-align:top;">OBJETIVO</td>
                <td style="padding:14px 20px;font-size:14px;color:#ccc;line-height:1.6;">${vision}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:0 40px 24px;">
            <p style="margin:0;font-size:12px;color:${dbOk ? '#00e5ff' : '#ff4444'};">
              ${dbOk ? '✅ Lead salvo no Supabase' : '⚠️ Falha ao salvar no Supabase — verificar logs'}
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 40px;background:#0d0d0d;border-top:1px solid #1e1e1e;">
            <p style="margin:0;font-size:11px;color:#444;text-align:center;">
              ZACDA Digital Agency · atendimento@zacda.com.br · Gerado automaticamente pelo site
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  try {
    const transporter = createTransporter()
    const info = await transporter.sendMail({
      from: `"ZACDA Site" <${process.env.ZOHO_EMAIL}>`,
      to:   'atendimento@zacda.com.br',
      replyTo: email,
      subject: `[ZACDA] Novo Lead — ${name} | ${segment}`,
      html,
    })
    console.log('[Email] Enviado via Zoho SMTP. MessageId:', info.messageId)
  } catch (e: unknown) {
    console.error('[Email] Erro ao enviar via Zoho SMTP:', e instanceof Error ? e.message : e)
  }
}

// ── Server Action principal ────────────────────────────────────────────────
export async function submitLead(formData: FormData) {
  const name        = formData.get('entityName')?.toString().trim()   || ''
  const email       = formData.get('email')?.toString().trim()        || ''
  const phone       = formData.get('phone')?.toString().trim()        || ''
  const segment     = formData.get('segment')?.toString().trim()      || ''
  const digitalLink = formData.get('digital-link')?.toString().trim() || ''
  const vision      = formData.get('vision')?.toString().trim()       || ''

  if (!name || !email) return { error: 'O nome e e-mail são obrigatórios.' }

  const fullMessage = [
    `Telefone: ${phone || 'Não informado'}`,
    `Segmento: ${segment}`,
    `Link: ${digitalLink || 'Não informado'}`,
    `\nVisão: ${vision}`,
  ].join('\n')

  // 1. Salva no Supabase (admin client — bypassa RLS)
  let dbOk = false
  try {
    const supabase = createAdminClient()
    const { error: dbError } = await supabase.from('leads').insert([{ name, email, message: fullMessage }])
    if (dbError) console.error('[Supabase] Erro:', dbError.message, dbError.code)
    else { dbOk = true; console.log('[Supabase] Lead salvo:', email) }
  } catch (e) {
    console.error('[Supabase] Exceção:', e)
  }

  // 2. E-mail via Zoho SMTP
  await sendEmail({ name, email, phone, segment, digitalLink, vision, dbOk })

  // 3. Limpa telefone para formato internacional
  let cleanPhone = phone.replace(/\D/g, '')
  if (cleanPhone.length > 8 && !cleanPhone.startsWith('55')) cleanPhone = '55' + cleanPhone

  // 4. WhatsApp de confirmação ao cliente
  if (cleanPhone) {
    await notifyWpp(
      cleanPhone,
      `Olá ${name}! ✅ Recebemos sua requisição na ZACDA Tech.\n\nNossa IA já iniciou a triagem no setor de *${segment}*${digitalLink ? ` e está analisando seu link *${digitalLink}*` : ''}.\n\nNossa equipe entrará em contato em breve! 🦾\n\n_— ZACDA Digital Agency_`
    )
  }

  // 5. Alerta ao admin via WhatsApp
  await notifyWpp(
    '5516993193919',
    `🔥 *NOVO LEAD ZACDA!*\n\n👤 *Nome:* ${name}\n📧 *Email:* ${email}\n📱 *Telefone:* ${phone || 'Não informado'}\n🏢 *Segmento:* ${segment}\n🔗 *Link:* ${digitalLink || 'Não informado'}\n\n💬 *Objetivo:*\n"${vision}"\n\n_DB: ${dbOk ? '✅' : '❌ FALHOU'}_`
  )

  revalidatePath('/')
  return { success: true, digitalLink }
}
