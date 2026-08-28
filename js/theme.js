/* ==========================================================================
   THEME MANAGER - DARK/LIGHT MODE CONFIGURATIONS & PREFERENCE PERSISTENCE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const rootElement = document.documentElement;

    const savedTheme = localStorage.getItem('pk-portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        rootElement.setAttribute('data-theme', savedTheme);
    } else {
        const initialTheme = systemPrefersDark ? 'dark' : 'light';
        rootElement.setAttribute('data-theme', initialTheme);
        localStorage.setItem('pk-portfolio-theme', initialTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            rootElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('pk-portfolio-theme', newTheme);
            
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('pk-portfolio-theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            rootElement.setAttribute('data-theme', systemTheme);
        }
    });
});