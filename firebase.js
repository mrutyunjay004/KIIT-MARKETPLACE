// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  databaseURL: "...",
  // ... other config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
window.auth = auth; // so it's accessible globally
