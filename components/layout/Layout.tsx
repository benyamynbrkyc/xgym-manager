import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layout/Navbar';
import Title from '@/components/layout/Title';
import TransitionProvider from './TransitionProvider';
import useActiveRoute from '@/hooks/useActiveRoute';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const router = useRouter();

  const [opened] = useState(false);

  useActiveRoute();

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
