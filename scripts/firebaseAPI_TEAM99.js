//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyA8j-7-4tLc-7OcTToHQ9NakyJ2HMcsmTw",
    authDomain: "simple-park-new.firebaseapp.com",
    projectId: "simple-park-new",
    storageBucket: "simple-park-new.appspot.com",
    messagingSenderId: "704638200243",
    appId: "1:704638200243:web:2535a369f3eb019b5403c6"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

