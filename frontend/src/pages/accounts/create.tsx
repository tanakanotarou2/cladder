import type { NextPageWithLayout } from 'next';
import { useRequireLogin } from '@/components/shared/CurrentUser/hooks/useRequireLogin';
import { useCurrentUser } from '@/components/shared/CurrentUser/hooks/useCurrentUser';
import CreateAccountContainer from '@/components/accounts';

const Home: NextPageWithLayout = () => {
  const { isAuthChecking } = useCurrentUser();
  useRequireLogin();

  return (
    <div>
      <CreateAccountContainer />
    </div>
  );
};

export default Home;
