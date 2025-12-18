// Initialize AOS (Animate On Scroll)
AOS.init({
     duration: 800,
     once: true,
     offset: 100
});

// Generate navigation links
function generateNavLinks() {
     const links = [
          { text: 'Início', href: '#hero' },
          { text: 'Contato', href: '#contato' }
     ];

     const navContainer = document.getElementById('pageLinks');
     if (navContainer) {
          links.forEach(link => {
               const a = document.createElement('a');
               a.href = link.href;
               a.textContent = link.text;
               navContainer.appendChild(a);
          });
     }
}

// Initialize Lucide Icons with custom styling
function initLucideIcons() {
     if (typeof lucide !== 'undefined') {
          lucide.createIcons();
          
          // Apply custom styles after icons are created
          setTimeout(() => {
               // WhatsApp icons - Verde forte
               const whatsappIcons = document.querySelectorAll('.whatsapp-icon-large svg, .whatsapp-float svg');
               whatsappIcons.forEach(icon => {
                    icon.style.color = '#25D366';
                    icon.style.stroke = '#25D366';
                    icon.style.fill = 'none';
                    icon.style.strokeWidth = '2.5';
               });
               
               // Contact channel icons - Brancos
               const emailIcon = document.querySelector('.contact-channel-card:nth-child(1) .channel-icon svg');
               if (emailIcon) {
                    emailIcon.style.color = '#ffffff';
                    emailIcon.style.stroke = '#ffffff';
                    emailIcon.style.fill = 'none';
                    emailIcon.style.strokeWidth = '2.5';
               }
               
               const githubIcon = document.querySelector('.contact-channel-card:nth-child(2) .channel-icon svg');
               if (githubIcon) {
                    githubIcon.style.color = '#ffffff';
                    githubIcon.style.stroke = '#ffffff';
                    githubIcon.style.fill = 'none';
                    githubIcon.style.strokeWidth = '2.5';
               }
               
               const linkedinIcon = document.querySelector('.contact-channel-card:nth-child(3) .channel-icon svg');
               if (linkedinIcon) {
                    linkedinIcon.style.color = '#ffffff';
                    linkedinIcon.style.stroke = '#ffffff';
                    linkedinIcon.style.fill = 'none';
                    linkedinIcon.style.strokeWidth = '2.5';
               }
          }, 50);
     }
}

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
     generateNavLinks();
     initSmoothScroll();
     
     // Initialize Lucide icons after content is loaded
     setTimeout(() => {
          initLucideIcons();
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