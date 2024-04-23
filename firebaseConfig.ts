import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions =  {
  apiKey: "AIzaSyDfGh48mX9vEP_niWfeayvr6dCinhk_Oa0",
  authDomain: "kalamazoo-admin-panel.firebaseapp.com",
  projectId: "kalamazoo-admin-panel",
  storageBucket: "kalamazoo-admin-panel.appspot.com",
  messagingSenderId: "329315281767",
  appId: "1:329315281767:web:12f9c12cbe71ce26aaddc2"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
