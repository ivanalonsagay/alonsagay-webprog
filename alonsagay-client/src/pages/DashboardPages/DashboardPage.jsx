import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 150,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 180,
    valueGetter: (value, row) =>
      `${row.firstName || ''} ${row.lastName || ''}`.trim(),
  },
];

const rows = [
  { id: 1, firstName: 'Miguel', lastName: 'Reyes', age: 21 },
  { id: 2, firstName: 'Andrea', lastName: 'Santos', age: 22 },
  { id: 3, firstName: 'Paolo', lastName: 'Cruz', age: 23 },
  { id: 4, firstName: 'Janelle', lastName: 'Garcia', age: 20 },
  { id: 5, firstName: 'Rafael', lastName: 'Mendoza', age: 24 },
  { id: 6, firstName: 'Camille', lastName: 'Torres', age: 21 },
  { id: 7, firstName: 'Joshua', lastName: 'Villanueva', age: 25 },
  { id: 8, firstName: 'Bianca', lastName: 'Flores', age: 22 },
  { id: 9, firstName: 'Mark', lastName: 'Navarro', age: 23 },
];

const DashboardPage = () => {
  const averageAge =
    rows.reduce((sum, row) => sum + row.age, 0) / rows.length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Card sx={{ minWidth: 180 }}>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{rows.length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 180 }}>
          <CardContent>
            <Typography variant="h6">Average Age</Typography>
            <Typography variant="h4">{averageAge.toFixed(1)}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={3}
        sx={{ mb: 4 }}
        alignItems="center"
      >
        <Card sx={{ flex: 1, width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quarterly Sales
            </Typography>

            <BarChart
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
              height={300}
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

        <Card sx={{ width: { xs: '100%', lg: 320 } }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Category Share
            </Typography>

            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Sales' },
                    { id: 1, value: 15, label: 'Users' },
                    { id: 2, value: 20, label: 'Reports' },
                  ],
                },
              ]}
              width={250}
              height={250}
            />
          </CardContent>
        </Card>
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        sx={{ mb: 4 }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Completion Rate
            </Typography>
            <Gauge width={180} height={180} value={78} />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Performance Rate
            </Typography>
            <Gauge width={180} height={180} value={64} />
          </CardContent>
        </Card>
      </Stack>

      <Typography variant="h5" gutterBottom>
        Users Overview
      </Typography>

      <Box sx={{ height: 420, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
                page: 0,
              },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default DashboardPage;