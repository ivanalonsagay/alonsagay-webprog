import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DataGrid } from '@mui/x-data-grid';

const rows = [
  {
    id: 1,
    firstName: 'Miguel',
    lastName: 'Santos',
    age: 22,
    email: 'miguel.santos@email.com',
    status: 'Active',
  },
  {
    id: 2,
    firstName: 'Andrea',
    lastName: 'Reyes',
    age: 24,
    email: 'andrea.reyes@email.com',
    status: 'Active',
  },
  {
    id: 3,
    firstName: 'Paolo',
    lastName: 'Dela Cruz',
    age: 21,
    email: 'paolo.delacruz@email.com',
    status: 'Inactive',
  },
  {
    id: 4,
    firstName: 'Janelle',
    lastName: 'Garcia',
    age: 23,
    email: 'janelle.garcia@email.com',
    status: 'Active',
  },
  {
    id: 5,
    firstName: 'Rafael',
    lastName: 'Mendoza',
    age: 27,
    email: 'rafael.mendoza@email.com',
    status: 'Active',
  },
  {
    id: 6,
    firstName: 'Katrina',
    lastName: 'Villanueva',
    age: 25,
    email: 'katrina.villanueva@email.com',
    status: 'Inactive',
  },
  {
    id: 7,
    firstName: 'Mark',
    lastName: 'Aquino',
    age: 26,
    email: 'mark.aquino@email.com',
    status: 'Active',
  },
  {
    id: 8,
    firstName: 'Bianca',
    lastName: 'Ramos',
    age: 20,
    email: 'bianca.ramos@email.com',
    status: 'Active',
  },
  {
    id: 9,
    firstName: 'Christian',
    lastName: 'Navarro',
    age: 28,
    email: 'christian.navarro@email.com',
    status: 'Inactive',
  },
];

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 100,
  },
  {
    field: 'email',
    headerName: 'Email Address',
    flex: 1.5,
    minWidth: 220,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 130,
  },
];

const activeUsers = rows.filter((user) => user.status === 'Active').length;
const inactiveUsers = rows.filter((user) => user.status === 'Inactive').length;

function UsersPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Users
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        User list and table view for managing user details.
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Users
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {rows.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Active Users
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {activeUsers}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Inactive Users
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {inactiveUsers}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Users Table
          </Typography>

          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;