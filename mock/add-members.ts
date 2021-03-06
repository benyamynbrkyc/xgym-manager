import { faker } from '@faker-js/faker';

import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

export async function addMembers(n: number = 1) {
  const members = [];

  for (let i = 0; i < n; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const member = {
      firstName,
      lastName,
      dateOfBirth: faker.date.between('1970-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z'),
      imgUrl: faker.image.avatar(),
      memberDisplayId: firstName + '-' + lastName + '-' + faker.random.numeric(5),
    };
    members.push(member);
  }
  members.forEach((member) => {
    addDoc(collection(firestore, 'members'), member);
  });
}
