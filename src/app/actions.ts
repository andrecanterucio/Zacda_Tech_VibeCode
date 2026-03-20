'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitLead(formData: FormData) {
  const supabase = await createClient()

  // Mapeia os name="" dos inputs
  const data = {
    name: formData.get('name')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    message: formData.get('message')?.toString() || '',
  }

  if (!data.name || !data.email) {
    return { error: 'O nome e e-mail são obrigatórios.' }
  }

  const { error } = await supabase.from('leads').insert([data])

  if (error) {
    console.error('Erro ao salvar lead:', error)
    return { error: 'Ocorreu um erro ao enviar sua proposta. Tente novamente.' }
  }

  revalidatePath('/')
  return { success: true }
}
