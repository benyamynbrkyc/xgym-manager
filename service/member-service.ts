import { setDoc, doc } from '@firebase/firestore';
import type { Member } from '@/model/Member';
import { firestore } from '@/firebase/config';

export const saveMember = async (member: Member, id: string) => {
  await setDoc(doc(firestore, 'members', id), member);
  console.log('Saved new member to firestore', member);
};

export const filterMembers = (members: Member[], query: string) => {
  if (query.length === 0) {
    return members;
  }

  const filteredMembers = members.filter((member) => {
    console.log('member.memberDisplayId', member.memberDisplayId.toLowerCase());
    console.log('query', query.toLowerCase());
    return member.memberDisplayId.toLowerCase().includes(query.toLowerCase());
  });
  return filteredMembers;
};
