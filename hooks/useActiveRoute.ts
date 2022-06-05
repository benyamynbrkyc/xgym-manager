import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { activePageAtom } from '@/state/page';
import { useEffect } from 'react';

export default function useActiveRoute() {
  const router = useRouter();
  const [activePage, setActivePage] = useRecoilState(activePageAtom);

  useEffect(() => {
    switch (true) {
      case router.pathname == '/members':
        setActivePage({
          backButton: false,
          href: router.pathname,
          name: 'Članovi',
        });
        break;

      case router.pathname == '/members/[memberId]':
        setActivePage({
          ...activePage,
          backButton: true,
        });
        break;

      case router.pathname.includes('/visits'):
        setActivePage({
          ...activePage,
          href: router.pathname,
          name: 'Posjete',
        });
        break;

      case router.pathname.includes('/trainers'):
        setActivePage({
          ...activePage,
          href: router.pathname,
          name: 'Treneri',
        });
        break;

      default:
        router.push('/');
        break;
    }
  }, [router.route]);
}
