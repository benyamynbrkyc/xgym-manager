import { Member } from '@/model/Member';
import { convertTimestampToDate } from '@/service/date';
import { filterMembers } from '@/service/member-service';
import { Center, Table, Text, UnstyledButton, Image, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useCollection } from 'swr-firestore-v9';

export default function MemberList() {
  const router = useRouter();
  const { data: members, error } = useCollection<Member[]>('members', {
    listen: true,
  });
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Member[]>([]);

  useEffect(() => {
    console.log(members);
    setFiltered(filterMembers(members as unknown as Member[], query));
  }, [query, members]);

  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  if (!members) return <Text>Loading...</Text>;

  if (members.length === 0) {
    return (
      <Text>Nema članova. Kliknite ikonu + u donjem dijelu ekrana da bi dodali novog člana.</Text>
    );
  }

  const goToMemberPage = (member: Member) => {
    router.push(`/members/${member.id}`);
  };

  return (
    <>
      <TextInput
        label="Pretraga"
        value={query}
        variant="default"
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <Table striped highlightOnHover verticalSpacing="lg" fontSize="md">
        <thead>
          <tr>
            <th>Slika</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Born</th>
          </tr>
        </thead>
        <tbody>
          {filtered?.map((member) => (
            <tr key={member.id} className="cursor-pointer" onClick={() => goToMemberPage(member)}>
              <td>
                <Image radius={100} src={member.imgUrl} width={50} />
              </td>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{convertTimestampToDate(member.dateOfBirth)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
