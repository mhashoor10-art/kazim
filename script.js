let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function loadBlogs() {
  let container = document.getElementById("blogList");
  if (!container) return;

  container.innerHTML = "";

  blogs.forEach((blog, index) => {

    let featured = index === 0 ? "featured" : "";

    container.innerHTML += `
      <div class="card ${featured}">
        <a href="${blog.link}">
          <img src="${blog.img}" style="width:100%; border-radius:10px;">
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
          <small>📅 ${blog.date} | ✍️ ${blog.author}</small>
        </a>
      </div>
    `;
  });
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

// smooth scroll + init
document.addEventListener("DOMContentLoaded", function () {
  loadBlogs();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: "smooth"
        });
      }
    });
  });
});
