/* ==========================================================================
   PERSONAL PHOTO GALLERY - LAZY GRID LAYOUT MANAGERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const masonryContainer = document.getElementById('personal-photos-masonry-container');
    const lightboxModal = document.getElementById('global-system-lightbox-modal-viewer');
    const lightboxImage = document.getElementById('lightbox-target-image-render-node');
    const lightboxCaption = document.getElementById('lightbox-caption-meta-text-target-string');
    const lightboxClose = document.getElementById('lightbox-close-modal-trigger');

    window.GlobalLightboxTrigger = function(src, captionString) {
        if (lightboxModal && lightboxImage && lightboxCaption) {
            lightboxImage.src = src;
            lightboxCaption.textContent = captionString || "Asset Visualization View";
            lightboxModal.classList.remove('hidden-state');
            document.body.style.overflow = 'hidden';
        }
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.add('hidden-state');
            document.body.style.overflow = '';
            if (lightboxImage) lightboxImage.src = "";
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) lightboxClose.click();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal && !lightboxModal.classList.contains('hidden-state')) {
            lightboxClose.click();
        }
    });

    // Handle direct static inline asset frame expansions inside native sections
    const inlineTriggers = [
        { id: 'trigger-expo-cert-view', src: 'img/IMG_20260531_121307.jpg', caption: 'Vector 2082 - National Science Expo Championship Document' },
        { id: 'trigger-medals-lightbox', src: 'img/image_980d9a.jpg', caption: 'Physical Token Inventory Wall - Gold & Silver Awards Collection' }
    ];

    inlineTriggers.forEach(trigger => {
        const element = document.getElementById(trigger.id);
        if (element) {
            element.addEventListener('click', () => {
                window.GlobalLightboxTrigger(trigger.src, trigger.caption);
            });
        }
    });

    // Dynamic Image Loader for regular layout tags
    const genericLazyImages = document.querySelectorAll('img.lazy-image');
    if ("IntersectionObserver" in window) {
        let genericObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy-image');
                    genericObserver.unobserve(img);
                }
            });
        });
        genericLazyImages.forEach(img => genericObserver.observe(img));
    }
});