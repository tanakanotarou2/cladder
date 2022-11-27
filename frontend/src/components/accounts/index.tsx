import { Box, Container, Paper, Typography } from '@mui/material';
import CreateForm from '@/components/accounts/create/CreateForm';
const CreateAccountContainer = () => {
  return (
    <Container maxWidth='sm'>
      <Paper>
        <Box sx={{ p: 3 }}>
          <Typography component='h2' variant='h5' sx={{ mb: 2, textAlign: 'center' }}>ユーザー登録</Typography>
          <CreateForm />

        </Box>
      </Paper>
    </Container>
  );
};
export default CreateAccountContainer;
