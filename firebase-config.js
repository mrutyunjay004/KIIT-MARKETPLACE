// firebase-config.js

// Replace the below configuration with your Firebase project's config
const firebaseConfig = {
  apiKey: "AIzaSyDoPoUxfZUBDyFntI6rknGljx0Nf-5Ucyo",
  authDomain: "kiit-marketplace.firebaseapp.com",
  databaseURL: "kiit-marketplace-default-rtdb.firebaseio.com",
  projectId: "kiit-marketplace",
  storageBucket: "kiit-marketplace.appspot.com",
  messagingSenderId: "378258070856",
  appId: "1:378258070856:web:9dedbe7fa989476e70677d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Realtime Database
const auth = firebase.auth();
const database = firebase.database();


