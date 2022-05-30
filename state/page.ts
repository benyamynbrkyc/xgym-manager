import { atom } from 'recoil';

interface IPageInfo {
  href: string;
  name: string;
  backButton: boolean;
}

export const activePageAtom = atom<IPageInfo>({
  key: 'activePage',
  default: {
    href: '/members',
    name: 'Članovi',
    backButton: false,
  },
});
