import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ================= FIREBASE ================= */
const firebaseConfig = {
  apiKey: "AIzaSyBlQP-s0Q-y6J1POkEEHrcDP32Wn6JPK_4",
  authDomain: "kazim-aa621.firebaseapp.com",
  projectId: "kazim-aa621",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogsDiv = document.getElementById("blogs");

let allBlogsData = [];

/* ================= LOAD BLOGS ================= */
async function loadBlogs() {
  if (!blogsDiv) return;

  blogsDiv.innerHTML = "Loading...";

  try {
    const data = await getDocs(collection(db, "blogs"));

    allBlogsData = [];

    data.forEach((doc) => {
      const b = doc.data();
      b.id = doc.id;

      // 🔥 convert date to sortable format
      b.time = new Date(b.date).getTime() || 0;

      allBlogsData.push(b);
    });

    // 🔥 SORT BY LATEST
    allBlogsData.sort((a, b) => b.time - a.time);

    renderBlogs(allBlogsData);

  } catch (err) {
    console.error(err);
    blogsDiv.innerHTML = "<p>Error loading blogs</p>";
  }
}

/* ================= RENDER ================= */
function renderBlogs(data) {

  if (!data.length) {
    blogsDiv.innerHTML = "<p>No blogs found</p>";
    return;
  }

  const latest = data[0];

  let html = `
    <h2 style="padding:10px;">🔥 Latest Blog</h2>

    <div class="card">
      <img src="${latest.img}">
      <h2><a href="post.html?id=${latest.id}">${latest.title}</a></h2>
      <p>${latest.content}</p>
    </div>

    <h3 style="padding:10px;">More Blogs</h3>

    <div class="more-blogs">
  `;

  data.slice(1).forEach(b => {
    html += `
      <div class="blog-item">
        <img src="${b.img}">

        <div class="blog-text">
          <h4>
            <a href="post.html?id=${b.id}">
              ${b.title}
            </a>
          </h4>

          <p>${b.desc || ""}</p>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  blogsDiv.innerHTML = html;
}

/* CALL */
loadBlogs();

/* ================= SEARCH ================= */
document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  if (!searchBtn || !searchInput) return;

  searchBtn.onclick = () => {
    const value = searchInput.value.toLowerCase();

    if (!value) {
      renderBlogs(allBlogsData);
      return;
    }

    const filtered = allBlogsData.filter(b =>
      b.title?.toLowerCase().includes(value) ||
      b.desc?.toLowerCase().includes(value)
    );

    renderBlogs(filtered);
  };

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });

});

/* ================= MENU ================= */
const nav = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");

window.toggleMenu = function () {
  if (!nav || !overlay) return;

  nav.classList.toggle("active");
  overlay.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", () => {
  if (!nav || !overlay) return;

  overlay.onclick = () => {
    nav.classList.remove("active");
    overlay.classList.remove("active");
  };

  document.querySelectorAll(".nav-links a").forEach(a => {
    a.onclick = () => {
      nav.classList.remove("active");
      overlay.classList.remove("active");
    };
  });
});
