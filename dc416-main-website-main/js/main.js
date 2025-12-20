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
        contactForm.addEventListener('submit', function (e) {
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
                // Prepare form data BEFORE disabling fields
                const formData = new FormData(contactForm);

                const formElements = contactForm.elements;
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = true;
                }

                // Send to Formspree
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return response.json().then(data => {
                                if (Object.hasOwn(data, 'errors')) {
                                    throw new Error(data["errors"].map(error => error["message"]).join(", "));
                                } else if (Object.hasOwn(data, 'error')) {
                                    throw new Error(data["error"]);
                                } else {
                                    throw new Error('Oops! There was a problem submitting your form');
                                }
                            });
                        }
                    })
                    .then(() => {
                        // Success handling
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
                    })
                    .catch(error => {
                        // Error handling
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.innerText = error.message || 'Oops! There was a problem submitting your form';
                        contactForm.appendChild(errorMessage);

                        // Re-enable form
                        for (let i = 0; i < formElements.length; i++) {
                            formElements[i].disabled = false;
                        }
                    });
            }
        });
    }
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const faqAnswer = faqItem.querySelector('.faq-answer');

        // Toggle active class
        faqItem.classList.toggle('active');

        // Toggle show class
        faqAnswer.classList.toggle('show');

        // Toggle icon
        const icon = question.querySelector('.faq-toggle i');
        if (faqAnswer.classList.contains('show')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
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

// Popup functionality for contact emails
function showEmailPopup(emailType) {
    // Remove any existing overlays first
    const existingOverlay = document.querySelector('.popup-overlay');
    if (existingOverlay) {
        document.body.removeChild(existingOverlay);
    }

    const email = emailType === 'volunteers' ? 'volunteers@defcontoronto.ca' : 'sponsors@defcontoronto.ca';
    const message = `Please reach out to <a href="mailto:${email}" style="color: var(--primary); text-decoration: underline;">${email}</a>`;

    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay'; // Add class for easy removal
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '99999'; // Higher z-index
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';

    // Create modal content
    const modal = document.createElement('div');
    modal.style.backgroundColor = '#1a1a1a';
    modal.style.padding = '40px';
    modal.style.borderRadius = '4px';
    modal.style.border = '1px solid var(--primary)';
    modal.style.boxShadow = '0 0 30px rgba(205, 92, 230, 0.2)';
    modal.style.maxWidth = '90%';
    modal.style.width = '450px';
    modal.style.textAlign = 'center';
    modal.style.position = 'relative';
    modal.style.transform = 'translateY(20px)';
    modal.style.transition = 'transform 0.3s ease';

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = '#aaa';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.transition = 'color 0.3s';
    closeBtn.onmouseover = () => closeBtn.style.color = '#fff';
    closeBtn.onmouseout = () => closeBtn.style.color = '#aaa';

    // Add content
    const title = document.createElement('h3');
    title.textContent = emailType.charAt(0).toUpperCase() + emailType.slice(1);
    title.style.color = 'var(--primary)';
    title.style.marginBottom = '20px';
    title.style.marginTop = '10px';
    title.style.fontSize = '1.8rem';

    const text = document.createElement('p');
    text.innerHTML = message;
    text.style.lineHeight = '1.6';
    text.style.margin = '0';
    text.style.fontSize = '1.1rem';
    text.style.color = '#ddd';

    modal.appendChild(closeBtn);
    modal.appendChild(title);
    modal.appendChild(text);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
    });

    // Close functionality
    const closePopup = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    };

    closeBtn.onclick = closePopup;
    overlay.onclick = (e) => {
        if (e.target === overlay) closePopup();
    };

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.contains(overlay)) {
            closePopup();
        }
    }, { once: true });
}
