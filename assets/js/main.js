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