let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function loadBlogs() {
  let container = document.getElementById("blogList");
  if (!container) return;

  container.innerHTML = "";

  blogs.forEach(blog => {
    container.innerHTML += `
      <div class="card">
        <a href="post.html?id=${blog.id}">
          <img src="${blog.img}" style="width:100%; border-radius:10px;">
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
          <small>${blog.date}</small>
        </a>
      </div>
    `;
  });
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

document.addEventListener("DOMContentLoaded", function () {
  loadBlogs();
});
