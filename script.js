document.addEventListener('DOMContentLoaded', () => {
    
    // =====================================================
    // Ambient Mouse Glow-Tracking Movement
    // =====================================================
    const glow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        if(glow) {
            glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
        }
    });

    // =====================================================
    // Responsive Navbar Logic & Mobile Drawer
    // =====================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // =====================================================
    // Scroll Progress & Dynamic Activation Links
    // =====================================================
    const scrollBar = document.querySelector('.scroll-progress');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Calculate Line Value
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0 && scrollBar) {
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollBar.style.width = `${progress}%`;
        }

        // Show/Hide Floating Top Button
        if (backToTop) {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        // Track Current Section Active Link
        let activeId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 160;
            if (window.pageYOffset >= top) {
                activeId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =====================================================
    // Interactive 3D Card Hover Perspective Matrix
    // =====================================================
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            
            const middleX = rect.width / 2;
            const middleY = rect.height / 2;
            
            // Subtle tilt ratios for natural movement
            const tiltX = ((y - middleY) / middleY) * 6; 
            const tiltY = ((middleX - x) / middleX) * 6;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // =====================================================
    // Minimalist Clean Dark Mode Toggle Logic
    // =====================================================
    const themeBtn = document.getElementById('darkModeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            updateThemeIcon(targetTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'far fa-sun';
        }
    }
});
