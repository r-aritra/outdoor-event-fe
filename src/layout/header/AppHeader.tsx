// Header.tsx
import React from 'react';
import { Burger, Divider, Image, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import './AppHeader.css';

interface HeaderProps {
  opened: boolean;
  onBurgerClick: () => void;
  onMobileBurgerClick: () => void;
}

const AppHeader: React.FC<HeaderProps> = ({
  opened,
  onBurgerClick,
  onMobileBurgerClick,
}) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px',
        alignItems: 'center',
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Burger
          opened={opened}
          onClick={() => {
            window.innerWidth < 550 ? onMobileBurgerClick() : onBurgerClick();
          }}
          color={'#A6A7AB'}
        />
        <Image
          src={'/src/layout/header/jare.png'}
          height={'40'}
          width={'auto'}
          alt="logo"
        />
        <Divider size="sm" orientation="vertical" style={{ marginRight: '1rem' }} />
        <div className="name">
          <Text size="lg" fw={500}>
            {t('appHeader.dashboard')}
          </Text>
        </div>
      </div>

      <div>
        <div>
          <Text fz="sm" ta="right" ml={8}>
            rutvik
          </Text>
        </div>
        {t('appHeader.userId')}: 304
      </div>
    </div>
  );
};

export default AppHeader;
