const CONFIG = {
    assets: {
        images: 'assets/images/',
        docs: 'assets/docs/',
        projets: 'assets/projets/powerbi/'
    },
    powerbi: {
        images: [
            'cover.png',
            'dashboard_1.png',
            'dashboard_2.png',
            'dashboard_3.png',
            'dashboard_4.png',
            'dashboard_5.png'
        ],
        reportPdf: 'assets/docs/rapport_powerbi_daniel.pdf'
    }
};

// --- State Management ---
let state = {
    sliderIndex: 0,
    sliderImages: []
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCertificatesModal();
    initProjectsModal();
    initMobileMenu();

    // Initial scroll check
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});

// --- Core Functions ---

/**
 * Handles smooth scrolling and navigation link updates
 */
function initNavigation() {
    document.querySelectorAll('.liens-navigation a, .bouton-contact').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Updates navigation bar style and active link on scroll
 */
function handleScroll() {
    const header = document.querySelector('.barre-navigation');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.liens-navigation a');

    // Header appearance
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active link update
    let currentId = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            currentId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('actif', link.getAttribute('href') === `#${currentId}`);
    });
}

/**
 * Handles certificates modal logic
 */
function initCertificatesModal() {
    const modal = document.getElementById('fenetreCertif');
    const triggers = document.querySelectorAll('.element-certif');
    const closeBtn = modal.querySelector('.fermer-modal');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            document.getElementById('titreModal').textContent = trigger.dataset.titre;
            document.getElementById('descriptionModal').textContent = trigger.dataset.description;
            document.getElementById('imageModal').src = trigger.dataset.image;
            document.getElementById('lienModal').href = trigger.dataset.lien;

            openModal(modal);
        });
    });

    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
}

/**
 * Handles projects modal logic (Power BI gallery)
 */
function initProjectsModal() {
    const modal = document.getElementById('modalProjet');
    const closeBtn = modal.querySelector('.fermer-projet');

    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
}

/**
 * Dynamic initialization of Power BI project details
 */
window.ouvrirProjetPowerBI = function () {
    const modal = document.getElementById('modalProjet');
    const titre = "Tableau de bord Power BI - Analyse Stratégique";
    const description = `Ce projet Power BI a été conçu pour analyser les ventes, le comportement des clients, et l'impact des promotions.
    
    L'objectif est de fournir des visualisations et KPI stratégiques pour améliorer la rentabilité et l'expérience client.
    
    Consultez les 5 volets majeurs dans la galerie ou téléchargez le rapport complet.`;

    state.sliderImages = CONFIG.powerbi.images.map(img => `${CONFIG.assets.projets}${img}`);
    state.sliderIndex = 0;

    document.getElementById('titreProjetModal').textContent = titre;
    document.getElementById('descriptionProjetModal').innerText = description;
    document.getElementById('lienRapport').href = CONFIG.powerbi.reportPdf;
    document.getElementById('tagsProjet').innerHTML = `
        <span class="tag">Power BI</span>
        <span class="tag">Data Analysis</span>
        <span class="tag">Business Intelligence</span>
    `;

    updateSlider();
    openModal(modal);
};

/**
 * Slider Logic
 */
window.goToSlide = function (index) {
    state.sliderIndex = index;
    updateSlider();
};

function updateSlider() {
    const slider = document.getElementById('sliderImages');
    const indicators = document.getElementById('indicateursSlider');

    slider.innerHTML = state.sliderImages.map(img => `<img src="${img}" alt="Slide">`).join('');
    slider.style.transform = `translateX(-${state.sliderIndex * 100}%)`;

    indicators.innerHTML = state.sliderImages.map((_, i) => `
        <span class="point ${i === state.sliderIndex ? 'actif' : ''}" onclick="goToSlide(${i})"></span>
    `).join('');
}

/**
 * Modal helpers
 */
function openModal(modal) {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('visible'), 10);
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu');
    const navUl = document.querySelector('.liens-navigation');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('actif');
        navUl.classList.toggle('actif');
        document.body.style.overflow = navUl.classList.contains('actif') ? 'hidden' : 'auto';
    });

    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('actif');
            navUl.classList.remove('actif');
            document.body.style.overflow = 'auto';
        });
    });
}
