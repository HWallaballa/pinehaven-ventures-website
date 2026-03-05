import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js middleware that:
 * 1. Refreshes the Supabase session on every request (prevents stale cookies)
 * 2. Protects authenticated routes (/account/*, /ventures/:slug/app/*) by redirecting to login
 * 3. Passes through all other routes (marketing pages, demos, API routes)
 */
export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANT: Refresh the session to prevent stale cookies
  // This ensures auth state is always up-to-date
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if the request is for a protected route
  const { pathname } = request.nextUrl;
  const isProtectedRoute =
    pathname.startsWith('/account') ||
    pathname.match(/^\/ventures\/[^/]+\/app/);

  // Redirect to login if trying to access protected route while unauthenticated
  if (isProtectedRoute && !user) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

/**
 * Configure which routes this middleware should run on
 * We exclude static files, images, and Next.js internals
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - files with extensions (e.g., .svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*$).*)',
  ],
};
