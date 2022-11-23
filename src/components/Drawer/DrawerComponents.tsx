import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

interface IProps extends AppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

export const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const Bar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<IProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
