import { ScrollArea } from '@mantine/core';
import { IconNotes, IconCalendarStats, IconGauge } from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import classes from './NavbarNested.module.css';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Batch Event',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Batch event register', link: '/batch-event/register' },
      { label: 'Batch event results', link: '/batch-event/results' },
      { label: 'Batch event approve', link: '/batch-event/approve' },
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
