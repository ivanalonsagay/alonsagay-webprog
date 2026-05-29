import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import ArticleService from '../../services/articleService';
import UserService from '../../services/userService';

const salesData = [
  {
    month: 'Jan',
    bottles: 42,
    partners: 30,
  },
  {
    month: 'Feb',
    bottles: 55,
    partners: 38,
  },
  {
    month: 'Mar',
    bottles: 48,
    partners: 44,
  },
  {
    month: 'Apr',
    bottles: 63,
    partners: 51,
  },
];

const productShare = [
  {
    name: 'Calamansi Juice',
    value: 45,
    color: '#075c34',
  },
  {
    name: 'Fresh Orders',
    value: 35,
    color: '#f6c343',
  },
  {
    name: 'Content Reach',
    value: 20,
    color: '#4ade80',
  },
];

const maxBarValue = 70;

const StatCard = ({ label, value, helper, accent }) => {
  return (
    <Card
      sx={{
        minHeight: 145,
        borderRadius: 4,
        boxShadow: '0 18px 45px rgba(7,92,52,0.08)',
        border: '1px solid rgba(7,92,52,0.08)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 5,
          bgcolor: accent,
        }}
      />

      <CardContent sx={{ p: 3 }}>
        <Typography
          sx={{
            color: '#6b7280',
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: '#075c34',
            fontSize: 42,
            fontWeight: 950,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: '#c47c00',
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          {helper}
        </Typography>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);

  const loadDashboardData = async () => {
    try {
      const userData = await UserService.getUsers();
      setUsers(Array.isArray(userData) ? userData : []);
    } catch {
      setUsers([]);
    }

    try {
      const articleData = await ArticleService.getArticles();
      setArticles(Array.isArray(articleData) ? articleData : []);
    } catch {
      setArticles([]);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.isActive !== false).length;

  const totalArticles = articles.length;

  const activeArticles = articles.filter(
    (article) => article.status === 'active'
  ).length;

  const averageAge = useMemo(() => {
    const validAges = users
      .map((user) => Number(user.age))
      .filter((age) => !Number.isNaN(age) && age > 0);

    if (validAges.length === 0) {
      return '0';
    }

    const totalAge = validAges.reduce((sum, age) => sum + age, 0);

    return (totalAge / validAges.length).toFixed(1);
  }, [users]);

  const productGradient = useMemo(() => {
    const total = productShare.reduce((sum, item) => sum + item.value, 0);

    let start = 0;

    const parts = productShare.map((item) => {
      const end = start + (item.value / total) * 100;
      const segment = `${item.color} ${start}% ${end}%`;

      start = end;

      return segment;
    });

    return `conic-gradient(${parts.join(', ')})`;
  }, []);

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          p: { xs: 3, md: 4 },
          borderRadius: 5,
          bgcolor: '#075c34',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(7,92,52,0.20)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 220,
            height: 220,
            borderRadius: '50%',
            bgcolor: 'rgba(246,195,67,0.20)',
            right: -60,
            top: -80,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
            right: 150,
            bottom: -50,
          }}
        />

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 950,
            letterSpacing: 2.5,
            color: '#f6c343',
            textTransform: 'uppercase',
          }}
        >
          Ivanka Calamansi Juice
        </Typography>

        <Typography
          sx={{
            mt: 1,
            maxWidth: 720,
            fontSize: { xs: 32, md: 42 },
            lineHeight: 1.1,
            fontWeight: 950,
          }}
        >
          Fresh product performance dashboard
        </Typography>

        <Typography
          sx={{
            mt: 2,
            maxWidth: 700,
            fontSize: 15,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.78)',
          }}
        >
          Monitor users, articles, product visibility, and engagement for the
          Ivanka Calamansi Juice website in one clean dashboard.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Users"
            value={totalUsers}
            helper={`${activeUsers} active accounts`}
            accent="#075c34"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Average Age"
            value={averageAge}
            helper="Customer profile insight"
            accent="#f6c343"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Articles"
            value={totalArticles}
            helper={`${activeArticles} visible to public`}
            accent="#4ade80"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Product Reach"
            value=" 82%"
            helper="Estimated monthly engagement"
            accent="#22c55e"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            sx={{
              height: 420,
              borderRadius: 4,
              border: '1px solid rgba(7,92,52,0.08)',
              boxShadow: '0 18px 45px rgba(7,92,52,0.08)',
            }}
          >
            <CardContent sx={{ height: '100%', p: 3 }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: '#075c34',
                    }}
                  >
                    Monthly Calamansi Performance
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      color: '#6b7280',
                      fontSize: 14,
                    }}
                  >
                    Product orders and partner activity overview
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: 1,
                        bgcolor: '#075c34',
                      }}
                    />
                    <Typography variant="body2">Bottles</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: 1,
                        bgcolor: '#f6c343',
                      }}
                    />
                    <Typography variant="body2">Partners</Typography>
                  </Stack>
                </Stack>
              </Box>

              <Box
                sx={{
                  height: 285,
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    pr: 1,
                    color: '#6b7280',
                    fontSize: 13,
                  }}
                >
                  <span>70</span>
                  <span>50</span>
                  <span>30</span>
                  <span>10</span>
                  <span>0</span>
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    borderLeft: '2px solid #374151',
                    borderBottom: '2px solid #374151',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-around',
                    px: 3,
                  }}
                >
                  {[10, 30, 50, 70].map((line) => (
                    <Box
                      key={line}
                      sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: `${(line / maxBarValue) * 100}%`,
                        borderTop: '1px solid #e5e7eb',
                      }}
                    />
                  ))}

                  {salesData.map((item) => (
                    <Box
                      key={item.month}
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 1.3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: `${(item.bottles / maxBarValue) * 100}%`,
                          bgcolor: '#075c34',
                          borderRadius: '10px 10px 0 0',
                        }}
                      />

                      <Box
                        sx={{
                          width: 48,
                          height: `${(item.partners / maxBarValue) * 100}%`,
                          bgcolor: '#f6c343',
                          borderRadius: '10px 10px 0 0',
                        }}
                      />

                      <Typography
                        sx={{
                          position: 'absolute',
                          bottom: -28,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: 13,
                          fontWeight: 800,
                          color: '#374151',
                        }}
                      >
                        {item.month}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: 420,
              borderRadius: 4,
              border: '1px solid rgba(7,92,52,0.08)',
              boxShadow: '0 18px 45px rgba(7,92,52,0.08)',
            }}
          >
            <CardContent sx={{ height: '100%', p: 3 }}>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: '#075c34',
                }}
              >
                Product Share
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color: '#6b7280',
                  fontSize: 14,
                }}
              >
                Website content and product engagement
              </Typography>

              <Box
                sx={{
                  mt: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    width: 190,
                    height: 190,
                    borderRadius: '50%',
                    background: productGradient,
                    border: '8px solid #fff8e6',
                    boxShadow: '0 18px 40px rgba(7,92,52,0.15)',
                  }}
                />

                <Stack spacing={1.2} sx={{ width: '100%' }}>
                  {productShare.map((item) => (
                    <Stack
                      key={item.name}
                      direction="row"
                      spacing={1.2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                          sx={{
                            width: 13,
                            height: 13,
                            borderRadius: '50%',
                            bgcolor: item.color,
                          }}
                        />

                        <Typography variant="body2">{item.name}</Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 900,
                          color: '#075c34',
                        }}
                      >
                        {item.value}%
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              border: '1px solid rgba(7,92,52,0.08)',
              boxShadow: '0 18px 45px rgba(7,92,52,0.08)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: '#075c34',
                }}
              >
                Public Content Status
              </Typography>

              <Stack spacing={2} sx={{ mt: 3 }}>
                <Box>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 800 }}>
                      Active Articles 
                    </Typography>
                    <Typography sx={{ fontWeight: 900, color: '#075c34' }}>
                      {activeArticles}/{totalArticles || 0}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      mt: 1,
                      height: 12,
                      borderRadius: 99,
                      bgcolor: '#e5e7eb',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width:
                          totalArticles === 0
                            ? '0%'
                            : `${(activeArticles / totalArticles) * 100}%`,
                        height: '100%',
                        bgcolor: '#075c34',
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 800 }}>
                      Product Reach
                    </Typography>
                    <Typography sx={{ fontWeight: 900, color: '#075c34' }}>
                      82%
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      mt: 1,
                      height: 12,
                      borderRadius: 99,
                      bgcolor: '#e5e7eb',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: '82%',
                        height: '100%',
                        bgcolor: '#f6c343',
                      }}
                    />
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              border: '1px solid rgba(7,92,52,0.08)',
              boxShadow: '0 18px 45px rgba(7,92,52,0.08)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: '#075c34',
                }}
              >
                Business Notes
              </Typography>

              <Stack spacing={1.8} sx={{ mt: 3 }}>
                {[
                  'Keep active product articles visible on the public article page.',
                  'Use fresh photos and clear descriptions for every campaign.',
                  'Monitor user accounts and disable inactive or invalid users.',
                ].map((note) => (
                  <Box
                    key={note}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        mt: 0.6,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: '#f6c343',
                        flexShrink: 0,
                      }}
                    />

                    <Typography sx={{ color: '#4b5563', lineHeight: 1.7 }}>
                      {note}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;