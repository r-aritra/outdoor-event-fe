// Header.tsx
import React from 'react';
import { Burger, Divider, Image, Text } from '@mantine/core';

interface HeaderProps {
  opened: boolean;
  onBurgerClick: () => void;
}

const AppHeader: React.FC<HeaderProps> = ({ opened, onBurgerClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Burger opened={opened} onClick={onBurgerClick} color={'#A6A7AB'} />
        <Image
          src={'/src/layout/header/logo.png'}
          height={'40'}
          width={'200'}
          alt="logo"
          style={{ marginLeft: '10px' }}
        />
        <Divider
          size="sm"
          orientation="vertical"
          style={{ marginLeft: '10px', marginRight: '10px' }}
        />
        <Text size="xl" fw={500}>
          Batch Event Register Dashboard{' '}
        </Text>
      </div>

      <div>
        <div>
          <Text fz="sm" ta="right" ml={8}>
            rutvik
          </Text>
        </div>
        USerID : 304
      </div>
    </div>
  );
};

export default AppHeader;
