"use client";
import Image from 'next/image';
import { submitLead } from './actions';
import Link from 'next/link';
import Script from 'next/script';
import React, { useState } from 'react';

export default function Home() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [leadData, setLeadData] = useState({ name: '', segment: '' });

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('loading');
    const formData = new FormData(e.currentTarget);
    const segSelect = e.currentTarget.elements.namedItem('segment') as HTMLSelectElement;
    setLeadData({
      name: formData.get('entityName')?.toString() || '',
      segment: segSelect?.options[segSelect.selectedIndex]?.text || ''
    });

    try {
      const res = await submitLead(formData);
      if (res?.success) setFormState('success');
      else setFormState('error');
    } catch {
      setFormState('error');
    }
  }
  return (
    <main>
      

  {/*  ═══ STARSCAPE CANVAS ═══  */}
  <canvas id="starscape" aria-hidden="true"></canvas>

  {/*  ═══ SCROLL PROGRESS ═══  */}
  <div id="scroll-progress" role="progressbar" aria-hidden="true"></div>

  {/*  ═══ LOADER ═══  */}
  <div id="loader" role="status" aria-label="Carregando ZACDA">
    <span className="loader-brand-text">ZACDA</span>
    <span className="loader-label">Inicializando protocolo</span>
    <div className="loader-bar-track">
      <div className="loader-bar-fill" id="loader-fill"></div>
    </div>
  </div>

  {/*  ═══ NAVBAR ═══  */}
  <header>
    <nav id="navbar" role="navigation" aria-label="Navegação principal">
      <a href="#hero" className="nav-brand" aria-label="ZACDA Digital Agency - Início">
        <span className="nav-brand-text">ZACDA</span>
      </a>

      <ul className="nav-links">
        <li><a href="#padrao">Padrão</a></li>
        <li><a href="#servicos">Serviços</a></li>
        <li><a href="#planos">Planos</a></li>
        <li><a href="#capabilities">Capacidades</a></li>
        <li><a href="#proposta">Contato</a></li>
      </ul>

      <a href="#proposta" className="nav-cta">Iniciar Projeto</a>

      <button className="nav-hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </header>

  <main>
    {/*  ═══ HERO ═══  */}
    <section id="hero" aria-labelledby="hero-heading">
      {/*  Video Background  */}
      <div className="hero-video-wrap" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="assets/video/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/*  Neural Particles Canvas  */}
      <canvas id="hero-particles" aria-hidden="true"></canvas>

      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="orb orb-1" aria-hidden="true"></div>
      <div className="orb orb-2" aria-hidden="true"></div>

      <div className="container">
        <div className="hero-content">
          <span className="hero-eyebrow">Agência Digital — Sites &amp; Identidade Visual com IA</span>

          <h1 id="hero-heading" className="hero-h1">
            Criamos Sites e Marcas<br />
            <em>que Dominam o Digital</em>
          </h1>

          <p className="hero-sub">
            <span id="typewriter-text"></span><span className="typewriter-cursor" aria-hidden="true"></span>
          </p>

          <div className="hero-actions">
            <button
              id="hero-cta"
              className="btn btn-primary"
              onClick={() => {}}
              aria-label="Quero meu projeto digital com ZACDA"
            >
              Quero Meu Projeto
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#servicos" className="btn btn-secondary">Ver o que fazemos</a>
          </div>
        </div>
      </div>

      {/*  Scroll Hint  */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="scroll-hint-label">Scroll</span>
        <div className="scroll-hint-arrow">
          <div className="scroll-hint-dot"></div>
        </div>
      </div>
    </section>

    {/*  ═══ STATS ═══  */}
    <section id="stats" aria-label="Números ZACDA">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item reveal">
            <span className="stat-number" data-target="150" data-suffix="+">0+</span>
            <span className="stat-label">Aplicações Escaladas</span>
          </div>
          <div className="stat-item reveal reveal-delay-2">
            <span className="stat-number" data-target="10" data-suffix="k+">0k+</span>
            <span className="stat-label">Workflows Automatizados</span>
          </div>
          <div className="stat-item reveal reveal-delay-3">
            <span className="stat-number" data-target="100" data-suffix="%">0%</span>
            <span className="stat-label">Performance & Uptime</span>
          </div>
        </div>
      </div>
    </section>

    {/*  ═══ O PADRÃO ZACDA ═══  */}
    <section id="padrao" aria-labelledby="padrao-heading">
      <div className="container">
        <div className="padrao-header">
          <div>
            <div className="section-tag">Nosso DNA</div>
            <h2 id="padrao-heading" className="padrao-title reveal">
              O Padrão{' '}
              <span className="gradient-text">ZACDA</span>
              <span className="accent-line"></span>
            </h2>
          </div>
          <p className="padrao-desc reveal reveal-delay-2">
            Elementos 3D de alta tecnologia e texturas metálicas encontram a estética do luxo
            silencioso. Nós não apenas construímos — nós arquitetamos.
          </p>
        </div>

        <div className="padrao-cards">
          <article className="glass-card padrao-card reveal reveal-delay-1">
            <div className="padrao-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Criativo Avançado</h3>
            <p>Transcendendo a estética com precisão cinematográfica e detalhes hiper-realistas que elevam cada entrega a obra de arte.</p>
          </article>

          <article className="glass-card padrao-card reveal reveal-delay-2">
            <div className="padrao-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <h3>Arquitetura Digital</h3>
            <p>Estruturas robustas e otimizadas para a próxima geração de escala e desempenho. Engenharia que suporta o crescimento ilimitado.</p>
          </article>

          <article className="glass-card padrao-card reveal reveal-delay-3">
            <div className="padrao-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>À Prova de Futuro</h3>
            <p>Protegendo seu legado na era digital com sistemas imutáveis, adaptáveis e preparados para as tecnologias de amanhã.</p>
          </article>
        </div>
      </div>
    </section>

    {/*  ═══ SERVIÇOS ULTRA-PREMIUM ═══  */}
    <section id="servicos" aria-labelledby="servicos-heading">
      <div className="container">
        <header className="services-header">
          <div className="section-tag">Serviços Ultra-Premium</div>
          <h2 id="servicos-heading" className="services-title reveal">
            Definindo o Futuro da<br />
            <span className="gradient-text">Interação Digital</span>
          </h2>
          <p className="services-sub reveal reveal-delay-2">
            Engenharia de alta fidelidade e design visionário para marcas que recusam o ordinário.
          </p>
        </header>

        <div className="services-grid">
          {/*  UX com IA  */}
          <article className="glass-card service-card reveal reveal-delay-1">
            <div className="service-card-visual svc-visual-ai" aria-hidden="true"></div>
            <div className="service-card-inner">
              <span className="service-tag-pill tag-cyan">IA · Neural</span>
              <h3>UX Impulsionado por IA</h3>
              <p>Experiências inteligentes alimentadas por redes neurais avançadas que se adaptam ao comportamento do usuário em tempo real.</p>
              <a href="#proposta" className="service-link">
                Explorar Arquitetura
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </article>

          {/*  Design Ciber-Minimalista  */}
          <article className="glass-card service-card reveal reveal-delay-2">
            <div className="service-card-visual svc-visual-design" aria-hidden="true"></div>
            <div className="service-card-inner">
              <span className="service-tag-pill tag-magenta">Design · Brutalismo</span>
              <h3>Design Ciber-Minimalista</h3>
              <p>Simplicidade impactante com estética de alto nível, fundindo estruturas brutalistas com movimentos digitais fluidos.</p>
              <a href="#proposta" className="service-link">
                Ver Estética
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </article>

          {/*  UI Espacial  */}
          <article className="glass-card service-card reveal reveal-delay-3">
            <div className="service-card-visual svc-visual-ui" aria-hidden="true"></div>
            <div className="service-card-inner">
              <span className="service-tag-pill tag-cyan">Espacial · XR</span>
              <h3>UI Espacial</h3>
              <p>Interfaces de próxima geração projetadas para computação espacial, unindo o mundo físico e o digital em experiências imersivas.</p>
              <a href="#proposta" className="service-link">
                Iniciar Espacial
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </article>

          {/*  Branding no Metaverso  */}
          <article className="glass-card service-card reveal reveal-delay-4">
            <div className="service-card-visual svc-visual-meta" aria-hidden="true"></div>
            <div className="service-card-inner">
              <span className="service-tag-pill tag-magenta">Metaverso · Web3</span>
              <h3>Branding no Metaverso</h3>
              <p>Identidades de marca holísticas construídas para mundos descentralizados, focando na expressão de avatares e presença digital.</p>
              <a href="#proposta" className="service-link">
                Entrar no Ecossistema
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    {/*  ═══ PREÇOS & ESTRATÉGIA DE VENDAS ═══  */}
    <section id="planos" aria-labelledby="planos-heading" style={{ position: 'relative', zIndex: 1, padding: '8rem 0' }}>
      <div className="container">
        <header className="services-header" style={{ marginBottom: '2rem' }}>
          <div className="section-tag" style={{ borderColor: 'var(--magenta)', color: 'var(--text-1)' }}>Investimento & ROI</div>
          <h2 id="planos-heading" className="services-title reveal">
            Planos Estratégicos<br />
            <span className="gradient-text">ZACDA Tech</span>
          </h2>
        </header>

        <div className="reveal reveal-delay-2" style={{ maxWidth: '800px', margin: '0 auto 4rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--text-2)', lineHeight: 1.7 }}>
          <h3 style={{ color: 'var(--cyan)', marginBottom: '1.5rem', fontSize: '1.4rem', textAlign: 'center' }}>Transforme sua empresa em uma máquina de atrair clientes 24h por dia</h3>
          
          <h4 style={{ color: 'var(--text-1)', marginBottom: '0.8rem', fontSize: '1.05rem' }}>Pacote “Tudo em Um” – O Kit Empresa Digital Completo</h4>
          <p style={{ marginBottom: '1.2rem' }}>Deixamos de entregar “apenas um site”. Entregamos o Kit Empresa Digital pronto para faturar:</p>
          
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
            <li><span style={{ color: 'var(--cyan)', marginRight: '8px', fontWeight: 'bold' }}>✓</span> <strong style={{ color: 'var(--text-1)' }}>Site profissional</strong> otimizado para conversão + SEO inicial</li>
            <li><span style={{ color: 'var(--cyan)', marginRight: '8px', fontWeight: 'bold' }}>✓</span> <strong style={{ color: 'var(--text-1)' }}>E-mail corporativo</strong> profissional (@suaempresa.com.br)</li>
            <li><span style={{ color: 'var(--cyan)', marginRight: '8px', fontWeight: 'bold' }}>✓</span> <strong style={{ color: 'var(--text-1)' }}>Agente Oficial de WhatsApp</strong> com Inteligência Artificial (responde 24h, qualifica leads, agenda atendimentos e envia orçamentos automáticos)</li>
          </ul>

          <h4 style={{ color: 'var(--text-1)', marginBottom: '0.8rem', fontSize: '1.05rem' }}>Resultado real para o cliente:</h4>
          <blockquote style={{ borderLeft: '3px solid var(--magenta)', paddingLeft: '1.5rem', fontStyle: 'italic', color: 'var(--text-1)', background: 'linear-gradient(90deg, rgba(255,30,205,0.1) 0%, transparent 100%)', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
            “Por menos do que um café por dia (menos de R$ 10/dia), sua empresa fica aberta 24 horas na internet gerando contatos e fechando negócios enquanto você dorme, viaja ou atende outros clientes.”
          </blockquote>
        </div>

        <div className="pricing-grid reveal reveal-delay-3">
          
          <div className="glass-card pricing-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Plano START</h3>
            <p style={{ color: 'var(--text-2)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Foco: "Ser Encontrado"</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: "'Space Grotesk', sans-serif" }}>R$ 147<span style={{ fontSize: '1rem', color: 'var(--text-3)' }}>/mês</span></div>
            <p style={{ color: 'var(--cyan)', fontSize: '0.85rem', marginBottom: '2rem', marginTop: '0.5rem' }}>Setup: <del style={{ color: 'var(--text-3)' }}>R$ 900</del> R$ 497</p>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', fontSize: '0.9rem', flex: 1 }}>
              <li><strong style={{color: 'var(--text-1)'}}>Site:</strong> Landing Page Express</li>
              <li><strong style={{color: 'var(--text-1)'}}>WhatsApp:</strong> Botão de Contato</li>
              <li><strong style={{color: 'var(--text-1)'}}>Gestão:</strong> E-mail corporativo</li>
              <li><strong style={{color: 'var(--text-1)'}}>Infra:</strong> Hospedagem Vercel (EUA)</li>
            </ul>
            <a href="#proposta" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Selecionar START</a>
          </div>

          <div className="glass-card pricing-card featured-plan">
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--cyan)', color: 'var(--bg)', padding: '0.4rem 1.2rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>⭐ Melhor Plano</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--cyan)' }}>Plano GROW</h3>
            <p style={{ color: 'var(--text-2)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Foco: "Gerar Orçamentos"</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: "'Space Grotesk', sans-serif" }}>R$ 297<span style={{ fontSize: '1rem', color: 'var(--text-3)' }}>/mês</span></div>
            <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', marginBottom: '2rem', marginTop: '0.5rem' }}>Setup: R$ 1.200</p>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', fontSize: '0.9rem', flex: 1 }}>
              <li><strong style={{color: 'var(--text-1)'}}>Site:</strong> Site Institucional + SEO</li>
              <li><strong style={{color: 'var(--text-1)'}}>WhatsApp:</strong> Agente IA (Triagem Online)</li>
              <li><strong style={{color: 'var(--text-1)'}}>Gestão:</strong> Banco de Dados Supabase</li>
              <li><strong style={{color: 'var(--text-1)'}}>Infra:</strong> Manutenção Vibe Code</li>
            </ul>
            <a href="#proposta" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Selecionar GROW</a>
          </div>

          <div className="glass-card pricing-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--magenta)' }}>Plano PRO</h3>
            <p style={{ color: 'var(--text-2)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Foco: "Escalar sem Limites"</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: "'Space Grotesk', sans-serif" }}>R$ 1.199<span style={{ fontSize: '1rem', color: 'var(--text-3)' }}>/mês</span></div>
            <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', marginBottom: '2rem', marginTop: '0.5rem' }}>Setup: R$ 6.500</p>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', fontSize: '0.9rem', flex: 1 }}>
              <li><strong style={{color: 'var(--text-1)'}}>Site:</strong> Web App + Área de Membros</li>
              <li><strong style={{color: 'var(--text-1)'}}>WhatsApp:</strong> Agente IA (Venda e Agenda)</li>
              <li><strong style={{color: 'var(--text-1)'}}>Gestão:</strong> CRM Backend Integrado</li>
              <li><strong style={{color: 'var(--text-1)'}}>Infra:</strong> Hospedagem e Suporte VIP</li>
            </ul>
            <a href="#proposta" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Selecionar PRO</a>
          </div>

        </div>
      </div>
    </section>

    {/*  ═══ OPERAÇÕES INTELIGENTES (Micro SaaS & IA) ═══  */}
    <section id="automations" aria-labelledby="automations-heading">
      <div className="container">
        <div className="auto-wrap">
          <div className="auto-content reveal">
            <div className="section-tag">Operações Inteligentes</div>
            <h2 id="automations-heading" className="auto-title">
              O Seu Site Como<br/>
              <span className="gradient-text">Máquina Autônoma</span>
            </h2>
            <p className="auto-desc">
              Não entregamos apenas arquitura digital. Construímos ecossistemas completos onde seu site conversa com seu CRM, WhatsApp e Agentes de IA em tempo real de forma fluida.
            </p>
            <ul className="auto-features">
              <li><span className="auto-dot"></span> Integração nativa para Micro SaaS e APIs autônomas</li>
              <li><span className="auto-dot"></span> Qualificação inteligente de leads por IA</li>
              <li><span className="auto-dot"></span> Acionamento de respostas por WhatsApp e E-mail</li>
            </ul>
          </div>
          
          <div className="auto-widget reveal reveal-delay-2">
            <div className="widget-header">
              <div className="widget-dots"><span></span><span></span><span></span></div>
              <div className="widget-title">Simulador de Fluxo Neural</div>
            </div>
            <div className="widget-body">
              <p className="widget-instru">Clique no botão abaixo para simular a entrada de um novo lead no seu funil autônomo:</p>
              <button id="simulate-lead-btn" className="btn btn-primary" style={{ display: 'flex', margin: '0 auto 2rem auto', justifyContent: 'center' }}>Simular Entrada de Lead</button>
              
              <div className="flow-nodes">
                <div className="flow-node" id="node-1">
                  <div className="node-icon">🌐</div>
                  <div className="node-text">Site: Captura de Lead</div>
                </div>
                <div className="flow-line"></div>
                <div className="flow-node" id="node-2">
                  <div className="node-icon">🧠</div>
                  <div className="node-text">Agente IA: Triagem e Análise</div>
                </div>
                <div className="flow-line"></div>
                <div className="flow-node" id="node-3">
                  <div className="node-icon">💬</div>
                  <div className="node-text">WhatsApp: Contato Inicial Setup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  ═══ CAPABILITIES TAGS ═══  */}
    <section id="capabilities" aria-label="Capacidades ZACDA">
      <div className="container">
        <div className="capabilities-inner">
          <p className="capabilities-title reveal">
            <strong>Capacidades completas</strong> para o ciclo digital inteiro
          </p>
          <div className="tags-wrap">
            <span className="cap-tag featured reveal reveal-delay-1">Design Metamoderno</span>
            <span className="cap-tag featured reveal reveal-delay-1">Integração de IA</span>
            <span className="cap-tag featured reveal reveal-delay-2">Ecossistemas em Nuvem</span>
            <span className="cap-tag reveal reveal-delay-2">Motion Design</span>
            <span className="cap-tag reveal reveal-delay-2">Identidade Visual</span>
            <span className="cap-tag reveal reveal-delay-3">Desenvolvimento Web</span>
            <span className="cap-tag reveal reveal-delay-3">Estratégia de Marca</span>
            <span className="cap-tag reveal reveal-delay-3">Performance Marketing</span>
            <span className="cap-tag reveal reveal-delay-4">NFT &amp; Digital Assets</span>
            <span className="cap-tag reveal reveal-delay-4">Consultoria Estratégica</span>
          </div>
        </div>
      </div>
    </section>

    {/*  ═══ FORMULÁRIO DE PROPOSTA ═══  */}
    <section id="proposta" aria-labelledby="proposta-heading">
      <div className="container">
        <div className="proposta-wrap">
          <div className="proposta-left">
            <div className="section-tag">Entrada de Propostas</div>
            <h2 id="proposta-heading" className="reveal">
              Defina Sua<br />
              <em>Direção</em>
            </h2>
            <p className="proposta-protocol reveal">Protocolo proprietário · ZACDA Digital</p>
            <p className="proposta-tagline reveal reveal-delay-2">
              Projetos transformadores começam com uma visão clara. Compartilhe a sua
              e nossa equipe estratégica entrará em contato em até 48 horas.
            </p>
            <ul className="proposta-benefits reveal reveal-delay-3" aria-label="Benefícios">
              <li className="benefit-item">
                <span className="benefit-dot" aria-hidden="true"></span>
                Análise estratégica gratuita do seu negócio
              </li>
              <li className="benefit-item">
                <span className="benefit-dot" aria-hidden="true"></span>
                Proposta personalizada em 48 horas
              </li>
              <li className="benefit-item">
                <span className="benefit-dot" aria-hidden="true"></span>
                Confidencialidade total garantida por NDA
              </li>
              <li className="benefit-item">
                <span className="benefit-dot" aria-hidden="true"></span>
                Time dedicado de especialistas sêniores
              </li>
            </ul>
          </div>

          <div>
            {formState === 'success' ? (
              <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', animation: 'fade-in 0.8s ease' }}>
                <h3 style={{ color: '#00ff41', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '1.5rem', fontSize: '1.5rem' }}>Análise IA Concluída ✓</h3>
                <div style={{ textAlign: 'left', background: 'rgba(0,255,65,0.05)', border: '1px solid rgba(0,255,65,0.2)', borderRadius: '12px', padding: '1.5rem' }}>
                  <p style={{ color: 'var(--text-1)', fontSize: '0.9rem', marginBottom: '1rem', fontFamily: "'JetBrains Mono', monospace" }}>
                    &gt; 🧠 Agente IA: Olá, <strong style={{ color: '#00ff41' }}>{leadData.name}</strong>! Triamos sua requisição para o setor de <strong style={{ color: '#00e5ff' }}>{leadData.segment}</strong>.
                  </p>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" }}>
                    "Sua solicitação e Link foram registrados no nosso banco Ciber-Minimalista. Identificamos grande potencial de automação estrutural para o seu negócio e mandamos um WhatsApp VIP para nossa equipe!"
                  </p>
                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed rgba(0,255,65,0.2)', color: 'var(--text-3)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
                    &gt; Gravando Tabela Supabase... [OK]<br/>
                    &gt; Trigger Webhook WhatsApp... [OK]<br/>
                    &gt; Você o receberá no seu aparelho em instantes.
                  </div>
                </div>
              </div>
            ) : (
            <form onSubmit={handleFormSubmit} className="glass-card proposta-form reveal reveal-delay-2" id="proposal-form" noValidate>

              <h3 className="form-heading">Iniciar Proposta Estratégica</h3>
              <p className="form-subheading">Entrada de propostas estratégicas</p>

              <div className="form-group">
                <label className="form-label" htmlFor="entity-name">Nome</label>
                <input
                  type="text"
                  id="entity-name"
                  name="entityName"
                  className="form-input"
                  placeholder="Seu nome ou da organização"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Telefone{' '}
                  <span style={{}} /* TODO: convert inline styles */>OPCIONAL</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="(00) 00000-0000"
                  autoComplete="tel"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="segment">Segmento de Negócio</label>
                <select id="segment" name="segment" className="form-select" required>
                  <option value="" disabled selected>Selecione seu segmento</option>
                  <optgroup label="Saúde &amp; Bem-estar">
                    <option value="saude">Saúde &amp; Medicina</option>
                    <option value="fitness">Fitness &amp; Esportes</option>
                    <option value="estetica">Estética &amp; Beleza</option>
                    <option value="nutricao">Nutrição &amp; Suplementos</option>
                    <option value="psicologia">Psicologia &amp; Terapia</option>
                  </optgroup>
                  <optgroup label="Negócios &amp; Serviços">
                    <option value="tecnologia">Tecnologia &amp; SaaS</option>
                    <option value="financas">Finanças &amp; Investimentos</option>
                    <option value="juridico">Jurídico &amp; Advocacia</option>
                    <option value="consultoria">Consultoria &amp; Gestão</option>
                    <option value="educacao">Educação &amp; Cursos</option>
                    <option value="rh">RH &amp; Recrutamento</option>
                  </optgroup>
                  <optgroup label="Varejo &amp; Produto">
                    <option value="ecommerce">E-commerce &amp; Varejo</option>
                    <option value="moda">Moda &amp; Lifestyle</option>
                    <option value="alimentacao">Alimentação &amp; Gastronomia</option>
                    <option value="automotivo">Automotivo</option>
                    <option value="imobiliario">Imobiliário &amp; Construção</option>
                    <option value="luxo">Luxo &amp; Premium</option>
                  </optgroup>
                  <optgroup label="Criativo &amp; Entretenimento">
                    <option value="agencia">Agência &amp; Marketing</option>
                    <option value="entretenimento">Entretenimento &amp; Mídia</option>
                    <option value="arte">Arte &amp; Design</option>
                    <option value="musica">Música &amp; Áudio</option>
                    <option value="games">Games &amp; Metaverso</option>
                  </optgroup>
                  <option value="outro">Outro segmento</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="digital-link">
                  Link do Site ou Instagram{' '}
                  <span style={{}} /* TODO: convert inline styles */>PARA ANÁLISE DA IA</span>
                </label>
                <input
                  type="text"
                  id="digital-link"
                  name="digital-link"
                  className="form-input"
                  placeholder="ex: zacda.com.br ou @zacda.digital"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="vision">Visão &amp; Objetivo</label>
                <textarea
                  id="vision"
                  name="vision"
                  className="form-textarea"
                  placeholder="Descreva o problema que quer resolver ou o resultado que busca..."
                  required
                  rows={3}
                ></textarea>
              </div>

              <button
                type="submit"
                className="form-submit"
                id="form-submit-btn"
                aria-label="Enviar proposta estratégica"
                disabled={formState === 'loading'}
                style={{ background: formState === 'loading' ? 'transparent' : '', borderColor: formState === 'loading' ? 'var(--cyan)' : '' }}
              >
                {formState === 'loading' ? 'IA Extraindo Dados... ⏳' : 'Enviar Proposta →'}
              </button>

              <p className="form-protocol">Protocolo proprietário • ZACDA Digital 2024</p>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  </main>

  {/*  ═══ AI CHAT WIDGET ═══  */}
  <div id="ai-chat-panel" role="dialog" aria-label="Assistente IA ZACDA" aria-modal="true">
    <div className="chat-header">
      <div className="chat-avatar" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h2a2 2 0 0 1 2 2v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1v-1a2 2 0 0 1 2-2h2V9.5C8.8 8.8 8 7.5 8 6a4 4 0 0 1 4-4z"/>
        </svg>
      </div>
      <div className="chat-header-info">
        <div className="chat-header-name">ZACDA IA</div>
        <div className="chat-status">
          <span className="chat-status-dot"></span>
          Online agora
        </div>
      </div>
      <button className="chat-close" id="chat-close-btn" aria-label="Fechar chat">✕</button>
    </div>

    <div className="chat-messages" id="chat-messages" role="log" aria-live="polite"></div>

    <div className="chat-input-wrap">
      <input
        type="text"
        className="chat-input"
        id="chat-input"
        placeholder="Pergunte sobre UX com IA..."
        maxLength={200}         autoComplete="off"
      />
      <button className="chat-send" id="chat-send-btn" aria-label="Enviar mensagem">
        <svg viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2L2 7l5 3 2 5 5-13z"/>
        </svg>
      </button>
    </div>
  </div>

  <button id="ai-chat-toggle" aria-label="Abrir assistente IA ZACDA" aria-expanded="false">
    <svg className="ai-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h2a2 2 0 0 1 2 2v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1v-1a2 2 0 0 1 2-2h2V9.5C8.8 8.8 8 7.5 8 6a4 4 0 0 1 4-4z"/>
    </svg>
    <span>ZACDA IA</span>
  </button>

  {/*  ═══ WHATSAPP BUTTON ═══  */}
  <a
    id="whatsapp-btn"
    href="https://wa.me/5516993193919?text=Ol%C3%A1%2C+vim+pelo+site+ZACDA+e+gostaria+de+saber+mais+sobre+os+servi%C3%A7os."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Fale conosco pelo WhatsApp"
  >
    <svg className="wa-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.663 4.614 1.812 6.512L4 29l7.695-1.775A12.94 12.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3z" fill="#fff"/>
      <path d="M16 5.5c-5.238 0-9.5 4.262-9.5 9.5 0 2.01.627 3.88 1.697 5.42l-.97 3.54 3.658-.946A9.456 9.456 0 0016 24.5c5.238 0 9.5-4.262 9.5-9.5S21.238 5.5 16 5.5zm4.65 12.887c-.193.543-1.127 1.038-1.537 1.1-.393.059-.89.083-1.437-.09-.33-.106-.755-.247-1.3-.484-2.285-.987-3.778-3.3-3.893-3.452-.115-.152-.938-1.247-.938-2.38 0-1.132.592-1.69.802-1.92.21-.23.458-.287.61-.287.153 0 .306.001.44.007.14.007.33-.053.516.394.193.46.655 1.594.712 1.71.058.115.097.25.019.403-.077.153-.115.248-.23.382-.115.134-.242.3-.345.403-.115.115-.235.24-.1.47.133.23.591.977 1.27 1.582.872.777 1.608 1.017 1.838 1.132.23.115.364.096.498-.058.134-.153.575-.672.728-.902.153-.23.306-.192.516-.115.21.077 1.34.632 1.57.747.23.115.382.172.44.268.057.096.057.556-.136 1.09z" fill="#25D366"/>
    </svg>
    <span className="wa-label">Fale no WhatsApp</span>
  </a>

  {/*  ═══ FOOTER ═══  */}
  <footer id="footer" role="contentinfo">
    <div className="container">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-brand-text">ZACDA</span>
          <span className="footer-brand-tagline">Digital Agency</span>
          <p className="footer-brand-desc">
            Agência digital de elite arquitetando legados digitais para marcas que recusam o ordinário.
          </p>
          <nav className="social-links" aria-label="Redes sociais">
            <a href="#" className="social-link" aria-label="Twitter/X">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Discord">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </nav>
        </div>

        <div>
          <h3 className="footer-col-title">Estúdio</h3>
          <ul className="footer-links">
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Carreiras</a></li>
            <li><a href="#">Processo</a></li>
            <li><a href="#">Casos de Sucesso</a></li>
          </ul>
        </div>

        <div>
          <h3 className="footer-col-title">Serviços</h3>
          <ul className="footer-links">
            <li><a href="#servicos">UX com IA</a></li>
            <li><a href="#servicos">Design Ciber-Minimalista</a></li>
            <li><a href="#servicos">UI Espacial</a></li>
            <li><a href="#servicos">Branding no Metaverso</a></li>
          </ul>
        </div>

        <div>
          <h3 className="footer-col-title">Jurídico</h3>
          <ul className="footer-links">
            <li><a href="privacidade.html">Privacidade</a></li>
            <li><a href="termos.html">Termos</a></li>
            <li><a href="cookies.html">Cookies</a></li>
            <li><a href="nda.html">NDA</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2024 ZACDA DIGITAL SYSTEMS. TODOS OS DIREITOS RESERVADOS.</p>
        <span className="footer-badge">Protocolo Proprietário</span>
      </div>
    </div>
  </footer>

  {/*  ═══════════════════════════════════════════════
       JAVASCRIPT VIBE CODE (Dinâmicos)
  ═══════════════════════════════════════════════  */}
  <Script src="/main.js" strategy="lazyOnload" />

    </main>
  );
}
