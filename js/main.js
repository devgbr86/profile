// main.js - Gerencia navegação e animações

const content = document.getElementById("content");
const linksContainer = document.getElementById("pageLinks");

// Inicializa AOS
if (typeof AOS !== 'undefined') {
     AOS.init({
          duration: 800,
          once: true,
          offset: 100,
          easing: 'ease-out'
     });
}

// Gera links de navegação baseado nos H1
function createNavLinks() {
     linksContainer.innerHTML = '';
     const h1Elements = content.querySelectorAll("h1");

     h1Elements.forEach((h1) => {
          const a = document.createElement("a");
          a.textContent = h1.textContent;
          a.className = "page-link";
          a.onclick = e => {
               e.preventDefault();
               const navHeight = 80;
               const targetPosition = h1.getBoundingClientRect().top + window.pageYOffset - navHeight;
               window.scrollTo({ top: targetPosition, behavior: "smooth" });
          };
          linksContainer.appendChild(a);
     });
}

// Executa quando o DOM estiver pronto
if (document.readyState === 'loading') {
     document.addEventListener('DOMContentLoaded', createNavLinks);
} else {
     createNavLinks();
}