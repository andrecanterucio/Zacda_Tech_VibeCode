"use client";



export default function ServicesSection() {
  return (
    <section id="servicos" aria-labelledby="servicos-heading" style={{ position: 'relative', zIndex: 1, padding: '8rem 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <header className="services-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag" style={{ borderColor: 'var(--cyan)' }}>Serviços Ultra-Premium</div>
          <h2 id="servicos-heading" className="services-title reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-1)', marginBottom: '1rem', fontFamily: 'var(--font-space-grotesk)' }}>
            Definindo o Futuro da<br />
            <span className="gradient-text">Interação Digital</span>
          </h2>
          <p className="services-sub reveal reveal-delay-2" style={{ color: 'var(--text-2)', maxWidth: '520px', margin: '0 auto', fontSize: '1.1rem' }}>
            Engenharia de alta fidelidade e design visionário para marcas que recusam o ordinário.
          </p>
        </header>

        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          
          {/* UX com IA */}
          <article className="glass-card reveal reveal-delay-1" style={{ overflow: 'hidden', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--glass-bg), transparent)', zIndex: 1 }} />
              <img src="/assets/images/ui_growth.png" alt="UX com IA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <span style={{ display: 'inline-block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--cyan-dim)', color: 'var(--cyan)', padding: '4px 10px', borderRadius: '4px', marginBottom: '1rem', border: '1px solid rgba(0,255,234,0.3)' }}>IA · Neural</span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-1)', marginBottom: '0.5rem' }}>UX Impulsionado por IA</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>Adaptação autônoma do conteúdo em tempo real baseada no comportamento neural do usuário, maximizando conversões silenciosamente.</p>
            </div>
          </article>

          {/* Design Ciber-Minimalista */}
          <article className="glass-card reveal reveal-delay-2" style={{ overflow: 'hidden', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '160px', overflow: 'hidden', position: 'relative', background: 'radial-gradient(circle, rgba(255,30,205,0.1), transparent)' }}>
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--glass-bg), transparent)', zIndex: 1 }} />
             <img src="/assets/images/ui_spatial.png" alt="Ciber Minimalismo" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.5)' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <span style={{ display: 'inline-block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,30,205,0.1)', color: 'var(--magenta)', padding: '4px 10px', borderRadius: '4px', marginBottom: '1rem', border: '1px solid rgba(255,30,205,0.3)' }}>Design · Brutalismo</span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-1)', marginBottom: '0.5rem' }}>Design Ciber-Minimalista</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>Estética impecável que funde o luxo com texturas metálicas pesadas formando interfaces brutalmente imersivas e limpas.</p>
            </div>
          </article>

          {/* UI Espacial */}
          <article className="glass-card reveal reveal-delay-3" style={{ overflow: 'hidden', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--glass-bg), transparent)', zIndex: 1 }} />
              <img src="/assets/images/ui_spatial.png" alt="UI Espacial" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(90deg)' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <span style={{ display: 'inline-block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--cyan-dim)', color: 'var(--cyan)', padding: '4px 10px', borderRadius: '4px', marginBottom: '1rem', border: '1px solid rgba(0,255,234,0.3)' }}>Espacial · Web3</span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-1)', marginBottom: '0.5rem' }}>Arquitetura 3D Espacial</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>O limite da web moderna cruzando as barreiras da tela 2D trazendo dimensões imersivas para a visualização de produtos.</p>
            </div>
          </article>

          {/* Micro SaaS */}
          <article className="glass-card reveal reveal-delay-4" style={{ overflow: 'hidden', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--glass-bg), transparent)', zIndex: 1 }} />
               <img src="/assets/images/ui_growth.png" alt="Micro SaaS" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(-50deg) brightness(1.2)' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <span style={{ display: 'inline-block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,30,205,0.1)', color: 'var(--magenta)', padding: '4px 10px', borderRadius: '4px', marginBottom: '1rem', border: '1px solid rgba(255,30,205,0.3)' }}>Automação · SaaS</span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-1)', marginBottom: '0.5rem' }}>Evolução Micro SaaS</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>Transformamos serviços recorrentes da sua empresa em plataformas autossuficientes com banco de dados próprio e webhook.</p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
