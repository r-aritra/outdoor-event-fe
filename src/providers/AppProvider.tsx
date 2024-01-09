import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Login from '../features/Login/components/pages/Login';
import Signup from '../features/Signup/components/pages/Signup';
import BatchEventApprove from '../features/BatchEventApprove/components/pages/BatchEventApprove';
import BatchEventRegister from '../features/BatchEventRegister/components/pages/BatchEventRegister';
import BatchEventResults from '../features/BatchEventResults/BatchEventResults';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const isAuthenticated = localStorage.getItem('accessToken');

const batchEventRoutes = [
  {
    path: 'batch-event/results',
    element: <BatchEventResults />,
  },
  {
    path: 'batch-event/register',
    element: <BatchEventRegister />,
  },
  {
    path: 'batch-event/approve',
    element: <BatchEventApprove />,
  },
];

const router = createBrowserRouter(
  isAuthenticated
    ? [
        {
          path: '/',
          element: <AppLayout />,
          children: batchEventRoutes,
        },
      ]
    : [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
      ],
);

export const AppProvider: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
};
