document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Nav Link Update on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a little offset for better UX
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // --- Formspree AJAX Submission Handler ---
    const form = document.getElementById('form-contact');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            // Visual loading state
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';

            try {
                // Submit to Formspree
                const response = await fetch(e.target.action, {
                    method: form.method,
                    body: new FormData(e.target),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    btn.innerText = 'Message Sent!';
                    btn.style.backgroundColor = 'var(--color-brown-dark)';
                    btn.style.opacity = '1';
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = '';
                        form.reset();
                    }, 4000);
                } else {
                    btn.innerText = 'Error Sending';
                    setTimeout(() => { btn.innerText = originalText; btn.style.opacity = '1'; }, 3000);
                }
            } catch (error) {
                btn.innerText = 'Network Error';
                setTimeout(() => { btn.innerText = originalText; btn.style.opacity = '1'; }, 3000);
            }
        });
    }
});
