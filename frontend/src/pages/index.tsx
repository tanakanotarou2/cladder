import type { NextPageWithLayout } from 'next';
import LoginBox from '@/components/Index/LoginBox';
import { Container } from '@mui/material';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <LoginBox />
    </div>
  );
};

export default Home;
