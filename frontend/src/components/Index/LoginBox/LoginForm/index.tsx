import { Button, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useState } from 'react';
import FieldErrorMessages from '@/components/shared/FieldErrorMessages';
import { useAtom } from 'jotai';
import { currentUserAtom, messageAtom } from '@/lib/jotaiAtom';
import { login } from '@/lib/apiClient';
import { preprocessApiError, reformatToHookFormStyle } from '@/lib/apiErrorHandle';
import { AxiosError } from 'axios';
import FormErrorMessages from '@/components/shared/FormErrorMessages';
import { LoginRequest } from '@/api/@types';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [, addMessage] = useAtom(messageAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [nonFieldErrors, setNonFieldErrors] = useState<string[] | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();

  const mutation = useMutation(login, {
    onSuccess: (res) => {
      setCurrentUser(res.user);
      addMessage({ text: `ごきげんよう、${res.user.username} さん`, 'variant': 'success' });
      router.push('/home');
    },
    onError: (error: AxiosError) => {
      const formMsg = preprocessApiError(error);
      if (!!formMsg) {
        const msgs = reformatToHookFormStyle(formMsg);
        for (const [key, value] of Object.entries(msgs)) {
          // @ts-ignore
          setError(key, value);
        }
        setNonFieldErrors(formMsg.nonFieldErrors);
      } else {
        addMessage({ text: '予期せぬエラーが発生しました。', 'variant': 'error' });
      }
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (data: LoginRequest) => {
    setLoading(true);
    setNonFieldErrors(null);
    mutation.mutate(data);
  };
  return (
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

        <FormErrorMessages errors={nonFieldErrors} />
        <Button
          type='submit'
          variant='contained'
          disabled={loading}
        >Login</Button>
      </Stack>
    </form>
  );
};
export default LoginForm;
