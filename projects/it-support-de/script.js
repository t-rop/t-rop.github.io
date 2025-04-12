/**
 * TechHelp Deutschland - IT Support Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // FAQ Accordion
    initFaqAccordion();
    
    // Form Validation
    initFormValidation();
    
    // Map Placeholder Button
    initMapPlaceholder();
});

/**
 * Initialize Mobile Menu
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (icon) {
                if (nav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !mobileMenuBtn.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}

/**
 * Initialize FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Initialize Form Validation
 */
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            // Check required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'Dieses Feld ist erforderlich');
                } else {
                    removeError(field);
                    
                    // Email validation
                    if (field.type === 'email' && !isValidEmail(field.value)) {
                        isValid = false;
                        showError(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                    }
                }
            });
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                showFormSuccess(contactForm);
            }
        });
    }
}

/**
 * Show error message for a form field
 */
function showError(field, message) {
    removeError(field); // Remove any existing error
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error-color)';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.classList.add('error');
    field.style.borderColor = 'var(--error-color)';
    
    const parent = field.parentElement;
    parent.appendChild(errorElement);
}

/**
 * Remove error message from a form field
 */
function removeError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const parent = field.parentElement;
    const errorElement = parent.querySelector('.error-message');
    if (errorElement) {
        parent.removeChild(errorElement);
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show form success message
 */
function showFormSuccess(form) {
    // Hide the form
    form.style.display = 'none';
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
            <h3>Vielen Dank für Ihre Nachricht!</h3>
            <p>Wir werden uns so schnell wie möglich bei Ihnen melden.</p>
        </div>
    `;
    
    // Insert success message after the form
    form.parentNode.insertBefore(successMessage, form.nextSibling);
}

/**
 * Initialize Map Placeholder
 */
function initMapPlaceholder() {
    const mapButton = document.querySelector('.map-overlay .btn');
    
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            const mapContainer = document.querySelector('.map-container');
            const mapPlaceholder = document.querySelector('.map-placeholder');
            
            if (mapContainer && mapPlaceholder) {
                // In a real application, you would load a Google Maps embed here
                // For this demo, we'll just hide the overlay
                const overlay = mapContainer.querySelector('.map-overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            }
        });
    }
}

/**
 * Testimonial Slider (if needed in the future)
 */
function initTestimonialSlider() {
    // This function can be implemented if automatic testimonial sliding is needed
    // For now, the testimonials are displayed side by side and can be scrolled horizontally
}
