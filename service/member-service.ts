import { setDoc, doc } from '@firebase/firestore';
import type { Member } from '@/model/Member';
import { firestore } from '@/firebase/config';

export const saveMember = async (member: Member, id: string) => {
  await setDoc(doc(firestore, 'members', id), member);
};

export const filterMembers = (members: Member[], query: string) => {
  if (query.length === 0) {
    return members;
  }

  const filteredMembers = members.filter((member) => {
    return member.memberDisplayId.toLowerCase().includes(query.toLowerCase());
  });
  return filteredMembers;
};
