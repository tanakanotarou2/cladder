import { Box, Container, Paper, Typography } from '@mui/material';
import LoginForm from '@/components/Index/LoginBox/LoginForm';

const LoginBox = () => {
  return (
    <Container maxWidth='sm'>
      <Paper>
        <Box sx={{ p: 3 }}>
          <Typography component='h2' variant='h5' sx={{ mb: 2, textAlign: 'center' }}>ログイン</Typography>
          <LoginForm />
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginBox;