// Firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Config (same as admin)
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

  container.innerHTML = "Loading...";

  const data = await getDocs(collection(db, "blogs"));

  container.innerHTML = "";

  data.forEach((doc) => {
    const blog = doc.data();

    container.innerHTML += `
      <div class="card">
        <a href="post.html?id=${doc.id}">
          <img src="${blog.img}" style="width:100%; border-radius:10px;">
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
          <small>${blog.date}</small>
        </a>
      </div>
    `;
  });
}

// Run
loadBlogs();
