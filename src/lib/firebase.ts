// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHEDmG5lLNqS61m_RqgvU7Ly2kQAHextI",
  authDomain: "character-creator-46d76.firebaseapp.com",
  projectId: "character-creator-46d76",
  storageBucket: "character-creator-46d76.appspot.com",
  messagingSenderId: "867795390643",
  appId: "1:867795390643:web:c97a6f0ac36454f5c820c6",
  databaseURL: "https://character-creator-46d76-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export const db = getFirestore(app);
export const storage = getStorage(app);