import { ROUTER_PATHS } from 'common/constant';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Authentication } from 'components/Authentication';
import { WorkerPage } from 'pages/Worker';
import { GraphqlPage } from 'pages/Graphql';
import { DashBoard } from 'pages/DashBoard';
import { Profile } from 'pages/Profile';

export const Router = () => {
  const router = createBrowserRouter([
    // PUBLIC PATHS
    {
      path: ROUTER_PATHS.SIGNIN,
      element: <SignIn />,
    },
    {
      path: ROUTER_PATHS.SIGNUP,
      element: <SignUp />,
    },
    {
      path: ROUTER_PATHS.WORKER,
      element: <WorkerPage />,
    },
    {
      path: ROUTER_PATHS.GRAPHQL,
      element: <GraphqlPage />,
    },

    // AUTHENTICATION PATHS
    {
      path: ROUTER_PATHS.DASHBOARD.MAIN,
      element: <Authentication />,
      children: [
        {
          path: ROUTER_PATHS.DASHBOARD.MAIN,
          element: <DashBoard />,
        },
        {
          path: ROUTER_PATHS.DASHBOARD.PROFILE,
          element: <Profile />,
        },
      ],
    },

    {
      path: '*',
      element: <Navigate to={ROUTER_PATHS.DASHBOARD.MAIN} />,
    },
  ]);

  return <RouterProvider router={router} />;
};
