import { createSupabaseServer } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import AppShell from './_components/AppShell';

export const metadata = {
  title: 'Crypto Transaction Log — Dashboard',
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/ventures/crypto-transaction-log/login');
  }

  // Fetch profile for tier info
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <AppShell
      user={{
        id: user.id,
        email: user.email || '',
        name: profile?.display_name || user.email?.split('@')[0] || 'User',
        tier: (profile?.tier as 'free' | 'premium') || 'free',
      }}
    >
      {children}
    </AppShell>
  );
}
