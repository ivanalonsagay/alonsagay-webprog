import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// HomePage Structure
import Layout from './components/Layout';
import ArticlePage from './pages/ArticlePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
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
        element: <ArticlePage />,
      },
      {
        path: 'articles/:id',
        element: <ArticleDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;