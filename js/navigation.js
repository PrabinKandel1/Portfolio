/* ==========================================================================
   NAVIGATION ENGINE - SHORTCUT PALETTES, SCROLL ACTIONS, TOGGLES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('main-header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const scrollProgressBar = document.getElementById('scroll-progress');
    const scrollToTopBtn = document.getElementById('scroll-to-top-floating-btn');
    const cmdTriggerShortcut = document.getElementById('cmd-trigger-shortcut');
    const globalCmdPalette = document.getElementById('global-command-palette-modal-root');
    const closeCmdPaletteBtn = document.getElementById('command-palette-close-trigger-btn');
    const cmdSearchField = document.getElementById('command-palette-search-query-field');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header & Progress Indicator
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (currentScroll > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }

        if (totalHeight > 0) {
            const progressPercentage = (currentScroll / totalHeight) * 100;
            if (scrollProgressBar) scrollProgressBar.style.width = `${progressPercentage}%`;
        }

        if (currentScroll > 400) {
            scrollToTopBtn.classList.remove('hidden-state');
        } else {
            scrollToTopBtn.classList.add('hidden-state');
        }

        // Active Link Tracking Navigation
        let currentSectionId = "";
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (currentScroll >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile Navigation Toggle Handling
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Advanced Command Palette Engine Operations (Ctrl + K)
    function openPalette() {
        if (globalCmdPalette) {
            globalCmdPalette.classList.remove('hidden-state');
            cmdSearchField.focus();
            document.body.style.overflow = 'hidden';
        }
    }

    function closePalette() {
        if (globalCmdPalette) {
            globalCmdPalette.classList.add('hidden-state');
            document.body.style.overflow = '';
            cmdSearchField.value = '';
        }
    }

    if (cmdTriggerShortcut) cmdTriggerShortcut.addEventListener('click', openPalette);
    if (closeCmdPaletteBtn) closeCmdPaletteBtn.addEventListener('click', closePalette);

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            globalCmdPalette.classList.contains('hidden-state') ? openPalette() : closePalette();
        }
        if (e.key === 'Escape') closePalette();
    });

    if (globalCmdPalette) {
        globalCmdPalette.addEventListener('click', (e) => {
            if (e.target === globalCmdPalette) closePalette();
        });

        const actionNodes = globalCmdPalette.querySelectorAll('.palette-action-item-row-node');
        actionNodes.forEach(node => {
            node.addEventListener('click', () => {
                const type = node.getAttribute('data-action-type');
                const target = node.getAttribute('data-action-target');

                closePalette();

                if (type === 'navigate') {
                    const el = document.querySelector(target);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else if (type === 'utility') {
                    if (target === 'toggle-theme') {
                        document.getElementById('theme-toggle-btn').click();
                    } else if (target === 'clear-chat') {
                        document.getElementById('ai-clear-history-trigger').click();
                    }
                }
            });
        });
    }
});