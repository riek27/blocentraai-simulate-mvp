// Dhab Construction - Complete JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);

    // Toggle mobile menu function
    function toggleMobileMenu() {
        const isOpening = !navMenu.classList.contains('active');
        
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = isOpening ? 'hidden' : '';
        
        // Update hamburger icon
        const icon = mobileMenuBtn.querySelector('i');
        if (isOpening) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Mobile menu button click
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', function() {
        toggleMobileMenu();
    });

    // Close menu when clicking menu links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== PORTFOLIO FILTERING =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        // Create loading element
        const loadingElement = document.createElement('div');
        loadingElement.className = 'portfolio-loading';
        loadingElement.innerHTML = '<div class="loading-spinner"></div><p>Loading projects...</p>';
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            portfolioGrid.parentNode.insertBefore(loadingElement, portfolioGrid.nextSibling);
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Show loading animation
                loadingElement.classList.add('active');
                
                setTimeout(() => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    portfolioItems.forEach((item, index) => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            // Add animation delay based on index
                            item.style.animationDelay = `${index * 0.05}s`;
                            item.classList.remove('hidden');
                            item.style.display = 'block';
                        } else {
                            item.classList.add('hidden');
                            item.style.display = 'none';
                        }
                    });
                    
                    // Hide loading animation
                    setTimeout(() => {
                        loadingElement.classList.remove('active');
                    }, 300);
                }, 300);
            });
        });
    }

    // ===== BLOG READ MORE TOGGLE =====
    const readMoreBtns = document.querySelectorAll('.read-more');
    readMoreBtns.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanding = !content.classList.contains('active');
            
            content.classList.toggle('active');
            this.classList.toggle('active');
            
            if (isExpanding) {
                this.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
                // Scroll to the expanded content if it's not fully visible
                setTimeout(() => {
                    content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            } else {
                this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            }
        });
    });

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            let firstInvalidField = null;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Email validation
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    emailField.style.borderColor = '#e74c3c';
                    isValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = emailField;
                    }
                }
            }
            
            if (isValid) {
                // Show success message with animation
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                    this.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
        });

        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#ddd';
                }
            });
        });
    }

    // ===== SEARCH FUNCTIONALITY =====
    const searchForm = document.querySelector('.search-box');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input');
            if (searchInput.value.trim() === '') {
                showNotification('Please enter a search term', 'error');
            } else {
                showNotification(`Searching for: ${searchInput.value}`, 'info');
                searchInput.value = '';
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.portfolio-item, .service-card, .value-card, .benefit-card, .blog-card').forEach(el => {
        observer.observe(el);
    });

    // ===== IMAGE LAZY LOADING =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--white);
                    color: var(--charcoal);
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    max-width: 400px;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    border-left: 4px solid var(--gold);
                }
                .notification-success { border-left-color: #27ae60; }
                .notification-error { border-left-color: #e74c3c; }
                .notification-info { border-left-color: #3498db; }
                .notification.show { transform: translateX(0); }
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    padding: 0;
                    font-size: 0.9rem;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);
    
    // Add styles for back to top button
    const backToTopStyles = document.createElement('style');
    backToTopStyles.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--gold);
            color: var(--white);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover {
            background: #a88655;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
    `;
    document.head.appendChild(backToTopStyles);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    function highlightActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    highlightActiveNavLink();

    // ===== ENHANCE FORM FIELDS =====
    document.querySelectorAll('.form-control').forEach(field => {
        // Add focus effects
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add character counter for textareas
        if (field.tagName === 'TEXTAREA') {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = 'font-size: 0.8rem; color: #666; text-align: right; margin-top: 0.5rem;';
            field.parentNode.appendChild(counter);
            
            field.addEventListener('input', function() {
                const count = this.value.length;
                counter.textContent = `${count} characters`;
                
                if (count > 500) {
                    counter.style.color = '#e74c3c';
                } else if (count > 300) {
                    counter.style.color = '#f39c12';
                } else {
                    counter.style.color = '#666';
                }
            });
        }
    });

    // ===== ENHANCE SERVICE CARDS =====
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== PRELOAD CRITICAL IMAGES =====
    function preloadCriticalImages() {
        const criticalImages = [
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadCriticalImages();

    // ===== PERFORMANCE OPTIMIZATIONS =====
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                // Handle scroll-based actions here
            }, 100);
        }
    });

    // ===== INITIALIZE HERO SLIDER =====
    initHeroSlider();
});

// ===== HERO SLIDER FUNCTIONALITY =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    let isPaused = false;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        if (!isPaused) {
            showSlide(currentSlide + 1);
        }
    }

    function startSlider() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Start auto slide
    startSlider();

    // Pause on hover and focus
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            isPaused = true;
            stopSlider();
        });
        
        slider.addEventListener('mouseleave', () => {
            isPaused = false;
            startSlider();
        });
        
        // Pause when tab is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isPaused = true;
                stopSlider();
            } else {
                isPaused = false;
                startSlider();
            }
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
            stopSlider();
            startSlider();
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
            stopSlider();
            startSlider();
        }
    });
}

// ===== UTILITY FUNCTIONS =====
// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== PAGE LOAD COMPLETION =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove loading spinner if exists
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
});

// ===== TOUCH DEVICE DETECTION =====
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
} else {
    document.body.classList.add('no-touch-device');
}
