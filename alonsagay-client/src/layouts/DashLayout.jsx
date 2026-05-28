import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';

import { useMemo, useState } from 'react';
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

import { clearAuth, getCurrentUser } from '../constants';

const drawerWidth = 260;
const collapsedWidth = 72;

const getPageTitle = (pathname) => {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname === '/dashboard/reports') return 'Reports';
  if (pathname === '/dashboard/articles') return 'Articles';
  if (pathname === '/dashboard/users') return 'Users';

  return 'Dashboard';
};

const DashLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const currentUser = getCurrentUser();
  const role = String(currentUser?.role || '').toLowerCase();

  const navItems = useMemo(() => {
    const items = [
      {
        label: 'Dashboard',
        to: '/dashboard',
        icon: DashboardIcon,
      },
      {
        label: 'Reports',
        to: '/dashboard/reports',
        icon: AssessmentIcon,
      },
      {
        label: 'Articles',
        to: '/dashboard/articles',
        icon: ArticleIcon,
      },
    ];

    if (role === 'admin') {
      items.push({
        label: 'Users',
        to: '/dashboard/users',
        icon: PeopleIcon,
      });
    }

    return items;
  }, [role]);

  const pageTitle = getPageTitle(location.pathname);

  const handleLogout = () => {
    clearAuth();
    navigate('/signin', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7f8fb' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#1976d2',
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          <IconButton
            color="inherit"
            onClick={() => setOpen((current) => !current)}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              fontWeight: 800,
            }}
          >
            {pageTitle}
          </Typography>

          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              mr: 2,
              width: 280,
              display: { xs: 'none', md: 'block' },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255,255,255,0.16)',
                color: '#fff',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.35)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
              '& input::placeholder': {
                color: 'rgba(255,255,255,0.8)',
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#fff' }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            variant="outlined"
            startIcon={<HomeIcon />}
            sx={{
              mr: 1,
              borderColor: 'rgba(255,255,255,0.65)',
              fontWeight: 700,
            }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: 'rgba(255,255,255,0.65)',
              fontWeight: 700,
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            overflowX: 'hidden',
            boxSizing: 'border-box',
            transition: 'width 0.2s ease',
            borderRight: '1px solid #e5e7eb',
          },
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />

        <Box
          sx={{
            px: open ? 2 : 1,
            py: 2,
          }}
        >
          {open ? (
            <>
              <Typography sx={{ fontWeight: 900, color: '#1976d2' }}>
                Admin Panel
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Welcome, {currentUser?.firstName || currentUser?.username || 'User'}
              </Typography>
            </>
          ) : null}
        </Box>

        <Divider />

        <List sx={{ px: 1, py: 1 }}>
          {navItems.map(({ label, to, icon: Icon }) => {
            const selected = location.pathname === to;

            return (
              <ListItem key={to} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                <ListItemButton
                  component={RouterLink}
                  to={to}
                  selected={selected}
                  sx={{
                    minHeight: 52,
                    borderRadius: 1.5,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                    '&.Mui-selected': {
                      bgcolor: '#e8f1fb',
                      color: '#1976d2',
                      fontWeight: 800,
                    },
                    '&.Mui-selected:hover': {
                      bgcolor: '#dbeafe',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2.5 : 'auto',
                      justifyContent: 'center',
                      color: selected ? '#1976d2' : 'text.secondary',
                    }}
                  >
                    <Icon />
                  </ListItemIcon>

                  <ListItemText
                    primary={label}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiListItemText-primary': {
                        fontWeight: selected ? 800 : 600,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
          minHeight: '100vh',
          bgcolor: '#f7f8fb',
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />

        <Box
          sx={{
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;