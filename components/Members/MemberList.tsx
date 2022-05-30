<<<<<<< Updated upstream
import { Table, Text } from '@mantine/core';
=======
import { Member } from '@/model/Member';
import { convertTimestampToDate } from '@/service/date';
import { Table, Text, UnstyledButton } from '@mantine/core';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
>>>>>>> Stashed changes

import { useCollection } from 'swr-firestore-v9';

export default function MemberList() {
<<<<<<< Updated upstream
  const { data: members, error } = useCollection('members', {
=======
  const router = useRouter();
  const { data: members, error } = useCollection<Member[]>('members', {
>>>>>>> Stashed changes
    listen: true,
  });

  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }
  if (!members) return <Text>Loading...</Text>;

<<<<<<< Updated upstream
  members.forEach(console.log);
=======
  const goToMemberPage = (member: Member) => {
    router.push(`/members/${member.id}`);
  };
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        {members.map((member) => (
          <tr key={member.id}>
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{member.dateOfBirth.toDate().toISOString('yyyy-mm-dd')}</td>
=======
        {(members as unknown as Member[]).map((member) => (
          <tr key={member.id} className="cursor-pointer" onClick={() => goToMemberPage(member)}>
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{convertTimestampToDate(member.dateOfBirth)}</td>
>>>>>>> Stashed changes
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
