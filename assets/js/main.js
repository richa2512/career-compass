const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("mobileMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}


// Scroll reveal observer
const revealEls = document.querySelectorAll(".reveal");

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -5% 0px"
};

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

revealEls.forEach(el => appearOnScroll.observe(el));


// Subtle parallax on mouse move
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 6;
  const y = (e.clientY / window.innerHeight - 0.5) * 6;

  document.querySelectorAll(".parallax").forEach(el => {
    el.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  });
});



/* ================= WORD SPLIT & REVEAL ================ */
function revealText() {
  document.querySelectorAll(".text-reveal").forEach(block => {
    const childNodes = Array.from(block.childNodes);
    block.innerHTML = ""; 

    childNodes.forEach(node => {
      if (node.nodeType === 3) {  // text node
        const words = node.textContent.trim().split(" ");
        words.forEach((word, i) => {
          if (word !== "") {
            const span = document.createElement("span");
            span.textContent = word;
            block.appendChild(span);
            if (i < words.length - 1) block.appendChild(document.createTextNode(" "));
          }
        });
      } else {
        // Element node (like your <span class="text-gradient">Potential</span>)
        block.appendChild(node);
      }
    });
  });
}
revealText();


/* Intersection Observer for text */
const textObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll("span").forEach((span,i)=>{
        setTimeout(()=> span.classList.add("active"), i * 55);
      });
      textObserver.unobserve(entry.target);
    }
  })
},{ threshold:.2 });

document.querySelectorAll(".text-reveal").forEach(el => textObserver.observe(el));



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
