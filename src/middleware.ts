import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase-middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Match the CTL app routes that need auth
    '/ventures/crypto-transaction-log/app/:path*',
  ],
};
