import React from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Route, Routes } from 'react-router-dom';

import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';
import BatchEventApprove from '../features/BatchEventApprove/BatchEventApprove';
import BatchEventRegister from '../features/BatchEventRegister/BatchEventRegister';
import BatchEventResults from '../features/BatchEventResults/BatchEventResults';
import Home from '../features/Home/Home';

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
        <Routes>
          <Route path="/batch-event/results" index element={<BatchEventApprove />} />
          <Route path="/batch-event/register" element={<BatchEventRegister />} />
          <Route path="/batch-event/approve" element={<BatchEventResults />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;