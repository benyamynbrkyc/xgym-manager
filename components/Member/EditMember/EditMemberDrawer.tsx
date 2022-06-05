import { Member } from '@/model/Member';
import { Drawer, ScrollArea } from '@mantine/core';
import EditMemberForm from './EditMemberForm';

interface IProps {
  opened: boolean;
  onClose: () => void;
  member: Member;
}

export default function EditMemberDrawer({ opened, onClose, member }: IProps) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={<h1>Uredi člana</h1>}
      padding="xl"
      size="xl"
      position="right"
    >
      <ScrollArea
        style={{
          height: '90%',
          paddingRight: '15px',
        }}
      >
        <EditMemberForm onCloseDrawer={onClose} member={member} />
      </ScrollArea>
    </Drawer>
  );
}
