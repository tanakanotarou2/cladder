import { Box, Container, Paper, Typography } from '@mui/material';

const LoginBox = () => {
  return (
    <Container maxWidth='sm'>
      <Paper>
        <Box sx={{ p: 3 }}>
          <Typography component='h2'>ユーザー登録</Typography>
        </Box>
      </Paper>
    </Container>
  );
};
export default LoginBox;
