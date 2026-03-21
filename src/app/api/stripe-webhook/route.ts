import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// ── Dados mensais por plano (em centavos BRL) ──────────────────────────────
const PLAN_MONTHLY: Record<string, number> = {
  start: 14700,   // R$ 147,00
  grow:  29700,   // R$ 297,00
  pro:   119900,  // R$ 1.199,00
}

const PLAN_NAMES: Record<string, string> = {
  start: 'Plano START',
  grow:  'Plano GROW',
  pro:   'Plano PRO',
}

// ── POST /api/stripe-webhook ───────────────────────────────────────────────
// Recebe eventos do Stripe. Ao confirmar o pagamento do setup fee,
// cria automaticamente a subscription mensal com início em 30 dias
// e duração de 12 meses (cancela após o 12º pagamento).
export async function POST(req: Request) {
  const secretKey    = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey || !webhookSecret) {
    console.error('[Stripe Webhook] Credenciais ausentes.')
    return NextResponse.json({ error: 'Webhook não configurado.' }, { status: 503 })
  }

  const stripe  = new Stripe(secretKey)
  const payload = await req.text()
  const sig     = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret)
  } catch (err) {
    console.error('[Stripe Webhook] Assinatura inválida:', err)
    return NextResponse.json({ error: 'Assinatura inválida.' }, { status: 400 })
  }

  // ── Processa somente checkout.session.completed ────────────────────────
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ ok: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // Ignora sessões que não sejam do nosso fluxo de setup
  if (session.mode !== 'payment' || !session.metadata?.plan) {
    return NextResponse.json({ ok: true })
  }

  const plan = session.metadata.plan
  if (!PLAN_MONTHLY[plan]) {
    console.warn('[Stripe Webhook] Plano desconhecido:', plan)
    return NextResponse.json({ ok: true })
  }

  const customerId = session.customer as string
  if (!customerId) {
    console.error('[Stripe Webhook] customer_id ausente na sessão:', session.id)
    return NextResponse.json({ ok: true })
  }

  try {
    // ── Obtém o payment_method salvo via setup_future_usage ──────────────
    const paymentIntentId = session.payment_intent as string
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const paymentMethodId = paymentIntent.payment_method as string

    if (!paymentMethodId) {
      console.error('[Stripe Webhook] payment_method não encontrado no payment_intent:', paymentIntentId)
      return NextResponse.json({ ok: true })
    }

    // ── Idempotência: não cria subscription duplicada ────────────────────
    const existing = await stripe.subscriptions.list({
      customer: customerId,
      limit: 10,
    })
    const alreadySubscribed = existing.data.some(
      sub => sub.metadata?.source === 'zacda_checkout' && sub.metadata?.plan === plan
    )
    if (alreadySubscribed) {
      console.log('[Stripe Webhook] Subscription já existe para customer:', customerId)
      return NextResponse.json({ ok: true })
    }

    // ── Calcula datas ────────────────────────────────────────────────────
    const now = Math.floor(Date.now() / 1000)
    // Primeiro pagamento mensal: 30 dias após setup
    const trialEnd = now + 30 * 24 * 60 * 60
    // Após 12 pagamentos mensais: cancela automaticamente (~13 meses a partir de hoje)
    const cancelAt = now + Math.ceil(13 * 30.44 * 24 * 60 * 60) // 13 meses em segundos

    // ── Obtém (ou cria) o price do plano via lookup_key (idempotente) ────
    const lookupKey = `zacda_${plan}_monthly_brl`
    let priceId: string

    const existingPrices = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 })
    if (existingPrices.data.length > 0) {
      priceId = existingPrices.data[0].id
    } else {
      const newPrice = await stripe.prices.create({
        currency: 'brl',
        product_data: { name: `${PLAN_NAMES[plan]} — Mensalidade` },
        unit_amount: PLAN_MONTHLY[plan],
        recurring: { interval: 'month' },
        lookup_key: lookupKey,
        transfer_lookup_key: true,
      })
      priceId = newPrice.id
    }

    // ── Cria a subscription ──────────────────────────────────────────────
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      trial_end: trialEnd,  // Primeiro débito em 30 dias
      cancel_at: cancelAt,  // Cancela após 12 pagamentos
      metadata: {
        plan,
        source:        'zacda_checkout',
        setup_session: session.id,
      },
    })

    console.log(
      `[Stripe Webhook] ✅ Subscription criada: ${subscription.id} | cliente: ${customerId} | plano: ${plan}`
    )
  } catch (err: unknown) {
    // Log do erro mas retorna 200 para o Stripe não ficar reenviando
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[Stripe Webhook] Erro ao criar subscription:', msg)
  }

  return NextResponse.json({ ok: true })
}
