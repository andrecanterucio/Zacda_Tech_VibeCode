'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

const PLAN_INFO: Record<string, { label: string; monthly: string; setup: string }> = {
  start: { label: 'START',  monthly: 'R$ 147',   setup: 'R$ 497'    },
  grow:  { label: 'GROW',   monthly: 'R$ 297',   setup: 'R$ 1.200'  },
  pro:   { label: 'PRO',    monthly: 'R$ 1.199', setup: 'R$ 6.500'  },
}

function SuccessContent() {
  const params = useSearchParams()
  const plan   = params.get('plan') ?? ''
  const info   = PLAN_INFO[plan]

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
        maxWidth: '580px',
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(0,229,255,0.25)',
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(0,229,255,0.08)',
      }}>

        {/* Ícone */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'rgba(0,229,255,0.12)',
          border: '2px solid rgba(0,229,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem', fontSize: '2rem', color: '#00e5ff',
        }}>✓</div>

        <h1 style={{ color: '#00e5ff', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Setup Pago com Sucesso!
        </h1>

        {info ? (
          <p style={{ color: '#a0a0a0', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Plano <strong style={{ color: '#fff' }}>ZACDA {info.label}</strong> — implementação ativada.
          </p>
        ) : (
          <p style={{ color: '#a0a0a0', marginBottom: '1.5rem' }}>
            Pagamento confirmado. Bem-vindo à ZACDA!
          </p>
        )}

        {/* Terminal de status */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(0,229,255,0.15)',
          borderRadius: '10px',
          padding: '1.5rem',
          textAlign: 'left',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8rem',
          lineHeight: '1.9',
          marginBottom: '1.5rem',
        }}>
          <p><span style={{ color: '#00e5ff' }}>&gt; Taxa de setup:</span> <span style={{ color: '#00ff41' }}>PAGO ✓</span>{info ? <span style={{ color: '#888' }}> ({info.setup})</span> : null}</p>
          <p><span style={{ color: '#00e5ff' }}>&gt; Cartão salvo:</span> <span style={{ color: '#00ff41' }}>OK ✓</span></p>
          <p><span style={{ color: '#00e5ff' }}>&gt; Mensalidade:</span> <span style={{ color: '#facc15' }}>AGENDADA</span>{info ? <span style={{ color: '#888' }}> ({info.monthly}/mês)</span> : null}</p>
          <p><span style={{ color: '#00e5ff' }}>&gt; Início do ciclo:</span> <span style={{ color: '#fff' }}>30 dias a partir de hoje</span></p>
          <p><span style={{ color: '#00e5ff' }}>&gt; Duração:</span> <span style={{ color: '#fff' }}>12 meses · cancela automaticamente</span></p>
        </div>

        {/* Próximos passos */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '1.25rem 1.5rem',
          textAlign: 'left',
          marginBottom: '2rem',
          fontSize: '0.85rem',
          color: '#a0a0a0',
          lineHeight: '1.8',
        }}>
          <p style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>Próximos passos:</p>
          <p>1. Nossa equipe entrará em contato <strong style={{ color: '#00e5ff' }}>em até 24h úteis</strong> via WhatsApp e e-mail.</p>
          <p>2. A implementação do seu projeto será iniciada imediatamente.</p>
          <p>3. O <strong style={{ color: '#facc15' }}>primeiro pagamento mensal</strong> será debitado automaticamente em <strong style={{ color: '#facc15' }}>30 dias</strong>.</p>
        </div>

        <p style={{ color: '#555', fontSize: '0.78rem', marginBottom: '2rem' }}>
          Dúvidas?{' '}
          <a href="mailto:atendimento@zacda.com.br" style={{ color: '#00e5ff', textDecoration: 'none' }}>
            atendimento@zacda.com.br
          </a>
          {' '}·{' '}
          <a href="https://wa.me/5516993193919" target="_blank" rel="noopener noreferrer"
            style={{ color: '#00e5ff', textDecoration: 'none' }}>
            WhatsApp (16) 99319-3919
          </a>
        </p>

        <Link href="/" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #00e5ff, #0099ff)',
          color: '#000', fontWeight: 700,
          padding: '0.9rem 2.5rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '0.9rem',
          letterSpacing: '0.05em',
        }}>
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
        <p style={{ color: '#00e5ff', fontFamily: 'monospace' }}>Carregando...</p>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}
