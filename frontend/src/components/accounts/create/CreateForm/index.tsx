import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FieldErrorMessages from '@/components/shared/FieldErrorMessages';
import { useAtom } from 'jotai';
import { messageAtom } from '@/lib/jotaiAtom';
import FormErrorMessages from '@/components/shared/FormErrorMessages';
import { RegisterUserRequest } from '@/api/@types';
import { preprocessApiError, reformatToHookFormStyle } from '@/lib/apiErrorHandle';
import { useMutation } from 'react-query';
import { apiClient } from '@/lib/apiClient';
import { AxiosError } from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

/*
 * ランダムなパスワードを作成
 * 参考: https://qiita.com/fukasawah/items/db7f0405564bdc37820e
 */
const generatePassword = (): string => {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const N = 8;
  return Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
};

const CreateForm = () => {
  const [loading, setLoading] = useState(false);
  const [registeredUserAuthInfo, setRegisteredUserAuthInfo] = useState<string | null>(null);
  const [enabledRandomPassword, setEnabledRandomPassword] = useState(false);
  const [, addMessage] = useAtom(messageAtom);
  const [nonFieldErrors, setNonFieldErrors] = useState<string[] | null>(null);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<RegisterUserRequest>();

  const postRegister = (body: RegisterUserRequest) => {
    return apiClient.auth.register.$post({ body });
  };

  const mutation = useMutation(postRegister, {
    onSuccess: (res, variables) => {
      if (enabledRandomPassword) {
        setRegisteredUserAuthInfo(
          `ユーザー名: ${variables['username']}, パスワード: ${variables['password']}`);
      } else {
        setRegisteredUserAuthInfo(
          `ユーザー名: ${variables['username']}`);
      }
      console.log('res', res);
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

  const onSubmit = (data: any) => {
    if (enabledRandomPassword) {
      data['password'] = generatePassword();
    }
    mutation.mutate(data);
    setLoading(true);
    setNonFieldErrors(null);
    setRegisteredUserAuthInfo(null);
  };

  const handleChangeRandomPassword = () => {
    setEnabledRandomPassword(!enabledRandomPassword);
  };

  const registeredMessage = () => {
    if (!registeredUserAuthInfo) return (<></>);
    return (
      <Box my={2}>
        <Alert severity='success'
               action={
                 <CopyToClipboard text={registeredUserAuthInfo}
                                  onCopy={() => addMessage('ユーザー情報をコピーしました')}>
                   <IconButton>
                     <ContentCopyIcon />
                   </IconButton>
                 </CopyToClipboard>
               }
        >
          <AlertTitle>登録しました</AlertTitle>
          <Typography variant='subtitle2' component='span'>{registeredUserAuthInfo}</Typography>
        </Alert>
      </Box>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name='username'
            control={control}
            defaultValue=''
            rules={{ required: '入力してください', minLength: { value: 4, message: '4文字以上入力してください' } }}

            render={({ field }) =>
              <TextField {...field}
                         label='ユーザー名'
                         required
                         InputLabelProps={{
                           shrink: true,
                         }}
                         error={!!errors.username}
                         helperText={errors.username?.message || '英数字で4文字以上入力してください'}
              />}
          />
          <FieldErrorMessages name='username' errors={errors} />

          <Box>
            <Stack>
              <Controller
                name='password'
                control={control}
                rules={enabledRandomPassword ? { required: false } : { required: '入力してください' }}
                defaultValue=''
                render={({ field }) =>
                  <TextField {...field}
                             label='パスワード'
                             required={!enabledRandomPassword}
                             disabled={enabledRandomPassword}
                             placeholder='********'
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

              <Box mt={errors.password ? 2 : 0}>
                <FieldErrorMessages name='password' errors={errors} />
              </Box>

              <FormControlLabel
                control={
                  <Checkbox name='randomPasswordCheck'
                            checked={enabledRandomPassword}
                            onChange={handleChangeRandomPassword}
                  />
                }
                label='ランダムなパスワードを使用する'
              />
            </Stack>
          </Box>
          <Box sx={{ py: 2 }}>
            <Stack direction='row'
                   spacing={2}
              // justifyContent='space-between'
                   alignItems='center'
            >
              <Controller
                name='firstName'
                control={control}
                defaultValue=''
                render={({ field }) =>
                  <TextField {...field}
                             label='姓'
                             InputLabelProps={{
                               shrink: true,
                             }}
                             error={!!errors.firstName}
                             helperText={errors.firstName?.message}
                             sx={{ width: '100%' }}
                  />
                }
              />
              <Controller
                name='lastName'
                control={control}
                defaultValue=''
                render={({ field }) =>
                  <TextField {...field}
                             label='名'
                             InputLabelProps={{
                               shrink: true,
                             }}
                             error={!!errors.firstName}
                             helperText={errors.firstName?.message}
                             sx={{ width: '100%' }}
                  />
                }
              />
            </Stack>
          </Box>
          <FormErrorMessages errors={nonFieldErrors} />
          <Button type='submit' variant='contained' disabled={loading}>登録</Button>
        </Stack>
      </form>

      {registeredMessage()}
    </>
  );
};
export default CreateForm;
