// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-AMMYNleFJRA1InbduCopsurewVsRa_4",
  authDomain: "inventory-management-f4af0.firebaseapp.com",
  projectId: "inventory-management-f4af0",
  storageBucket: "inventory-management-f4af0.appspot.com",
  messagingSenderId: "176817972260",
  appId: "1:176817972260:web:b64f8e9e8baa4409cea4b1",
  measurementId: "G-DEQ9PZ9FTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export {firestore}