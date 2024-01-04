// import React from 'react';
// import { Box, Divider, NavLink, Title } from '@mantine/core';
// import { Link } from 'react-router-dom';
// import { IconGauge, IconFingerprint } from '@tabler/icons-react';

// interface NaveBarProps {
//   opened: boolean;
//   onBurgerClick: () => void;
// }

// const AppNavbar: React.FC<NaveBarProps> = ({ opened, onBurgerClick }) => {

//   return (
//     <Box
//       style={{
//         backgroundColor: 'black',
//         color: 'gray',
//         height: '100vh',
//         padding: '20px',
//       }}
//     >
//       <Title order={1} style={{ marginBottom: '5px' }}>
//         contents
//       </Title>

//       <Divider my="md" />

//       <NavLink
//         component={Link}
//         to="/first-parent-link"
//         label="First parent link"
//         leftSection={<IconGauge size="1rem" stroke={1.5} />}
//       >
//         <NavLink
//           component={Link}
//           to="/batch-event/register"
//           label="batch event register"
//         />
//         <NavLink component={Link} to="/batch-event/results" label="batch event results" />
//         <NavLink component={Link} to="/batch-event/approve" label="batch event approve" />
//       </NavLink>

//       <NavLink
//         component={Link}
//         to="/second-parent-link"
//         label="Second parent link"
//         leftSection={<IconFingerprint size="1rem" stroke={1.5} />}
//       >
//         <NavLink component={Link} to="/first-child-link" label="First child link" />
//         <NavLink component={Link} to="/second-child-link" label="Second child link" />
//         <NavLink component={Link} to="/third-child-link" label="Third child link" />
//       </NavLink>
//     </Box>
//   );
// };

// export default AppNavbar;

import { ScrollArea } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import classes from './NavbarNested.module.css';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'batch event register', link: '/batch-event/register' },
      { label: 'batch event results', link: '/batch-event/results' },
      { label: 'batch event approve', link: '/batch-event/approve' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

export default function AppNavbar() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}
