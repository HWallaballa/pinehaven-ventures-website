import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const returnTo = requestUrl.searchParams.get('returnTo') || '/';
  const type = requestUrl.searchParams.get('type');

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // Redirect to login with error
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=${encodeURIComponent(error.message)}`
      );
    }

    // Handle password recovery redirect
    if (type === 'recovery') {
      return NextResponse.redirect(`${requestUrl.origin}/auth/reset-password`);
    }

    // Successful authentication - redirect to returnTo destination
    return NextResponse.redirect(`${requestUrl.origin}${returnTo}`);
  }

  // If no code is present, redirect to login
  return NextResponse.redirect(`${requestUrl.origin}/auth/login`);
}
