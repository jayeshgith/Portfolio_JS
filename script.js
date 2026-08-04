document.addEventListener('DOMContentLoaded', () => {

    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        mobileToggle.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileToggle.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });


    const typingText = document.getElementById('typing-text');
    const words = [
        "Full-Stack Developer.",
        "Next.js & React Developer.",
        "Computer Science Engineer.",
        "Problem Solver."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typingText) {
        typeEffect();
    }


    const sectionsForNav = document.querySelectorAll('section');
    
    const navObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sectionsForNav.forEach(section => {
        navObserver.observe(section);
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    const canUseTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (canUseTilt) {
        const tiltTargets = document.querySelectorAll(
            '.image-wrapper, .stat-card, .timeline-content, .skills-category-card, .project-card, .cert-card, .contact-form-panel'
        );

        tiltTargets.forEach(target => {
            const maxTilt = target.classList.contains('image-wrapper') ? 9 : 5;

            target.addEventListener('pointermove', event => {
                const rect = target.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateY = ((x / rect.width) - 0.5) * maxTilt;
                const rotateX = (((y / rect.height) - 0.5) * maxTilt) * -1;

                target.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
                target.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
            });

            target.addEventListener('pointerleave', () => {
                target.style.setProperty('--tilt-x', '0deg');
                target.style.setProperty('--tilt-y', '0deg');
            });
        });
    }


    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const replyToInput = document.getElementById('replyto');
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            let isValid = true;

            formFeedback.style.display = 'none';
            contactForm.querySelectorAll('.form-group').forEach(grp => {
                grp.classList.remove('invalid');
            });

            if (name === '') {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            if (message === '') {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = contactForm.querySelector('.btn-submit');
                const btnOriginalContent = submitBtn.innerHTML;
                const formEndpoint = contactForm.getAttribute('action');
                const ajaxEndpoint = formEndpoint.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');

                if (replyToInput) {
                    replyToInput.value = email;
                }

                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;

                fetch(ajaxEndpoint, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        _replyto: email,
                        message,
                        _subject: "New Portfolio Message from " + name,
                        _template: "table",
                        _captcha: "false"
                    })
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Network response was not ok");
                    }
                })
                .then(data => {
                    formFeedback.textContent = "Thank you! Your message has been sent successfully.";
                    formFeedback.className = "form-feedback success";
                    formFeedback.style.display = "block";
                    contactForm.reset();
                })
                .catch(error => {
                    formFeedback.textContent = "Oops! There was a problem sending your message. Please try again.";
                    formFeedback.className = "form-feedback error";
                    formFeedback.style.display = "block";
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = btnOriginalContent;
                });
            }
        });

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.parentElement.classList.remove('invalid');
                }
            });
        });
    }
});
