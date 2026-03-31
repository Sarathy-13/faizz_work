document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const navOverlay = document.querySelector('.nav-overlay');

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('open');
            navOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeHandler = () => {
        mobileNav.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    };

    if (closeMenu) closeMenu.addEventListener('click', closeHandler);
    if (navOverlay) navOverlay.addEventListener('click', closeHandler);

    // Close mobile nav when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeHandler);
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Colleges Slider Controls
    const collegesContainer = document.querySelector('.colleges-scroll-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (collegesContainer && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = collegesContainer.querySelector('.card');
            if (!card) return 300;
            
            // Get card width and compute the gap from CSS grid
            const grid = collegesContainer.querySelector('.colleges-grid');
            const style = window.getComputedStyle(grid);
            const gap = parseInt(style.getPropertyValue('gap')) || 30;
            return card.offsetWidth + gap;
        };

        prevBtn.addEventListener('click', () => {
            collegesContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            collegesContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }
});
