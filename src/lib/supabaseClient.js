// supabaseClient.js — Supabase singleton
//
// WHY a singleton? Creating a new Supabase client on every import would
// open multiple connections. By exporting one shared instance from this
// file, every part of the app reuses the same connection.
//
// ALWAYS import supabase from this file — never create a new client elsewhere.
//
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY come from:
//   - Local dev: .env file (gitignored)
//   - GitHub Actions: repo secrets → passed via env: in deploy.yml
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
