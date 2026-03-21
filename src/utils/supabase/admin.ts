import { createClient } from '@supabase/supabase-js'

// Admin client uses the service_role key — bypasses RLS.
// NEVER expose this on the client side. Only use in Server Actions / API Routes.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!serviceKey) {
    throw new Error('[Supabase] SUPABASE_SERVICE_ROLE_KEY não configurado nas env vars.')
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
