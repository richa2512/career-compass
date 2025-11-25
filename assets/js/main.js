const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("mobileMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}

/// ===============================
// SCROLL REVEAL (All Directions)
// ===============================
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-zoom, .reveal-rotate"
);

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -5% 0px",
};

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

revealEls.forEach((el) => appearOnScroll.observe(el));

// Optional random stagger for variety
revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(Math.random() * 0.8 + 0.1).toFixed(2)}s`;
});

// ===============================
// PARALLAX EFFECT
// ===============================
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 6;
  const y = (e.clientY / window.innerHeight - 0.5) * 6;

  document.querySelectorAll(".parallax").forEach((el) => {
    el.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  });
});

// ===============================
// TEXT REVEAL SPLIT & ANIMATION
// ===============================
function revealText() {
  document.querySelectorAll(".text-reveal").forEach((block) => {
    const childNodes = Array.from(block.childNodes);
    block.innerHTML = "";

    childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        const words = node.textContent.trim().split(" ");
        words.forEach((word, i) => {
          if (word !== "") {
            const span = document.createElement("span");
            span.textContent = word;
            block.appendChild(span);
            if (i < words.length - 1)
              block.appendChild(document.createTextNode(" "));
          }
        });
      } else {
        block.appendChild(node);
      }
    });
  });
}
revealText();

// Intersection Observer for text-reveal only
const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll("span").forEach((span, i) => {
          setTimeout(() => span.classList.add("active"), i * 55);
        });
        textObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".text-reveal")
  .forEach((el) => textObserver.observe(el));

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

if (track && prevBtn && nextBtn && cards.length > 0) {
  const total = cards.length;
  const cardWidth = cards[0].offsetWidth + 20;
  let currentIndex = 0;
  let isAnimating = false;

  // Clone cards to create infinite effect
  const originalCards = Array.from(cards);
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  function updateCarousel(direction) {
    if (isAnimating) return;

    isAnimating = true;

    if (direction === 1) {
      currentIndex++;
      const offset = currentIndex * cardWidth;
      track.style.transform = `translateX(-${offset}px)`;

      setTimeout(() => {
        track.style.transition = "none";
        currentIndex = ((currentIndex % total) + total) % total;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        setTimeout(() => {
          track.style.transition = "transform 0.4s ease-in-out";
          isAnimating = false;
        }, 50);
      }, 400);
    } else {
      if (currentIndex <= 0) {
        track.style.transition = "none";
        currentIndex = total;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        setTimeout(() => {
          track.style.transition = "transform 0.4s ease-in-out";
          currentIndex--;
          track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

          setTimeout(() => {
            isAnimating = false;
          }, 400);
        }, 50);
      } else {
        currentIndex--;
        const offset = currentIndex * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;

        setTimeout(() => {
          isAnimating = false;
        }, 400);
      }
    }
  }

  nextBtn.addEventListener("click", () => updateCarousel(1));
  prevBtn.addEventListener("click", () => updateCarousel(-1));

  window.addEventListener("resize", () => {
    if (!isAnimating) {
      track.style.transition = "none";
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileBackdrop = document.getElementById("mobileBackdrop");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("show");

    mobileBackdrop.classList.toggle("hidden");
    mobileBackdrop.classList.toggle("show");
  });

  // Tap on backdrop closes menu
  mobileBackdrop.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("show");

    mobileBackdrop.classList.add("hidden");
    mobileBackdrop.classList.remove("show");
  });
}

// Course sections navigation - active link on scroll
// Only runs if section links exist on the page
const sectionLinks = document.querySelectorAll(".section-link");
if (sectionLinks.length > 0) {
  const sections = document.querySelectorAll(
    '[id^="about"], [id^="what-learn"], [id^="curriculum"], [id^="fees"], [id^="reviews"], [id^="demo"], [id^="faqs"]'
  );

  if (sections.length > 0) {
    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      sectionLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });
  }
}

// Section link click handling
sectionLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Curriculum item accordion
const curriculumItems = document.querySelectorAll(
  ".curriculum-item .item-header"
);
curriculumItems.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.closest(".curriculum-item");
    const isActive = item.classList.contains("active");

    // Close all other items
    document.querySelectorAll(".curriculum-item").forEach((i) => {
      i.classList.remove("active");
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// Expand all lessons button with chevron animation
const expandAllBtn = document.querySelector(".expand-all");
const curriculumToggleBtn = document.querySelector(".curriculum-toggle-btn");
if (expandAllBtn && curriculumToggleBtn) {
  curriculumToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const curriculumBreakdown = document.querySelector(".curriculum-breakdown");
    const allExpanded =
      document.querySelectorAll(".curriculum-item.active").length ===
      document.querySelectorAll(".curriculum-item").length;

    document.querySelectorAll(".curriculum-item").forEach((item) => {
      if (!allExpanded) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Toggle the expanded state for chevron rotation
    curriculumBreakdown.classList.toggle("expanded", !allExpanded);
    expandAllBtn.textContent = allExpanded ? "Expand All" : "Collapse All";
  });
}

// Show more button functionality
const showMoreBtn = document.querySelector(".show-more-btn");
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    const courseAbout = document.querySelector(".course-about");
    const courseText = document.querySelector(".course-section-text");

    courseAbout.classList.toggle("expanded");

    if (courseAbout.classList.contains("expanded")) {
      showMoreBtn.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
      courseText.style.maxHeight = "none";
    } else {
      showMoreBtn.innerHTML = 'Show more <i class="fas fa-chevron-down"></i>';
      courseText.style.maxHeight = "80px";
    }
  });
}

// What you'll Learn dropdown functionality
const learnHeader = document.querySelector(".learn-header");
if (learnHeader) {
  learnHeader.addEventListener("click", () => {
    const courseWhatLearn = document.querySelector(".course-what-learn");
    if (courseWhatLearn) {
      courseWhatLearn.classList.toggle("collapsed");
    }
  });
}

// See all lessons button functionality
const seeAllLessonsBtn = document.querySelector(".see-all-lessons");
if (seeAllLessonsBtn) {
  seeAllLessonsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const curriculumList = document.querySelector(".curriculum-list");
    const curriculumItems = document.querySelectorAll(".curriculum-item");

    curriculumList.classList.toggle("expanded");

    if (curriculumList.classList.contains("expanded")) {
      seeAllLessonsBtn.textContent = "Show Less";
      curriculumItems.forEach((item) => {
        item.style.display = "block";
      });
    } else {
      seeAllLessonsBtn.textContent = "See all lessons";
      // Show only first few items
      curriculumItems.forEach((item, index) => {
        if (index >= 4) {
          item.style.display = "none";
        }
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");

  if (!counters.length) return; // if page has no counters, skip

  // Prepare each counter initially
  counters.forEach((counter) => {
    const target = counter.getAttribute("data-target");
    const digitsWrapper = counter.querySelector(".digits");

    if (!digitsWrapper) return;

    digitsWrapper.innerHTML = ""; // reset to avoid duplicates

    target.split("").forEach((digit) => {
      const container = document.createElement("div");
      container.className = "digit-container";

      const scroll = document.createElement("div");
      scroll.className = "digit-scroll";

      // Build digits 0–9
      for (let i = 0; i <= 9; i++) {
        const d = document.createElement("div");
        d.textContent = i;
        scroll.appendChild(d);
      }

      container.appendChild(scroll);
      digitsWrapper.appendChild(container);
    });
  });

  // Intersection Observer runs AFTER everything is ready
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = counter.getAttribute("data-target");
        const digitContainers = counter.querySelectorAll(".digit-scroll");

        // Prevent double run
        if (counter.dataset.animated === "true") return;
        counter.dataset.animated = "true";

        // Animate each digit
        target.split("").forEach((digit, index) => {
          const element = digitContainers[index];

          setTimeout(() => {
            element.style.transform = `translateY(-${digit * 32}px)`;
          }, index * 150);
        });

        observer.unobserve(counter);
      });
    },
    {
      threshold: 0.3,
    }
  );

  // Observe after building digits
  counters.forEach((counter) => observer.observe(counter));
});

// ===============================
// ACCA SLIDER DATA AND GENERATION (NEW CODE)
// ===============================

const studentRankings = [
  {
    name: "Divyang Manglani",
    examInfo: "FR 83",
    imageSrc: "assets/images/acca/divyang.svg",
  },
  {
    name: "Upadhyay Maharshi",
    examInfo: "LAW 81",
    imageSrc: "assets/images/acca/upadhyay.svg",
  },
  {
    name: "Palak Ganatra",
    examInfo: "BT 80",
    imageSrc: "assets/images/acca/palak.svg",
  },
  {
    name: "Parth Mehta",
    examInfo: "TX 80",
    imageSrc: "assets/images/acca/parth.svg",
  },
  {
    name: "Mahesh Vira",
    examInfo: "FR 77",
    imageSrc: "assets/images/acca/mahesh.svg",
  },
  {
    name: "Viyati Kamdar",
    examInfo: "FM 76",
    imageSrc: "assets/images/acca/viyati.svg",
  },
  {
    name: "Jay Bhandari",
    examInfo: "PM 75",
    imageSrc: "assets/images/acca/jay.svg",
  },
  {
    name: "Rohit Sharma",
    examInfo: "SBL 74",
    imageSrc: "assets/images/acca/rohit.svg",
  },
  // Add more student objects here as needed!
];

// Function to generate the HTML for a single student slide
function createStudentSlideHTML(student) {
  return `
        <div class="slide">
            <div class="slide-image">
                <img src="${student.imageSrc}" alt="${student.name}" />
            </div>
            <div class="student-data">
                <h4>${student.name}</h4>
                <p class="exam-info">${student.examInfo}</p>
            </div>
        </div>
    `;
}

// Logic to generate and insert slides into the container
document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.getElementById("studentSlider");

  // Number of duplicates for a smooth infinite loop
  const duplicateCount = 4;

  if (sliderContainer && studentRankings.length > 0) {
    let allSlidesHTML = [];

    // Repeat the whole set 'duplicateCount' times
    for (let i = 0; i < duplicateCount; i++) {
      studentRankings.forEach((student) => {
        allSlidesHTML.push(createStudentSlideHTML(student));
      });
    }

    // Insert all slides
    sliderContainer.innerHTML = allSlidesHTML.join("");
  }
});
