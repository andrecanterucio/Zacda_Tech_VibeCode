"use client";



export default function ResultsSection() {
  return (
    <section id="resultados" style={{ position: 'relative', zIndex: 1, padding: '8rem 0', background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      {/* Background glow effects */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,0,204,0.05), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,255,234,0.05), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="container">
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div className="section-tag" style={{ borderColor: 'var(--cyan)', color: 'var(--text-1)', boxShadow: '0 0 10px rgba(0,255,234,0.2)' }}>Dados Reais</div>
          <h2 className="reveal" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-1)', marginBottom: '1rem', fontFamily: 'var(--font-space-grotesk)' }}>
            Protocolos <span style={{ color: 'var(--magenta)', textShadow: '0 0 20px rgba(255,0,204,0.4)' }}>Já Rodando</span>
          </h2>
          <p style={{ color: 'var(--text-2)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Resultados tangíveis e medidos em faturamento gerado por nossos ecossistemas autônomos.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Card 1 */}
          <article className="glass-card reveal reveal-delay-1" style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--glass-bg), transparent)', zIndex: 1 }} />
              <img src="/assets/images/ui_growth.png" alt="Growth Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8) contrast(1.2)' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: '0.5rem', fontFamily: 'var(--font-space-grotesk)' }}>+340% leads</h3>
              <p style={{ color: 'var(--text-1)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>captados em 21 dias</p>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>Otimização brutalista do funil de captura e qualificação autônoma no WhatsApp.</p>
            </div>
          </article>

          {/* Card 2 */}
          <article className="glass-card reveal reveal-delay-2" style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--glass-bg), transparent)', zIndex: 1 }} />
               <img src="/assets/images/ui_spatial.png" alt="Spatial Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8) contrast(1.2) hue-rotate(-20deg)' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--magenta)', marginBottom: '0.5rem', fontFamily: 'var(--font-space-grotesk)' }}>R$ 47k/mês</h3>
              <p style={{ color: 'var(--text-1)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>vendas em piloto automático</p>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>Site fechando vendas high-ticket de maneira 100% autônoma usando agentes IA de fechamento.</p>
            </div>
          </article>

          {/* Card 3 (Placeholder for future cases) */}
          <article className="glass-card reveal reveal-delay-3" style={{ overflow: 'hidden', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderStyle: 'dashed', borderColor: 'rgba(0,255,234,0.2)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--cyan-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--cyan)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-1)', marginBottom: '0.5rem' }}>Próximo Protocolo</h3>
            <p style={{ color: 'var(--text-3)', fontSize: '0.9rem' }}>Conecte a tabela 'cases' do Supabase para injetar resultados em tempo real.</p>
          </article>

        </div>
      </div>
    </section>
  );
}
