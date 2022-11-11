import { Alert, Box, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';

/**
 * フィールドの下にエラーメッセージを表示するコンポーネント
 */
interface Props {
  name: string;
  errors: { [x: string]: any; } | undefined;
}

const FieldErrorMessages = ({ name, errors }: Props) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) => {
        if (!messages) return false;

        const messageList = Object.entries(messages).map(([type, message]) => (
          <Typography key={type} component='p' variant='caption' sx={{ mt: 0 }}>{message}</Typography>
        ));

        return (<>
          <Box sx={{ pb: 2, mt: 0 }}>
            <Alert severity='error' sx={{ mt: 0 }}>
              {messageList}
            </Alert>
          </Box>
        </>);
      }}
    />
  );
};

export default FieldErrorMessages;
