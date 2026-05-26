import { useRef } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

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
    description: 'This column combines first name and last name.',
    sortable: false,
    width: 180,
    valueGetter: (value, row) =>
      `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, firstName: 'Alicia', lastName: 'Reyes', age: 29 },
  { id: 2, firstName: 'Marco', lastName: 'Santos', age: 31 },
  { id: 3, firstName: 'Bianca', lastName: 'Cruz', age: 26 },
  { id: 4, firstName: 'Nathan', lastName: 'Diaz', age: 34 },
  { id: 5, firstName: 'Jasmine', lastName: 'Garcia', age: 28 },
  { id: 6, firstName: 'Ethan', lastName: 'Lopez', age: 33 },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  /*
    ENHANCEMENT 1:
    Create and design a printing PDF based on the Laboratory 5 ReportsPage design.

    This function opens a new print window, copies the report content,
    applies print-friendly styles, and allows the user to save it as PDF.
  */
  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=900');

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reports Summary</title>
          ${headMarkup}

          <style>
            @page {
              size: A4;
              margin: 16mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #1f2937;
            }

            .report-shell {
              padding: 28px;
            }

            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #d1d5db;
            }

            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
            }

            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #6b7280;
              line-height: 1.5;
            }

            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 18px;
            }

            .report-content .MuiCardContent-root {
              padding: 20px;
            }

            .report-content svg {
              max-width: 100%;
            }

            .report-content .MuiDataGrid-root {
              border: 1px solid #e5e7eb;
            }
          </style>
        </head>

        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>
                Analytics overview for generated reports, category breakdown,
                and completion performance.
              </p>
              <p>Prepared on ${exportedAt}</p>
            </header>

            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Report analytics overview showing generated reports, category
            breakdown, and current completion performance.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Generate</Button>

          {/* ENHANCEMENT 1: Export PDF / print report button */}
          <Button variant="outlined" onClick={handlePrint}>
            Export PDF
          </Button>

          <Button variant="outlined">Filter</Button>
        </Stack>
      </Stack>

      {/* ENHANCEMENT 1: This is the report section that will be printed */}
      <Stack ref={printRef} spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Report Output
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This chart compares how many reports were generated and how many
              were completed across the last four months.
            </Typography>

            <BarChart
              series={[
                {
                  data: [18, 24, 20, 27],
                  label: 'Generated',
                },
                {
                  data: [12, 19, 17, 23],
                  label: 'Completed',
                },
              ]}
              height={300}
              xAxis={[
                {
                  data: ['January', 'February', 'March', 'April'],
                  scaleType: 'band',
                  label: 'Months',
                },
              ]}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Category Share
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This chart shows the distribution of report requests by category
                for the current reporting period.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 14, label: 'Sales' },
                        { id: 1, value: 10, label: 'Users' },
                        { id: 2, value: 8, label: 'Inventory' },
                        { id: 3, value: 6, label: 'Finance' },
                      ],
                    },
                  ]}
                  width={280}
                  height={220}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completion Rate
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                The gauge highlights the current percentage of reports completed
                on time based on the latest reporting cycle.
              </Typography>

              <Box
                sx={{
                  minHeight: 220,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Gauge width={180} height={180} value={78} />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Report Table
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
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;