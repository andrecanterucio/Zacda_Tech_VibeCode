import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'
import nodemailer from 'nodemailer'

// ── Tipos ──────────────────────────────────────────────────────────────────
interface LeadPayload {
  name: string
  email: string
  phone?: string
  segment: string
  segmentLabel: string
  digitalLink?: string
  vision: string
}

// ── Zoho SMTP transporter ──────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_APP_PASSWORD,
    },
    tls: { rejectUnauthorized: true },
  })
}

// ── WhatsApp via Evolution API ─────────────────────────────────────────────
// Delay inteligente: mensagem ao admin chega imediatamente;
// auto-resposta ao lead chega 3s depois (delayMessage) para parecer humana.
async function notifyWpp(number: string, text: string, delay = 1000): Promise<boolean> {
  const evoUrl   = process.env.EVOLUTION_API_URL
  const evoToken = process.env.EVOLUTION_API_KEY
  if (!evoUrl || !evoToken || !number) return false

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(`${evoUrl}/message/sendText/Zacda`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: evoToken },
      body: JSON.stringify({ number, text, delayMessage: delay }),
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

// ── E-mail de alerta via Zoho SMTP ────────────────────────────────────────
async function sendEmail(lead: LeadPayload, dbOk: boolean): Promise<void> {
  if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_APP_PASSWORD) {
    console.warn('[Email] ZOHO_EMAIL ou ZOHO_APP_PASSWORD não configurados.')
    return
  }

  const { name, email, phone, segmentLabel, digitalLink, vision } = lead

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
            <p style="margin:4px 0 0;font-size:13px;color:#666;letter-spacing:1px;">DIGITAL AGENCY · NOVA PROPOSTA</p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px 0;">
            <p style="margin:0;font-size:18px;font-weight:600;color:#fff;">🔥 Nova Proposta Estratégica</p>
            <p style="margin:8px 0 0;font-size:13px;color:#666;">Formulário de Captura — ZACDA Tech v2</p>
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
                <td style="padding:14px 20px;font-size:14px;color:#fff;">${segmentLabel}</td>
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
              ${dbOk ? '✅ Proposta salva no Supabase (tabela: propostas)' : '⚠️ Falha ao salvar no Supabase — verificar logs'}
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
      to: 'atendimento@zacda.com.br',
      replyTo: email,
      subject: `[ZACDA] Nova Proposta — ${name} | ${segmentLabel}`,
      html,
    })
    console.log('[Email] Enviado via Zoho SMTP. MessageId:', info.messageId)
  } catch (e: unknown) {
    console.error('[Email] Erro ao enviar via Zoho SMTP:', e instanceof Error ? e.message : e)
  }
}

// ── POST /api/webhook ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let lead: LeadPayload

  try {
    lead = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const { name, email, phone = '', segment, segmentLabel, digitalLink = '', vision } = lead

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 422 })
  }

  // 1. Supabase — insere na tabela `propostas` (colunas em português, bypassa RLS via service_role)
  let dbOk = false
  try {
    const supabase = createAdminClient()
    const { error: dbError } = await supabase.from('propostas').insert([{
      nome:           name.trim(),
      email:          email.trim(),
      telefone:       phone.trim()        || null,
      segmento:       segment.trim()      || null,
      segmento_label: segmentLabel.trim() || null,
      link:           digitalLink.trim()  || null,
      visao:          vision.trim()       || null,
      status:         'novo',
    }])
    if (dbError) {
      console.error('[Supabase] Erro ao salvar proposta:', dbError.message, dbError.code)
    } else {
      dbOk = true
      console.log('[Supabase] Proposta salva:', email)
    }
  } catch (e) {
    console.error('[Supabase] Exceção:', e)
  }

  // 2. E-mail de alerta para a equipe (assíncrono — não bloqueia o response)
  sendEmail(lead, dbOk).catch((e) => console.error('[Email] Falha silenciosa:', e))

  // 3. Normaliza telefone → formato internacional brasileiro (55 + DDD + número)
  let cleanPhone = phone.replace(/\D/g, '')
  if (cleanPhone.length > 8 && !cleanPhone.startsWith('55')) {
    cleanPhone = '55' + cleanPhone
  }

  // 4. WhatsApp de confirmação para o lead (delay 3s — parecer triagem humana)
  if (cleanPhone) {
    notifyWpp(
      cleanPhone,
      `Olá ${name}! ✅ Recebemos sua proposta na ZACDA Tech.\n\nNossa IA já iniciou a triagem no setor de *${segmentLabel}*${digitalLink ? ` e está analisando seu link *${digitalLink}*` : ''}.\n\nNossa equipe entrará em contato em breve! 🦾\n\n_— ZACDA Digital Agency_`,
      3000
    ).catch((e) => console.error('[WhatsApp] Lead notify failed:', e))
  }

  // 5. WhatsApp de alerta imediato para o admin
  notifyWpp(
    '5516993193919',
    `🔥 *NOVA PROPOSTA ZACDA!*\n\n👤 *Nome:* ${name}\n📧 *Email:* ${email}\n📱 *Telefone:* ${phone || 'Não informado'}\n🏢 *Segmento:* ${segmentLabel}\n🔗 *Link:* ${digitalLink || 'Não informado'}\n\n💬 *Objetivo:*\n"${vision}"\n\n_DB: ${dbOk ? '✅ propostas' : '❌ FALHOU'}_`,
    1000
  ).catch((e) => console.error('[WhatsApp] Admin notify failed:', e))

  console.log('SISTEMAS ONLINE')
  return NextResponse.json({ success: true, digitalLink }, { status: 200 })
}
