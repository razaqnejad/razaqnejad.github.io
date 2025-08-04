// Enhanced Portfolio JavaScript with Modern Interactions

// Custom Cursor with Enhanced Interactions
let cursor, cursorFollower;

function initCursor() {
    cursor = document.querySelector('.cursor');
    cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) {
        console.warn('Cursor elements not found, retrying...');
        setTimeout(initCursor, 100);
        return;
    }
    
    // Ensure cursor is visible and not clipped
    cursor.style.display = 'block';
    cursorFollower.style.display = 'block';
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
    cursor.style.overflow = 'visible';
    cursorFollower.style.overflow = 'visible';
    cursor.style.clip = 'auto';
    cursorFollower.style.clip = 'auto';
    cursor.style.clipPath = 'none';
    cursorFollower.style.clipPath = 'none';
}

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    if (!cursor || !cursorFollower) return;
    
    // Smooth cursor movement with easing
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    // Smoother follower movement
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

// Initialize cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    animateCursor();
    setupInteractiveElements();
});

// Enhanced Interactive Elements Hover Effect
function setupInteractiveElements() {
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .project-card, .skills__category, .stat');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!cursor || !cursorFollower) return;
            cursor.style.width = '16px';
            cursor.style.height = '16px';
            cursor.style.background = 'var(--color-accent)';
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.borderColor = 'var(--color-accent)';
            cursorFollower.style.borderWidth = '3px';
        });
        
        element.addEventListener('mouseleave', () => {
            if (!cursor || !cursorFollower) return;
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.background = 'var(--color-accent)';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderColor = 'var(--color-accent)';
            cursorFollower.style.borderWidth = '2px';
        });
    });
}

// Enhanced Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const nav = document.querySelector('.nav');
            if (nav.classList.contains('mobile-menu-open')) {
                nav.classList.remove('mobile-menu-open');
            }
        }
    });
});

// Enhanced Header Scroll Effect with Performance Optimization
const header = document.querySelector('.header');
let lastScroll = 0;
let ticking = false;

function updateHeader() {
    const currentScroll = window.pageYOffset;
    
    // Add blur effect when scrolling down
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

window.addEventListener('scroll', () => {
    if (cursor && cursorFollower) {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    }
});

// Enhanced Scroll Indicator
const scrollIndicator = document.querySelector('.hero__scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(10px)';
        } else {
            scrollIndicator.style.opacity = '0.7';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
}

// Enhanced Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards with staggered animation
document.querySelectorAll('.section, .project-card, .skills__category, .education__item, .stat').forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
    observer.observe(element);
});

// Enhanced Mobile Menu with Better UX
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const existingButton = document.querySelector('.mobile-menu-button');
    
    if (existingButton) {
        existingButton.remove();
    }
    
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
    menuButton.innerHTML = '<span></span><span></span><span></span>';
    
    nav.appendChild(menuButton);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('mobile-menu-open');
        document.body.style.overflow = nav.classList.contains('mobile-menu-open') ? 'hidden' : '';
        
        // Animate menu items
        const menuItems = nav.querySelectorAll('.nav__link');
        menuItems.forEach((item, index) => {
            if (nav.classList.contains('mobile-menu-open')) {
                item.style.animation = `slideInRight 0.3s ease forwards ${index * 0.1}s`;
            } else {
                item.style.animation = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && nav.classList.contains('mobile-menu-open')) {
            nav.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        }
    });
};

// Initialize Mobile Menu
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Enhanced Window Resize Handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-button')) {
                createMobileMenu();
            }
        } else {
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            if (mobileMenuButton) {
                mobileMenuButton.remove();
            }
            document.querySelector('.nav').classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Enhanced Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after content is loaded
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time and hide loading screen
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Add loading animation
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        // Animate hero image
        const heroImage = document.querySelector('.hero__image');
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateY(-50%) scaleX(-1) translateX(50px)';
            
            setTimeout(() => {
                heroImage.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                heroImage.style.opacity = '0.9';
                heroImage.style.transform = 'translateY(-50%) scaleX(-1) translateX(0)';
            }, 500);
        }
    }, 1000);
});

// Enhanced Project Card Interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced Skills Category Interactions
document.querySelectorAll('.skills__category').forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-8px)';
        category.style.boxShadow = 'var(--shadow-xl)';
    });
    
    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0)';
        category.style.boxShadow = 'var(--shadow-md)';
    });
});

// Enhanced Timeline Interactions
document.querySelectorAll('.timeline__item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dot = item.querySelector('::before');
        if (dot) {
            dot.style.transform = 'scale(1.2)';
        }
    });
});

// Enhanced Contact Link Interactions
document.querySelectorAll('.contact__link, .social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-4px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Enhanced Scroll Performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        // Optimize scroll performance
        const scrolledElements = document.querySelectorAll('.section, .project-card, .skills__category');
        scrolledElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.style.willChange = 'auto';
            }
        });
    }, 100);
});

// Enhanced Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const nav = document.querySelector('.nav');
        if (nav.classList.contains('mobile-menu-open')) {
            nav.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        }
    }
});

// Enhanced Touch Interactions for Mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.project-card, .skills__category, .stat').forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', () => {
            element.style.transform = '';
        });
    });
}

// Enhanced Performance Monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
        }
    }
});

performanceObserver.observe({ entryTypes: ['navigation'] });

// Enhanced Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Enhanced Accessibility
document.querySelectorAll('a, button').forEach(element => {
    if (!element.hasAttribute('aria-label') && !element.textContent.trim()) {
        element.setAttribute('aria-label', element.getAttribute('title') || 'Interactive element');
    }
});

// Enhanced Focus Management
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.focus();
            }
        }, 1000);
    });
}); 