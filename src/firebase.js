import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { cityDb } from "./temp/m-city-export";

const firebaseConfig = {
  apiKey: "AIzaSyB2xIkNkOGQ47jpaq8js1rfbguI0oca290",
  authDomain: "my-mcity.firebaseapp.com",
  projectId: "my-mcity",
  storageBucket: "my-mcity.appspot.com",
  messagingSenderId: "272909817636",
  appId: "1:272909817636:web:5a9effc9aef52cfda005b1",
};

firebase.initializeApp(firebaseConfig);
const DB = firebase.firestore();
const matchesCollection = DB.collection("matches");
const playersCollection = DB.collection("players");
const positionsCollection = DB.collection("positions");
const promotionsCollection = DB.collection("promotions");
const teamsCollection = DB.collection("teams");

// cityDb.matches.forEach((item) => matchesCollection.add(item));
// cityDb.players.forEach((item) => playersCollection.add(item));
// cityDb.positions.forEach((item) => positionsCollection.add(item));
// cityDb.promotions.forEach((item) => promotionsCollection.add(item));
// cityDb.teams.forEach((item) => teamsCollection.add(item));

export {
  firebase,
  matchesCollection,
  playersCollection,
  positionsCollection,
  promotionsCollection,
  teamsCollection,
};
