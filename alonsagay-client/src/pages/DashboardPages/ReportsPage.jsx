import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { BarChart, PieChart, LineChart } from '@mui/x-charts';

function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Reports
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Charts and data visualization for the dashboard reports section.
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Sales
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              165
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Orders
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              124
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Growth Rate
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              18%
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Monthly Sales and Orders
            </Typography>

            <BarChart
              height={320}
              series={[
                {
                  data: [12, 19, 15, 24, 31, 28, 36],
                  label: 'Sales',
                },
                {
                  data: [8, 14, 13, 18, 22, 20, 29],
                  label: 'Orders',
                },
              ]}
              xAxis={[
                {
                  data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  scaleType: 'band',
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ width: { xs: '100%', lg: 380 } }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Report Categories
            </Typography>

            <PieChart
              height={320}
              series={[
                {
                  data: [
                    { id: 0, value: 35, label: 'Sales' },
                    { id: 1, value: 25, label: 'Users' },
                    { id: 2, value: 20, label: 'Inventory' },
                    { id: 3, value: 20, label: 'Orders' },
                  ],
                },
              ]}
            />
          </CardContent>
        </Card>
      </Stack>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Weekly Performance
          </Typography>

          <LineChart
            height={320}
            series={[
              {
                data: [5, 10, 8, 14, 18, 16, 22],
                label: 'Performance',
              },
            ]}
            xAxis={[
              {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                scaleType: 'point',
              },
            ]}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default ReportsPage;