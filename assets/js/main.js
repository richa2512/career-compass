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
  if (!container) return;
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

if (document.getElementById("pagination")) {
  renderPagination();
}



const track = document.querySelector(".alumni-track");
const prevBtn = document.querySelector(".alumni-nav.left");
const nextBtn = document.querySelector(".alumni-nav.right");
const cards = document.querySelectorAll(".alumni-card");

// Only initialize carousel if elements exist
if (track && prevBtn && nextBtn && cards.length > 0) {
  let index = 0;
  const total = cards.length;

  function visibleCards() {
    const containerWidth = track.parentElement.offsetWidth;
    const cardWidth = cards[0].offsetWidth + 20; 
    return Math.floor(containerWidth / cardWidth);
  }

  function updateCarousel() {
    const containerWidth = track.parentElement.offsetWidth;
    const cardWidth = cards[0].offsetWidth + 20;
    const visible = visibleCards();

    const maxTranslate = (cardWidth * total) - containerWidth;
    const maxIndex = Math.floor(maxTranslate / cardWidth);

    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= maxIndex;
  }
  
  nextBtn.addEventListener("click", () => {
    const containerWidth = track.parentElement.offsetWidth;
    const cardWidth = cards[0].offsetWidth + 20;
    const maxTranslate = (cardWidth * total) - containerWidth;
    const maxIndex = Math.floor(maxTranslate / cardWidth);

    if (index < maxIndex) {
      index++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    updateCarousel();
  });

  updateCarousel();
}