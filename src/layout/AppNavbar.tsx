import React from 'react';
import { Box, Divider, NavLink, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconGauge, IconFingerprint } from '@tabler/icons-react';

interface NaveBarProps {
  opened: boolean;
  onBurgerClick: () => void;
}

const AppNavbar: React.FC<NaveBarProps> = ({ opened, onBurgerClick }) => {
  return (
    <Box
      style={{
        backgroundColor: 'black',
        color: 'gray',
        height: '100vh',
        padding: '20px',
      }}
    >
      <Title order={1} style={{ marginBottom: '5px' }}>
        contents
      </Title>

      <Divider my="md" />

      <NavLink
        component={Link}
        to="/first-parent-link"
        label="First parent link"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
      >
        <NavLink
          component={Link}
          to="/batch-event/register"
          label="batch event register"
        />
        <NavLink component={Link} to="/batch-event/results" label="batch event results" />
        <NavLink component={Link} to="/batch-event/approve" label="batch event approve" />
      </NavLink>

      <NavLink
        component={Link}
        to="/second-parent-link"
        label="Second parent link"
        leftSection={<IconFingerprint size="1rem" stroke={1.5} />}
      >
        <NavLink component={Link} to="/first-child-link" label="First child link" />
        <NavLink component={Link} to="/second-child-link" label="Second child link" />
        <NavLink component={Link} to="/third-child-link" label="Third child link" />
      </NavLink>
    </Box>
  );
};

export default AppNavbar;
