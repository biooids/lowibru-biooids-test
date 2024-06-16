// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lowibru-biooids-test-df4e6.firebaseapp.com",
  projectId: "lowibru-biooids-test-df4e6",
  storageBucket: "lowibru-biooids-test-df4e6.appspot.com",
  messagingSenderId: "144358110513",
  appId: "1:144358110513:web:9af997996d38cbab5f2c10",
};

// Initialize Firebase
console.log(import.meta.env.VITE_FIREBASE_API_KEY);

export const app = initializeApp(firebaseConfig);
