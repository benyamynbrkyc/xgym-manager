import { Member } from '@/model/Member';
import { activePageAtom } from '@/state/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useDocument } from 'swr-firestore-v9';

export default function useMember() {
  const router = useRouter();
  const { memberId } = router.query;

  const { data: member, error } = useDocument(`members/${memberId}`);

  const [page, setPage] = useRecoilState(activePageAtom);
  useEffect(() => {
    if (member) {
      setPage({
        href: '/members',
        name: member.firstName + ' ' + member.lastName,
        backButton: true,
      });
    }
  }, [member]);

  return { member: member as Member, error };
}
