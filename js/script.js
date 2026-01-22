// ===========================================
// Premium Portfolio Website - JavaScript
// Designed for: Sorab Hasan Rahul
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Page Loader Animation
    const pageLoader = document.querySelector('.page-loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Hide loader after progress completes
            setTimeout(() => {
                pageLoader.classList.add('fade-out');
                
                // Remove loader from DOM after animation
                setTimeout(() => {
                    pageLoader.style.display = 'none';
                }, 600);
            }, 300);
        }
        loaderProgress.style.width = `${progress}%`;
    }, 100);
    
    // Initialize all components
    initCustomCursor();
    initParticles();
    initScrollAnimations();
    initSkillAnimations();
    initNavToggle();
    initFormAnimation();
    initBackToTop();
    initStatsCounter();
    
    // Animate hero title on load
    animateHeroTitle();
});

// ===========================================
// 1. Custom Cursor Effect
// ===========================================
function initCustomCursor() {
    const cursorLarge = document.querySelector('.cursor--large');
    const cursorSmall = document.querySelector('.cursor--small');
    
    // Move cursor with mouse
    document.addEventListener('mousemove', (e) => {
        cursorLarge.style.left = e.clientX + 'px';
        cursorLarge.style.top = e.clientY + 'px';
        cursorSmall.style.left = e.clientX + 'px';
        cursorSmall.style.top = e.clientY + 'px';
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .tool-item, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorLarge.style.width = '60px';
            cursorLarge.style.height = '60px';
            cursorLarge.style.backgroundColor = 'rgba(124, 58, 237, 0.1)';
            cursorSmall.style.width = '12px';
            cursorSmall.style.height = '12px';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorLarge.style.width = '40px';
            cursorLarge.style.height = '40px';
            cursorLarge.style.backgroundColor = 'transparent';
            cursorSmall.style.width = '8px';
            cursorSmall.style.height = '8px';
        });
    });
}

// ===========================================
// 2. Animated Background Particles
// ===========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size and position
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation duration and delay
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            background-color: rgba(124, 58, 237, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle linear infinite;
        }
        
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.5;
            }
            25% {
                transform: translate(20px, -20px) rotate(90deg);
                opacity: 0.7;
            }
            50% {
                transform: translate(0, -40px) rotate(180deg);
                opacity: 0.3;
            }
            75% {
                transform: translate(-20px, -20px) rotate(270deg);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===========================================
// 3. Scroll Animations
// ===========================================
function initScrollAnimations() {
    // Create Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // For skill bars, animate them when they come into view
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = `${width}%`;
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for reveal animations
    const revealElements = document.querySelectorAll('.reveal, .skill-progress, .project-card, .tool-item, .timeline-item, .stat-item');
    revealElements.forEach(element => {
        observer.observe(element);
        
        // Add reveal class if not already present
        if (!element.classList.contains('reveal') && 
            !element.classList.contains('skill-progress')) {
            element.classList.add('reveal');
        }
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 10, 15, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.padding = '1.5rem 0';
        }
    });
}

// ===========================================
// 4. Animate Hero Title
// ===========================================
function animateHeroTitle() {
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        // Initial animation is handled by CSS
        // Add hover effect for continuous animation
        word.addEventListener('mouseenter', () => {
            word.style.transform = 'translateY(-5px)';
            word.style.transition = 'transform 0.3s ease';
        });
        
        word.addEventListener('mouseleave', () => {
            word.style.transform = 'translateY(0)';
        });
    });
}

// ===========================================
// 5. Skill Bar Animations
// ===========================================
function initSkillAnimations() {
    // This function initializes skill bars but actual animation
    // is triggered by scroll observer above
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        // Set initial width to 0
        bar.style.width = '0%';
    });
}

// ===========================================
// 6. Mobile Navigation Toggle
// ===========================================
function initNavToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===========================================
// 7. Contact Form Animation
// ===========================================
function initFormAnimation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (in a real scenario, you would send to a server)
            setTimeout(() => {
                // Show success state
                submitBtn.querySelector('span').textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#10b981';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
        
        // Add focus effects to form inputs
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// ===========================================
// 8. Back to Top Button
// ===========================================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===========================================
// 9. Animated Stats Counter
// ===========================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current);
                }, 16);
                
                // Stop observing after animation starts
                observer.unobserve(statNumber);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

// ===========================================
// 10. Project Card Hover Effects
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate percentage position
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            // Update glow position
            const glow = card.querySelector('.project-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, var(--accent-glow) 0%, transparent 70%)`;
            }
        });
        
        // Button ripple effect
        const projectLink = card.querySelector('.project-link');
        if (projectLink) {
            projectLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create ripple element
                const ripple = document.createElement('span');
                const rect = projectLink.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple');
                
                projectLink.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // In a real scenario, you would navigate to project details
                console.log('Navigate to project details page');
            });
        }
    });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(124, 58, 237, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===========================================
// 11. Smooth Scroll for Navigation Links
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only process internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});