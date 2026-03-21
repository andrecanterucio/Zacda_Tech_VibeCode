import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const report: Record<string, string> = {}

  // ── 1. Verifica variáveis de ambiente ─────────────────────────────────────
  report.EVOLUTION_API_URL      = process.env.EVOLUTION_API_URL      ? '✅ SET' : '❌ MISSING'
  report.EVOLUTION_API_KEY      = process.env.EVOLUTION_API_KEY      ? '✅ SET' : '❌ MISSING'
  report.ANTHROPIC_API_KEY      = process.env.ANTHROPIC_API_KEY      ? '✅ SET' : '❌ MISSING'
  report.NEXT_PUBLIC_SUPABASE_URL       = process.env.NEXT_PUBLIC_SUPABASE_URL       ? '✅ SET' : '❌ MISSING'
  report.NEXT_PUBLIC_SUPABASE_ANON_KEY  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY  ? '✅ SET' : '❌ MISSING'

  // ── 2. Testa conexão com Supabase ─────────────────────────────────────────
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('leads').select('id').limit(1)
    report.supabase_connection = error ? `❌ ERRO: ${error.message}` : '✅ CONECTADO'
  } catch (e: unknown) {
    report.supabase_connection = `❌ EXCEÇÃO: ${e instanceof Error ? e.message : String(e)}`
  }

  // ── 3. Testa conexão com Evolution API ────────────────────────────────────
  const evoUrl = process.env.EVOLUTION_API_URL
  const evoToken = process.env.EVOLUTION_API_KEY
  if (evoUrl && evoToken) {
    try {
      const controller = new AbortController()
      setTimeout(() => controller.abort(), 5000)
      const res = await fetch(`${evoUrl}/instance/fetchInstances`, {
        headers: { 'apikey': evoToken },
        signal: controller.signal,
      })
      if (res.ok) {
        const data = await res.json().catch(() => [])
        const instances = Array.isArray(data) ? data.map((i: { instance?: { instanceName?: string } }) => i.instance?.instanceName).join(', ') : 'N/A'
        report.evolution_api = `✅ CONECTADO | Instâncias: ${instances || 'nenhuma'}`
      } else {
        report.evolution_api = `❌ STATUS ${res.status}: ${await res.text().catch(() => '')}`
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      report.evolution_api = msg.includes('abort') ? '❌ TIMEOUT (servidor inacessível do Vercel)' : `❌ ERRO: ${msg}`
    }
  } else {
    report.evolution_api = '❌ Credenciais ausentes'
  }

  // ── 4. Resumo ─────────────────────────────────────────────────────────────
  const hasErrors = Object.values(report).some(v => v.startsWith('❌'))
  report._status = hasErrors ? '⚠️ PROBLEMAS ENCONTRADOS' : '🎉 TUDO OK'
  report._webhook_url = `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/whatsapp`
  report._instrucao = 'Configure o webhook da Evolution API para o endereço acima em: Settings → Webhook → URL'

  return NextResponse.json(report, { status: hasErrors ? 207 : 200 })
}
