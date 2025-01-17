import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useAuth(requireAuth = true) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    if (!loading && requireAuth && !session) {
      router.push('/auth/signin');
    }
  }, [loading, requireAuth, session, router]);

  return { session, loading };
}