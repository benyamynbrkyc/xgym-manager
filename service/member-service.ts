import { setDoc, doc } from '@firebase/firestore';
import type { Member } from '@/model/Member';
import { firestore } from '@/firebase/config';

export const saveMember = async (member: Member) => {
  await setDoc(doc(firestore, 'members'), member);
  console.log('Saved new member to firestore', member);
};
