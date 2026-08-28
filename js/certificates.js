/* ==========================================================================
   CERTIFICATES VAULT MANAGER - ENGINE FOR SEARCHING & CATEGORY FILTERING
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const gridBox = document.getElementById('certificates-injection-grid-box');
    const searchInput = document.getElementById('vault-search-input');
    const filterButtons = document.querySelectorAll('.filter-tab-btn');

// Authentic credentials dataset allocation - FULLY CORRECTED
    const nativeCredentials = [
        {
            id: "cert-vector-2082",
            title: "Championship Award Certificate - Vector 2082",
            issuer: "Vector IOE Pashchimanchal",
            category: "competition",
            summary: "Official first place execution honors received in the open project demonstration matching high-level automated technical specifications.",
            image: "img/IMG_20260531_121307.jpg"
        },
        {
            id: "cert-life-skills-2081",
            title: "Core Life Skills Training Program",
            issuer: "Kidasha & CWSN Nepal",
            category: "training",
            summary: "30-hour intensive institutional runtime verification verifying advanced capability processing across cognitive, emotional, and alternative problem-solving metrics.",
            image: "img/IMG_20260531_121116.jpg"
        },
        {
            id: "cert-lions-quiz",
            title: "Lions Club Inter-School Recognition",
            issuer: "Lions Club of Pokhara Blue Sky",
            category: "competition",
            summary: "Second-place silver node competitive validation token matching algorithmic intelligence runs across school networks during the school-level quiz contest.",
            image: "img/IMG_20260531_121051.jpg"
        },
        {
            id: "cert-annfsu-quiz",
            title: "ANNFSU Quiz Competition Merit Certificate",
            issuer: "ANNFSU Central Committee",
            category: "competition",
            summary: "Verified technical validation honors tracking team presentation and system intelligence execution vectors inside community secondary student runs.",
            image: "img/IMG_20260531_121033.jpg"
        },
        {
            id: "cert-school-excellence",
            title: "Secondary Education Examination (SEE) Certificate",
            issuer: "National Examinations Board (NEB)",
            category: "academic",
            summary: "Official academic record verifying secondary general education completion with high distinction, achieving a cumulative 3.79 GPA.",
            image: "img/IMG_20260531_121212.jpg"
        },
        {
            id: "cert-character-leadership",
            title: "Official Transfer & Character Certificate",
            issuer: "Shree Siddhabaraha Secondary School",
            category: "academic",
            summary: "Institutional baseline documentation recognizing excellent conduct, moral performance, and community execution throughout continuous evaluation blocks.",
            image: "img/IMG_20260531_121231.jpg"
        }
    ];
    function renderVault(data) {
        if (!gridBox) return;
        gridBox.innerHTML = '';

        if (data.length === 0) {
            gridBox.innerHTML = `
                <div class="vault-empty-fallback-box text-center" style="grid-column: 1/-1; padding: 48px; color: var(--text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 16px; display:block;"></i>
                    <p>No matching credentials located within current criteria.</p>
                </div>`;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'premium-glass-card certificate-vault-render-card animate-fade-in-up';
            card.innerHTML = `
                <div class="cert-thumbnail-box" data-src="${item.image}" data-caption="${item.title}">
                    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%25' height='100%25' fill='%2314161d'/></svg>" data-lazy-load-src="${item.image}" alt="${item.title}" class="vault-lazy-img">
                    <div class="frame-overlay-indicator"><i class="fa-solid fa-expand-arrows-alt"></i></div>
                </div>
                <div class="cert-info-content">
                    <span class="cert-meta-issuer">${item.issuer}</span>
                    <h3 class="cert-display-title">${item.title}</h3>
                    <p class="cert-summary-text">${item.summary}</p>
                    <div class="cert-action-footer-row">
                        <span class="timeline-duration-badge">${item.category.toUpperCase()}</span>
                        <a href="${item.image}" target="_blank" class="cert-btn-link"><i class="fa-solid fa-arrow-down-blob"></i> Source Asset</a>
                    </div>
                </div>
            `;
            gridBox.appendChild(card);
        });

        initializeLazyLoading();
        setupVaultLightboxHooks();
    }

    function initializeLazyLoading() {
        const lazyImages = [].slice.call(document.querySelectorAll("img.vault-lazy-img"));
        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.getAttribute("data-lazy-load-src");
                        lazyImage.classList.remove("vault-lazy-img");
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });
            lazyImages.forEach((lazyImage) => lazyImageObserver.observe(lazyImage));
        }
    }

    function setupVaultLightboxHooks() {
        const boxes = document.querySelectorAll('.cert-thumbnail-box');
        boxes.forEach(box => {
            box.addEventListener('click', () => {
                const src = box.getAttribute('data-src');
                const caption = box.getAttribute('data-caption');
                window.GlobalLightboxTrigger(src, caption);
            });
        });
    }

    function filterAndSearchVault() {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const currentActiveFilterBtn = document.querySelector('.filter-tab-btn.active');
        const activeCategory = currentActiveFilterBtn ? currentActiveFilterBtn.getAttribute('data-filter-target') : 'all';

        const filtered = nativeCredentials.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(query) || 
                                  item.issuer.toLowerCase().includes(query) || 
                                  item.summary.toLowerCase().includes(query);
            const matchesCategory = (activeCategory === 'all') || (item.category === activeCategory);
            return matchesSearch && matchesCategory;
        });

        renderVault(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterAndSearchVault);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAndSearchVault();
        });
    });

    renderVault(nativeCredentials);
});