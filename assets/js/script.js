'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Project variables
const projectItems = document.querySelectorAll("[data-project-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal elements
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalDate = document.querySelector("[data-modal-date]");

// Modal toggle function
const toggleModal = function () {
  document.body.classList.toggle("modal-open");
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};


// Add click event to all project items
projectItems.forEach(item => {
  item.addEventListener("click", function () {
    // Get project data from clicked item
    const projectImg = this.querySelector("[data-project-avatar]").src;
    const projectTitle = this.querySelector("[data-project-title]").textContent;
    const projectCategory = this.querySelector(".projects-category").textContent;
    const projectDetails = this.querySelector("[data-project-text]").innerHTML;

    // Set modal content
    modalImg.src = projectImg;
    modalImg.alt = this.querySelector("[data-project-avatar]").alt;
    modalTitle.textContent = projectTitle;
    modalDate.textContent = projectCategory;
    modalDate.datetime = new Date().toISOString();
    modalText.innerHTML = projectDetails;

    // Show modal
    toggleModal();
  });
});
// Close modal events
modalCloseBtn.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalContainer.classList.contains("active")) {
    toggleModal();
  }
});



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  emailjs.init('eQPtNh1O8NDf6qc7h'); // Replace with your User ID
  
  // DOM Elements
  const form = document.getElementById('contact-form');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');
  const btnContent = formBtn.querySelector('.btn-content');
  const btnLoader = formBtn.querySelector('.btn-loader');
  const formStatus = document.querySelector('[data-form-status]');

  // Form validation
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      formBtn.disabled = !form.checkValidity();
    });
  });

  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    formBtn.disabled = true;
    btnContent.hidden = true;
    btnLoader.hidden = false;
    formStatus.hidden = true;

    try {
      // Send email
      const response = await emailjs.sendForm(
        'service_q8xp3ts',   // Your Service ID
        'template_7fn0o28',  // Your Template ID
        form,                // Form element
        'eQPtNh1O8NDf6qc7h'  // Your User ID
      );
      
      // Success
      showStatus('Message sent successfully!', 'success');
      form.reset();
    } catch (error) {
      console.error('Email failed:', error);
      showStatus('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button state
      btnContent.hidden = false;
      btnLoader.hidden = true;
      formBtn.disabled = !form.checkValidity();
    }
  });

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.hidden = false;
    
    setTimeout(() => {
      formStatus.hidden = true;
    }, 5000);
  }
});


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const targetPage = this.textContent.trim().toLowerCase();

    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach(nav => nav.classList.remove("active"));
    this.classList.add("active");

    window.scrollTo(0, 0);
  });
});

  
// Animated Text Rotator
function initAnimatedText() {
  const animatedTextElements = document.querySelectorAll('.animated-text');
  
  animatedTextElements.forEach(element => {
    const words = element.getAttribute('data-words').split(',');
    let currentWordIndex = 0;
    
    // Initial word
    element.textContent = words[currentWordIndex];
    
    // Animation function
    function rotateWords() {
      // Fade out
      element.style.opacity = '0';
      
      setTimeout(() => {
        // Change word
        currentWordIndex = (currentWordIndex + 1) % words.length;
        element.textContent = words[currentWordIndex];
        
        // Fade in
        element.style.opacity = '1';
      }, 500); // Match this with your CSS transition time
    }
    
    // Start rotation (every 3 seconds)
    setInterval(rotateWords, 3000);
    
    // Add transition
    element.style.transition = 'opacity 0.5s ease';
  });
}

// Call it when DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimatedText);
 
document.querySelectorAll('.skill-circle').forEach(circle => {
  setTimeout(() => circle.classList.add('loaded'), 100);
});