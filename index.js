import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlQP-s0Q-y6J1POkEEHrcDP32Wn6JPK_4",
  authDomain: "kazim-aa621.firebaseapp.com",
  projectId: "kazim-aa621",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogsDiv = document.getElementById("blogs");

async function loadBlogs() {
  blogsDiv.innerHTML = "Loading...";

  const data = await getDocs(collection(db, "blogs"));

  let html = "";

  data.forEach((doc) => {
    const b = doc.data();

    html += `
      <div class="card">
        <a href="post.html?id=${doc.id}">
          <img src="${b.img || "https://via.placeholder.com/400"}">
          <h3>${b.title || "No Title"}</h3>
          <p>${b.desc || ""}</p>
        </a>
      </div>
    `;
  });

  blogsDiv.innerHTML = html;
}

loadBlogs();
