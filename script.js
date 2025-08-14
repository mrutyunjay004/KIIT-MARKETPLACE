import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDoPoUxfZUBDyFntI6rknGljx0Nf-5Ucyo",
  authDomain: "kiit-marketplace.firebaseapp.com",
  projectId: "kiit-marketplace",
  storageBucket: "kiit-marketplace.appspot.com",
  messagingSenderId: "378258070856",
  appId: "1:378258070856:web:9dedbe7fa989476e70677d",
  measurementId: "G-WD8NKX6FD0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function goToLogin() {
  window.location.href = "login.html";
}

// Check if user is inside KIIT campus
// function checkLocationAndAccess() {
//   if (!navigator.geolocation) {
//     alert("Geolocation not supported");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition((position) => {
//     const userLat = position.coords.latitude;
//     const userLon = position.coords.longitude;

//     const kiitLat = 20.3542;
//     const kiitLon = 85.8176;

//     const distance = getDistanceFromLatLonInKm(userLat, userLon, kiitLat, kiitLon);

//     if (distance > 1.0) {
//       alert("Access denied: You must be within KIIT campus to use this app.");
//       window.location.href = "denied.html";
//     } else {
//       console.log("Access granted: You are inside KIIT campus.");
//     }
//   }, () => {
//     alert("Could not get your location. Please allow GPS.");
//   });
// }

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km radius
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
function showError(message) {
  const errorDiv = document.getElementById("error-message");
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    setTimeout(() => errorDiv.style.display = "none", 3000);
  } else {
    alert(message);
  }
}

function showSuccess(message) {
  const successDiv = document.getElementById("success-message");
  if (successDiv) {
    successDiv.textContent = message;
    successDiv.style.display = "block";
  } else {
    alert(message);
  }
}

window.postItem = async function () {
  const title = document.getElementById("title")?.value?.trim();
  const price = parseFloat(document.getElementById("price")?.value);
  const desc = document.getElementById("desc")?.value?.trim();
  const postButton = document.getElementById("post-button");

  if (!title || !desc) {
    showError("Please fill all fields.");
    return;
  }

  if (!price || isNaN(price) || price <= 0) {
    showError("Please enter a valid price.");
    return;
  }

  if (postButton) {
    postButton.disabled = true;
    postButton.textContent = "Posting...";
  }

  try {
    const itemData = {
      title: title,
      price: price,
      description: desc,
      postedAt: serverTimestamp(),
      userId: auth.currentUser?.uid || 'anonymous'
    };

    await addDoc(collection(db, "items"), itemData);

    showSuccess("Item posted successfully!");
    setTimeout(() => window.location.href = "index.html", 2000);
  } catch (error) {
    showError("Error posting item: " + error.message);
    if (postButton) {
      postButton.disabled = false;
      postButton.textContent = "Post";
    }
  }
};

window.goToLogin = goToLogin;
window.checkLocationAndAccess = checkLocationAndAccess;