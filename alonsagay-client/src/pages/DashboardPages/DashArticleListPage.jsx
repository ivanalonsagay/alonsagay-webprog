import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';

import ArticleService from '../../services/articleService';

const blankForm = {
  id: null,
  slug: '',
  title: '',
  paragraphs: '',
  imageUrl: '',
  status: 'active',
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      setError('');

      const data = await ArticleService.getArticles();
      setArticles(data);
    } catch (err) {
      setError(err.message || 'Unable to load articles.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const rows = useMemo(() => {
    return articles.map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      paragraphs: article.paragraphs.length,
      preview: article.preview || article.paragraphs[0] || '',
      status: article.status,
      imageUrl: article.imageUrl,
      fullParagraphs: article.paragraphs,
    }));
  }, [articles]);

  const filteredRows = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        !keyword ||
        String(row.id).toLowerCase().includes(keyword) ||
        String(row.slug).toLowerCase().includes(keyword) ||
        String(row.title).toLowerCase().includes(keyword) ||
        String(row.preview).toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === 'all' || row.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rows, searchTerm, statusFilter]);

  const openAddModal = () => {
    setForm(blankForm);
    setError('');
    setMessage('');
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setForm({
      id: row.id,
      slug: row.slug,
      title: row.title,
      paragraphs: row.fullParagraphs.join('\n'),
      imageUrl: row.imageUrl || '',
      status: row.status,
    });

    setError('');
    setMessage('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm(blankForm);
    setError('');
  };

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    setError('');
  };

  const validate = () => {
    if (!form.slug.trim()) {
      return 'Slug is required.';
    }

    if (!form.title.trim()) {
      return 'Title is required.';
    }

    if (!form.paragraphs.trim()) {
      return 'Paragraphs are required.';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (form.id) {
        await ArticleService.updateArticle(form.id, form);
        setMessage('Article updated successfully.');
      } else {
        await ArticleService.createArticle(form);
        setMessage('Article added successfully.');
      }

      await loadArticles();
      closeModal();
    } catch (err) {
      setError(err.message || 'Unable to save article.');
    }
  };

  const handleToggleStatus = async (row) => {
    try {
      const nextStatus = row.status === 'active' ? 'inactive' : 'active';

      await ArticleService.updateArticle(row.id, {
        slug: row.slug,
        title: row.title,
        paragraphs: row.fullParagraphs.join('\n'),
        imageUrl: row.imageUrl || '',
        status: nextStatus,
      });

      setMessage('Article status updated successfully.');
      await loadArticles();
    } catch (err) {
      setError(err.message || 'Unable to update article status.');
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 140,
    },
    {
      field: 'slug',
      headerName: 'Slug',
      flex: 1,
      minWidth: 160,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 190,
    },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1.5,
      minWidth: 260,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: ({ row }) => (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Chip
            size="small"
            label={row.status === 'active' ? 'Active' : 'Inactive'}
            color={row.status === 'active' ? 'success' : 'default'}
            variant={row.status === 'active' ? 'filled' : 'outlined'}
          />
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              flexWrap: 'nowrap',
            }}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={() => openEditModal(row)}
              sx={{
                minWidth: 74,
                height: 36,
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Edit
            </Button>

            <Button
              size="small"
              variant="contained"
              color={row.status === 'active' ? 'warning' : 'success'}
              onClick={() => handleToggleStatus(row)}
              sx={{
                minWidth: 92,
                height: 36,
                textTransform: 'uppercase',
                fontWeight: 700,
                boxShadow: 2,
              }}
            >
              {row.status === 'active' ? 'Disable' : 'Activate'}
            </Button>
          </Stack>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
          }}
        >
          Articles
        </Typography>

        <Stack direction="row" spacing={1}>


          <Button
            variant="contained"
            onClick={openAddModal}
            sx={{
              height: 36,
              px: 2,
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Add Article
          </Button>
        </Stack>
      </Box>

      {message ? (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setMessage('')}>
          {message}
        </Alert>
      ) : null}

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      ) : null}

      <Paper
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 1,
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            placeholder="Search Articles"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 180 } }}>
            <InputLabel>Status Filter</InputLabel>
            <Select
              label="Status Filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Paper
        sx={{
          p: 2,
          minWidth: 0,
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={isLoading}
            rowHeight={64}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 0,
                },
              },
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700,
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{form.id ? 'Edit Article' : 'Add Article'}</DialogTitle>

          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                label="Slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="example-article-slug"
                fullWidth
              />

              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Paragraphs"
                name="paragraphs"
                value={form.paragraphs}
                onChange={handleChange}
                placeholder="Write one paragraph per line."
                multiline
                rows={6}
                fullWidth
              />

              <TextField
                label="Image URL"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="Optional image URL"
                fullWidth
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>

            <Button type="submit" variant="contained">
              {form.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;