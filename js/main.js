// ========================================
// MAIN.JS - Inicialização
// STACK: Alpine.js + AOS.js + SVG inline
// ========================================

document.addEventListener('DOMContentLoaded', function () {

     // Inicializa AOS
     AOS.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: true,
          offset: 100
     });

     // Gera links de navegação
     const sections = document.querySelectorAll('section');
     const pageLinks = document.getElementById('pageLinks');

     if (pageLinks && sections.length > 0) {
          sections.forEach(section => {
               const heading = section.querySelector('h1');
               if (heading) {
                    const text = heading.textContent.trim();
                    const id = text.toLowerCase().replace(/\s+/g, '-');

                    section.id = id;

                    const link = document.createElement('a');
                    link.href = `#${id}`;
                    link.textContent = text;
                    link.className = 'page-link';

                    link.addEventListener('click', function (e) {
                         e.preventDefault();
                         section.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start'
                         });
                    });

                    pageLinks.appendChild(link);
               }
          });
     }

     console.log('Portfolio inicializado');
});