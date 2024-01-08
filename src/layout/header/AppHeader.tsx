// Header.tsx
import React from 'react';
import { Burger, Divider, Image, Menu, Text, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLanguage } from '@tabler/icons-react';
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          {t('appHeader.dashboard')}
        </Text>
      </div>

      <div style={{ display: 'flex', width: '170px', justifyContent: 'space-between' }}>
        <Menu shadow="md" width={100}>
          <Menu.Target>
            <IconLanguage size={40} color="#A6A7AB" />
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
