import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2xIkNkOGQ47jpaq8js1rfbguI0oca290",
  authDomain: "my-mcity.firebaseapp.com",
  projectId: "my-mcity",
  storageBucket: "my-mcity.appspot.com",
  messagingSenderId: "272909817636",
  appId: "1:272909817636:web:5a9effc9aef52cfda005b1",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
