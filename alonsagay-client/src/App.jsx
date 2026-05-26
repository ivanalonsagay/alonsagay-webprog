import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';

import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import NotFoundPage from './pages/NotFoundPage';

const DashLayout = lazy(() => import('./layouts/DashLayout'));
const DashboardPage = lazy(() => import('./pages/DashboardPages/DashboardPage'));
const ReportsPage = lazy(() => import('./pages/DashboardPages/ReportsPage'));
const UsersPage = lazy(() => import('./pages/DashboardPages/UsersPage'));
const DashArticleListPage = lazy(() =>
  import('./pages/DashboardPages/DashArticleListPage')
);

const PageLoader = ({ children }) => (
  <Suspense
    fallback={
      <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
        Loading...
      </div>
    }
  >
    {children}
  </Suspense>
);

const routes = [
  // DEFAULT ROUTE:
  // When the website runs at http://localhost:5173/,
  // the user will land on the Sign In page.
  {
    path: '/',
    element: <SignInPage />,
  },

  // AUTH ROUTES
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

  // PROTECTED LANDING WEBSITE ROUTES:
  // About and Articles cannot be accessed unless the user is logged in.
  {
    element: (
      <ProtectedRoute allowedRoles={['admin', 'editor']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/articles',
        element: <ArticleListPage />,
      },
      {
        path: '/articles/:id',
        element: <ArticlePage />,
      },
    ],
  },

  // PROTECTED DASHBOARD ROUTES
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'editor']}>
        <PageLoader>
          <DashLayout />
        </PageLoader>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PageLoader>
            <DashboardPage />
          </PageLoader>
        ),
      },
      {
        path: 'reports',
        element: (
          <PageLoader>
            <ReportsPage />
          </PageLoader>
        ),
      },
      {
        path: 'articles',
        element: (
          <PageLoader>
            <DashArticleListPage />
          </PageLoader>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <PageLoader>
              <UsersPage />
            </PageLoader>
          </ProtectedRoute>
        ),
      },
    ],
  },

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