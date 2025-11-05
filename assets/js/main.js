const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("mobileMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}


const elements = document.querySelectorAll(
  '.reveal, .fade-up, .fade-left, .fade-right, .scale-up'
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      console.log("Observing:", entry);
      if (entry.isIntersecting) {
        console.log("Intersecting:", entry.target);
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

elements.forEach(el => observer.observe(el));


// Pagination Logic Only
const totalItems = 100;
const perPage = 9;
const totalPages = Math.ceil(totalItems / perPage);
let currentPage = 1;

function renderPagination() {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  const addBtn = (label, goTo, disabled = false, active = false) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.disabled = disabled;
    if (active) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = goTo;
      renderPagination();

      // callback can be used for page data fetch later
      console.log("Current Page: ", currentPage);
    };
    container.appendChild(btn);
  };

  addBtn("≪", 1, currentPage === 1);
  addBtn("<", currentPage - 1, currentPage === 1);

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      addBtn(i, i, false, i === currentPage);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      const dots = document.createElement("button");
      dots.textContent = "...";
      dots.disabled = true;
      container.appendChild(dots);
    }
  }

  addBtn(">", currentPage + 1, currentPage === totalPages);
  addBtn("≫", totalPages, currentPage === totalPages);
}

renderPagination();
