import type { NextPageWithLayout } from 'next';
import { Typography } from '@mui/material';
import LoginBox from '@/components/Index/LoginBox';

const Home: NextPageWithLayout = () => {
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

export default Home;
