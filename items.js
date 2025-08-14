import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const desc = document.getElementById("desc").value.trim();
  const category = document.getElementById("category").value;

  if (!title || !desc || !category || isNaN(price) || price <= 0) {
    showError("Please fill in all fields correctly.");
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    showError("You must be logged in to post.");
    return;
  }

  try {
    await addDoc(collection(db, "items"), {
      title, price, description: desc, category,
      postedAt: serverTimestamp(), userId: user.uid
    });
    showSuccess("Item posted successfully!");
    setTimeout(() => window.location.href = "listings.html", 1500);
  } catch (err) {
    showError("Error posting item: " + err.message);
  }
});

function showError(msg) {
  const e = document.getElementById("error-message");
  e.textContent = msg;
  e.style.color = "red";
}

function showSuccess(msg) {
  const e = document.getElementById("success-message");
  e.textContent = msg;
  e.style.color = "green";
}
