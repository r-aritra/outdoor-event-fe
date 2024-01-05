import React, { Suspense } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import AppHeader from './header/AppHeader';
import AppNavbar from './Navbar/AppNavbar';
import { AppLoading } from './Loading';
import { Notifications } from '@mantine/notifications';

function AppLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: { lg: 250 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={desktopOpened} onBurgerClick={toggleDesktop} />
      </AppShell.Header>
      <AppShell.Navbar>
        <AppNavbar />
      </AppShell.Navbar>
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
