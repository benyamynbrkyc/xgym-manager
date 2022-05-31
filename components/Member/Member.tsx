import useMember from '@/hooks/useMember';
import { convertTimestampToDate } from '@/service/date';
import { Center, Container, Loader, Paper, Space, Table, Title, Image } from '@mantine/core';

export default function Member() {
  const { member, error } = useMember();

  if (error) return 'An error occurred.';

  if (!member) return <Loader />;

  return (
    <Paper className="transition-all" p={20}>
      <Center className="flex flex-col justify-center">
        <Image src={member.imgUrl} width={200} height={200} className="rounded-full" />
        <Space h={'lg'} />
        <Title order={2} className="text-2xl">
          {member.firstName + ' ' + member.lastName}
        </Title>
      </Center>

      <Space h={'lg'} />
      <Table striped fontSize={'lg'}>
        <tbody>
          <tr>
            <td>Prezime</td>
            <td>{member.lastName}</td>
          </tr>
          <tr>
            <td>Ime</td>
            <td>{member.firstName}</td>
          </tr>
          <tr>
            <td>Datum rođenja</td>
            <td>{convertTimestampToDate(member.dateOfBirth)}</td>
          </tr>
          <tr>
            <td>Spol</td>
            <td>{member.gender?.toString()}</td>
          </tr>
          <tr>
            <td>Broj licne</td>
            <td>{member.idCardNumber}</td>
          </tr>
          <tr>
            <td>Adresa</td>
            <td>{member.address}</td>
          </tr>
          <tr>
            <td>Telefon</td>
            <td>{member.phone}</td>
          </tr>
          <tr>
            <td>Grupa</td>
            <td>{member.group}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{member.email}</td>
          </tr>
          <tr>
            <td>Trener</td>
            <td>{member.trainer}</td>
          </tr>
          <tr>
            <td>Paket</td>
            <td>{member.package}</td>
          </tr>
          <tr>
            <td>Info</td>
            <td>{member.info}</td>
          </tr>
        </tbody>
      </Table>
    </Paper>
  );
}
