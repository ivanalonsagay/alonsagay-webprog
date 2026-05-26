import { useMemo, useRef, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const reportRows = [
  {
    id: 1,
    month: 'January',
    category: 'Sales',
    generated: 18,
    completed: 12,
    status: 'Completed',
  },
  {
    id: 2,
    month: 'January',
    category: 'Users',
    generated: 10,
    completed: 8,
    status: 'Completed',
  },
  {
    id: 3,
    month: 'February',
    category: 'Inventory',
    generated: 24,
    completed: 19,
    status: 'Pending',
  },
  {
    id: 4,
    month: 'February',
    category: 'Finance',
    generated: 14,
    completed: 11,
    status: 'Completed',
  },
  {
    id: 5,
    month: 'March',
    category: 'Sales',
    generated: 20,
    completed: 17,
    status: 'Pending',
  },
  {
    id: 6,
    month: 'March',
    category: 'Users',
    generated: 13,
    completed: 10,
    status: 'Completed',
  },
  {
    id: 7,
    month: 'April',
    category: 'Inventory',
    generated: 27,
    completed: 23,
    status: 'Completed',
  },
  {
    id: 8,
    month: 'April',
    category: 'Finance',
    generated: 16,
    completed: 13,
    status: 'Pending',
  },
];

const months = ['January', 'February', 'March', 'April'];
const categories = ['Sales', 'Users', 'Inventory', 'Finance'];
const statuses = ['Completed', 'Pending'];

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'month',
    headerName: 'Month',
    flex: 1,
    minWidth: 130,
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'generated',
    headerName: 'Generated',
    type: 'number',
    flex: 1,
    minWidth: 130,
  },
  {
    field: 'completed',
    headerName: 'Completed',
    type: 'number',
    flex: 1,
    minWidth: 130,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) => (
      <Chip
        size="small"
        label={row.status}
        color={row.status === 'Completed' ? 'success' : 'warning'}
        variant={row.status === 'Completed' ? 'filled' : 'outlined'}
      />
    ),
  },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [filters, setFilters] = useState({
    month: 'all',
    category: 'all',
    status: 'all',
  });

  const [draftFilters, setDraftFilters] = useState(filters);

  // ENHANCEMENT:
  // Filter button is clickable and filters the report data.
  const filteredRows = useMemo(() => {
    return reportRows.filter((row) => {
      const monthMatch = filters.month === 'all' || row.month === filters.month;
      const categoryMatch =
        filters.category === 'all' || row.category === filters.category;
      const statusMatch =
        filters.status === 'all' || row.status === filters.status;

      return monthMatch && categoryMatch && statusMatch;
    });
  }, [filters]);

  const totals = useMemo(() => {
    const generated = filteredRows.reduce((sum, row) => sum + row.generated, 0);
    const completed = filteredRows.reduce((sum, row) => sum + row.completed, 0);

    return {
      generated,
      completed,
      completionRate:
        generated > 0 ? Math.round((completed / generated) * 100) : 0,
    };
  }, [filteredRows]);

  const monthlyChartData = useMemo(() => {
    const visibleMonths =
      filters.month === 'all'
        ? months
        : months.filter((month) => month === filters.month);

    return visibleMonths.map((month) => {
      const rows = filteredRows.filter((row) => row.month === month);

      return {
        month,
        generated: rows.reduce((sum, row) => sum + row.generated, 0),
        completed: rows.reduce((sum, row) => sum + row.completed, 0),
      };
    });
  }, [filteredRows, filters.month]);

  const categoryPieData = useMemo(() => {
    return categories
      .map((category, index) => {
        const value = filteredRows
          .filter((row) => row.category === category)
          .reduce((sum, row) => sum + row.generated, 0);

        return {
          id: index,
          label: category,
          value,
        };
      })
      .filter((item) => item.value > 0);
  }, [filteredRows]);

  const handleGenerate = () => {
    setMessage('Report generated successfully.');
  };

  const handleOpenFilter = () => {
    setDraftFilters(filters);
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleApplyFilter = () => {
    setFilters(draftFilters);
    setMessage('Filter applied successfully.');
    setFilterOpen(false);
  };

  const handleClearFilter = () => {
    const resetFilters = {
      month: 'all',
      category: 'all',
      status: 'all',
    };

    setFilters(resetFilters);
    setDraftFilters(resetFilters);
    setMessage('Filters cleared.');
    setFilterOpen(false);
  };

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
          <title>Print Report</title>
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
            }

            .report-content .MuiCardContent-root {
              padding: 20px;
            }

            .report-content svg {
              max-width: 100%;
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
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* UI ETIQUETTE:
          Actions are aligned to the right side and pushed slightly downward
          so they do not crowd the title. */}
      <Box sx={{ mb: 3 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'flex-start' }}
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                lineHeight: 1.2,
                mb: 1.5,
              }}
            >
              Reports
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 900,
                lineHeight: 1.7,
              }}
            >
              Report analytics overview showing generated reports, category
              breakdown, and current completion performance.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1.25}
            flexWrap="wrap"
            useFlexGap
            sx={{
              width: { xs: '100%', md: 'auto' },
              ml: { md: 'auto' },
              mt: { xs: 1, md: 1.5 },
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
              alignSelf: { xs: 'flex-start', md: 'flex-start' },
            }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={handleGenerate}
              sx={{
                minWidth: 105,
                height: 40,
                px: 2.25,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 1.25,
              }}
            >
              Generate
            </Button>

            <Button
              variant="outlined"
              size="medium"
              onClick={handlePrint}
              sx={{
                minWidth: 115,
                height: 40,
                px: 2.25,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 1.25,
              }}
            >
              Export PDF
            </Button>

            <Button
              variant="outlined"
              size="medium"
              onClick={handleOpenFilter}
              sx={{
                minWidth: 85,
                height: 40,
                px: 2.25,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 1.25,
              }}
            >
              Filter
            </Button>
          </Stack>
        </Stack>
      </Box>

      {message ? (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setMessage('')}>
          {message}
        </Alert>
      ) : null}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Generated Reports
            </Typography>

            <Typography variant="h4">{totals.generated}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Completed Reports
            </Typography>

            <Typography variant="h4">{totals.completed}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Filtered Records
            </Typography>

            <Typography variant="h4">{filteredRows.length}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack
        ref={printRef}
        spacing={3}
        sx={{
          width: '100%',
          minWidth: 0,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Report Output
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This chart compares how many reports were generated and how many
              were completed.
            </Typography>

            <BarChart
              series={[
                {
                  data: monthlyChartData.map((item) => item.generated),
                  label: 'Generated',
                },
                {
                  data: monthlyChartData.map((item) => item.completed),
                  label: 'Completed',
                },
              ]}
              height={300}
              xAxis={[
                {
                  data: monthlyChartData.map((item) => item.month),
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
                This chart shows the distribution of generated reports by
                category.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data:
                        categoryPieData.length > 0
                          ? categoryPieData
                          : [{ id: 0, value: 1, label: 'No Data' }],
                    },
                  ]}
                  width={320}
                  height={240}
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
                This gauge shows the current percentage of completed reports.
              </Typography>

              <Box
                sx={{
                  minHeight: 220,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Gauge
                  width={180}
                  height={180}
                  value={totals.completionRate}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Report Records
            </Typography>

            <Paper sx={{ height: 420, width: '100%', mt: 2 }}>
              <DataGrid
                rows={filteredRows}
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
                disableRowSelectionOnClick
              />
            </Paper>
          </CardContent>
        </Card>
      </Stack>

      <Dialog
        open={filterOpen}
        onClose={handleCloseFilter}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Filter Reports</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              select
              label="Month"
              value={draftFilters.month}
              onChange={(event) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  month: event.target.value,
                }))
              }
              fullWidth
            >
              <MenuItem value="all">All Months</MenuItem>

              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Category"
              value={draftFilters.category}
              onChange={(event) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  category: event.target.value,
                }))
              }
              fullWidth
            >
              <MenuItem value="all">All Categories</MenuItem>

              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Status"
              value={draftFilters.status}
              onChange={(event) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  status: event.target.value,
                }))
              }
              fullWidth
            >
              <MenuItem value="all">All Status</MenuItem>

              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClearFilter}>Clear</Button>
          <Button onClick={handleCloseFilter}>Cancel</Button>
          <Button variant="contained" onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportsPage;