import { Table, Text } from '@mantine/core';

import { useCollection } from 'swr-firestore-v9';

export default function MemberList() {
  const { data: members, error } = useCollection('members', {
    listen: true,
  });

  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }
  if (!members) return <Text>Loading...</Text>;

  members.forEach(console.log);

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
        {members.map((member) => (
          <tr key={member.id}>
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{member.dateOfBirth.toDate().toISOString('yyyy-mm-dd')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
