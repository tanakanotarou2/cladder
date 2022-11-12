import type { NextPageWithLayout } from 'next';
import { useRequireLogin } from '@/components/shared/CurrentUser/hooks/useRequireLogin';
import { useCurrentUser } from '@/components/shared/CurrentUser/hooks/useCurrentUser';

const Home: NextPageWithLayout = () => {
  const { isAuthChecking } = useCurrentUser();
  useRequireLogin();

  return (
    <div>
      <div>
        home page
      </div>
    </div>
  );
};

export default Home;
