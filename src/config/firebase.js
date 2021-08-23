import firebase from "firebase";

/* const config = {
  apiKey: "AIzaSyCC9RWRzdfIoLLNOPx7zL0MIYxDmxit2Vg",
  authDomain: "consulta-banco-gente.firebaseapp.com",
  databaseURL: "https://consulta-banco-gente-default-rtdb.firebaseio.com",
  projectId: "consulta-banco-gente",
  storageBucket: "consulta-banco-gente.appspot.com",
  messagingSenderId: "1061846064211",
  appId: "1:1061846064211:web:1879de64dae5227c4b7aa6",
  measurementId: "G-QWMEN59VHL"

}; */

const config = {
  apiKey: "AIzaSyA3gXahioltgjFox4h6TSidG4Zv-ChXaeU",
  authDomain: "consulta-bancodelagente.firebaseapp.com",
  databaseURL: "https://consulta-bancodelagente-default-rtdb.firebaseio.com",
  projectId: "consulta-bancodelagente",
  storageBucket: "consulta-bancodelagente.appspot.com",
  messagingSenderId: "168872623403",
  appId: "1:168872623403:web:e988343e9d41156fff596e"
};

firebase.initializeApp(config);

export default firebase;
