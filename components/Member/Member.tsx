import { Member } from '@/model/Member';
import { convertTimestampToDate } from '@/service/date';
import { Center, Paper, Space, Table, Title, Image, UnstyledButton } from '@mantine/core';
import { Edit } from 'tabler-icons-react';
import General from './Details/General';

interface IProps {
  member: Member;
  onEditDrawerOpen: () => void;
}

export default function MemberComponent({ member, onEditDrawerOpen }: IProps) {
  return (
    <>
      <Paper className="transition-all rounded" p={20}>
        {/* image */}
        <Center className="flex flex-col justify-center relative">
          <UnstyledButton onClick={onEditDrawerOpen}>
            <Edit
              className="absolute right-0 top-0 hover:text-red-500 transition-all "
              height={25}
              width={25}
            />
          </UnstyledButton>
          <Image src={member.imgUrl} width={200} height={200} radius={100} />
          <Space h="lg" />
          <Title order={2} className="text-2xl">
            {member.firstName} {member.lastName}
          </Title>
        </Center>
        <Space h="lg" />
        {/* details */}
      </Paper>
      <Space h="lg" />
      <Paper className="rounded">
        <General member={member} />
      </Paper>
    </>
  );
}
