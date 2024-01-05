import { ScrollArea } from '@mantine/core';
import { IconNotes, IconCalendarStats, IconGauge } from '@tabler/icons-react';
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
  {
    label: 'releases',
    icon: IconCalendarStats,
    links: [
      { label: 'upcomingReleases', link: '/' },
      { label: 'previousReleases', link: '/' },
      { label: 'releasesSchedule', link: '/' },
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
