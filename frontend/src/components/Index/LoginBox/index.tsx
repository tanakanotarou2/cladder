import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { apiClient } from '@/lib/apiClient';
import { Controller, useForm } from 'react-hook-form';

import { useMutation } from 'react-query';
import { useState } from 'react';
// import { TokenObtainPairRequest } from '../../../api/@types';
import { AxiosError } from 'axios';
import FieldErrorMessages from '@/components/shared/FieldErrorMessages';
import { useAtom } from 'jotai';
import { messageAtom, authTokenAtom } from '@/lib/jotaiAtom';

const LoginBox = () => {
  const [loading, setLoading] = useState(false);
  const [, addMessage] = useAtom(messageAtom);
  const [authToken, setAuthToken] = useAtom(authTokenAtom);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<TokenObtainPairRequest>();

  // function postLogin(body: TokenObtainPairRequest) {
  //   return apiClient.auth.token.$post({ body });
  // }

  const mutation = useMutation(postLogin, {
    // onSuccess: (res) => {
    //   // TODO: ログイン後ページへ遷移
    //   console.log(authToken);
    //   console.log(res.access);
    //   setAuthToken(res.access);
    //   addMessage({ text: 'ごきげんよう', 'variant': 'success' });
    // },
    // onError: (error: AxiosError) => {
    //   console.log('err', error);
    //   addMessage({ text: '不明なエラー', 'variant': 'error' });
    //   // const err: any = apiErrorHandler.putError(error);
    //   // if (err instanceof SingleErrorMessage) {
    //   //   addMessage({ text: err.message, 'variant': 'warning' });
    //   // } else if (err instanceof FormErrors) {
    //   //   setFormErrors(setError, err.errors);
    //   // } else {
    //   //   console.log('err', error);
    //   //   addMessage({ text: '不明なエラー', 'variant': 'error' });
    //   // }
    // },
    // onSettled: () => {
    //   setLoading(false);
    // },

  });

  const onSubmit = (data: TokenObtainPairRequest) => {
    // setLoading(true);
    // mutation.mutate(data);
  };
  return (
    <Container maxWidth='sm'>
      <Paper>
        <Box sx={{ p: 3 }}>
          <Typography component='h2' variant='h5' sx={{ mb: 2, textAlign: 'center' }}>ログイン</Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name='username'
                control={control}
                defaultValue=''
                rules={{ required: '入力してください' }}

                render={({ field }) =>
                  <TextField {...field}
                             label='ユーザー名'
                             required
                             InputLabelProps={{
                               shrink: true,
                             }}
                             error={!!errors.username}
                             helperText={errors.username?.message}
                  />}
              />
              <FieldErrorMessages name='username' errors={errors} />

              <Controller
                name='password'
                control={control}
                rules={{ required: '入力してください' }}
                defaultValue=''
                render={({ field }) =>
                  <TextField {...field}
                             label='パスワード'
                             required
                             type='password'
                             variant='filled'
                             InputLabelProps={{
                               shrink: true,
                             }}
                             error={!!errors.password}
                             helperText={errors.password?.message}
                  />
                }
              />
              <FieldErrorMessages name='password' errors={errors} />

              <Button
                type='submit'
                variant='contained'
                disabled={loading}
              >Login</Button>
            </Stack>
          </form>

        </Box>
      </Paper>
    </Container>
  );
};
export default LoginBox;
