import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEHYYK93FW3xyLnzl9ia3wVxLkl00n6gc",
  authDomain: "book-finder-d67a8.firebaseapp.com",
  projectId: "book-finder-d67a8",
  storageBucket: "book-finder-d67a8.appspot.com",
  messagingSenderId: "160958185797",
  appId: "1:160958185797:web:b8d0bc813c230dc4dc7e2c"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();