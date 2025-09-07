// Navegação mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efeito de transparência no header ao fazer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Animação de entrada dos elementos
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

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .milagre-card, .gallery-item, .carlos-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envio do formulário
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Mensagem Enviada!';
            submitBtn.style.background = '#28a745';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                this.reset();
            }, 2000);
        }, 1500);
    });
}

// Efeito parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Contador animado para estatísticas (se adicionadas futuramente)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Galeria de imagens interativa
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Criar modal para visualizar imagem (implementação futura)
        console.log('Imagem clicada:', item.querySelector('p').textContent);
    });
});

// Tooltip para ícones
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: var(--text-dark);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
        
        this.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            setTimeout(() => document.body.removeChild(tooltip), 300);
        });
    });
});

// Lazy loading para imagens (quando adicionadas)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Efeito de digitação para títulos
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação ao título principal (opcional)
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // typeWriter(heroTitle, originalText, 150);
    }
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Fechar menu mobile se estiver aberto
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Detectar preferência de movimento reduzido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    // Desabilitar animações para usuários que preferem movimento reduzido
    document.documentElement.style.setProperty('--transition', 'none');
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Performance: Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll
const debouncedScrollHandler = debounce(() => {
    // Lógica de scroll otimizada
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Service Worker para cache (PWA - implementação futura)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Analytics e métricas (implementação futura)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Implementar tracking real aqui
}

// Rastrear cliques em botões importantes
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: btn.textContent,
            section: btn.closest('section')?.id || 'unknown'
        });
    });
});

// Rastrear visualizações de seções
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_view', {
                section_id: entry.target.id,
                section_name: entry.target.querySelector('h2')?.textContent || 'Unknown'
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// Sistema de Abas
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Função para trocar de aba
function switchTab(targetTab) {
    // Remove classe active de todos os botões e conteúdos
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Adiciona classe active ao botão clicado
    const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Adiciona classe active ao conteúdo correspondente
    const activeContent = document.getElementById(targetTab);
    if (activeContent) {
        activeContent.classList.add('active');
    }
    
    // Atualiza URL sem recarregar a página
    history.pushState(null, null, `#${targetTab}`);
    
    // Rastreia mudança de aba
    trackEvent('tab_switch', {
        tab_name: targetTab,
        tab_title: activeContent?.querySelector('h2')?.textContent || targetTab
    });
}

// Event listeners para os botões das abas
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        switchTab(targetTab);
    });
});

// Função para detectar hash na URL e ativar aba correspondente
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchTab(hash);
    } else {
        // Se não há hash, ativa a primeira aba (São Carlos Acutis)
        switchTab('carlos');
    }
}

// Event listener para mudanças no hash da URL
window.addEventListener('hashchange', handleHashChange);

// Ativa a aba correta quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
});

// Navegação por teclado para as abas
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                switchTab('carlos');
                break;
            case '2':
                e.preventDefault();
                switchTab('milagres');
                break;
            case '3':
                e.preventDefault();
                switchTab('igreja');
                break;
            case '4':
                e.preventDefault();
                switchTab('galeria');
                break;
            case '5':
                e.preventDefault();
                switchTab('jovens');
                break;
        }
    }
});

// Animações específicas para as abas
function animateTabContent(content) {
    const elements = content.querySelectorAll('.card, .milagre-card, .virtude-card, .stat-card, .timeline-item');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Observador para animar conteúdo quando aba se torna ativa
const tabObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('active')) {
            animateTabContent(entry.target);
        }
    });
}, { threshold: 0.1 });

tabContents.forEach(content => {
    tabObserver.observe(content);
});

// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(parseFloat(target));
        
        if (isNumber) {
            const finalNumber = parseFloat(target);
            let current = 0;
            const increment = finalNumber / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);
        }
    });
}

// Ativa contadores quando a aba da Igreja é aberta
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="igreja"]')) {
        setTimeout(animateCounters, 500);
    }
});

// Efeito de hover melhorado para as abas
tabButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (!button.classList.contains('active')) {
            button.style.transform = 'translateY(-2px)';
        }
    });
    
    button.addEventListener('mouseleave', () => {
        if (!button.classList.contains('active')) {
            button.style.transform = 'translateY(0)';
        }
    });
});

// Indicador de progresso para a timeline de São Carlos
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Ativa animação da timeline quando a aba de São Carlos é aberta
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="carlos"]')) {
        setTimeout(animateTimeline, 500);
    }
});

// Efeito de digitação para frases de São Carlos
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplica efeito de digitação nas frases quando a aba é ativada
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="carlos"]')) {
        setTimeout(() => {
            const frases = document.querySelectorAll('.frases-container blockquote');
            frases.forEach((frase, index) => {
                const originalText = frase.textContent;
                setTimeout(() => {
                    typeWriter(frase, originalText, 50);
                }, index * 1000);
            });
        }, 1000);
    }
});

// Sistema de busca nas abas (funcionalidade futura)
function searchInTabs(query) {
    const searchResults = [];
    const searchQuery = query.toLowerCase();
    
    tabContents.forEach(content => {
        const text = content.textContent.toLowerCase();
        if (text.includes(searchQuery)) {
            searchResults.push({
                tab: content.id,
                title: content.querySelector('h2')?.textContent || content.id
            });
        }
    });
    
    return searchResults;
}

// Adiciona indicador visual de aba ativa no menu principal
function updateMainMenuActiveTab() {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        const tabId = activeTab.id;
        const menuLinks = document.querySelectorAll('.nav-menu a');
        
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${tabId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Atualiza menu principal quando aba muda
document.addEventListener('click', (e) => {
    if (e.target.closest('.tab-btn')) {
        setTimeout(updateMainMenuActiveTab, 100);
    }
});

// ===== FUNCIONALIDADES ESPECÍFICAS PARA ABA JOVENS =====

// Carousel de frases motivacionais
let currentFraseIndex = 0;
const frases = document.querySelectorAll('.frase-item');

function showNextFrase() {
    if (frases.length === 0) return;
    
    frases[currentFraseIndex].classList.remove('active');
    currentFraseIndex = (currentFraseIndex + 1) % frases.length;
    frases[currentFraseIndex].classList.add('active');
}

// Inicia o carousel de frases quando a aba jovens é ativada
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="jovens"]')) {
        setTimeout(() => {
            if (frases.length > 0) {
                setInterval(showNextFrase, 5000); // Muda a cada 5 segundos
            }
        }, 1000);
    }
});

// Animações especiais para cards da aba jovens
function animateJovensCards() {
    const cards = document.querySelectorAll('.razao-card, .santo-card, .recurso-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Ativa animações quando aba jovens é aberta
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="jovens"]')) {
        setTimeout(animateJovensCards, 500);
    }
});

// Efeito de hover dinâmico para cards de razões
document.addEventListener('DOMContentLoaded', () => {
    const razaoCards = document.querySelectorAll('.razao-card');
    
    razaoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Contador animado para estatísticas dos jovens
function animateJovensStats() {
    const stats = document.querySelectorAll('.jovem-stat .stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(parseFloat(target));
        
        if (isNumber) {
            const finalNumber = parseFloat(target);
            let current = 0;
            const increment = finalNumber / 30;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 50);
        }
    });
}

// Ativa contadores quando aba jovens é aberta
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="jovens"]')) {
        setTimeout(animateJovensStats, 800);
    }
});

// Efeito de digitação para títulos da aba jovens
function typeWriterJovens(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplica efeito de digitação no título principal quando aba jovens é ativada
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="jovens"]')) {
        setTimeout(() => {
            const titulo = document.querySelector('#jovens .tab-header h2');
            if (titulo) {
                const originalText = titulo.textContent;
                typeWriterJovens(titulo, originalText, 80);
            }
        }, 300);
    }
});

// Sistema de interação com botões CTA
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-cta')) {
        e.preventDefault();
        
        if (e.target.classList.contains('primary')) {
            // Simula ação de "Começar Agora"
            e.target.textContent = 'Redirecionando...';
            e.target.style.background = '#00b894';
            
            setTimeout(() => {
                e.target.textContent = 'Começar Agora';
                e.target.style.background = '';
                alert('🚀 Parabéns! Você está pronto para ser um jovem católico de impacto!');
            }, 2000);
        } else if (e.target.classList.contains('secondary')) {
            // Simula ação de "Saber Mais"
            e.target.textContent = 'Carregando...';
            e.target.style.background = 'rgba(255,255,255,0.2)';
            
            setTimeout(() => {
                e.target.textContent = 'Saber Mais';
                e.target.style.background = '';
                alert('📚 Explore mais sobre a fé católica e como ela pode transformar sua vida!');
            }, 1500);
        }
    }
});

// Efeito de parallax para hero section dos jovens
window.addEventListener('scroll', () => {
    const jovensHero = document.querySelector('.jovens-hero');
    if (jovensHero && document.querySelector('#jovens').classList.contains('active')) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        jovensHero.style.transform = `translateY(${rate}px)`;
    }
});

// Sistema de notificações para jovens
function showJovensNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `jovens-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00b894' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Ativa notificação quando aba jovens é aberta
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="jovens"]')) {
        setTimeout(() => {
            showJovensNotification('🔥 Bem-vindo à seção dos jovens católicos!', 'success');
        }, 1000);
    }
});

// Sistema de busca rápida para recursos
function searchJovensResources(query) {
    const recursos = document.querySelectorAll('.recurso-card');
    const queryLower = query.toLowerCase();
    
    recursos.forEach(recurso => {
        const text = recurso.textContent.toLowerCase();
        if (text.includes(queryLower)) {
            recurso.style.display = 'block';
            recurso.style.animation = 'pulse 0.6s ease-in-out';
        } else {
            recurso.style.display = 'none';
        }
    });
}

// Adiciona barra de busca para recursos (funcionalidade futura)
function addSearchBar() {
    const recursosSection = document.querySelector('.recursos-jovens');
    if (recursosSection && !document.querySelector('.jovens-search')) {
        const searchBar = document.createElement('div');
        searchBar.className = 'jovens-search';
        searchBar.innerHTML = `
            <input type="text" placeholder="Buscar recursos..." class="search-input">
            <button class="search-btn"><i class="fas fa-search"></i></button>
        `;
        
        searchBar.style.cssText = `
            display: flex;
            gap: 10px;
            margin-bottom: 2rem;
            justify-content: center;
        `;
        
        const searchInput = searchBar.querySelector('.search-input');
        const searchBtn = searchBar.querySelector('.search-btn');
        
        searchInput.style.cssText = `
            padding: 10px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            outline: none;
            width: 300px;
            font-size: 1rem;
        `;
        
        searchBtn.style.cssText = `
            padding: 10px 15px;
            background: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: var(--transition);
        `;
        
        searchBtn.addEventListener('click', () => {
            searchJovensResources(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchJovensResources(searchInput.value);
            }
        });
        
        recursosSection.insertBefore(searchBar, recursosSection.querySelector('h3').nextSibling);
    }
}

// Ativa barra de busca quando aba jovens é aberta
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="jovens"]')) {
        setTimeout(addSearchBar, 2000);
    }
});

// Sistema de compartilhamento social para jovens
function addSocialShare() {
    const ctaSection = document.querySelector('.jovens-cta');
    if (ctaSection && !document.querySelector('.social-share')) {
        const shareButtons = document.createElement('div');
        shareButtons.className = 'social-share';
        shareButtons.innerHTML = `
            <p>Compartilhe com outros jovens:</p>
            <div class="share-buttons">
                <button class="share-btn facebook"><i class="fab fa-facebook"></i></button>
                <button class="share-btn instagram"><i class="fab fa-instagram"></i></button>
                <button class="share-btn twitter"><i class="fab fa-twitter"></i></button>
                <button class="share-btn whatsapp"><i class="fab fa-whatsapp"></i></button>
            </div>
        `;
        
        shareButtons.style.cssText = `
            margin-top: 2rem;
            text-align: center;
        `;
        
        const shareBtns = shareButtons.querySelectorAll('.share-btn');
        shareBtns.forEach(btn => {
            btn.style.cssText = `
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                margin: 0 10px;
                cursor: pointer;
                transition: var(--transition);
                color: white;
                font-size: 1.2rem;
            `;
            
            if (btn.classList.contains('facebook')) btn.style.background = '#3b5998';
            if (btn.classList.contains('instagram')) btn.style.background = '#e4405f';
            if (btn.classList.contains('twitter')) btn.style.background = '#1da1f2';
            if (btn.classList.contains('whatsapp')) btn.style.background = '#25d366';
            
            btn.addEventListener('click', () => {
                showJovensNotification('Compartilhado com sucesso! 🙏', 'success');
            });
        });
        
        ctaSection.appendChild(shareButtons);
    }
}

// Ativa botões de compartilhamento quando aba jovens é aberta
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab="jovens"]')) {
        setTimeout(addSocialShare, 3000);
    }
});

console.log('Sistema de abas da Igreja Católica carregado com sucesso! 🙏');
console.log('Atalhos de teclado: Alt+1 (São Carlos), Alt+2 (Milagres), Alt+3 (Igreja), Alt+4 (Galeria), Alt+5 (Jovens)');
console.log('🔥 Aba Jovens com recursos interativos carregada!');
