// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDs-9aw--7SZNRst3ttwh3QZ1vXJAxReLg",
  authDomain: "semla-2bc88.firebaseapp.com",
  projectId: "semla-2bc88",
  storageBucket: "semla-2bc88.appspot.com",
  messagingSenderId: "223356139953",
  appId: "1:223356139953:web:02f24e6e04efba0997e590",
  measurementId: "G-NH1C7QEFMV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const reviewRef = collection(db, "reviews");
export const analytics = getAnalytics(app);

//auth
export const auth = getAuth(app)