import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | ZACDA Tech',
  description: 'Política de Privacidade da ZACDA Digital Agency.',
}

export default function Privacidade() {
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
            Política de Privacidade
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}>
            Última atualização: março de 2025
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '40px' }}>
          {[
            {
              title: '1. Informações que coletamos',
              body: 'Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail, telefone e dados da empresa ao preencher nossos formulários de contato ou de proposta estratégica. Também podemos coletar automaticamente dados de navegação, endereço IP e informações de dispositivo por meio de tecnologias como cookies.',
            },
            {
              title: '2. Como utilizamos suas informações',
              body: 'Utilizamos suas informações para: (a) fornecer, operar e melhorar nossos serviços; (b) responder às suas solicitações e enviar comunicações relacionadas ao serviço; (c) enviar materiais de marketing com sua autorização; (d) cumprir obrigações legais e proteger nossos direitos.',
            },
            {
              title: '3. Compartilhamento de dados',
              body: 'Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados com prestadores de serviços que nos auxiliam na operação do negócio (como processadores de pagamento e provedores de e-mail), sempre sob contratos de confidencialidade.',
            },
            {
              title: '4. Armazenamento e segurança',
              body: 'Seus dados são armazenados em servidores seguros e protegidos por criptografia em trânsito e em repouso. Adotamos medidas técnicas e organizacionais para evitar acesso não autorizado, perda ou destruição de dados.',
            },
            {
              title: '5. Seus direitos (LGPD)',
              body: 'Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a: confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou inexatos, solicitar a exclusão de dados desnecessários, revogar consentimento e obter portabilidade. Para exercer qualquer desses direitos, entre em contato pelo e-mail atendimento@zacda.com.br.',
            },
            {
              title: '6. Cookies',
              body: 'Utilizamos cookies para melhorar a experiência de navegação. Consulte nossa Política de Cookies para mais detalhes sobre os tipos de cookies utilizados e como gerenciá-los.',
            },
            {
              title: '7. Retenção de dados',
              body: 'Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Após esse período, os dados são anonimizados ou excluídos com segurança.',
            },
            {
              title: '8. Alterações nesta política',
              body: 'Podemos atualizar esta Política de Privacidade periodicamente. A data da última atualização está indicada no topo desta página. Recomendamos que você revise esta política regularmente.',
            },
            {
              title: '9. Contato',
              body: 'Em caso de dúvidas sobre esta política ou sobre o tratamento dos seus dados, entre em contato: atendimento@zacda.com.br',
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
