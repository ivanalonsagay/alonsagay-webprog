import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Public Website Layout
import Layout from './components/Layout';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';

// Dashboard Layout
import DashLayout from './layouts/DashLayout';

// Landing Pages
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';

// Auth Pages
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

// Dashboard Pages
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

// Other Pages
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  // PUBLIC WEBSITE
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage />,
      },
      {
        path: 'articles/:slug',
        element: <ArticlePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },

  // AUTH PAGES
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/auth/signin',
    element: <SignInPage />,
  },
  {
    path: '/auth/signup',
    element: <SignUpPage />,
  },

  // DASHBOARD PAGES
  // This must NOT be inside the public Layout route.
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'editor']}>
        <DashLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'articles',
        element: <DashArticleListPage />,
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },

  // FALLBACK
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;