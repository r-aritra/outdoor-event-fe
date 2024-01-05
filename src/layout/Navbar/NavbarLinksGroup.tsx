/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const { t } = useTranslation();

  const items = (hasLinks ? links : []).map((link) => (
    <Link to={link.link} className={classes.link} key={link.label}>
      {t(`appNavbar.${link.label}`)}
    </Link>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{t(`appNavbar.${label}`)}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
