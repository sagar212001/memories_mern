import { styled } from '@mui/system';
import { AppBar as MuiAppBar, Typography } from '@mui/material';

const AppBar = styled(MuiAppBar)({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const Heading = styled(Typography)({
  color: 'rgba(0,183,255, 1)',
});

export { AppBar, Heading };
