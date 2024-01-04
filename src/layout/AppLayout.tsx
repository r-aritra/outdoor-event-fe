import React, { Suspense } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import AppHeader from './header/AppHeader';
import AppNavbar from './Navbar/AppNavbar';
import { AppLoading } from './Loading';
import { Notifications } from '@mantine/notifications';

function AppLayout() {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={
        opened
          ? {
              width: { sm: 200, lg: 300 },
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }
          : undefined
      }
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={opened} onBurgerClick={toggle} />
      </AppShell.Header>

      {opened ? (
        <AppShell.Navbar>
          <AppNavbar />
        </AppShell.Navbar>
      ) : null}

      <AppShell.Main>
        <Suspense fallback={<AppLoading />}>
          <Notifications />
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;
