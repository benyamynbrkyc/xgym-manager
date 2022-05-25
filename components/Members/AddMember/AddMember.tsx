import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

export default function AddMember() {
  async function addMember() {
    try {
      const ref = await addDoc(collection(firestore, 'members'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      });
      console.log('doc written with id: ', ref.id);
    } catch (e) {
      console.error('error adding document: ', e);
    }
  }

  return (
    <div>
      <button type="button" onClick={addMember}>
        add member
      </button>
    </div>
  );
}
