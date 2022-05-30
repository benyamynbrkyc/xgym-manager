import Image from 'next/image';
import { Button, Group, Navbar, Space, Stack, Text } from '@mantine/core';

import type { NavLink as NavLinkType } from '@/components/button/NavLink';
import NavLink from '@/components/button/NavLink';
import { addMembers } from '@/mock/add-members';

const links: NavLinkType[] = [
  {
    href: '/members',
    name: 'Members',
  },
  {
    href: '/visits',
    name: 'Visits',
  },
];

export default function Nav({ opened }: { opened: boolean }) {
  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ base: 300 }}
      p="xs"
      className="h-screen"
      fixed
    >
      <Group p="xs" className="shadow-lg" mb={12}>
        <Image src="/logo.png" width={48} height={48} />
        <Text size="xl" className="select-none italic" weight="bold">
          XGYM Manager
        </Text>
      </Group>
      {/* navlink */}
      <Stack spacing={10}>
        {links.map((link) => (
          <NavLink link={link} key={link.href} />
        ))}
      </Stack>

      {/*  todo: delete */}
      <Space h="lg" />
      <Button fullWidth={false} variant="subtle" onClick={() => addMembers(2)}>
        add mock data
      </Button>
    </Navbar>
  );
}
