// ========================================
// LOADER.JS - Carrega sections HTML
// REVISADO: Melhor tratamento de erros + Performance
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔄 Iniciando carregamento de sections...');
  
  const sections = document.querySelectorAll('[data-section]');
  
  if (sections.length === 0) {
    console.warn('⚠️ Nenhuma section encontrada com [data-section]');
    return;
  }
  
  // Carrega todas as sections em paralelo (mais rápido)
  const promises = Array.from(sections).map(async (element) => {
    const sectionName = element.getAttribute('data-section');
    
    if (!sectionName) {
      console.error('✗ Elemento sem atributo data-section válido');
      return { success: false, name: 'unknown' };
    }
    
    try {
      const response = await fetch(`sections/${sectionName}.html`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      
      const html = await response.text();
      
      // Validação básica do HTML retornado
      if (!html || html.trim().length === 0) {
        throw new Error('Conteúdo vazio retornado');
      }
      
      // Insere o HTML (sem SVG inline para evitar problemas)
      element.innerHTML = html;
      
      console.log(`✓ Section carregada: ${sectionName}`);
      return { success: true, name: sectionName };
      
    } catch (error) {
      console.error(`✗ Erro ao carregar "${sectionName}":`, error.message);
      
      // Mensagem de erro mais amigável
      element.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: #dc2626; border: 2px solid #dc2626; border-radius: 8px; background: #fee;">
          <p style="margin: 0; font-weight: 600;">⚠️ Erro ao carregar seção: ${sectionName}</p>
          <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #666;">${error.message}</p>
        </div>
      `;
      
      return { success: false, name: sectionName, error: error.message };
    }
  });
  
  // Aguarda todas carregarem
  const results = await Promise.all(promises);
  
  // Estatísticas de carregamento
  const sucessos = results.filter(r => r.success).length;
  const falhas = results.filter(r => !r.success).length;
  const total = results.length;
  
  console.log(`✓ Carregamento concluído: ${sucessos}/${total} sections carregadas`);
  
  if (falhas > 0) {
    console.warn(`⚠️ ${falhas} section(s) falharam:`, 
      results.filter(r => !r.success).map(r => r.name)
    );
  }
  
  // Dispara evento customizado para main.js saber que terminou
  window.dispatchEvent(new CustomEvent('sectionsLoaded', {
    detail: {
      total,
      sucessos,
      falhas,
      results
    }
  }));
  
  console.log('🎉 Loader finalizado, evento "sectionsLoaded" disparado');
});

// ========================================
// FUNÇÃO UTILITÁRIA: Recarregar uma section específica
// ========================================
window.reloadSection = async function(sectionName) {
  console.log(`🔄 Recarregando section: ${sectionName}`);
  
  const element = document.querySelector(`[data-section="${sectionName}"]`);
  
  if (!element) {
    console.error(`✗ Section "${sectionName}" não encontrada`);
    return false;
  }
  
  try {
    const response = await fetch(`sections/${sectionName}.html?t=${Date.now()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    element.innerHTML = html;
    
    console.log(`✓ Section "${sectionName}" recarregada com sucesso`);
    
    // Re-inicializa AOS se disponível
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
    
    return true;
    
  } catch (error) {
    console.error(`✗ Erro ao recarregar "${sectionName}":`, error);
    return false;
  }
};