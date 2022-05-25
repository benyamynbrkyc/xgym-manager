import { faker } from '@faker-js/faker';

import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

export async function addMembers(n: number = 1) {
  const members = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; i++) {
    const member = {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      born: faker.datatype.number({
        min: 1900,
        max: 2019,
      }),
    };
    members.push(member);
  }
  members.forEach((member) => {
    addDoc(collection(firestore, 'members'), member);
  });
}
