import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// ── Definição dos planos ───────────────────────────────────────────────────
const PLANS = {
  start: {
    name: 'Plano START',
    description: 'Landing Page Express + E-mail corporativo + WhatsApp',
    monthlyAmount: 14700,  // R$ 147,00 (em centavos)
    setupAmount:   49700,  // R$ 497,00
    setupLabel:    'Taxa de Setup — Plano START',
  },
  grow: {
    name: 'Plano GROW',
    description: 'Site Institucional + SEO + Agente IA (Triagem Online)',
    monthlyAmount:  29700, // R$ 297,00
    setupAmount:   120000, // R$ 1.200,00
    setupLabel:    'Taxa de Setup — Plano GROW',
  },
  pro: {
    name: 'Plano PRO',
    description: 'Web App + Área de Membros + CRM + Agente IA Completo',
    monthlyAmount: 119900, // R$ 1.199,00
    setupAmount:   650000, // R$ 6.500,00
    setupLabel:    'Taxa de Setup — Plano PRO',
  },
} as const

type PlanKey = keyof typeof PLANS

// ── Endpoint POST /api/checkout ────────────────────────────────────────────
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

    // Subscription + setup fee como line_item one-time (cobrado só na 1ª fatura)
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      locale: 'pt-BR',
      line_items: [
        {
          // Item recorrente — mensalidade
          price_data: {
            currency: 'brl',
            product_data: {
              name: `${planData.name} — Mensalidade`,
              description: planData.description,
            },
            unit_amount: planData.monthlyAmount,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
        {
          // Item avulso — setup (sem 'recurring', cobrado apenas na 1ª fatura)
          price_data: {
            currency: 'brl',
            product_data: {
              name: planData.setupLabel,
              description: 'Implementação e configuração inicial — cobrado uma única vez',
            },
            unit_amount: planData.setupAmount,
          },
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      success_url: `${baseUrl}/sucesso?plan=${plan}`,
      cancel_url:  `${baseUrl}/#planos`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[Stripe] Erro ao criar sessão de checkout:', msg)
    return NextResponse.json({ error: 'Erro ao iniciar pagamento. Tente novamente.' }, { status: 500 })
  }
}
