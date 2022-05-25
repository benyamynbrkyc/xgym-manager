import { Affix, Center, UnstyledButton } from '@mantine/core';

interface IProps {
  icon: JSX.Element;
  actionCb?: () => void;
}

export default function ActionAffix({ icon, actionCb }: IProps) {
  return (
    <Affix position={{ bottom: 40, right: 40 }} className="h-14 w-14 rounded-full bg-blue-500">
      <Center className="h-full w-full">
        <UnstyledButton onClick={actionCb}>{icon}</UnstyledButton>
      </Center>
    </Affix>
  );
}
