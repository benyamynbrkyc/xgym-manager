import { Timestamp } from '@firebase/firestore';

export enum Gender {
  FEMALE = 'f',
  MALE = 'm',
}

export type Member = {
  id?: string;
  memberDisplayId: string;
  lastName: string;
  firstName: string;
  idCardNumber: string;
  dateOfBirth: Timestamp;
  gender: Gender;
  address: string;
  phone: string;
  group: string; // todo: add group type
  email: string;
  trainer: string; // todo: add trainer type
  info: string;
  imgUrl: string;
  package: string; // todo: add array of packages
};
