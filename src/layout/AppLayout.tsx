import React from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';

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
              //   collapsed: { mobile: false },
            }
          : undefined
      }
      padding="md"
      layout="alt"
    >
      <AppShell.Header>
        <AppHeader opened={opened} onBurgerClick={toggle} />
      </AppShell.Header>

      {opened ? (
        <AppShell.Navbar zIndex={300}>
          <AppNavbar opened={opened} onBurgerClick={toggle} />
        </AppShell.Navbar>
      ) : null}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;
