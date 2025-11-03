// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function initSlider() {
        slideInterval = setInterval(nextSlide, 3000);
        
        // Dot click functionality
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 3000);
            });
        });
        
        // Auto zoom effect
        slides.forEach(slide => {
            slide.style.animation = 'zoomIn 3s ease-in-out';
        });
    }

    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    function toggleMenu() {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }

    // Scroll animation for sections
    function animateOnScroll() {
        const sections = document.querySelectorAll('.section-padding');
        
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize animations
    function initAnimations() {
        // Set initial states for scroll animations
        document.querySelectorAll('.section-padding').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Trigger initial animation
        setTimeout(() => {
            animateOnScroll();
        }, 300);
    }

    // Form validation (basic example for contact form)
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'red';
                    } else {
                        input.style.borderColor = '';
                    }
                });
                
                if (isValid) {
                    // In a real implementation, this would submit to a server
                    alert('Form submitted successfully!');
                    form.reset();
                } else {
                    alert('Please fill in all required fields.');
                }
            });
        });
    }

    // Portfolio lightbox functionality
    function initPortfolioLightbox() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                // In a full implementation, this would open a lightbox
                console.log('Portfolio item clicked:', this.querySelector('h3').textContent);
            });
        });
    }

    // Service accordion (for services page)
    function initServiceAccordion() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    }

    // Initialize everything when DOM is loaded
    function init() {
        initSlider();
        initAnimations();
        initFormValidation();
        initPortfolioLightbox();
        initServiceAccordion();
        
        // Event listeners
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', animateOnScroll);
        hamburger.addEventListener('click', toggleMenu);
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Start the initialization
    init();
});

// Services Page Accordion Functionality
function initServicesAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Close other items if needed
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Initialize services page specific functionality
function initServicesPage() {
    initServicesAccordion();
}

// Check if we're on the services page and initialize
if (window.location.pathname.includes('services.html') || window.location.pathname.includes('/services')) {
    document.addEventListener('DOMContentLoaded', initServicesPage);
}
