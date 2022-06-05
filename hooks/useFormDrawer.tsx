import { useState } from 'react';

export default function useFormDrawer() {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return {
    open,
    onClose,
    onOpen,
  };
}
