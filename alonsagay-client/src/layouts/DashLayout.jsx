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
  Avatar,
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
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';

import { clearAuth, getCurrentUser } from '../constants';
import Logo from '../assets/logo.png';

const drawerWidth = 270;
const collapsedWidth = 78;

const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: '#075c34',
      dark: '#054426',
      light: '#eaf5dc',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f6c343',
      dark: '#c47c00',
      light: '#fff4c7',
      contrastText: '#075c34',
    },
    warning: {
      main: '#f59e0b',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    success: {
      main: '#15803d',
      dark: '#166534',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    button: {
      fontWeight: 800,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 800,
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: '#075c34',
          color: '#ffffff',
          boxShadow: '0 8px 18px rgba(7, 92, 52, 0.22)',
          '&:hover': {
            backgroundColor: '#054426',
            boxShadow: '0 10px 22px rgba(7, 92, 52, 0.28)',
          },
        },
        outlinedPrimary: {
          borderColor: '#075c34',
          color: '#075c34',
          '&:hover': {
            borderColor: '#054426',
            backgroundColor: '#eaf5dc',
          },
        },
        containedWarning: {
          backgroundColor: '#f59e0b',
          color: '#ffffff',
          boxShadow: '0 8px 18px rgba(245, 158, 11, 0.22)',
          '&:hover': {
            backgroundColor: '#d97706',
          },
        },
        containedSuccess: {
          backgroundColor: '#15803d',
          color: '#ffffff',
          boxShadow: '0 8px 18px rgba(21, 128, 61, 0.22)',
          '&:hover': {
            backgroundColor: '#166534',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: '#075c34',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#075c34',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#075c34',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorSuccess: {
          backgroundColor: '#15803d',
          color: '#ffffff',
          fontWeight: 800,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        columnHeaders: {
          backgroundColor: '#fff8e6',
        },
        columnHeaderTitle: {
          fontWeight: 800,
        },
      },
    },
  },
});

const getPageTitle = (pathname) => {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname === '/dashboard/reports') return 'Reports';
  if (pathname === '/dashboard/articles') return 'Articles';
  if (pathname === '/dashboard/users') return 'Users';

  return 'Dashboard';
};

const DashLayoutContent = () => {
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
    navigate('/auth/signin', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fff8e6' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#075c34',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <Toolbar sx={{ minHeight: 74 }}>
          <IconButton
            color="inherit"
            onClick={() => setOpen((current) => !current)}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 900,
                letterSpacing: 0.5,
              }}
            >
              {pageTitle}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.75)',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Ivanka Calamansi Juice Management Dashboard
            </Typography>
          </Box>

          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              mr: 2,
              width: 280,
              display: { xs: 'none', md: 'block' },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255,255,255,0.12)',
                color: '#fff',
                borderRadius: 3,
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.14)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.35)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#f6c343',
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
              borderColor: 'rgba(255,255,255,0.55)',
              color: '#ffffff',
              fontWeight: 800,
              borderRadius: 2,
              display: { xs: 'none', sm: 'inline-flex' },
              '&:hover': {
                borderColor: '#f6c343',
                bgcolor: 'rgba(246,195,67,0.12)',
              },
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
              borderColor: 'rgba(255,255,255,0.55)',
              color: '#ffffff',
              fontWeight: 800,
              borderRadius: 2,
              '&:hover': {
                borderColor: '#f6c343',
                bgcolor: 'rgba(246,195,67,0.12)',
              },
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
            borderRight: '1px solid rgba(7,92,52,0.12)',
            bgcolor: '#fffdf5',
          },
        }}
      >
        <Toolbar sx={{ minHeight: 74 }} />

        <Box
          sx={{
            px: open ? 2.5 : 1.2,
            py: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Avatar
            src={Logo}
            alt="Ivanka"
            sx={{
              width: 46,
              height: 46,
              bgcolor: '#075c34',
              border: '2px solid #f6c34300',
            }}
          />

          {open ? (
            <Box>
              <Typography
                sx={{
                  fontWeight: 950,
                  color: '#075c34',
                  letterSpacing: 2,
                  lineHeight: 1,
                }}
              >
                IVANKA
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: '#c47c00',
                  fontWeight: 900,
                  letterSpacing: 1.3,
                }}
              >
                CALAMANSI JUICE
              </Typography>
            </Box>
          ) : null}
        </Box>

        <Divider />

        <Box sx={{ px: open ? 2.5 : 1.2, py: 2 }}>
          {open ? (
            <Box
              sx={{
                bgcolor: '#eef7df',
                border: '1px solid rgba(7,92,52,0.12)',
                borderRadius: 3,
                p: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 900,
                  color: '#075c34',
                }}
              >
                Welcome back,
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#1f2937',
                }}
              >
                {currentUser?.firstName || currentUser?.username || 'User'}
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#c47c00',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {role || 'admin'}
              </Typography>
            </Box>
          ) : null}
        </Box>

        <List sx={{ px: 1.2, py: 1 }}>
          {navItems.map(({ label, to, icon: Icon }) => {
            const selected = location.pathname === to;

            return (
              <ListItem
                key={to}
                disablePadding
                sx={{ display: 'block', mb: 0.8 }}
              >
                <ListItemButton
                  component={RouterLink}
                  to={to}
                  selected={selected}
                  sx={{
                    minHeight: 52,
                    borderRadius: 2.2,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                    color: selected ? '#075c34' : '#374151',
                    '&.Mui-selected': {
                      bgcolor: '#eef7df',
                      color: '#075c34',
                      fontWeight: 900,
                      borderLeft: '4px solid #f6c343',
                    },
                    '&.Mui-selected:hover': {
                      bgcolor: '#e3f3cf',
                    },
                    '&:hover': {
                      bgcolor: '#fff4c7',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2.3 : 'auto',
                      justifyContent: 'center',
                      color: selected ? '#075c34' : '#6b7280',
                    }}
                  >
                    <Icon />
                  </ListItemIcon>

                  <ListItemText
                    primary={label}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiListItemText-primary': {
                        fontWeight: selected ? 900 : 700,
                        fontSize: 15,
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
          bgcolor:
            'radial-gradient(circle at top left, rgba(246,195,67,0.20), transparent 34%), #fff8e6',
        }}
      >
        <Toolbar sx={{ minHeight: 74 }} />

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

const DashLayout = () => {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <DashLayoutContent />
    </ThemeProvider>
  );
};

export default DashLayout;