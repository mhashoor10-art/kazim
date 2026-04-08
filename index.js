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

/* STORE ALL BLOGS */
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
      allBlogsData.push(b);
    });

    // 🔥 sort latest first (important)
    allBlogsData.reverse();

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

  // 🔥 Latest blog (FULL)
  const latest = data[0];

  let html = `
    <h2 style="padding:10px 20px;">🔥 Latest Blog</h2>

    <div class="card" style="max-width:700px;">
      <a href="post.html?id=${latest.id}">
        <img src="${latest.img || "https://via.placeholder.com/600"}">

        <h2>${latest.title || "No Title"}</h2>

        <p style="font-weight:500;color:#444;">
          ${latest.desc || ""}
        </p>

        <div style="margin-top:10px;color:#777;font-size:13px;">
          ${latest.date || ""}
        </div>
      </a>
    </div>

    <h3 style="padding:15px 20px;">📚 More Blogs</h3>

    <div class="more-blogs">
  `;

  // 🔥 remaining blogs
  data.slice(1).forEach((b) => {
    html += `
      <div class="card">
        <a href="post.html?id=${b.id}">
          <img src="${b.img || "https://via.placeholder.com/400"}">
          <h3>${b.title || "No Title"}</h3>
          <p>${b.desc || ""}</p>
        </a>
      </div>
    `;
  });

  html += `</div>`;

  blogsDiv.innerHTML = html;
}

/* CALL LOAD */
loadBlogs();

/* ================= SEARCH ================= */
document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  if (!searchBtn || !searchInput) return;

  searchBtn.onclick = () => {
    const value = searchInput.value.trim().toLowerCase();

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
    if (e.key === "Enter") {
      searchBtn.click();
    }
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
