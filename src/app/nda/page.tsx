import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acordo de Confidencialidade (NDA) | ZACDA Tech',
  description: 'Acordo de Não Divulgação e Confidencialidade da ZACDA Digital Agency.',
}

export default function NDA() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#060a12',
      color: '#ffffff',
      fontFamily: 'var(--font-archivo, Arial, sans-serif)',
      padding: '0 1rem',
    }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '80px 0 120px' }}>

        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: '#00e5ff', textDecoration: 'none', fontSize: '0.85rem',
          letterSpacing: '0.08em', marginBottom: '48px',
          fontFamily: 'var(--font-jetbrains-mono, monospace)',
        }}>
          ← Voltar ao início
        </a>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: '#00e5ff', fontSize: '0.75rem', letterSpacing: '0.15em', fontFamily: 'var(--font-jetbrains-mono, monospace)', marginBottom: '12px' }}>
            ZACDA DIGITAL AGENCY · JURÍDICO
          </p>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '16px' }}>
            Acordo de Confidencialidade
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}>
            NDA · Última atualização: março de 2025
          </p>
        </div>

        <div style={{
          background: 'rgba(0,229,255,0.04)',
          border: '1px solid rgba(0,229,255,0.15)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '40px',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7,
        }}>
          Este documento representa o compromisso mútuo de confidencialidade entre a <strong style={{ color: '#fff' }}>ZACDA Digital Agency</strong> e seus clientes, parceiros e colaboradores. Ao contratar nossos serviços ou iniciar qualquer relacionamento comercial, ambas as partes concordam com os termos abaixo.
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '40px' }}>
          {[
            {
              title: '1. Definição de informações confidenciais',
              body: 'Consideram-se "Informações Confidenciais" todos os dados, documentos, estratégias, códigos-fonte, projetos, planilhas, protótipos, identidades visuais, planos de negócio, dados de clientes, metodologias proprietárias e qualquer outra informação técnica, comercial ou operacional trocada entre as partes, independentemente do meio ou formato.',
            },
            {
              title: '2. Obrigações de confidencialidade',
              body: 'Ambas as partes comprometem-se a: (a) manter as Informações Confidenciais em sigilo estrito; (b) não revelar, divulgar ou transferir tais informações a terceiros sem autorização prévia e por escrito da outra parte; (c) utilizar as informações exclusivamente para os fins do relacionamento comercial estabelecido; (d) adotar medidas de segurança razoáveis para proteger as informações.',
            },
            {
              title: '3. Exceções',
              body: 'As obrigações de confidencialidade não se aplicam a informações que: (a) sejam ou se tornem públicas sem violação deste acordo; (b) já eram conhecidas pela parte receptora antes da divulgação; (c) sejam desenvolvidas independentemente pela parte receptora; (d) sejam divulgadas por exigência legal ou ordem judicial, desde que a outra parte seja notificada previamente.',
            },
            {
              title: '4. Propriedade intelectual',
              body: 'Todas as criações, desenvolvimentos e inovações produzidos pela ZACDA no âmbito dos serviços contratados são de propriedade exclusiva da ZACDA até a quitação integral do contrato. Após pagamento completo, os direitos patrimoniais são licenciados ao cliente conforme escopo contratado. Metodologias, frameworks e ferramentas proprietárias da ZACDA permanecem de sua titularidade.',
            },
            {
              title: '5. Período de vigência',
              body: 'As obrigações de confidencialidade permanecem em vigor durante todo o período do relacionamento comercial e por um prazo adicional de 3 (três) anos após o encerramento do contrato ou projeto, independentemente do motivo da rescisão.',
            },
            {
              title: '6. Não-aliciamento',
              body: 'Durante a vigência do relacionamento e por 12 meses após seu término, o cliente compromete-se a não contratar, aliciar ou estabelecer relação de trabalho direta com colaboradores, freelancers ou subcontratados da ZACDA que tenham participado do projeto.',
            },
            {
              title: '7. Penalidades',
              body: 'A violação de qualquer cláusula deste acordo sujeita a parte infratora ao pagamento de indenização por perdas e danos, incluindo danos emergentes, lucros cessantes e danos à reputação, além de medidas liminares e cautelares cabíveis.',
            },
            {
              title: '8. Disposições gerais',
              body: 'Este acordo é regido pela legislação brasileira, em especial pela Lei nº 9.610/98 (Direitos Autorais), Lei nº 9.456/97, Código Civil Brasileiro e Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Fica eleito o foro da Comarca de São Paulo/SP.',
            },
            {
              title: '9. Contato e formalização',
              body: 'Para formalizar um NDA específico para seu projeto ou para dúvidas: atendimento@zacda.com.br',
            },
          ].map((section) => (
            <section key={section.title} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#00e5ff', marginBottom: '12px' }}>
                {section.title}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                {section.body}
              </p>
            </section>
          ))}
        </div>

      </div>
    </main>
  )
}
