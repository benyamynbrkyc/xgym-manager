import { Member } from '@/model/Member';
import { convertTimestampToDate } from '@/service/date';
import { Table, Text, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/router';

import { useCollection } from 'swr-firestore-v9';

export default function MemberList() {
  const router = useRouter();
  const { data: members, error } = useCollection<Member[]>('members', {
    listen: true,
  });

  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }
  if (!members) return <Text>Loading...</Text>;

  const goToMemberPage = (member: Member) => {
    router.push(`/members/${member.id}`);
  };

  return (
    <Table striped highlightOnHover verticalSpacing="lg" fontSize="md">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Born</th>
        </tr>
      </thead>
      <tbody>
        {(members as unknown as Member[]).map((member) => (
          <tr key={member.id} className="cursor-pointer" onClick={() => goToMemberPage(member)}>
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{convertTimestampToDate(member.dateOfBirth)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
