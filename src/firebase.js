import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
  apiKey: "AIzaSyAAkjxOuA92rSBX82hr8_3MAx8CgtwT_7g",
  authDomain: "devebay-e7631.firebaseapp.com",
  projectId: "devebay-e7631",
  storageBucket: "devebay-e7631.appspot.com",
  messagingSenderId: "619367701794",
  appId: "1:619367701794:web:64390754355178050a997b",
  measurementId: "G-E590S17SB2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth;
export default firebase;