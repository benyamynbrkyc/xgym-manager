import { AppShell } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layout/Navbar';
import Title from '@/components/layout/Title';
import { activePageAtom } from '@/state/page';
import TransitionProvider from './TransitionProvider';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const router = useRouter();
  const [activePage, setActivePage] = useRecoilState(activePageAtom);
  const [opened] = useState(false);

  useEffect(() => {
    if (router.pathname == '/members') {
      setActivePage({
        backButton: false,
        href: router.pathname,
        name: 'Članovi',
      });
    } else if (router.pathname == '/members/[memberId]') {
      setActivePage({
        ...activePage,
        backButton: true,
      });
    } else if (router.pathname.includes('/visits')) {
      setActivePage({
        ...activePage,
        href: router.pathname,
        name: 'Posjete',
      });
    }
  }, [router.route]);

  return (
    <AppShell
      fixed
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={<Navbar opened={opened} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Title />
      <TransitionProvider router={router}>{children}</TransitionProvider>
    </AppShell>
  );
}
