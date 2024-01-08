import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Movie from './pages/Movie.tsx';
import AddMovie from './pages/AddMovie.tsx';
import EditMovie from './pages/EditMovie.tsx';
import { movieLoader } from './helpers/loaders.ts';
import IndexPage from './pages/IndexPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexPage />
      },
      {
        path: "movies/:movieId",
        element: <Movie />,
        loader: movieLoader,
      },
      {
        path: "movies/:movieId/edit",
        element: <EditMovie />,
        loader: movieLoader,
      },
      {
        path: "movies/add",
        element: <AddMovie />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
