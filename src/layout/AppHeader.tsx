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
        <Image src={'/src/layout/logo.png'} height={'40'} width={'200'} alt="logo" />
        <Divider size="sm" orientation="vertical" style={{ margin: '10px' }} />
        <Text fz="lg">batch event title </Text>
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
