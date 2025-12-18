import { Box, CircularProgress } from '@mui/material';

function Loader({ position = 'fixed' }) {
  return (
    <Box
      sx={{
        position: position,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={32} disableShrink thickness={3} />
    </Box>
  );
}

export default Loader;
