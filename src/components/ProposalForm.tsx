"use client";

import React, { useState } from 'react';

export default function ProposalForm() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [leadData, setLeadData] = useState({ name: '', segment: '', digitalLink: '' });
  const [linkValue, setLinkValue] = useState('');

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('loading');
    const formData = new FormData(e.currentTarget);
    const segSelect = e.currentTarget.elements.namedItem('segment') as HTMLSelectElement;

    try {
      const payload = {
        name:         formData.get('entityName')?.toString().trim()    || '',
        email:        formData.get('email')?.toString().trim()          || '',
        phone:        formData.get('phone')?.toString().trim()          || '',
        segment:      formData.get('segment')?.toString().trim()        || '',
        segmentLabel: segSelect?.options[segSelect.selectedIndex]?.text || '',
        digitalLink:  formData.get('digital-link')?.toString().trim()   || '',
        vision:       formData.get('vision')?.toString().trim()         || '',
      };

      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setLeadData({
          name:        payload.name,
          segment:     payload.segmentLabel,
          digitalLink: data.digitalLink || '',
        });
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  }

  return (
    <>
      {formState === 'success' ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', animation: 'fade-in 0.8s ease' }}>
          <h3 style={{ color: '#00ff41', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '1.5rem', fontSize: '1.5rem' }}>Requisição Recebida ✓</h3>
          <div style={{ textAlign: 'left', background: 'rgba(0,255,65,0.05)', border: '1px solid rgba(0,255,65,0.2)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: 'var(--text-1)', fontSize: '0.9rem', marginBottom: '1rem', fontFamily: "'JetBrains Mono', monospace" }}>
              &gt; 🧠 Agente IA: Olá, <strong style={{ color: '#00ff41' }}>{leadData.name}</strong>! Triamos sua requisição para o setor de <strong style={{ color: '#00e5ff' }}>{leadData.segment}</strong>.
            </p>
            {leadData.digitalLink && (
              <div style={{ marginBottom: '1rem', padding: '10px 14px', background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
                <span style={{ color: '#00e5ff' }}>&gt; 🔍 Link sob análise: </span>
                <strong style={{ color: '#fff' }}>{leadData.digitalLink}</strong>
                <span style={{ display: 'block', color: '#666', fontSize: '0.75rem', marginTop: '4px' }}>Nossa IA irá inspecionar e preparar um diagnóstico personalizado.</span>
              </div>
            )}
            <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" }}>
              "Sua solicitação foi registrada. Identificamos grande potencial para o seu negócio — nossa equipe entrará em contato em breve!"
            </p>
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed rgba(0,255,65,0.2)', color: 'var(--text-3)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
              &gt; Gravando Supabase... [OK]<br/>
              &gt; E-mail para atendimento... [OK]<br/>
              &gt; Notificação WhatsApp... [OK]
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
            <span>OPCIONAL</span>
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
            <span>PARA ANÁLISE DA IA</span>
          </label>
          <input
            type="text"
            id="digital-link"
            name="digital-link"
            className="form-input"
            placeholder="ex: zacda.com.br ou @zacda.digital"
            required
            onChange={(e) => setLinkValue(e.target.value.trim())}
          />
          {linkValue && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '8px',
              padding: '6px 12px',
              background: 'rgba(0,229,255,0.06)',
              border: '1px solid rgba(0,229,255,0.2)',
              borderRadius: '6px',
              fontSize: '0.75rem',
              color: '#00e5ff',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span style={{ animation: 'pulse 1.5s infinite', display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#00e5ff', flexShrink: 0 }}></span>
              Sob análise · IA ZACDA irá inspecionar este link
            </div>
          )}
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
    </>
  );
}
