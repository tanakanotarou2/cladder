import type { NextPageWithLayout } from 'next';
import { Button } from '@mui/material';
import { apiClient, login, logout, refreshToken } from '@/lib/apiClient';

const Home: NextPageWithLayout = () => {
  const _login = async () => {
    const res = await login('root', 'hogehoge');
    console.log(res);
  };

  const _logout = async () => {
    const res = await logout();
    console.log(res);
  };
  const ping = async () => {
    const res = await apiClient.auth.ping.$get();
    console.log(res);
  };
  const csrf = async () => {
    const res = await apiClient.auth.csrf.$get();
    console.log(res);
  };
  const refresh = async () => {
    const res = await refreshToken();
    console.log(res);
  };
  return (
    <div>
      <Button onClick={_login}>login</Button>
      <Button onClick={_logout}>logout</Button>
      <Button onClick={refresh}>refresh</Button>
      <Button onClick={ping}>ping</Button>
      <Button onClick={csrf}>csrf</Button>
    </div>
  );
};

export default Home;
