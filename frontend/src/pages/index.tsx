import type { NextPageWithLayout } from 'next';
import LoginBox from '@/components/Index/LoginBox';
import { Button, Container } from '@mui/material';
import { useCookies } from 'react-cookie';

import axios from 'axios';
import { apiClient } from '@/lib/apiClient';

const Home: NextPageWithLayout = () => {
  const login = () => {
    apiClient.login.$post({
      body: {
        username: 'root',
        password: 'hogehoge',
      },
    });
  };

  const ping = async () => {
    const res = await apiClient.ping.$get();
    console.log(res);
  };
  const upd = async () => {
    const res = await apiClient.user.$patch({body:{}});
    console.log(res);
  };
  // const fetch_csrf = async () => {
  //   const res = await apiClient.get('csrf/');
  //   return res['data']['csrfToken'];
  // };
  //
  // const update = async () => {
  //   const csrf = await fetch_csrf();
  //   console.log("cs",csrf);
  //   const res = await apiClient.patch('user/', {},
  //     {
  //       withCredentials: true,
  //       headers: {
  //         'X-CSRFToken': csrf,
  //       },
  //     },
  //   );
  //   console.log(res);
  // };
  // const login = async () => {
  //   const res = await apiClient.post('login/', {
  //       username: 'root',
  //       password: 'hogehoge',
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json; charset=utf-8',
  //       },
  //       withCredentials: true,
  //     });
  //   console.log(res);
  //
  //   update();
  //
  // };
  // login();
  return (
    <div>
      <div>spam</div>
      <Button onClick={login}>login</Button>
      <Button onClick={ping}>ping</Button>
      <Button onClick={upd}>patch</Button>
    </div>
  );
};

export default Home;
