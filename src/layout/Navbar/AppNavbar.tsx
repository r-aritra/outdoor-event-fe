import { ScrollArea } from '@mantine/core';
import { IconNotes, IconGauge } from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import classes from './NavbarNested.module.css';

const mockdata = [
  { label: 'dashboard', icon: IconGauge },
  {
    label: 'batchEvent',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'batchEventRegister', link: '/batch-event/register' },
      { label: 'batchEventResults', link: '/batch-event/results' },
      { label: 'batchEventApprove', link: '/batch-event/approve' },
    ],
  },
];

const AppNavbar: React.FC = () => {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav
      className={classes.navbar}
      style={{ backgroundColor: '#1B1E28', height: '100vh', color: 'white' }}
    >
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
};

export default AppNavbar;
