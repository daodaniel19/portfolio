// Correction du bug de défilement et ajout de la gestion du formulaire de contact

// Gestion du défilement fluide pour les liens de navigation
document.querySelectorAll('.nav-links a, .btn-contact').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Si c'est un lien interne (ancre sur la même page)
        if (href && href.includes('#') && (href.startsWith('#') || href.startsWith('index.html#'))) {
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);

            // Si on est déjà sur index.html ou si c'est une ancre pure
            if (targetElement) {
                e.preventDefault();

                // Désactiver temporairement le scroll listener pour éviter les rebonds
                window.removeEventListener('scroll', updateNav);

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Mettre à jour manuellement le lien actif
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                const activeLink = Array.from(document.querySelectorAll('.nav-links a')).find(link => link.getAttribute('href').includes(`#${targetId}`));
                if (activeLink) activeLink.classList.add('active');

                // Réactiver le scroll listener après le défilement
                setTimeout(() => {
                    window.addEventListener('scroll', updateNav);
                }, 800);
            }
        }
    });
});

// Fonction pour mettre à jour la navigation lors du scroll
function updateNav() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section, main');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    // Détection de la section actuelle avec une marge
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 120) {
            current = section.getAttribute('id');
        }
    });

    // Cas spécial pour le bas de page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) current = lastSection.getAttribute('id');
    }

    if (current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(`#${current}`)) {
                link.classList.add('active');
            }
        });
    }

    // Style de la navbar au scroll
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 8%';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    } else {
        navbar.style.padding = '2rem 8%';
        navbar.style.boxShadow = 'none';
    }
}

// Activer le listener de scroll seulement sur la page d'accueil
if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('portfolio/')) {
    window.addEventListener('scroll', updateNav);
}

// Gestion du backend (Formulaire de contact)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = document.getElementById('formStatus');
        const email = document.getElementById('email').value;
        const button = contactForm.querySelector('button');

        status.textContent = "Envoi en cours...";
        status.style.color = "var(--primary-color)";
        button.disabled = true;

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            if (response.ok) {
                status.textContent = "Message envoyé avec succès ! Merci.";
                status.style.color = "green";
                contactForm.reset();
            } else {
                throw new Error('Erreur serveur');
            }
        } catch (error) {
            status.textContent = "Simulation d'envoi réussie ! (Serveur off)";
            status.style.color = "#F59E0B";
        } finally {
            button.disabled = false;
        }
    });
}
