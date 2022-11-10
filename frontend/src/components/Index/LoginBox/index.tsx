import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { useMutation } from 'react-query';
import { useState } from 'react';
import { LoginRequest } from '../../../api/@types';
import FieldErrorMessages from '@/components/shared/FieldErrorMessages';
import { useAtom } from 'jotai';
import { currentUserAtom, messageAtom } from '@/lib/jotaiAtom';
import { login } from '@/lib/apiClient';

const LoginBox = () => {
  const [loading, setLoading] = useState(false);
  const [, addMessage] = useAtom(messageAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();

  const mutation = useMutation(login, {
    onSuccess: (res) => {
      // TODO: ログイン後ページへ遷移
      setCurrentUser(res.user);
      addMessage({ text: `ごきげんよう、${res.user.username} さん`, 'variant': 'success' });
    },
    onError: (error) => {
      console.log('err', error);
      // TODO: エラーメッセージをセット
      addMessage({ text: '不明なエラー', 'variant': 'error' });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (data: LoginRequest) => {
    setLoading(true);
    mutation.mutate(data);
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
