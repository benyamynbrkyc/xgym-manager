import { Drawer, ScrollArea } from '@mantine/core';

interface IProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function FormDrawer({ open, onClose, children, title }: IProps) {
  return (
    <Drawer
      opened={open}
      onClose={onClose}
      title={<h1>{title}</h1>}
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
        {children}
      </ScrollArea>
    </Drawer>
  );
}
