// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHF7RDPhORq-8ahsgphycfsLX3H-60RMc",
  authDomain: "cvbuilder-74de4.firebaseapp.com",
  projectId: "cvbuilder-74de4",
  storageBucket: "cvbuilder-74de4.appspot.com",
  messagingSenderId: "747413847781",
  appId: "1:747413847781:web:c7a4e49d9ad22c730f5e0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage= getStorage(app);


export {storage}