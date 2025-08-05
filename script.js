// Manual do Direito - JavaScript Principal
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initMobileMenu();
    initSmoothScrolling();
    initPostLoader();
    initSearchFunctionality();
    initLazyLoading();
    initAnimations();
});

// Menu Mobile
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animação do hambúrguer
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Fechar menu ao clicar em link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// Scroll suave
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

// Carregador de Posts
function initPostLoader() {
    const postsContainer = document.getElementById('latest-posts');
    if (!postsContainer) return;
    
    // Simular carregamento de posts (em produção, isso viria do CMS)
    const samplePosts = [
        {
            title: "Novo Marco Civil da Internet: Principais Mudanças",
            slug: "novo-marco-civil-internet-principais-mudancas",
            date: "2025-01-15",
            category: "Direito Digital",
            description: "Análise das principais alterações no Marco Civil da Internet e seus impactos na proteção de dados pessoais.",
            image: "images/placeholder-post.jpg",
            author: "Manual do Direito",
            featured: true
        },
        {
            title: "STF e a Interpretação da Constituição Federal",
            slug: "stf-interpretacao-constituicao-federal",
            date: "2025-01-14",
            category: "Direito Constitucional",
            description: "Como o Supremo Tribunal Federal tem interpretado os princípios constitucionais nos últimos julgamentos.",
            image: "images/placeholder-post.jpg",
            author: "Manual do Direito",
            featured: false
        },
        {
            title: "Reforma Trabalhista: 5 Anos Depois",
            slug: "reforma-trabalhista-5-anos-depois",
            date: "2025-01-13",
            category: "Direito Trabalhista",
            description: "Balanço dos impactos da reforma trabalhista na legislação e nas relações de trabalho no Brasil.",
            image: "images/placeholder-post.jpg",
            author: "Manual do Direito",
            featured: false
        }
    ];
    
    renderPosts(samplePosts, postsContainer);
}

// Renderizar posts
function renderPosts(posts, container) {
    container.innerHTML = '';
    
    posts.forEach((post, index) => {
        const postElement = createPostElement(post, index);
        container.appendChild(postElement);
    });
}

// Criar elemento de post
function createPostElement(post, index) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.style.animationDelay = `${index * 0.1}s`;
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    postCard.innerHTML = `
        <div class="post-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-date">${formatDate(post.date)}</span>
                <span class="post-category">${post.category}</span>
            </div>
            <h3 class="post-title">
                <a href="/posts/${post.slug}.html">${post.title}</a>
            </h3>
            <p class="post-excerpt">${post.description}</p>
            <a href="/posts/${post.slug}.html" class="read-more">Ler mais</a>
        </div>
    `;
    
    return postCard;
}

// Funcionalidade de busca
function initSearchFunctionality() {
    // Criar barra de busca se não existir
    const header = document.querySelector('.header-content');
    if (header && !document.querySelector('.search-container')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" class="search-input" placeholder="Buscar artigos..." aria-label="Buscar artigos">
            <button class="search-button" aria-label="Buscar">🔍</button>
        `;
        
        // Adicionar estilos para a busca
        const style = document.createElement('style');
        style.textContent = `
            .search-container {
                display: flex;
                align-items: center;
                background: var(--background-light);
                border-radius: 8px;
                padding: 0.5rem;
                margin-left: 1rem;
                border: 1px solid var(--border-color);
                transition: all var(--transition-fast);
            }
            
            .search-container:focus-within {
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
            }
            
            .search-input {
                border: none;
                background: none;
                outline: none;
                padding: 0.25rem 0.5rem;
                font-size: var(--font-size-sm);
                color: var(--text-primary);
                width: 200px;
            }
            
            .search-input::placeholder {
                color: var(--text-light);
            }
            
            .search-button {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                font-size: var(--font-size-sm);
                opacity: 0.7;
                transition: opacity var(--transition-fast);
            }
            
            .search-button:hover {
                opacity: 1;
            }
            
            @media (max-width: 768px) {
                .search-container {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        header.appendChild(searchContainer);
        
        // Funcionalidade de busca
        const searchInput = searchContainer.querySelector('.search-input');
        const searchButton = searchContainer.querySelector('.search-button');
        
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                // Em produção, isso faria uma busca real
                console.log('Buscando por:', query);
                // Implementar busca nos posts
            }
        };
        
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Animações de entrada
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem animar
    const animatedElements = document.querySelectorAll('.post-card, .hero-content, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Utilitários
const utils = {
    // Debounce para otimizar eventos
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Formatação de data
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Truncar texto
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },
    
    // Scroll para o topo
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// Botão de voltar ao topo
function createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Voltar ao topo');
    
    // Estilos do botão
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--accent-color);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            font-weight: bold;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-normal);
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: var(--hover-color);
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 1rem;
                right: 1rem;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(button);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', utils.debounce(() => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }, 100));
    
    // Ação do botão
    button.addEventListener('click', utils.scrollToTop);
}

// Inicializar botão de voltar ao topo
createBackToTopButton();

// Melhorias de performance
window.addEventListener('load', () => {
    // Preload de recursos críticos
    const criticalResources = [
        '/css/style.css',
        '/images/logo.png'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'image';
        document.head.appendChild(link);
    });
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}

