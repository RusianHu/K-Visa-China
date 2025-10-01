// ===== Language Switching System =====
let currentLang = localStorage.getItem('preferredLanguage') || 'zh';

// 初始化语言
function initLanguage() {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-lang', currentLang);
    htmlElement.setAttribute('lang', currentLang);
    updateLanguage(currentLang);
    updateLangButtonText();
}

// 更新页面语言
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang][key];

        if (translation) {
            // 检查元素类型
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.hasAttribute('data-tooltip')) {
                element.setAttribute('data-tooltip', translation);
            } else if (element.tagName === 'TITLE') {
                element.textContent = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });

    // 更新带有 data-i18n-title 属性的元素
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        const translation = translations[lang][key];
        if (translation) {
            element.setAttribute('title', translation);
        }
    });

    // 更新 HTML lang 属性
    document.documentElement.lang = lang;

    // 添加切换动画
    document.body.style.opacity = '0.95';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
}

// 更新语言按钮文字
function updateLangButtonText() {
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = currentLang === 'en' ? '中文' : 'EN';
    }
}

// 切换语言
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('preferredLanguage', currentLang);
    updateLanguage(currentLang);
    updateLangButtonText();

    // 显示切换提示
    showNotification(currentLang === 'en' ? 'Language switched to English' : '语言已切换为中文');
}

// 语言切换按钮事件
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();

    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.addEventListener('click', toggleLanguage);
    }
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Floating Action Button (FAB) =====
const fab = document.getElementById('fab');
const fabMenu = document.getElementById('fabMenu');

fab.addEventListener('click', () => {
    fab.classList.toggle('active');
    fabMenu.classList.toggle('active');
});

// Close FAB menu when clicking outside
document.addEventListener('click', (e) => {
    if (!fab.contains(e.target) && !fabMenu.contains(e.target)) {
        fab.classList.remove('active');
        fabMenu.classList.remove('active');
    }
});

// ===== Smooth Scroll with Offset for Fixed Navbar =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = 64;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link Highlighting =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                } else {
                    link.style.backgroundColor = '';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== Scroll Animations =====
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

// Observe cards and timeline items
const animatedElements = document.querySelectorAll('.card, .timeline-item, .resource-card, .stat-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== Show/Hide FAB on Scroll =====
let lastScrollTop = 0;
const fabElement = document.getElementById('fab');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        fabElement.style.opacity = '1';
        fabElement.style.pointerEvents = 'all';
    } else {
        fabElement.style.opacity = '0';
        fabElement.style.pointerEvents = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Initial state
fabElement.style.opacity = '0';
fabElement.style.pointerEvents = 'none';
fabElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// ===== Interactive Checklist =====
const checklistItems = document.querySelectorAll('.checklist li');
checklistItems.forEach(item => {
    item.addEventListener('click', () => {
        item.style.backgroundColor = item.style.backgroundColor === 'rgb(200, 230, 201)' ? '' : '#C8E6C9';
    });
});

// ===== Copy to Clipboard for Links =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ===== Notification System =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 24px;
        background-color: #323232;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Table Responsive Wrapper =====
const tables = document.querySelectorAll('table');
tables.forEach(table => {
    const wrapper = table.parentElement;
    if (wrapper.classList.contains('table-container')) {
        // Add scroll hint
        const scrollHint = document.createElement('div');
        scrollHint.textContent = '← Scroll to see more →';
        scrollHint.style.cssText = `
            text-align: center;
            padding: 8px;
            font-size: 0.875rem;
            color: #757575;
            display: none;
        `;
        wrapper.appendChild(scrollHint);
        
        // Show hint on mobile
        if (window.innerWidth < 768) {
            scrollHint.style.display = 'block';
        }
        
        window.addEventListener('resize', () => {
            scrollHint.style.display = window.innerWidth < 768 ? 'block' : 'none';
        });
    }
});

// ===== Print Functionality =====
function printPage() {
    window.print();
}

// ===== External Link Warning =====
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const url = link.getAttribute('href');
        if (!url.includes('china-embassy') && !url.includes('visaforchina') && !url.includes('nia.gov.cn')) {
            // Could add a confirmation dialog here if needed
        }
    });
});

// ===== Performance: Lazy Load Images (if any are added later) =====
if ('IntersectionObserver' in window) {
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
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Console Welcome Message =====
console.log('%c🇨🇳 K-Visa China Guide', 'font-size: 20px; font-weight: bold; color: #1976D2;');
console.log('%cWelcome to the comprehensive guide for Indian STEM talents!', 'font-size: 14px; color: #757575;');
console.log('%cEffective Date: October 1, 2025', 'font-size: 12px; color: #FF6F00;');

// ===== Accessibility: Keyboard Navigation for FAB =====
fab.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fab.click();
    }
});

// ===== Analytics Placeholder (for future integration) =====
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Event: ${category} - ${action} - ${label}`);
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track important clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent.trim());
    });
});

// ===== Service Worker Registration (for PWA - optional) =====
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA functionality
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => console.log('Service Worker registered'))
    //         .catch(err => console.log('Service Worker registration failed'));
    // });
}

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('K-Visa China Guide loaded successfully!');
    
    // Add smooth reveal to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease-out';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

