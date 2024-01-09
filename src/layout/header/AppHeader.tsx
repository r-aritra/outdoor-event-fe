// Header.tsx
import React from 'react';
import { Burger, Divider, Image, Menu, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLanguage } from '@tabler/icons-react';
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
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

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

      <div
        style={{
          display: 'flex',
          width: '10rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Menu shadow="md" width={100}>
          <Menu.Target>
            <IconLanguage size={30} color="#454545" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => changeLanguage('en')}>English</Menu.Item>
            <Menu.Item onClick={() => changeLanguage('ja')}>Japanese</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <div>
          <div>
            <Text fz="sm" ta="right" ml={8}>
              rutvik
            </Text>
          </div>
          {t('appHeader.userId')}: 304
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
