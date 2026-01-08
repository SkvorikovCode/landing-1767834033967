document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navbar = document.getElementById('navbar');

    function openMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('open'); // Trigger staggered animation
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    }

    menuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside (not fully applicable with full screen but good practice)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
            closeMenu();
        }
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'py-0');
            navbar.classList.remove('py-2'); // If initial padding was larger
        } else {
            navbar.classList.remove('shadow-md', 'py-0');
            navbar.classList.add('py-2');
        }
    });

    // Intersection Observer for Fade-in Animations on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.opacity = "1";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate (cards, sections titles)
    const animateElements = document.querySelectorAll('.group, section h2, section p, .bg-white.rounded-3xl');
    animateElements.forEach(el => {
        el.style.opacity = "0"; // Initially hide for JS animation if CSS keyframes aren't immediately applied
        // Add class slightly different to avoid conflict with hero animation class which runs on load
        el.classList.add('js-scroll-animate'); 
        observer.observe(el);
    });

    // Add CSS for JS scroll animation dynamically to keep things clean
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .js-scroll-animate.animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
    `;
    document.head.appendChild(styleSheet);
});