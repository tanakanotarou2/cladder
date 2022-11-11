import { Alert, Box, Typography } from '@mui/material';
interface Props {
  errors: string[] | null | undefined;
}

const FormErrorMessages = ({ errors }: Props) => {
  if (!errors) {
    return (<></>);
  }

  const messageList = errors.map((s, i) => (
    <Typography key={`msg_${i}`} component='p' variant='caption' sx={{ mt: 0 }}>{s}</Typography>
  ));
  return (<>
    <Box sx={{pt: 2}}>
      <Alert severity='error' sx={{ py: 2 }}>
        {messageList}
      </Alert>
    </Box>
  </>);
};

export default FormErrorMessages;
