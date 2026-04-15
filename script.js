// script.js

// Smooth Scrolling
const smoothScroll = (target) => {
  const element = document.querySelector(target);
  element.scrollIntoView({ behavior: 'smooth' });
};

// Navbar Highlight on Scroll
const highlightNavbar = () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  const scrollPos = window.scrollY;

  sections.forEach((section, index) => {
    if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
      navLinks.forEach((link) => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
};

// Fade-in Animations
const fadeInElements = () => {
  const fadeIns = document.querySelectorAll('.fade-in');
  fadeIns.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      element.classList.add('visible');
    }
  });
};

// Mobile Menu Toggle
const mobileMenuToggle = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.navbar');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
};

// Dark Mode Toggle
const darkModeToggle = () => {
  const darkModeButton = document.querySelector('.dark-mode-toggle');

  darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
};

// Scroll Progress Indicator
const scrollProgressIndicator = () => {
  const progressBar = document.querySelector('.progress-bar');

  window.onscroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
  };
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
  mobileMenuToggle();
  darkModeToggle();
  window.addEventListener('scroll', highlightNavbar);
  window.addEventListener('scroll', fadeInElements);
  scrollProgressIndicator();
});