// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj8ykzkfOkzsx4edwnSSwOoEX-Fz6P8qw",
  authDomain: "leohonprojectthree.firebaseapp.com",
  databaseURL: "https://leohonprojectthree-default-rtdb.firebaseio.com",
  projectId: "leohonprojectthree",
  storageBucket: "leohonprojectthree.appspot.com",
  messagingSenderId: "674466442053",
  appId: "1:674466442053:web:aaa16b466f9954eda4ec2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app