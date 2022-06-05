import { UnstyledButton, Text } from '@mantine/core';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { CSSProperties } from 'react';
import { activePageAtom } from '@/state/page';

export type NavLink = {
  href: string;
  name: string;
};

export default function NavLink({ link }: { link: NavLink }) {
  const [activePage] = useRecoilState(activePageAtom);

  function applyBorderStyle() {
    if (link.href === activePage.href) {
      return {
        borderRight: 'solid #ef4444 4px',
      };
    }

    return undefined;
  }

  return (
    <Link href={link.href} key={link.href} passHref>
      <UnstyledButton
        component="a"
        style={applyBorderStyle() as CSSProperties}
        className="w-full rounded transition-all hover:bg-red-500 hover:font-bold hover:text-black"
        p={8}
      >
        <Text size="lg" align="left">
          {link.name}
        </Text>
      </UnstyledButton>
    </Link>
  );
}
