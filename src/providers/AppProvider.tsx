import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Login from '../features/Login/Login';
import Signup from '../features/Signup/Signup';
import BatchEventApprove from '../features/BatchEventApprove/BatchEventApprove';
import BatchEventRegister from '../features/BatchEventRegister/BatchEventRegister';
import BatchEventResults from '../features/BatchEventResults/BatchEventResults';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const isAuthenticated = true;

const batchEventRoutes = [
  {
    path: 'batch-event/results',
    element: <BatchEventApprove />,
  },
  {
    path: 'batch-event/register',
    element: <BatchEventRegister />,
  },
  {
    path: 'batch-event/approve',
    element: <BatchEventResults />,
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
