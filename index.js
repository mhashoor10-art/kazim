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

    renderBlogs(allBlogsData);

  } catch (err) {
    console.error(err);
    blogsDiv.innerHTML = "<p>Error loading blogs</p>";
  }
}

/* ================= RENDER ================= */
function renderBlogs(data) {
  let html = "";

  data.forEach((b) => {
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

  blogsDiv.innerHTML = html || "<p>No results found</p>";
}

/* CALL LOAD */
loadBlogs();

/* ================= SEARCH ================= */
document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  if (!searchBtn || !searchInput) return;

  // BUTTON CLICK
  searchBtn.onclick = () => {
    const value = searchInput.value.trim().toLowerCase();

    if (!value) {
      renderBlogs(allBlogsData); // show all if empty
      return;
    }

    const filtered = allBlogsData.filter(b =>
      b.title?.toLowerCase().includes(value) ||
      b.desc?.toLowerCase().includes(value)
    );

    renderBlogs(filtered);
  };

  // ENTER KEY
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
