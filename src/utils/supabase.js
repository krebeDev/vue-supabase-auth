import { createClient } from '@supabase/supabase-js'

const dbUrl = import.meta.env.VITE_DB_URL
const dbKey = import.meta.env.VITE_DB_KEY

export const supabase = createClient(dbUrl, dbKey)
