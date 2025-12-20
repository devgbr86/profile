AOS.init({
     duration: 800,
     once: true,
     offset: 100
});

// Smooth scroll for anchor links
function initSmoothScroll() {
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
               e.preventDefault();
               const target = document.querySelector(this.getAttribute('href'));
               if (target) {
                    target.scrollIntoView({
                         behavior: 'smooth',
                         block: 'start'
                    });
               }
          });
     });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
     initSmoothScroll();
     
     setTimeout(() => {
          AOS.refresh();
     }, 100);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
     clearTimeout(resizeTimer);
     resizeTimer = setTimeout(() => {
          AOS.refresh();
     }, 250);
});