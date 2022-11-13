import type { NextPageWithLayout } from 'next';
import LoginBox from '@/components/Index/LoginBox';
import { useCurrentUser } from '@/components/shared/CurrentUser/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index: NextPageWithLayout = () => {
  const { currentUser, isAuthChecking } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecking) return;
    if (!!currentUser) router.push('/home');
  }, [isAuthChecking, currentUser]);

  return (
    <div>
      <div>
      </div>
      <div>
        <LoginBox />
      </div>
    </div>
  );
};

export default Index;
