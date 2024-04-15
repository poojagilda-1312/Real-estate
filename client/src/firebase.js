// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-ac2b8.firebaseapp.com",
  projectId: "real-estate-ac2b8",
  storageBucket: "real-estate-ac2b8.appspot.com",
  messagingSenderId: "673006764704",
  appId: "1:673006764704:web:79dc751f1870c0cb7cbfc5"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);