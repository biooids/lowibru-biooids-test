// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lowibru-biooids-test-4388a.firebaseapp.com",
  projectId: "lowibru-biooids-test-4388a",
  storageBucket: "lowibru-biooids-test-4388a.appspot.com",
  messagingSenderId: "825807251430",
  appId: "1:825807251430:web:60fd7cf907ba719bea1827",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
