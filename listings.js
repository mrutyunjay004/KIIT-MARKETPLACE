import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyDoPoUxfZUBDyFntI6rknGljx0Nf-5Ucyo",
  authDomain: "kiit-marketplace.firebaseapp.com",
  projectId: "kiit-marketplace",
  storageBucket: "kiit-marketplace.appspot.com",
  messagingSenderId: "378258070856",
  appId: "1:378258070856:web:9dedbe7fa989476e70677d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const container = document.getElementById("items-container");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortOrder = document.getElementById("sortOrder");

async function loadItems() {
  const q = query(collection(db, "items"), orderBy("postedAt", sortOrder.value));
  const snapshot = await getDocs(q);

  let items = [];
  snapshot.forEach(doc => items.push(doc.data()));

  const keyword = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  items = items.filter(item => {
    return (
      (!keyword || item.title.toLowerCase().includes(keyword)) &&
      (!category || item.category === category)
    );
  });

  container.innerHTML = items.map(item => `
    <div class="item">
      <div class="item-title">${item.title}</div>
      <div class="item-price">₹${item.price.toFixed(2)}</div>
      <div class="item-desc">${item.description}</div>
      <div class="item-cat">Category: ${item.category}</div>
    </div>
  `).join("") || "No items found.";
}

searchInput.addEventListener("input", loadItems);
categoryFilter.addEventListener("change", loadItems);
sortOrder.addEventListener("change", loadItems);

loadItems();
