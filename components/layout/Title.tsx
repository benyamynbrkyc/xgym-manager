import { Group, Title } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { activePageAtom } from '@/state/page';

export default function _Title(): JSX.Element {
  const [activePage] = useRecoilState(activePageAtom);

  return (
    <Group className="w-full">
      <Title order={1} className="select-none italic" pt="xs" mb={40}>
        {activePage.name}
      </Title>
    </Group>
  );
}
