import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/utils/supabase/admin'

// ── Definição dos planos ───────────────────────────────────────────────────
const PLANS = {
  start: {
    name: 'Plano START',
    description: 'Landing Page Express + E-mail corporativo + WhatsApp',
    setupAmount: 49700,   // R$ 497,00 (em centavos)
    setupLabel:  'Setup/Implementação — Plano START',
  },
  grow: {
    name: 'Plano GROW',
    description: 'Site Institucional + SEO + Agente IA (Triagem Online)',
    setupAmount: 120000,  // R$ 1.200,00
    setupLabel:  'Setup/Implementação — Plano GROW',
  },
  pro: {
    name: 'Plano PRO',
    description: 'Web App + Área de Membros + CRM + Agente IA Completo',
    setupAmount: 650000,  // R$ 6.500,00
    setupLabel:  'Setup/Implementação — Plano PRO',
  },
} as const

type PlanKey = keyof typeof PLANS

// ── POST /api/checkout ─────────────────────────────────────────────────────
// Etapa 1: cobra apenas o setup fee e salva o cartão para cobrança futura.
// Etapa 2: o webhook /api/stripe-webhook cria a subscription após confirmação.
export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    console.error('[Stripe] STRIPE_SECRET_KEY não configurado nas env vars do Vercel.')
    return NextResponse.json(
      { error: 'Pagamentos temporariamente indisponíveis. Entre em contato via WhatsApp.' },
      { status: 503 }
    )
  }

  let plan: PlanKey
  try {
    const body = await req.json()
    plan = body.plan as PlanKey
    if (!plan || !(plan in PLANS)) throw new Error('plano inválido')
  } catch {
    return NextResponse.json({ error: 'Plano inválido.' }, { status: 400 })
  }

  const planData = PLANS[plan]
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zacda-tech-vibe-code.vercel.app'

  try {
    const stripe = new Stripe(secretKey)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',          // Cobrança única (setup fee)
      locale: 'pt-BR',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: planData.setupLabel,
              description: `${planData.description} — Taxa única de implementação`,
            },
            unit_amount: planData.setupAmount,
          },
          quantity: 1,
        },
      ],
      // Salva o cartão para cobranças mensais futuras (sem que o cliente precise redigitar)
      payment_intent_data: {
        setup_future_usage: 'off_session',
        metadata: { plan },
      },
      // Cria sempre um Customer do Stripe (necessário para criar subscription depois)
      customer_creation: 'always',
      metadata: { plan },
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      success_url: `${baseUrl}/sucesso?plan=${plan}`,
      cancel_url:  `${baseUrl}/#planos`,
    })

    // Grava reserva pendente no Supabase (assíncrono — não bloqueia o redirect)
    void (async () => {
      try {
        const { error } = await createAdminClient()
          .from('reservas')
          .insert([{ plano: plan, status: 'pendente', stripe_session_id: session.id }])
        if (error) console.error('[Supabase] Erro ao salvar reserva:', error.message)
        else        console.log('[Supabase] Reserva criada:', session.id)
      } catch (e) {
        console.error('[Supabase] Exceção ao salvar reserva:', e)
      }
    })()

    console.log('SISTEMAS ONLINE')
    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[Stripe] Erro ao criar sessão de checkout:', msg)
    return NextResponse.json({ error: 'Erro ao iniciar pagamento. Tente novamente.' }, { status: 500 })
  }
}
