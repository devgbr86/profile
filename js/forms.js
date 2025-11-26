// ========================================
// FORMS.JS - Gerenciamento de Formulário
// Com Alpine.js e Vanilla JS
// ========================================

// Inicializar AOS (Animações)
AOS.init({
     duration: 800,
     once: true,
     offset: 100
});

// ========================================
// ALPINE.JS - Component para Formulário
// ========================================
function contactForm() {
     return {
          formData: {
               name: '',
               email: '',
               subject: '',
               message: ''
          },
          isSubmitting: false,
          showSuccess: false,
          showError: false,

          async submitForm() {
               this.isSubmitting = true;
               this.showSuccess = false;
               this.showError = false;

               const form = document.getElementById('contactForm');
               const formData = new FormData(form);

               try {
                    const response = await fetch(form.action, {
                         method: 'POST',
                         body: formData,
                         headers: {
                              'Accept': 'application/json'
                         }
                    });

                    if (response.ok) {
                         this.showSuccess = true;
                         // Limpar formulário
                         this.formData = {
                              name: '',
                              email: '',
                              subject: '',
                              message: ''
                         };
                         form.reset();
                         
                         // Esconder mensagem após 5 segundos
                         setTimeout(() => {
                              this.showSuccess = false;
                         }, 5000);
                    } else {
                         throw new Error('Erro no envio');
                    }
               } catch (error) {
                    console.error('Erro ao enviar formulário:', error);
                    this.showError = true;
                    
                    setTimeout(() => {
                         this.showError = false;
                    }, 5000);
               } finally {
                    this.isSubmitting = false;
               }
          }
     }
}

// ========================================
// VANILLA JS - Fallback caso Alpine falhe
// ========================================
document.addEventListener('DOMContentLoaded', () => {
     const form = document.getElementById('contactForm');
     
     // Verificar se Alpine.js está carregado
     if (typeof Alpine === 'undefined') {
          console.log('Alpine.js não detectado, usando Vanilla JS...');
          
          const successMessage = document.getElementById('successMessage');
          const errorMessage = document.getElementById('errorMessage');

          form.addEventListener('submit', async (e) => {
               e.preventDefault();

               const formData = new FormData(form);
               const submitButton = form.querySelector('button[type="submit"]');
               
               // Desabilitar botão
               submitButton.disabled = true;
               submitButton.textContent = 'Enviando...';

               try {
                    const response = await fetch(form.action, {
                         method: 'POST',
                         body: formData,
                         headers: {
                              'Accept': 'application/json'
                         }
                    });

                    if (response.ok) {
                         successMessage.style.display = 'block';
                         errorMessage.style.display = 'none';
                         form.reset();

                         setTimeout(() => {
                              successMessage.style.display = 'none';
                         }, 5000);
                    } else {
                         throw new Error('Erro no envio');
                    }
               } catch (error) {
                    console.error('Erro:', error);
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';

                    setTimeout(() => {
                         errorMessage.style.display = 'none';
                    }, 5000);
               } finally {
                    // Reabilitar botão
                    submitButton.disabled = false;
                    submitButton.textContent = '📨 Enviar Mensagem';
               }
          });
     }
});