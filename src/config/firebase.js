// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwIVU0-LkUFtdtqoylXYhlpc6ZjV80JmM",
  authDomain: "ecommerce-1st.firebaseapp.com",
  projectId: "ecommerce-1st",
  storageBucket: "ecommerce-1st.appspot.com",
  messagingSenderId: "53140692622",
  appId: "1:53140692622:web:3cc896600b25deb6c4b3df",
  measurementId: "G-8XF07QQEBE"
};

console.log('firebaseConfig :>> ', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app)
const analytics = getAnalytics(app);

export {auth,firestore,storage,analytics}