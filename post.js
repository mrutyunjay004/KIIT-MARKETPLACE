// post.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Your Firebase config (replace with your own config if different)
const firebaseConfig = {
  apiKey: "AIzaSyDoPoUxfZUBDyFntI6rknGljx0Nf-5Ucyo",
  authDomain: "kiit-marketplace.firebaseapp.com",
  projectId: "kiit-marketplace",
  storageBucket: "kiit-marketplace.appspot.com",
  messagingSenderId: "378258070856",
  appId: "1:378258070856:web:9dedbe7fa989476e70677d",
  measurementId: "G-WD8NKX6FD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const form = document.getElementById("post-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const category = document.getElementById("category").value;

  // Simple validation
  if (!title || !description || !category || !price || isNaN(price) || price <= 0) {
    alert("Please fill all fields correctly.");
    return;
  }

  try {
    // Disable button to prevent multiple submits
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Posting...";

    await addDoc(collection(db, "items"), {
      title,
      description,
      price,
      category,
      postedAt: serverTimestamp(),
      userId: auth.currentUser ? auth.currentUser.uid : "anonymous",
    });

    alert("Item posted successfully!");
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = "Post Item";
    window.location.href = "listings.html"; // Redirect after posting
  } catch (error) {
    alert("Error posting item: " + error.message);
    form.querySelector("button[type='submit']").disabled = false;
    form.querySelector("button[type='submit']").textContent = "Post Item";
  }
});
