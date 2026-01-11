// Correction du défilement et gestion du formulaire de contact en Français

// Gestion du défilement fluide pour les liens de navigation
document.querySelectorAll('.liens-navigation a, .bouton-contact').forEach(ancre => {
    ancre.addEventListener('click', function (evenement) {
        const lien = this.getAttribute('href');

        // Si c'est un lien interne
        if (lien && lien.includes('#') && (lien.startsWith('#') || lien.startsWith('index.html#'))) {
            const identifiantCible = lien.split('#')[1];
            const elementCible = document.getElementById(identifiantCible);

            if (elementCible) {
                evenement.preventDefault();

                // Désactiver temporairement l'écouteur de défilement
                window.removeEventListener('scroll', mettreAJourNavigation);

                window.scrollTo({
                    top: elementCible.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Mettre à jour manuellement le lien actif
                document.querySelectorAll('.liens-navigation a').forEach(l => l.classList.remove('actif'));
                const lienActif = Array.from(document.querySelectorAll('.liens-navigation a')).find(l => l.getAttribute('href').includes(`#${identifiantCible}`));
                if (lienActif) lienActif.classList.add('actif');

                // Réactiver l'écouteur après le défilement
                setTimeout(() => {
                    window.addEventListener('scroll', mettreAJourNavigation);
                }, 800);
            }
        }
    });
});

// Fonction pour mettre à jour la navigation pendant le défilement
function mettreAJourNavigation() {
    const barreNav = document.querySelector('.barre-navigation');
    const sections = document.querySelectorAll('section, main');
    const liensNav = document.querySelectorAll('.liens-navigation a');

    let sectionActuelle = '';

    // Détection de la section visible
    sections.forEach(section => {
        const hautSection = section.offsetTop;
        if (pageYOffset >= hautSection - 120) {
            sectionActuelle = section.getAttribute('id');
        }
    });

    // Cas du bas de page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        const derniereSection = sections[sections.length - 1];
        if (derniereSection) sectionActuelle = derniereSection.getAttribute('id');
    }

    if (sectionActuelle) {
        liensNav.forEach(lien => {
            lien.classList.remove('actif');
            if (lien.getAttribute('href').includes(`#${sectionActuelle}`)) {
                lien.classList.add('actif');
            }
        });
    }

    // Style de la barre au défilement
    if (window.scrollY > 50) {
        barreNav.style.padding = '1rem 10%';
        barreNav.style.background = 'rgba(255, 255, 255, 0.95)';
        barreNav.style.boxShadow = 'var(--ombre-douce)';
    } else {
        barreNav.style.padding = '1.5rem 10%';
        barreNav.style.background = 'rgba(255, 255, 255, 0.8)';
        barreNav.style.boxShadow = 'none';
    }
}

// Activer le défilement sur l'accueil
if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('portfolio/')) {
    window.addEventListener('scroll', mettreAJourNavigation);
}

// Gestion du Formulaire de Contact supprimée car le formulaire a été remplacé par des liens directs.

// Gestion de la Fenêtre Surgissante (Popup) des Certifications
const fenetreModal = document.getElementById('fenetreCertif');
const elementsCertif = document.querySelectorAll('.element-certif');
const boutonFermer = document.querySelector('.fermer-modal');

if (fenetreModal && elementsCertif && boutonFermer) {
    elementsCertif.forEach(element => {
        element.addEventListener('click', () => {
            const titre = element.getAttribute('data-titre');
            const description = element.getAttribute('data-description');
            const image = element.getAttribute('data-image');
            const lien = element.getAttribute('data-lien');

            document.getElementById('titreModal').textContent = titre;
            document.getElementById('descriptionModal').textContent = description;
            document.getElementById('imageModal').src = image;

            const boutonLien = document.getElementById('lienModal');
            if (lien) {
                boutonLien.href = lien;
                boutonLien.style.display = 'inline-block';
            } else {
                boutonLien.style.display = 'none';
            }

            fenetreModal.style.display = 'block';
            setTimeout(() => {
                fenetreModal.classList.add('visible');
            }, 10);
        });
    });

    boutonFermer.addEventListener('click', () => {
        fenetreModal.classList.remove('visible');
        setTimeout(() => {
            fenetreModal.style.display = 'none';
        }, 300);
    });

    window.addEventListener('click', (evenement) => {
        if (evenement.target === fenetreModal) {
            fenetreModal.classList.remove('visible');
            setTimeout(() => {
                fenetreModal.style.display = 'none';
            }, 300);
        }
    });
}
