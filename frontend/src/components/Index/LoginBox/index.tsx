import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

const LoginBox = () => {
  // const theme = useTheme();
  return (

    <Container maxWidth='sm'>
      <Paper>
        <Box sx={{ p: 3 }}>
          <Typography component='h2' variant='h5' sx={{ mb: 2, textAlign: 'center' }}>ログイン</Typography>

          <Stack spacing={3}>
            <TextField
              id='username'
              sx={{ widht: '100%' }}
            ></TextField>
            <TextField
              id='filled-password-input'
              label='Password'
              type='password'
              sx={{ widht: '100%' }}
              autoComplete='current-password'
              variant='filled'
            />

            <Button
              variant='contained'
              sx={{ 'width': '100%', mx: 1 }}
            >Login</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};
export default LoginBox;
