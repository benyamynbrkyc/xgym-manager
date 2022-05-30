import { Button, Group, Title } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { activePageAtom } from '@/state/page';
import BackButton from './BackButton';

export default function _Title(): JSX.Element {
  const [activePage] = useRecoilState(activePageAtom);

  return (
    <Group className="w-full" align={'center'} mb={40}>
      {activePage.backButton && <BackButton pathname="/members" />}
      <Title order={1} className="select-none italic">
        {activePage.name}
      </Title>
    </Group>
  );
}
