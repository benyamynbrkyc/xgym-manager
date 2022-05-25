import { atom } from 'recoil';
import type { NavLink } from '@/components/button/NavLink';

interface IPageInfo extends NavLink {}

export const activePageAtom = atom<IPageInfo>({
  key: 'activePage',
  default: {
    href: '/members',
    name: 'Članovi',
  },
});
