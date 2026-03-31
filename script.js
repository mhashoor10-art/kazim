// Firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBlQP-s0Q-y6J1POkEEHrcDP32Wn6JPK_4",
  authDomain: "kazim-aa621.firebaseapp.com",
  projectId: "kazim-aa621",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load Blogs
async function loadBlogs() {
  const container = document.getElementById("blogList");

  if (!container) return;

  container.innerHTML = "Loading blogs...";

  try {
    const data = await getDocs(collection(db, "blogs"));

    container.innerHTML = "";

    data.forEach((doc) => {
      const blog = doc.data();

      container.innerHTML += `
        <div class="card">
          <img src="${blog.img || "https://via.placeholder.com/400"}" style="width:100%; border-radius:10px;">
          <h3>${blog.title || "No Title"}</h3>
          <p>${blog.desc || ""}</p>
          <small>${blog.date || ""}</small>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading blogs:", error);
    container.innerHTML = "Failed to load blogs.";
  }
}

// Run
loadBlogs();
