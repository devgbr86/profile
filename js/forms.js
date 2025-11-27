// ========================================
// FORMS.JS - Gerenciamento de Formulário
// STACK: Alpine.js + AOS.js
// ========================================

// Inicializar AOS
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
                    // Substitua 'YOUR_FORM_ID' no HTML pelo seu ID do Formspree
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
                         alert('Mensagem enviada com sucesso!');
                         form.reset();
                    } else {
                         throw new Error('Erro no envio');
                    }
               } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao enviar. Tente novamente.');
               } finally {
                    // Reabilitar botão
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar Mensagem';
               }
          });
     }
});