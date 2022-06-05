import { Drawer, Loader } from '@mantine/core';
import { useState } from 'react';
import Member from '@/components/Member';
import EditMemberDrawer from '@/components/Member/EditMember/EditMemberDrawer';
import useMember from '@/hooks/useMember';
import EditMemberForm from '@/components/Member/EditMember/EditMemberForm';
import FormDrawer from '@/components/UI/FormDrawer';

export default function MemberView() {
  const [addMemberDrawerOpened, setAddMemberDrawerOpened] = useState(false);

  const onCloseDrawer = () => {
    setAddMemberDrawerOpened(false);
  };

  const { member, error } = useMember();

  if (error) return <p>An error occurred.</p>;

  if (!member) return <Loader />;

  return (
    <>
      <FormDrawer title="Uredi člana" opened={addMemberDrawerOpened} onClose={onCloseDrawer}>
        <EditMemberForm onCloseDrawer={onCloseDrawer} member={member} />
      </FormDrawer>

      <Member member={member} onEditDrawerOpen={() => setAddMemberDrawerOpened(true)} />
    </>
  );
}
