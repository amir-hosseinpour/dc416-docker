document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');
        
        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Hamburger Animation
        hamburger.classList.toggle('toggle');
    });
    
    // Digital Rain Animation
    const digitalRain = document.querySelector('.digital-rain');
    if (digitalRain) {
        createDigitalRain();
    }
    
    // Sticky Navigation
    const nav = document.getElementById('main-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.padding = '10px 0';
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.padding = '15px 0';
            nav.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form Validation for Contact Page
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                const formElements = contactForm.elements;
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = true;
                }
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerText = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    successMessage.remove();
                    for (let i = 0; i < formElements.length; i++) {
                        formElements[i].disabled = false;
                    }
                }, 3000);
            }
        });
    }
});

// Create Digital Rain Effect
function createDigitalRain() {
    const canvas = document.createElement('canvas');
    const digitalRain = document.querySelector('.digital-rain');
    digitalRain.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const columns = canvas.width / 20;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#CD5CE6';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Utility Functions
function showError(input, message) {
    const formControl = input.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    formControl.appendChild(errorElement);
    input.classList.add('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
