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


// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('show');
  });
}

// Course sections navigation - active link on scroll
// Only runs if section links exist on the page
const sectionLinks = document.querySelectorAll('.section-link');
if (sectionLinks.length > 0) {
  const sections = document.querySelectorAll('[id^="about"], [id^="what-learn"], [id^="curriculum"], [id^="fees"], [id^="reviews"], [id^="demo"], [id^="faqs"]');

  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      sectionLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }
}


// Section link click handling
sectionLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Curriculum item accordion
const curriculumItems = document.querySelectorAll('.curriculum-item .item-header');
curriculumItems.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.curriculum-item');
    const isActive = item.classList.contains('active');
    
    // Close all other items
    document.querySelectorAll('.curriculum-item').forEach(i => {
      i.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Expand all lessons button with chevron animation
const expandAllBtn = document.querySelector('.expand-all');
const curriculumToggleBtn = document.querySelector('.curriculum-toggle-btn');
if (expandAllBtn && curriculumToggleBtn) {
  curriculumToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const curriculumBreakdown = document.querySelector('.curriculum-breakdown');
    const allExpanded = document.querySelectorAll('.curriculum-item.active').length === document.querySelectorAll('.curriculum-item').length;
    
    document.querySelectorAll('.curriculum-item').forEach(item => {
      if (!allExpanded) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Toggle the expanded state for chevron rotation
    curriculumBreakdown.classList.toggle('expanded', !allExpanded);
    expandAllBtn.textContent = allExpanded ? 'Expand All' : 'Collapse All';
  });
}

// Show more button functionality
const showMoreBtn = document.querySelector('.show-more-btn');
if (showMoreBtn) {
  showMoreBtn.addEventListener('click', () => {
    const courseAbout = document.querySelector('.course-about');
    const courseText = document.querySelector('.course-section-text');
    
    courseAbout.classList.toggle('expanded');
    
    if (courseAbout.classList.contains('expanded')) {
      showMoreBtn.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
      courseText.style.maxHeight = 'none';
    } else {
      showMoreBtn.innerHTML = 'Show more <i class="fas fa-chevron-down"></i>';
      courseText.style.maxHeight = '80px';
    }
  });
}

// What you'll Learn dropdown functionality
const learnHeader = document.querySelector('.learn-header');
if (learnHeader) {
  learnHeader.addEventListener('click', () => {
    const courseWhatLearn = document.querySelector('.course-what-learn');
    if (courseWhatLearn) {
      courseWhatLearn.classList.toggle('collapsed');
    }
  });
}

// See all lessons button functionality
const seeAllLessonsBtn = document.querySelector('.see-all-lessons');
if (seeAllLessonsBtn) {
  seeAllLessonsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const curriculumList = document.querySelector('.curriculum-list');
    const curriculumItems = document.querySelectorAll('.curriculum-item');
    
    curriculumList.classList.toggle('expanded');
    
    if (curriculumList.classList.contains('expanded')) {
      seeAllLessonsBtn.textContent = 'Show Less';
      curriculumItems.forEach(item => {
        item.style.display = 'block';
      });
    } else {
      seeAllLessonsBtn.textContent = 'See all lessons';
      // Show only first few items
      curriculumItems.forEach((item, index) => {
        if (index >= 4) {
          item.style.display = 'none';
        }
      });
    }
  });
}

