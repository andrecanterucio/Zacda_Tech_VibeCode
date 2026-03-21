import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | ZACDA Tech',
  description: 'Política de Cookies da ZACDA Digital Agency.',
}

export default function Cookies() {
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
            Política de Cookies
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}>
            Última atualização: março de 2025
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '40px' }}>
          {[
            {
              title: '1. O que são cookies',
              body: 'Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles permitem que o site reconheça seu dispositivo em visitas futuras, melhore sua experiência e forneça funcionalidades personalizadas.',
            },
            {
              title: '2. Cookies que utilizamos',
              body: 'Cookies essenciais: necessários para o funcionamento básico do site, como manutenção de sessão e segurança. Não podem ser desativados. Cookies analíticos: usados para entender como os visitantes interagem com o site (páginas visitadas, tempo de permanência, erros). Cookies funcionais: permitem que o site lembre suas preferências, como idioma e configurações.',
            },
            {
              title: '3. Cookies de terceiros',
              body: 'Podemos utilizar serviços de terceiros que definem seus próprios cookies, como: ferramentas de análise (Google Analytics ou similar); processadores de pagamento (Stripe); plataformas de comunicação. Esses cookies são regidos pelas políticas de privacidade de cada respectivo terceiro.',
            },
            {
              title: '4. Como gerenciar cookies',
              body: 'Você pode controlar e/ou excluir cookies através das configurações do seu navegador. A maioria dos navegadores permite bloquear ou excluir cookies automaticamente. Note que desabilitar cookies essenciais pode afetar o funcionamento do site. Para instruções, consulte a central de ajuda do seu navegador.',
            },
            {
              title: '5. Duração dos cookies',
              body: 'Cookies de sessão: expiram quando você fecha o navegador. Cookies persistentes: permanecem no dispositivo por um período definido (geralmente de 30 dias a 2 anos) ou até que sejam excluídos manualmente.',
            },
            {
              title: '6. Consentimento',
              body: 'Ao continuar navegando em nosso site sem alterar as configurações de cookies, você concorda com o uso de cookies conforme descrito nesta política. Você pode revogar seu consentimento a qualquer momento através das configurações do navegador.',
            },
            {
              title: '7. Atualizações',
              body: 'Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças em nossas práticas ou por razões operacionais, legais ou regulatórias.',
            },
            {
              title: '8. Contato',
              body: 'Para dúvidas sobre o uso de cookies: atendimento@zacda.com.br',
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
