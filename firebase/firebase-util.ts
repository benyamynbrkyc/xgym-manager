import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

export async function generateUuid() {
  const docRef = doc(firestore, 'members');
  return getDoc(docRef);
}
