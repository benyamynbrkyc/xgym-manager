import { Timestamp } from 'firebase/firestore';

export const convertTimestampToDate = (timestamp: Timestamp): string =>
  timestamp?.toDate().toLocaleDateString('bs-Latn-BA');
