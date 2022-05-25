import { PlusIcon } from '@modulz/radix-icons';
import { useState } from 'react';
import ActionAffix from '@/components/ActionAffix';
import AddMemberDrawer from '@/components/Members/AddMember/AddMemberDrawer';
import MemberList from '@/components/Members/MemberList';

export default function members() {
  const [addMemberDrawerOpened, setAddMemberDrawerOpened] = useState(false);

  return (
    <>
      <AddMemberDrawer
        opened={addMemberDrawerOpened}
        onClose={() => setAddMemberDrawerOpened(false)}
      />
      <MemberList />
      {!addMemberDrawerOpened && (
        <ActionAffix
          icon={<PlusIcon width={30} height={30} />}
          actionCb={() => setAddMemberDrawerOpened(true)}
        />
      )}
    </>
  );
}
