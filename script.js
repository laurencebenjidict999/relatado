/* =============================
        NAVBAR TOGGLE
   ============================= */
const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

// Toggle menu on icon click
menu.addEventListener("click", () => {
  menu.classList.toggle("fa-x");
  navbar.classList.toggle("active");
});

// Close menu after clicking a nav link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menu.classList.remove("fa-x");
  });
});

/* =============================
        SMOOTH SCROLL
   ============================= */
function smoothScroll(target, duration) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

// Apply smooth scroll on nav click
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.getAttribute("href");
    smoothScroll(target, 800);
  });
});

/* =============================
        ACTIVE NAV ON SCROLL
   ============================= */
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 110;

  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

/* =============================
        TYPEWRITER EFFECT
   ============================= */
document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "3rd Year BSIT",
    "IT Support",
    "Web Developer",
    "kaon tulog",
    "Good boy"
  ];
  const typeEl = document.querySelector(".typewriter");
  if (!typeEl) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 85;
  const deleteSpeed = 45;
  const pauseBetween = 1400;

  function loop() {
    const current = words[wordIndex];

    if (!isDeleting) {
      typeEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(loop, pauseBetween);
      } else {
        setTimeout(loop, typeSpeed);
      }
    } else {
      typeEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(loop, 350);
      } else {
        setTimeout(loop, deleteSpeed);
      }
    }
  }

  loop();
});

/* =============================
      TIME-BASED BACKGROUND
   ============================= */
function applyTimeBasedBackground() {
  const hour = new Date().getHours();
  let bgColor;

  if (hour >= 5 && hour < 11) {
    bgColor = "#D3D3D3"; // Morning
  } else if (hour >= 11 && hour < 17) {
    bgColor = "#0d0d0d"; // Afternoon
  } else if (hour >= 17 && hour < 20) {
    bgColor = "#150000"; // Sunset
  } else {
    bgColor = "#000000"; // Night
  }

  document.body.style.backgroundColor = bgColor;

  document
    .querySelectorAll(
      ".home, .services, .skills, .projects, .education, .experience, .contact"
    )
    .forEach(section => {
      section.style.backgroundColor = bgColor;
    });
}

// Run immediately + update every 15 minutes
applyTimeBasedBackground();
setInterval(applyTimeBasedBackground, 900000);

