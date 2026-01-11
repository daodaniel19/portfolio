// --- Fonctions d'Initialisation ---

/**
 * Initialise le défilement fluide pour les liens de navigation.
 */
function initialiserDefilementFluide() {
    document.querySelectorAll('.liens-navigation a, .bouton-contact').forEach(ancre => {
        ancre.addEventListener('click', function (evenement) {
            const lien = this.getAttribute('href');

            // Si c'est un lien interne
            if (lien && lien.includes('#') && (lien.startsWith('#') || lien.startsWith('index.html#'))) {
                const identifiantCible = lien.split('#')[1];
                const elementCible = document.getElementById(identifiantCible);

                if (elementCible) {
                    evenement.preventDefault();

                    // Désactiver temporairement l'écouteur de défilement pour éviter les conflits visuels
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
}

/**
 * Met à jour l'apparence de la navigation et le lien actif selon la position de défilement.
 */
function mettreAJourNavigation() {
    const barreNav = document.querySelector('.barre-navigation');
    const sections = document.querySelectorAll('section, main');
    const liensNav = document.querySelectorAll('.liens-navigation a');

    let sectionActuelle = '';

    // Détection de la section visible
    sections.forEach(section => {
        const hautSection = section.offsetTop;
        if (window.pageYOffset >= hautSection - 120) {
            sectionActuelle = section.getAttribute('id');
        }
    });

    // Cas spécifique du bas de page
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

    // Effet visuel sur la barre de navigation
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

/**
 * Initialise la gestion de la fenêtre surgissante (modal) pour les certifications.
 */
function initialiserModalCertifications() {
    const fenetreModal = document.getElementById('fenetreCertif');
    const elementsCertif = document.querySelectorAll('.element-certif');
    const boutonFermer = document.querySelector('.fermer-modal');

    if (!fenetreModal || !elementsCertif.length || !boutonFermer) return;

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

    const fermerModal = () => {
        fenetreModal.classList.remove('visible');
        setTimeout(() => {
            fenetreModal.style.display = 'none';
        }, 300);
    };

    boutonFermer.addEventListener('click', fermerModal);

    window.addEventListener('click', (evenement) => {
        if (evenement.target === fenetreModal) {
            fermerModal();
        }
    });
}

/**
 * Initialise le menu mobile (hamburger).
 */
function initialiserMenuMobile() {
    const boutonMobile = document.getElementById('mobile-menu');
    const liensNavigation = document.querySelector('.liens-navigation');
    const liens = document.querySelectorAll('.liens-navigation a');

    if (!boutonMobile || !liensNavigation) return;

    boutonMobile.addEventListener('click', () => {
        boutonMobile.classList.toggle('actif');
        liensNavigation.classList.toggle('actif');
        // Empêcher le défilement du corps quand le menu est ouvert
        document.body.style.overflow = liensNavigation.classList.contains('actif') ? 'hidden' : 'auto';
    });

    liens.forEach(lien => {
        lien.addEventListener('click', () => {
            boutonMobile.classList.remove('actif');
            liensNavigation.classList.remove('actif');
            document.body.style.overflow = 'auto';
        });
    });
}

// --- Exécution après chargement du DOM ---

document.addEventListener('DOMContentLoaded', () => {
    initialiserDefilementFluide();
    initialiserModalCertifications();
    initialiserMenuMobile();

    // Activer l'écouteur de défilement immédiatement si on est sur la page principale
    if (window.location.pathname.includes('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('portfolio/')) {
        window.addEventListener('scroll', mettreAJourNavigation);
        // Appel initial pour régler l'état correct de la barre
        mettreAJourNavigation();
    }
});
