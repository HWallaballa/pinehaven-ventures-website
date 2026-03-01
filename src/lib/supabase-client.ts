import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

/**
 * Browser-side Supabase client (for use in Client Components).
 * Singleton pattern — reuses the same client instance.
 */
let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createSupabaseBrowser() {
  if (client) return client;

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return client;
}
