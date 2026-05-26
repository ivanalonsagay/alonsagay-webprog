import { useEffect, useMemo, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';

import UserService from '../../services/userService';
import { getCurrentUser } from '../../constants';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentUser = getCurrentUser();

  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [pageError, setPageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ENHANCEMENT 2:
  // Search bar and dropdown filters for UsersPage.
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setPageError('');

      const data = await UserService.getUsers();

      setUsers(data);
    } catch (error) {
      setPageError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const firstName = String(user.firstName || '').toLowerCase();
      const lastName = String(user.lastName || '').toLowerCase();
      const email = String(user.email || '').toLowerCase();
      const username = String(user.username || '').toLowerCase();
      const fullName = `${firstName} ${lastName}`.trim();

      const matchesSearch =
        !keyword ||
        firstName.includes(keyword) ||
        lastName.includes(keyword) ||
        fullName.includes(keyword) ||
        email.includes(keyword) ||
        username.includes(keyword);

      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      const matchesGender =
        genderFilter === 'all' || user.gender === genderFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && user.isActive) ||
        (statusFilter === 'inactive' && !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, genderFilter, statusFilter]);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });

    setForm(
      user
        ? {
            ...blankForm,
            ...user,
            password: '',
          }
        : { ...blankForm }
    );

    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // ENHANCEMENT 3:
  // Beginner-friendly validation rules.
  // Password must be at least 8 characters.
  // Contact number must be exactly 11 digits.
  // Age must be a number only.
  // Username must not contain spaces.
  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();
    const age = form.age.toString().trim();
    const contactNumber = form.contactNumber.trim();
    const password = form.password;

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!modal.id && !password.trim()) {
      nextErrors.password = 'Password is required.';
    }

    if (!nextErrors.age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must be a number only.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    if (!nextErrors.username && /\s/.test(username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setPageError('');

      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.toString().trim(),
        gender: form.gender.trim().toLowerCase(),
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim().toLowerCase(),
        role: form.role.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        address: form.address.trim(),
        isActive: form.isActive,
      };

      if (form.password.trim()) {
        payload.password = form.password;
      }

      if (modal.id) {
        await UserService.updateUser(modal.id, payload);
      } else {
        await UserService.createUser(payload);
      }

      await loadUsers();
      closeModal();
    } catch (error) {
      setPageError(error.message);
    }
  };

  const toggleStatus = async (id) => {
    try {
      setPageError('');

      await UserService.toggleUserStatus(id);
      await loadUsers();
    } catch (error) {
      setPageError(error.message);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setGenderFilter('all');
    setStatusFilter('all');
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 220,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (value, row) =>
        `${row.firstName || ''} ${row.lastName || ''}`.trim(),
    },
    {
      field: 'username',
      headerName: 'Username',
      minWidth: 150,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (value, row) => labelize(row.gender),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.1,
      minWidth: 220,
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      renderCell: ({ row }) => (
        <Chip size="small" label={labelize(row.role)} variant="outlined" />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          variant={row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            color={row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(row.id)}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  // ENHANCEMENT 1:
  // Editors cannot access UsersPage.
  if (currentUser?.role !== 'admin') {
    return (
      <Box>
        <Alert severity="error">
          Access denied. Only admins can access the Users page.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4">Users</Typography>

        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add User
        </Button>
      </Box>

      {pageError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {pageError}
        </Alert>
      ) : null}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 2 }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
          <TextField
            label="Search"
            placeholder="Search by name, email, or username"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
            >
              <MenuItem value="all">All Roles</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {labelize(role)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              value={genderFilter}
              onChange={(event) => setGenderFilter(event.target.value)}
            >
              <MenuItem value="all">All Genders</MenuItem>
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {labelize(gender)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={resetFilters}>
            Clear
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            loading={isLoading}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                  page: 0,
                },
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>

          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />

                <TextField
                  {...fieldProps('gender', 'Gender', { select: true })}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  {...fieldProps('contactNumber', 'Contact Number')}
                />

                <TextField
                  {...fieldProps('email', 'Email Address', {
                    type: 'email',
                  })}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField {...fieldProps('username', 'Username')} />
              </Stack>

              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  placeholder: modal.id
                    ? 'Leave blank to keep current password'
                    : 'Enter password',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(event) => {
                            event.preventDefault();
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                })}
              />

              <TextField
                {...fieldProps('address', 'Address', {
                  multiline: true,
                  rows: 3,
                })}
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? 'User status: Active'
                    : 'User status: Inactive'
                }
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>

            <Button type="submit" variant="contained">
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;