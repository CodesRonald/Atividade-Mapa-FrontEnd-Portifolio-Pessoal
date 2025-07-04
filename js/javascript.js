// --- CLASSE PRINCIPAL DO MENU HAMBÚRGUER AVANÇADO ---

// Esta classe encapsula toda a lógica para um menu hambúrguer avançado e reutilizável.
// Ela gerencia o estado (aberto/fechado), cria os elementos HTML necessários,
// lida com eventos, acessibilidade, animações e gestos.
// Menu Hamburguer Avançado - JavaScript
class AdvancedHamburgerMenu {
    // O construtor é o primeiro método executado quando uma nova instância da classe é criada.
    // Ele define as propriedades iniciais.
    constructor() {
        // 'isOpen' rastreia se o menu está atualmente aberto ou fechado.
        this.isOpen = false;
        // 'isAnimating' previne que o usuário clique novamente enquanto uma animação está em andamento, evitando bugs.
        this.isAnimating = false;
        // 'touchStartY' e 'touchEndY' armazenam as coordenadas do toque para detectar gestos de deslizar.
        this.touchStartY = 0;
        this.touchEndY = 0;

        // 'pageMapping' associa um 'data-section' (usado nos links) a um arquivo HTML real.
        // Isso permite uma navegação flexível.
        // Mapeamento de seções para páginas
        this.pageMapping = {
            'home': 'index.html',
            'about': 'sobre.html',
            'projects': 'projetos.html',
            'contact': 'contato.html'
        };
        // Chama o método 'init' para começar a configuração do menu.
        this.init();
    }

    // O método 'init' organiza e chama todos os métodos de configuração necessários para o menu funcionar.
    init() {
        // Cria os elementos HTML do menu caso eles não existam no documento.
        this.createMenuElements();
        // Vincula todos os eventos de clique, teclado e toque aos seus respectivos manipuladores.
        this.bindEvents();
        // Configura atributos ARIA para melhorar a acessibilidade para leitores de tela.
        this.setupAccessibility();
        // Habilita a funcionalidade de fechar o menu ao deslizar o dedo para cima.
        this.setupSwipeGestures();
    }

    // Este método cria dinamicamente o HTML do menu.
    // Isso é útil porque não é necessário copiar e colar o HTML do menu em todas as páginas;
    // o JavaScript o injeta automaticamente.
    createMenuElements() {
        // Verifica se o overlay do menu já existe para não criá-lo duas vezes.
        // Criar overlay do menu se não existir
        if (!document.querySelector('.mobile-menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            // O HTML interno do menu é definido aqui, incluindo o botão de fechar, a lista de links e as informações de contato.
            overlay.innerHTML = `
                <div class="mobile-menu-container">
                    <button class="close-menu-btn" aria-label="Fechar menu">
                        <i class="fas fa-times"></i>
                    </button>
         
                    
                    <ul class="mobile-menu-list">
                        <li class="mobile-menu-item">
                            <a href="index.html" class="mobile-menu-link" data-section="home">
            
                                <span>Início</span>
                            </a>
                        </li>
                        <li class="mobile-menu-item">
   
                             <a href="sobre.html" class="mobile-menu-link" data-section="about">
                                <span>Sobre</span>
                            </a>
            
                         </li>
                        <li class="mobile-menu-item">
                            <a href="projetos.html" class="mobile-menu-link" data-section="projects">
                                
                                <span>Projetos</span>
                            </a>
                        </li>
                        <li class="mobile-menu-item">
                       
                     <a href="contato.html" class="mobile-menu-link" data-section="contact">
                                <span>Contato</span>
                            </a>
                        </li>
        
                     </ul>
                    
                    <div class="mobile-contact-info">
                        <p>Entre em contato</p>
                     
                       <div class="mobile-social-links">
                            <a href="mailto:ronald.official.contact@gmail.com" class="mobile-social-link" target="_blank">
                                <i class="fas fa-envelope"></i>
                            </a>
   
                             <a href="https://wa.me/5535992737294" class="mobile-social-link" target="_blank">
                                <i class="fab fa-whatsapp"></i>
                            </a>
          
                           <a href="https://www.linkedin.com/in/ronald-verola/" class="mobile-social-link" target="_blank">
                                <i class="fab fa-linkedin"></i>
                            </a>
                 
                         <a href="https://github.com/CodesRonald" class="mobile-social-link" target="_blank">
                                <i class="fab fa-github"></i>
                            </a>
                        
                     </div>
                    </div>
                </div>
            `;
            // Adiciona o overlay recém-criado ao final do <body> do documento.
            document.body.appendChild(overlay);
        }

        // Verifica se o botão do menu hambúrguer existe, e se não tiver o ícone, o cria.
        // Criar ícone hamburguer se não existir
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle && !menuToggle.querySelector('.hamburger-icon')) {
            // Cria as três barrinhas do ícone.
            menuToggle.innerHTML = `
                <div class="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
     
                 </div>
            `;
        }
    }

    // Este método centraliza a adição de todos os "event listeners".
    bindEvents() {
        // Vincula o evento de clique ao botão hambúrguer para abrir/fechar o menu.
        // Toggle do menu
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMenu();
            });
        }

        // Vincula o evento de clique ao botão 'X' para fechar o menu.
        // Botão de fechar
        const closeBtn = document.querySelector('.close-menu-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMenu();
            });
        }

        // Permite que o menu seja fechado ao clicar na área escura do overlay.
        // Overlay clicável
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                // Verifica se o clique foi diretamente no overlay, e não em um de seus filhos (como os links).
                if (e.target === overlay) {
                    this.createRippleEffect(e);
                    this.closeMenu();
                }

            });
        }

        // Adiciona o manipulador de clique para cada link dentro do menu.
        // Links do menu
        const menuLinks = document.querySelectorAll('.mobile-menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMenuLinkClick(link);
            });
        });
        // Permite que o usuário feche o menu pressionando a tecla 'Escape'.
        // Tecla ESC para fechar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        // Impede a rolagem da página principal quando o menu está aberto em dispositivos de toque.
        // Prevenção de scroll quando menu está aberto
        document.addEventListener('touchmove', (e) => {
            if (this.isOpen) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Configura atributos ARIA para acessibilidade.
    // Isso ajuda leitores de tela a entenderem o que o menu faz.
    setupAccessibility() {
        const menuToggle = document.querySelector('.menu-toggle');
        const overlay = document.querySelector('.mobile-menu-overlay');

        if (menuToggle) {
            // Informa se o menu está expandido ou não.
            menuToggle.setAttribute('aria-expanded', 'false');
            // Associa o botão ao menu que ele controla.
            menuToggle.setAttribute('aria-controls', 'mobile-menu');
            menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        }

        if (overlay) {
            overlay.setAttribute('id', 'mobile-menu');
            // Define o overlay como uma "caixa de diálogo".
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-labelledby', 'menu-title');
        }
    }

    // Configura os eventos de toque para detectar gestos.
    setupSwipeGestures() {
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) return;

        // Armazena a posição Y inicial quando o usuário toca na tela.
        overlay.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        });
        // Armazena a posição Y final quando o usuário solta o dedo e chama o manipulador.
        overlay.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].clientY;
            this.handleSwipeGesture();
        });
    }

    // Calcula a distância do deslize e fecha o menu se for um gesto para cima.
    handleSwipeGesture() {
        // 'swipeThreshold' é a distância mínima em pixels para considerar um deslize válido.
        const swipeThreshold = 100;
        const swipeDistance = this.touchStartY - this.touchEndY;

        // Se a distância do deslize para cima for maior que o limite, fecha o menu.
        // Swipe para cima para fechar
        if (swipeDistance > swipeThreshold) {
            this.closeMenu();
        }
    }

    // Método principal para alternar o estado do menu.
    toggleMenu() {
        // Se uma animação já estiver ocorrendo, não faz nada.
        if (this.isAnimating) return;
        // Se o menu estiver aberto, fecha. Se estiver fechado, abre.
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    // Lógica para abrir o menu.
    openMenu() {
        if (this.isAnimating || this.isOpen) return;
        this.isAnimating = true;
        this.isOpen = true;

        const menuToggle = document.querySelector('.menu-toggle');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;
        // Atualiza as classes e atributos ARIA para o estado "aberto".
        // Atualizar estados
        if (menuToggle) {
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', 'Fechar menu de navegação');
        }

        if (overlay) {
            overlay.classList.add('active', 'entering');
            // Move o foco para o primeiro link do menu por acessibilidade.
            // Focar no primeiro item do menu
            setTimeout(() => {
                const firstLink = overlay.querySelector('.mobile-menu-link');
                if (firstLink) firstLink.focus();
            }, 100);
        }

        // Bloqueia a rolagem do corpo da página.
        body.classList.add('menu-open');

        // Dispara a animação dos itens do menu.
        this.animateMenuItems();
        // Após a animação de abertura, remove a classe 'entering' e libera o bloqueio de animação.
        // Remover classe de animação
        setTimeout(() => {
            if (overlay) overlay.classList.remove('entering');
            this.isAnimating = false;
        }, 400);
    }

    // Lógica para fechar o menu.
    closeMenu() {
        if (this.isAnimating || !this.isOpen) return;
        this.isAnimating = true;
        this.isOpen = false;

        const menuToggle = document.querySelector('.menu-toggle');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;
        // Reverte as classes e atributos ARIA para o estado "fechado".
        // Atualizar estados
        if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        }

        if (overlay) {
            // Adiciona a classe que dispara a animação de saída.
            overlay.classList.add('leaving');
        }

        // Libera a rolagem do corpo da página.
        body.classList.remove('menu-open');

        // Após a animação de fechamento, limpa as classes e retorna o foco ao botão hambúrguer.
        // Remover classes após animação
        setTimeout(() => {
            if (overlay) {
                overlay.classList.remove('active', 'leaving');
            }
            this.isAnimating = false;

            // Retornar foco para o botão toggle

            if (menuToggle) menuToggle.focus();
        }, 300);
    }

    // Anima os itens do menu para que eles "entrem" na tela de forma escalonada.
    animateMenuItems() {
        const menuItems = document.querySelectorAll('.mobile-menu-item');
        menuItems.forEach((item, index) => {
            // Reseta o estilo inicial para a animação.
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';

            // Aplica o estilo final com um atraso, criando o efeito de cascata.
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                item.style.opacity = '1';

                item.style.transform = 'translateX(0)';
            }, 100 + (index * 100));
        });
    }

    // Manipula o clique em um link do menu.
    handleMenuLinkClick(link) {
        // Adiciona uma classe para um feedback visual de clique.
        // Efeito visual de clique
        link.classList.add('clicked');
        // Adiciona um feedback tátil (vibração) em dispositivos que suportam.
        // Vibração (se suportado)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        // Obtém a seção de destino do atributo 'data-section' do link.
        // Obter seção de destino
        const section = link.getAttribute('data-section');
        // Fecha o menu primeiro para uma transição suave.
        // Fechar menu primeiro
        this.closeMenu();
        // Após a animação de fechamento, navega para a página correspondente.
        // Navegar para página após fechar menu
        setTimeout(() => {
            this.navigateToPage(section);
            link.classList.remove('clicked');
        }, 300);
    }

    // Redireciona o navegador para a página correspondente à seção clicada.
    navigateToPage(section) {
        // Procura o nome do arquivo HTML no objeto 'pageMapping'.
        // Obter o nome da página do mapeamento
        const targetPage = this.pageMapping[section];
        if (targetPage) {
            // Adiciona um efeito de fade out suave no corpo da página antes do redirecionamento.
            // Adicionar efeito de transição suave antes de redirecionar
            document.body.style.transition = 'opacity 0.3s ease-out';
            document.body.style.opacity = '0.8';

            // Redireciona para a nova página após um pequeno atraso.
            // Redirecionar para a página
            setTimeout(() => {
                window.location.href = targetPage;
            }, 100);
        } else {
            // Avisa no console se a página não for encontrada no mapeamento.
            console.warn(`Página não encontrada para a seção: ${section}`);
        }
    }

    // Um método alternativo que navega imediatamente, sem esperar pela animação de fechamento.
    // Método alternativo para navegação direta (sem animação de fechamento)
    navigateToPageDirect(section) {
        const targetPage = this.pageMapping[section];
        if (targetPage) {
            window.location.href = targetPage;
        }
    }

    // Cria um efeito visual de "onda" (ripple) a partir do ponto de clique no overlay.
    createRippleEffect(e) {
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) return;

        overlay.classList.add('ripple');

        // Calcula a posição do clique relativa ao overlay para posicionar a onda.
        // Calcular posição do clique
        const rect = overlay.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        // Cria um elemento <div> para a onda e aplica estilos via CSS.
        // Criar elemento de onda
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        overlay.appendChild(ripple);

        // Remove o elemento da onda após a animação terminar.
        // Remover elemento após animação
        setTimeout(() => {
            ripple.remove();
            overlay.classList.remove('ripple');
        }, 600);
    }

    // Permite atualizar os itens do menu dinamicamente.
    // Recebe um array de objetos e recria a lista de links.
    // Método para atualizar o menu dinamicamente
    updateMenuItems(items) {
        const menuList = document.querySelector('.mobile-menu-list');
        if (!menuList || !items) return;

        menuList.innerHTML = items.map(item => `
            <li class="mobile-menu-item">
                <a href="${item.href}" class="mobile-menu-link" data-section="${item.section}">
                    <span>${item.title}</span>
                </a>
            </li>
        `).join('');
        // Após recriar os links, é necessário vincular os eventos de clique a eles novamente.
        // Re-bind events para novos links
        const newLinks = menuList.querySelectorAll('.mobile-menu-link');
        newLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMenuLinkClick(link);
            });
        });
    }


    // Permite adicionar um novo mapeamento de seção para página dinamicamente.
    // Método para adicionar nova página ao mapeamento
    addPageMapping(section, page) {
        this.pageMapping[section] = page;
    }

    // Permite remover um mapeamento de seção.
    // Método para remover página do mapeamento
    removePageMapping(section) {
        delete this.pageMapping[section];
    }

    // Retorna uma cópia do objeto de mapeamento atual.
    // Método para obter o mapeamento atual
    getPageMapping() {
        return { ...this.pageMapping };
    }

    // Adiciona ou remove uma classe 'loading' para mostrar um indicador de carregamento.
    // Método para adicionar loading state
    setLoadingState(isLoading) {
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) return;

        if (isLoading) {
            overlay.classList.add('loading');
        } else {
            overlay.classList.remove('loading');
        }
    }

    // Adiciona ou remove uma classe 'error' para indicar um estado de erro.
    // Método para definir estado de erro
    setErrorState(hasError) {
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) return;

        if (hasError) {
            overlay.classList.add('error');
        } else {
            overlay.classList.remove('error');
        }
    }

    // Método de "limpeza" para remover completamente o menu e seus eventos da página.
    // Útil para Single Page Applications (SPAs) ou ao redimensionar a tela para desktop.
    // Método para destruir o menu (cleanup)
    destroy() {
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.remove();
        }

        // Remove os event listeners globais para evitar vazamentos de memória.
        // Remover event listeners
        document.removeEventListener('keydown', this.handleKeydown);
        document.removeEventListener('touchmove', this.handleTouchMove);

        // Limpa a classe do <body>.
        // Limpar classes do body
        document.body.classList.remove('menu-open');
    }
}


// --- INICIALIZAÇÃO E LÓGICA GLOBAL ---

// O evento 'DOMContentLoaded' espera o HTML da página ser totalmente carregado antes de executar o script.
// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Verifica a largura da tela para determinar se é um dispositivo móvel.
    // Verificar se estamos em dispositivo móvel
    const isMobile = window.innerWidth <= 768;

    // Só cria uma nova instância do menu se for um dispositivo móvel.
    if (isMobile) {
        window.hamburgerMenu = new AdvancedHamburgerMenu();
    }

    // Adiciona um listener para o redimensionamento da janela do navegador.
    // Isso torna o menu responsivo, criando-o ou destruindo-o conforme necessário.
    // Re-inicializar ao redimensionar
    window.addEventListener('resize', () => {
        const isMobileNow = window.innerWidth <= 768;

        // Se a tela for redimensionada para móvel e o menu não existir, cria um novo.
        if (isMobileNow && !window.hamburgerMenu) {
            window.hamburgerMenu
                = new AdvancedHamburgerMenu();
            // Se a tela for redimensionada para desktop e o menu existir, ele é destruído para economizar recursos.
        } else if (!isMobileNow && window.hamburgerMenu) {
            window.hamburgerMenu.destroy();
            window.hamburgerMenu = null;
        }
    });
});
// Permite que a classe seja importada em outros arquivos em ambientes Node.js ou com bundlers como Webpack.
// Exportar para uso externo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedHamburgerMenu;
}

// --- FUNÇÕES AUXILIARES GLOBAIS ---

// Carrega um pedaço de HTML de um arquivo (como sobre.html) e o insere em um container na página atual.
// Isso permite ter conteúdo de seções em arquivos separados.
// Carregar conteúdo dinâmico para seções
function loadPartial(url, sectionId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.getElementById(sectionId);

            if (content) {

                document.getElementById('dynamic-container').innerHTML = content.innerHTML;
            } else {
                document.getElementById('dynamic-container').innerHTML = '<p>Seção não encontrada.</p>';
            }

            // Se a seção carregada for a de contato, inicializa a validação do formulário.
            // Ativar validação se for contato
            if (sectionId === 'contact') {

                initContactFormValidation();
            }

            // Re-vincula eventos JS que podem ter sido perdidos ao substituir o HTML.
            // Reativar interações (menu, scroll etc)
            rebindInteractions();

            // Aplica novamente as animações de ícone no novo conteúdo.
            // Aplicar animações de rotação após carregar conteúdo dinâmico
            applyIconRotationAnimations();
        })
        .catch(error => {

            console.error('Erro ao carregar conteúdo:', error);
        });
}

// Reaplica eventos que se perdem quando o DOM é modificado.
// Reaplica eventos JS após carregar conteúdo
function rebindInteractions() {
    // Adiciona a funcionalidade de rolagem suave para links de âncora (ex: <a href="#top">).
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });

            }
        });
    });
}

// Aplica uma animação de rotação simples aos ícones da seção de contato.
// Função para aplicar animações de rotação nos ícones
function applyIconRotationAnimations() {
    // Função interna para aplicar o efeito de rotação a um elemento.
    // Função para rotação simples ao passar o mouse
    function hoverRotate(element) {
        // 'dataset.rotationApplied' é usado para garantir que o evento não seja adicionado múltiplas vezes ao mesmo ícone.
        // Evitar duplicação de eventos
        if (element.dataset.rotationApplied) return;
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.5s ease-in-out';
            element.style.transform = 'rotate(360deg)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'rotate(0deg)';
        });
        element.dataset.rotationApplied = 'true'; // Marcar como processado
    }

    // Seleciona todos os ícones da seção de contato.
    // Selecionar todos os ícones da seção de contato
    const emailIcon = document.querySelector('.contact-item-email .fas.fa-envelope');
    const whatsappIcon = document.querySelector('.contact-item-whatsapp .fab.fa-whatsapp');
    const locationIcon = document.querySelector('.contact-item-localization .fas.fa-map-marker-alt');
    const instagramIcon = document.querySelector('.contact-item-instagram .fab.fa-instagram');
    const linkedinIcon = document.querySelector('.contact-item-linkedin .fab.fa-linkedin');
    const githubIcon = document.querySelector('.contact-item-github .fab.fa-github');

    // Aplica o efeito de rotação para cada ícone, se ele existir na página.
    // Aplicar o efeito de rotação para todos os ícones
    if (emailIcon) hoverRotate(emailIcon);
    if (whatsappIcon) hoverRotate(whatsappIcon);
    if (locationIcon) hoverRotate(locationIcon);
    if (instagramIcon) hoverRotate(instagramIcon);
    if (linkedinIcon) hoverRotate(linkedinIcon);
    if (githubIcon) hoverRotate(githubIcon);
    // Injeta uma pequena folha de estilos no <head> para otimizar a performance da animação de rotação.
    // Adicionar CSS para melhorar a performance das animações (apenas uma vez)
    if (!document.querySelector('#icon-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'icon-animation-styles';
        style.textContent = `
            .contact-info i {
                transition-property: transform;
                will-change: transform;
                transform-origin: center;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }
}

// Cria um efeito de máquina de escrever para um elemento de texto.
// Animação de digitação no título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = ''; // Limpa o conteúdo inicial do elemento.
    function type() {
        if (i < text.length) {
            // Adiciona um caractere por vez.
            element.innerHTML += text.charAt(i);
            i++;
            // Chama a si mesma novamente após um pequeno intervalo ('speed').
            setTimeout(type, speed);
        }
    }
    type();
}

// O evento 'load' espera que todos os recursos da página (imagens, etc.) sejam carregados.
// Inicializar animação quando a página carregar
window.addEventListener('load', function () {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        // Inicia o efeito de máquina de escrever no título principal.
        typeWriter(heroTitle, 'Ronald de Souza Verola', 150);
    }

    // Se houver um formulário de contato na página, inicia sua validação.
    // Iniciar validação se for a página de contato
    if (document.getElementById('contact-form')) {
        initContactFormValidation();
    }

    // Vincula interações iniciais.
    rebindInteractions(); // Inicial interações

    // Aplica animações de rotação nos ícones.
    // Aplicar animações de rotação no carregamento inicial
    applyIconRotationAnimations();
});
// Adiciona a classe 'header-scrolled' ao header quando o usuário rola a página para baixo.
// Efeito de scroll no header
window.addEventListener('scroll', function () {
    const header = document.querySelector('header'); // ✅ CORRETO
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
// Um listener adicional para garantir que as animações sejam aplicadas assim que o HTML estiver pronto.
// Aguardar o carregamento da página
document.addEventListener('DOMContentLoaded', function () {
    // Aplicar animações de rotação quando a página carregar
    applyIconRotationAnimations();
});
// Lógica para validar o formulário de contato antes do envio.
// Validação do formulário de contato
function initContactFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        // Previne o envio padrão do formulário, que recarregaria a página.
        e.preventDefault();

        // Esconde todas as mensagens de erro antes de validar novamente.
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.style.display = 'none');

        let isValid = true;

        // Validação do campo Nome.
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;

        }

        // Validação do campo E-mail usando uma expressão regular (Regex).
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }

        // Validação do campo Telefone usando uma expressão regular para o formato (XX) XXXXX-XXXX.
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

        if (phone === '' || !phoneRegex.test(phone)) {
            document.getElementById('phone-error').style.display = 'block';
            isValid = false;
        }

        // Validação do campo Assunto.
        const subject = document.getElementById('subject').value.trim();
        if (subject === '') {
            document.getElementById('subject-error').style.display = 'block';
            isValid = false;
        }

        // Validação do campo Mensagem.
        const message = document.getElementById('message').value.trim();
        if (message === '') {
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }

        // Se todos os campos forem válidos, exibe um alerta e limpa o formulário.
        if (isValid) {
            alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
            this.reset();
        }
    });
}