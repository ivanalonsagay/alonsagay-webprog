import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';

import articles from '../../data/article-content';

const DashArticleListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // ENHANCEMENT 2:
  // The articles available here are the same articles from ArticleListPage.
  const rows = useMemo(
    () =>
      articles.map((article, index) => ({
        id: article.id,
        number: index + 1,
        title: article.title,
        category: article.category || 'General',
        description: article.description,
        publicLink: `/articles/${article.id}`,
      })),
    []
  );

  const filteredRows = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) {
      return rows;
    }

    return rows.filter((article) => {
      return (
        article.title.toLowerCase().includes(keyword) ||
        article.category.toLowerCase().includes(keyword) ||
        article.description.toLowerCase().includes(keyword)
      );
    });
  }, [rows, searchTerm]);

  const columns = [
    {
      field: 'number',
      headerName: '#',
      width: 80,
    },
    {
      field: 'title',
      headerName: 'Article Title',
      flex: 1,
      minWidth: 220,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 170,
      renderCell: ({ row }) => (
        <Chip size="small" label={row.category} variant="outlined" />
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1.5,
      minWidth: 320,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Button
          component={RouterLink}
          to={row.publicLink}
          size="small"
          variant="contained"
          startIcon={<VisibilityIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* UI ETIQUETTE:
          Header follows the ReportsPage style.
          Action button is smaller, aligned to the right, and pushed slightly down. */}
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
              Articles
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 900,
                lineHeight: 1.7,
              }}
            >
              Manage and view the same articles displayed on the public
              ArticleListPage.
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
              component={RouterLink}
              to="/articles"
              variant="outlined"
              size="medium"
              sx={{
                minWidth: 170,
                height: 40,
                px: 2.25,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 1.25,
              }}
            >
              Open Public Article List
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Article Summary
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Total Articles
              </Typography>

              <Typography variant="h4">{rows.length}</Typography>
            </Paper>

            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Available Publicly
              </Typography>

              <Typography variant="h4">{rows.length}</Typography>
            </Paper>
          </Stack>
        </CardContent>
      </Card>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Search Articles"
          placeholder="Search by title, category, or description"
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
      </Paper>

      <Paper sx={{ p: 2, minWidth: 0, overflow: 'hidden' }}>
        <Box sx={{ height: 500, width: '100%', minWidth: 0 }}>
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
        </Box>
      </Paper>
    </Box>
  );
};

export default DashArticleListPage;