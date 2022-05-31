import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator, getStorage, ref } from '@firebase/storage';
import { Fuego } from 'swr-firestore-v9';

const config = {
  apiKey: 'AIzaSyAEuNtwGeGz4UUKrxfiOdjHw4z5drK1coQ',
  authDomain: 'xgym-manager.firebaseapp.com',
  projectId: 'xgym-manager',
  storageBucket: 'xgym-manager.appspot.com',
  messagingSenderId: '485131415296',
  appId: '1:485131415296:web:62aba2bdecc74f8fdc8de5',
  measurementId: 'G-DJBTSG75P0',
};

const app = initializeApp(config);

const fuego = new Fuego(config);

const firestore = getFirestore();

const storage = getStorage(app);
const storageRef = ref(storage);

if (process.env.NEXT_PUBLIC_ENV === 'development') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}

export { firestore, fuego, storageRef, storage };
