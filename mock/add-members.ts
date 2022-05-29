import { faker } from '@faker-js/faker';

import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

export async function addMembers(n: number = 1) {
  const members = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; i++) {
    const member = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: faker.date.between('1970-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z'),
    };
    members.push(member);
  }
  members.forEach((member) => {
    addDoc(collection(firestore, 'members'), member);
  });
}
