import { Member } from '@/model/Member';
import { convertTimestampToDate } from '@/service/date';
import { Table } from '@mantine/core';

export default function General({ member }: { member: Member }) {
  return (
    <Table striped fontSize="lg" verticalSpacing="md">
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
          <td className="max-w-[100px] break-words">{member.address}</td>
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
  );
}
