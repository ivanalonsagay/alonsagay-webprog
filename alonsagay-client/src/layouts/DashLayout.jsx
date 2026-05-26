import { useState } from 'react';
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';

import { clearAuth, getCurrentUser } from '../constants';

const drawerWidth = 240;

const dashboardNavItems = [
  {
    label: 'Dashboard',
    title: 'Dashboard',
    to: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'Reports',
    title: 'Reports',
    to: '/dashboard/reports',
    icon: AssessmentIcon,
  },
  {
    label: 'Articles',
    title: 'Articles',
    to: '/dashboard/articles',
    icon: ArticleIcon,
  },
  {
    label: 'Users',
    title: 'Users',
    to: '/dashboard/users',
    icon: PeopleIcon,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme) => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#1976d2',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),

  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',

  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  pointerEvents: 'none',
  height: '100%',
  padding: theme.spacing(0, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',

  '& .MuiInputBase-input': {
    width: '100%',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),

    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find((item) => item.to === pathname)?.title ?? 'Dashboard';

const DashLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const currentUser = getCurrentUser();
  const currentRole = String(currentUser?.role || '').toLowerCase();

  // ENHANCEMENT 1:
  // Editors cannot access UsersPage, so the Users nav item is hidden for editors.
  const visibleNavItems = dashboardNavItems.filter((item) => {
    if (item.to === '/dashboard/users') {
      return currentRole === 'admin';
    }

    return true;
  });

  const pageTitle = getPageTitle(location.pathname);

  const handleDrawerToggle = () => {
    setOpen((current) => !current);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/auth/signin');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ marginRight: 3 }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
            }}
          >
            {pageTitle}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {visibleNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={to} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={RouterLink}
                to={to}
                selected={location.pathname === to}
                sx={{
                  minHeight: 52,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </ListItemIcon>

                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          p: 3,
        }}
      >
        <DrawerHeader />

        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;