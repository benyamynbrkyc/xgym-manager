import { PlusIcon } from '@modulz/radix-icons';
import { useState } from 'react';
import ActionAffix from '@/components/button/ActionAffix';
import AddMemberDrawer from '@/components/Member/AddMember/AddMemberDrawer';
import MemberList from '@/components/Members/MemberList';
import useFormDrawer from '@/hooks/useFormDrawer';
import EditMemberForm from '@/components/Member/EditMember/EditMemberForm';
import { useCollection } from 'swr-firestore-v9';
import { Member } from '@/model/Member';
import AddMemberForm from '@/components/Member/AddMember/AddMemberForm';
import FormDrawer from '@/components/UI/FormDrawer';

export default function members() {
  const { data: members, error } = useCollection<Member[]>('members', {
    listen: true,
  });

  const { onClose, onOpen, open } = useFormDrawer();

  return (
    <>
      <FormDrawer open={open} onClose={onClose} title={'Dodaj člana'}>
        <AddMemberForm onCloseDrawer={onClose} />
      </FormDrawer>

      <MemberList members={members as unknown as Member[]} error={error} />
      {!open && <ActionAffix icon={<PlusIcon width={30} height={30} />} actionCb={onOpen} />}
    </>
  );
}
