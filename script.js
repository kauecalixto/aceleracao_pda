// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        // Manipulador de eventos para o botão de toggle
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Previne comportamento padrão
            e.stopPropagation(); // Impede propagação do evento
            
            // Toggle da classe active no menu
            mobileMenu.classList.toggle('active');
            
            // Alterna o ícone
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            // Verifica se o menu está aberto e se o clique não foi no menu ou no botão de toggle
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                e.target !== menuToggle && 
                !menuToggle.contains(e.target)) {
                
                // Fecha o menu
                mobileMenu.classList.remove('active');
                
                // Restaura o ícone
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Manipulador específico para links do menu mobile
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    if (mobileMenuLinks.length > 0 && mobileMenu) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Se for um link interno (começa com #)
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Fechar o menu mobile
                        mobileMenu.classList.remove('active');
                        
                        // Restaurar o ícone
                        const icon = menuToggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                        
                        // Scroll para o elemento alvo com um pequeno atraso
                        setTimeout(() => {
                            window.scrollTo({
                                top: targetElement.offsetTop - 70,
                                behavior: 'smooth'
                            });
                        }, 100);
                    }
                }
            });
        });
    }
    
    // Form Submission
    const inscricaoForm = document.getElementById('inscricaoForm');
    
    if (inscricaoForm) {
        inscricaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const motivation = document.getElementById('motivation').value;
            const terms = document.getElementById('terms').checked;
            
            if (!name || !email || !motivation || !terms) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For this example, we'll just show a success message
            alert('Inscrição enviada com sucesso! Entraremos em contato em breve.');
            inscricaoForm.reset();
        });
    }
    
    // Smooth scrolling para links de âncora (exceto os do menu mobile que já têm tratamento específico)
    document.querySelectorAll('a[href^="#"]:not(.mobile-menu a)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
});