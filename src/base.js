import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDZlBdMU8wYuFfLTNixJ0VpdZsrg7G7MU8",
  authDomain: "postie-persist-data.firebaseapp.com",
  databaseURL: "https://postie-persist-data.firebaseio.com",
  projectId: "postie-persist-data",
  storageBucket: "postie-persist-data.appspot.com",
  messagingSenderId: "803884915691"
});

const base = Rebase.createClass(firebaseApp.database());

export default base;
