import { Drawer, ScrollArea } from '@mantine/core';
import AddMemberForm from './AddMemberForm';

interface IProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddMemberDrawer({ opened, onClose }: IProps) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={<h1>Dodaj člana</h1>}
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
        <AddMemberForm onCloseDrawer={onClose} />
      </ScrollArea>
    </Drawer>
  );
}
