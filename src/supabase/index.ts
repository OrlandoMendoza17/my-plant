
import { createClient } from '@supabase/supabase-js'

const SUPABASE_API_URL = process.env.SUPABASE_API_URL || ""
const SUPABASE_KEY = process.env.SUPABASE_KEY || ""

// console.log('SUPABASE_API_URL', SUPABASE_API_URL)
// console.log('SUPABASE_KEY', SUPABASE_KEY)

const supabase = createClient(SUPABASE_API_URL, SUPABASE_KEY)

export default supabase;