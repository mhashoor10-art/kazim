let blogs = [
  {
    title: "My First Blog",
    desc: "Click to read my first blog post",
    link: "blog1.html"
  },
  {
    title: "My Second Blog",
    desc: "Click to read my second blog post",
    link: "blog2.html"
  }
];

function loadBlogs() {
  let container = document.getElementById("blogList");
  container.innerHTML = "";

  blogs.forEach(blog => {
    container.innerHTML += `
      <div class="card">
        <a href="${blog.link}">
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
        </a>
      </div>
    `;
  });
}

loadBlogs();

function toggleDark() {
  document.body.classList.toggle("dark");
}
