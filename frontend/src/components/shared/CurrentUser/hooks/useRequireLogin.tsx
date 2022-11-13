import { useRouter } from 'next/router';
import { useCurrentUser } from './useCurrentUser';
import { useEffect } from 'react';

export function useRequireLogin() {
  const { currentUser, isAuthChecking } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecking) return; // まだ確認中

    if (!currentUser) router.push('/'); // 未ログインだったのでリダイレクト
  }, [isAuthChecking, currentUser]);
}