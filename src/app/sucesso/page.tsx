'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

const PLAN_LABELS: Record<string, string> = {
  start: 'START — R$ 147/mês',
  grow:  'GROW — R$ 297/mês',
  pro:   'PRO — R$ 1.199/mês',
}

function SuccessContent() {
  const params = useSearchParams()
  const plan = params.get('plan') ?? ''
  const planLabel = PLAN_LABELS[plan] ?? 'Plano ZACDA'

  return (
    <main style={{
      minHeight: '100vh',
      background: '#030303',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <div style={{
        maxWidth: '560px',
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(0,229,255,0.25)',
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(0,229,255,0.08)',
      }}>
        {/* Ícone de sucesso */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(0,229,255,0.12)',
          border: '2px solid rgba(0,229,255,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '2rem',
        }}>
          ✓
        </div>

        <h1 style={{
          color: '#00e5ff',
          fontSize: '1.8rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          lineHeight: 1.2,
        }}>
          Pagamento Confirmado!
        </h1>

        <p style={{ color: '#a0a0a0', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Seu <strong style={{ color: '#fff' }}>{planLabel}</strong> foi ativado com sucesso.
        </p>

        {/* Terminal */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(0,229,255,0.15)',
          borderRadius: '10px',
          padding: '1.5rem',
          textAlign: 'left',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8rem',
          lineHeight: '1.8',
          marginBottom: '2rem',
        }}>
          <p style={{ color: '#00e5ff' }}>&gt; Pagamento processado... <span style={{ color: '#00ff41' }}>[OK]</span></p>
          <p style={{ color: '#00e5ff' }}>&gt; Registrando assinatura... <span style={{ color: '#00ff41' }}>[OK]</span></p>
          <p style={{ color: '#00e5ff' }}>&gt; Ativando protocolo ZACDA... <span style={{ color: '#00ff41' }}>[OK]</span></p>
          <p style={{ color: '#888', marginTop: '0.5rem' }}>
            Nossa equipe entrará em contato em até 24h úteis via WhatsApp e e-mail para iniciar sua implementação.
          </p>
        </div>

        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '2rem' }}>
          Dúvidas? Fale conosco:{' '}
          <a href="mailto:atendimento@zacda.com.br" style={{ color: '#00e5ff', textDecoration: 'none' }}>
            atendimento@zacda.com.br
          </a>
          {' '}ou pelo WhatsApp{' '}
          <a
            href="https://wa.me/5516993193919"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#00e5ff', textDecoration: 'none' }}
          >
            (16) 99319-3919
          </a>
        </p>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #00e5ff, #0099ff)',
            color: '#000',
            fontWeight: 700,
            padding: '0.9rem 2.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            letterSpacing: '0.05em',
          }}
        >
          Voltar ao Site →
        </Link>
      </div>
    </main>
  )
}

export default function SucessoPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: '100vh', background: '#030303', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#00e5ff' }}>Carregando...</p>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}
