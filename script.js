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
const sectionLinks = document.querySelectorAll('.section-link');
const sections = document.querySelectorAll('[id^="about"], [id^="what-learn"], [id^="curriculum"], [id^="fees"], [id^="reviews"], [id^="demo"], [id^="faqs"]');

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

// ... existing code ...
const learnHeader = document.querySelector('.learn-header');
if (learnHeader) {
  learnHeader.addEventListener('click', () => {
    const learnSection = document.querySelector('.course-what-learn');
    learnSection.classList.toggle('collapsed');
  });
}

// ... existing code ...