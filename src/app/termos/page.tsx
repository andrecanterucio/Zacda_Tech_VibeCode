import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso | ZACDA Tech',
  description: 'Termos de Uso e Condições Gerais de Serviço da ZACDA Digital Agency.',
}

export default function Termos() {
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
            Termos de Uso
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}>
            Última atualização: março de 2025
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '40px' }}>
          {[
            {
              title: '1. Aceitação dos termos',
              body: 'Ao acessar e utilizar os serviços da ZACDA Digital Agency ("ZACDA", "nós"), você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nossos serviços.',
            },
            {
              title: '2. Descrição dos serviços',
              body: 'A ZACDA oferece serviços de desenvolvimento web, design digital, automação com inteligência artificial, criação de Micro SaaS e consultoria estratégica digital. Os detalhes específicos de cada projeto são definidos em proposta comercial e/ou contrato assinado entre as partes.',
            },
            {
              title: '3. Propriedade intelectual',
              body: 'Todo o conteúdo produzido pela ZACDA — incluindo layouts, códigos, textos, identidades visuais e automações — permanece propriedade da ZACDA até a quitação integral do contrato. Após pagamento completo, os direitos de uso são transferidos ao cliente conforme especificado no contrato.',
            },
            {
              title: '4. Responsabilidades do cliente',
              body: 'O cliente é responsável por fornecer informações precisas e atualizadas necessárias para a execução dos serviços; cumprir os prazos de aprovação e feedback acordados; realizar os pagamentos nos vencimentos estabelecidos; e utilizar as entregas dentro das finalidades licenciadas.',
            },
            {
              title: '5. Pagamentos e reembolsos',
              body: 'Os valores de setup (implementação) são devidos no início do projeto e não são reembolsáveis após o início da execução. Mensalidades de manutenção são cobradas conforme o plano contratado. O inadimplemento por mais de 15 dias consecutivos pode resultar na suspensão dos serviços.',
            },
            {
              title: '6. Limitação de responsabilidade',
              body: 'A ZACDA não se responsabiliza por perdas indiretas, lucros cessantes ou danos consequentes decorrentes do uso ou incapacidade de uso de nossos serviços. Nossa responsabilidade total está limitada ao valor pago pelo cliente nos últimos 3 meses de serviço.',
            },
            {
              title: '7. Confidencialidade',
              body: 'Ambas as partes comprometem-se a manter em sigilo todas as informações confidenciais trocadas durante a prestação dos serviços. Consulte nosso documento de NDA para os termos completos de confidencialidade.',
            },
            {
              title: '8. Rescisão',
              body: 'Qualquer das partes pode rescindir o contrato com aviso prévio de 30 dias por escrito. Em caso de rescisão por parte do cliente, os valores de setup já pagos não serão devolvidos. Em caso de rescisão por parte da ZACDA sem justa causa, os valores proporcionais não executados serão devolvidos.',
            },
            {
              title: '9. Legislação aplicável',
              body: 'Estes termos são regidos pela legislação brasileira. As partes elegem o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias oriundas deste contrato.',
            },
            {
              title: '10. Contato',
              body: 'Para questões relacionadas a estes termos: atendimento@zacda.com.br',
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
