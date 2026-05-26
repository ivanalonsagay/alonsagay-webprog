import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { BarChart, PieChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  {
    id: 1,
    firstName: 'Miguel',
    lastName: 'Santos',
    age: 22,
    fullName: 'Miguel Santos',
  },
  {
    id: 2,
    firstName: 'Andrea',
    lastName: 'Reyes',
    age: 24,
    fullName: 'Andrea Reyes',
  },
  {
    id: 3,
    firstName: 'Paolo',
    lastName: 'Dela Cruz',
    age: 21,
    fullName: 'Paolo Dela Cruz',
  },
  {
    id: 4,
    firstName: 'Janelle',
    lastName: 'Garcia',
    age: 23,
    fullName: 'Janelle Garcia',
  },
  {
    id: 5,
    firstName: 'Rafael',
    lastName: 'Mendoza',
    age: 27,
    fullName: 'Rafael Mendoza',
  },
  {
    id: 6,
    firstName: 'Katrina',
    lastName: 'Villanueva',
    age: 25,
    fullName: 'Katrina Villanueva',
  },
  {
    id: 7,
    firstName: 'Mark',
    lastName: 'Aquino',
    age: 26,
    fullName: 'Mark Aquino',
  },
  {
    id: 8,
    firstName: 'Bianca',
    lastName: 'Ramos',
    age: 20,
    fullName: 'Bianca Ramos',
  },
  {
    id: 9,
    firstName: 'Christian',
    lastName: 'Navarro',
    age: 28,
    fullName: 'Christian Navarro',
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
    headerName: 'First name',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    flex: 1,
    minWidth: 180,
  },
];

const averageAge = (
  rows.reduce((total, row) => total + row.age, 0) / rows.length
).toFixed(1);

function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Card sx={{ minWidth: 160 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Users
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {rows.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 160 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Average Age
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {averageAge}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={3}
        sx={{ mb: 5 }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <BarChart
              height={300}
              series={[
                {
                  data: [35, 44, 24, 34],
                  label: 'Series 1',
                },
                {
                  data: [51, 6, 49, 30],
                  label: 'Series 2',
                },
              ]}
              xAxis={[
                {
                  data: ['Q1', 'Q2', 'Q3', 'Q4'],
                  scaleType: 'band',
                  label: 'Quarters',
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ width: { xs: '100%', lg: 360 } }}>
          <CardContent>
            <PieChart
              height={300}
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Group A' },
                    { id: 1, value: 15, label: 'Group B' },
                    { id: 2, value: 20, label: 'Group C' },
                  ],
                },
              ]}
            />
          </CardContent>
        </Card>
      </Stack>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        Users Overview
      </Typography>

      <Box sx={{ height: 400, width: '100%' }}>
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
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default DashboardPage;