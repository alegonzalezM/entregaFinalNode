import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: "dals-dd620",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: "367759472220",
    appId: process.env.FIREBASE_APP_ID
  };

  const app= initializeApp(firebaseConfig); //inicializa firebase
  const db = getFirestore(app); //inicializa firestore

  const auth = getAuth(app); // Inicializa autenticación de Firebase

  export { db, auth };
  