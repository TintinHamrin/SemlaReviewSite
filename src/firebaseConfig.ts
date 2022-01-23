// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDs-9aw--7SZNRst3ttwh3QZ1vXJAxReLg",
  authDomain: "semla-2bc88.firebaseapp.com",
  projectId: "semla-2bc88",
  storageBucket: "semla-2bc88.appspot.com",
  messagingSenderId: "223356139953",
  appId: "1:223356139953:web:02f24e6e04efba0997e590",
  measurementId: "G-NH1C7QEFMV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const semlaRef = collection(db, 'semla');
export const analytics = getAnalytics(app);

//storage 
const storage = getStorage();
export async function uploadImage(reviewId: string, file: any) {
  const fileRef = ref(storage, `/reviews/${reviewId}.png`);
  const snapshot = await uploadBytes(fileRef, file);
}