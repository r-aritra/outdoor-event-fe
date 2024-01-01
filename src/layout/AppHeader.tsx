// Header.tsx
import React from 'react';
import { Burger } from '@mantine/core';

interface HeaderProps {
  opened: boolean;
  onBurgerClick: () => void;
}

const AppHeader: React.FC<HeaderProps> = ({ opened, onBurgerClick }) => {
  return (
    <div>
      <Burger opened={opened} onClick={onBurgerClick} hiddenFrom="sm" size="sm" />
      <div>Logo</div>
    </div>
  );
};

export default AppHeader;
