import { AppShell } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layout/Navbar';
import Title from '@/components/layout/Title';
import { activePageAtom } from '@/state/page';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const router = useRouter();
  const [, setActivePage] = useRecoilState(activePageAtom);
  const [opened] = useState(false);

  useEffect(() => {
    if (router.pathname === '/members') {
      setActivePage({
        href: router.pathname,
        name: 'Članovi',
      });
    }

    if (router.pathname === '/visits') {
      setActivePage({
        href: router.pathname,
        name: 'Posjete',
      });
    }
  }, [router.pathname]);

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
      {children}
    </AppShell>
  );
}
