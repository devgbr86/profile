// ========================================
// MAIN.JS - Inicialização Global
// STACK: Alpine.js + AOS.js
// ========================================

// Aguarda as sections serem carregadas antes de inicializar
window.addEventListener('sectionsLoaded', () => {
  console.log('🚀 Main.js inicializado após sections carregarem');
  initializeApp();
});

// ========================================
// INICIALIZAÇÃO PRINCIPAL
// ========================================
function initializeApp() {
  console.log('✓ Sections carregadas, inicializando componentes...');
  
  // Pequeno delay para garantir que o DOM está totalmente renderizado
  setTimeout(() => {
    // 1. Inicializar AOS (animações)
    initAOS();
    
    // 2. Gerar navegação automática
    generateNavigation();
    
    // 3. Smooth scroll para âncoras
    setupSmoothScroll();
    
    console.log('✓ App totalmente inicializado');
  }, 100);
}

// ========================================
// INICIALIZAR AOS
// ========================================
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      disable: 'mobile' // desabilita em mobile para performance
    });
    console.log('✓ AOS inicializado');
  } else {
    console.warn('⚠️ AOS não está disponível');
  }
}

// ========================================
// GERAR NAVEGAÇÃO AUTOMÁTICA
// ========================================
function generateNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const pageLinks = document.getElementById('pageLinks');
  
  console.log('🔍 Buscando sections com ID...', sections.length);
  console.log('🔍 PageLinks container:', pageLinks);
  
  if (!pageLinks) {
    console.error('❌ Elemento #pageLinks não encontrado!');
    return;
  }
  
  if (sections.length === 0) {
    console.warn('⚠️ Nenhuma section com ID encontrada');
    return;
  }
  
  // Limpa links existentes
  pageLinks.innerHTML = '';
  
  sections.forEach(section => {
    const heading = section.querySelector('h1, h2');
    
    if (heading) {
      const text = heading.textContent.trim();
      const id = section.id;
      
      console.log(`✓ Criando link para: ${text} (#${id})`);
      
      // Cria o link
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = text;
      link.className = 'page-link';
      
      pageLinks.appendChild(link);
    }
  });
  
  console.log(`✓ ${pageLinks.children.length} links de navegação gerados`);
}

// ========================================
// SMOOTH SCROLL PARA ÂNCORAS
// ========================================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Ignora href="#" vazio
      if (href === '#' || href === null) return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        console.log(`✓ Scroll suave para: ${href}`);
        
        // Fecha menu mobile se estiver aberto (Alpine.js)
        if (window.Alpine) {
          window.dispatchEvent(new CustomEvent('close-mobile-menu'));
        }
      } else {
        console.warn(`⚠️ Target não encontrado: ${href}`);
      }
    });
  });
  
  console.log('✓ Smooth scroll configurado');
}

// ========================================
// UTILIDADES GLOBAIS
// ========================================

// Refresh AOS (útil quando adiciona conteúdo dinamicamente)
window.refreshAOS = function() {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
    console.log('✓ AOS atualizado');
  }
};

// Refresh Navigation (útil se adicionar sections dinamicamente)
window.refreshNavigation = function() {
  generateNavigation();
  setupSmoothScroll();
  console.log('✓ Navegação atualizada');
};

// Log de performance
window.addEventListener('load', () => {
  const loadTime = (performance.now() / 1000).toFixed(2);
  console.log(`⚡ Página carregada em ${loadTime}s`);
});