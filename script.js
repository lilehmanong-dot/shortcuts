// =====================
// Mobile Menu Toggle
// =====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// =====================
// Form Submission with Internet Access
// =====================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (name && email && message) {
            // Disable submit button during request
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                // Send form data to Formspree API
                const response = await fetch('https://formspree.io/f/xzzzzbvr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                });
                
                if (response.ok) {
                    // Show success message
                    alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you shortly.`);
                    
                    // Reset form
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while sending your message. Please try again later or contact us directly.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// =====================
// Fetch RV Data from API (Example)
// =====================
const fetchRVData = async () => {
    try {
        // Example: Fetch data from a public API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
        const data = await response.json();
        console.log('RV Data fetched:', data);
        return data;
    } catch (error) {
        console.error('Error fetching RV data:', error);
    }
};

// Call on page load
window.addEventListener('load', () => {
    fetchRVData();
});

// =====================
// Smooth Scroll Enhancement
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// =====================
// CTA Button Click Handler
// =====================
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// =====================
// Intersection Observer for Animations
// =====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// =====================
// Active Navigation Link
// =====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =====================
// Add Scroll Animation
// =====================
const addScrollAnimation = () => {
    const elements = document.querySelectorAll('.service-card, .info-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
        }
    });
};

window.addEventListener('scroll', addScrollAnimation);
window.addEventListener('load', addScrollAnimation);

// =====================
// Navbar Background on Scroll
// =====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

console.log('Lehman\'s RV Landing website loaded successfully!');
console.log('Internet connectivity enabled: Form submissions and API calls active.');
