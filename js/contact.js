/* ==========================================================================
   CONTACT DISPATCHER - VALIDATION SCHEMAS & DISPATCH LOGIC PIPELINES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('portfolio-interactive-contact-form');
    const submitBtn = document.getElementById('submit-form-action-btn');
    const feedbackBox = document.getElementById('form-system-feedback-msg');
    const copyButtons = document.querySelectorAll('.copy-action-trigger-btn');

    // Clipboard Copy Manager Engine
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const payload = button.getAttribute('data-copy-target');
            if (!payload) return;

            navigator.clipboard.writeText(payload).then(() => {
                const internalIcon = button.innerHTML;
                button.innerHTML = `<i class="fa-solid fa-check" style="color: var(--success-color);"></i>`;
                button.style.borderColor = "var(--success-color)";
                
                setTimeout(() => {
                    button.innerHTML = internalIcon;
                    button.style.borderColor = "";
                }, 2000);
            }).catch(() => {});
        });
    });

    // Form submission processing pipeline via EmailJS SDK integration architecture
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Submission rate-limiting check parameter allocations
            const lastSubmissionTimeToken = localStorage.getItem('pk-form-throttle-token');
            const currentTimeTick = Date.now();
            if (lastSubmissionTimeToken && (currentTimeTick - lastSubmissionTimeToken < 60000)) {
                renderFormFeedback("error", "Rate limit triggered. Please wait 60 seconds prior to subsequent execution requests.");
                return;
            }

            const textContainer = submitBtn.querySelector('.btn-text-content');
            const spinnerContainer = submitBtn.querySelector('.btn-spinner-icon-load');

            if (textContainer && spinnerContainer) {
                textContainer.classList.add('hide');
                spinnerContainer.classList.remove('hide');
                submitBtn.disabled = true;
            }

            // Target credentials for production deployment verification pipelines
            const publicKeyToken = "PUBLIC_KEY"; 
            const serviceIdToken = "SERVICE_ID";
            const templateIdToken = "TEMPLATE_ID";

            if (publicKeyToken === "PUBLIC_KEY") {
                // Testing simulation pipeline fallback processing if real operational tokens remain unmodified
                setTimeout(() => {
                    renderFormFeedback("success", "Simulation pipeline active! Message simulated successfully to kandelprabin09@gmail.com.");
                    finalizeFormSubmissionReset();
                }, 1500);
                return;
            }

            emailjs.init(publicKeyToken);
            emailjs.sendForm(serviceIdToken, templateIdToken, this)
                .then(() => {
                    renderFormFeedback("success", "Message successfully dispatched onto secure communication grids.");
                    localStorage.setItem('pk-form-throttle-token', Date.now());
                    finalizeFormSubmissionReset();
                }, (error) => {
                    renderFormFeedback("error", `Transport pipeline layer failure: ${error.text || "Unknown protocol execution mismatch"}`);
                    if (textContainer && spinnerContainer) {
                        textContainer.classList.remove('hide');
                        spinnerContainer.classList.add('hide');
                        submitBtn.disabled = false;
                    }
                });
        });
    }

    function renderFormFeedback(statusMode, messageString) {
        if (!feedbackBox) return;
        feedbackBox.textContent = messageString;
        feedbackBox.className = "form-feedback-log-box " + statusMode;
    }

    function finalizeFormSubmissionReset() {
        if (contactForm) contactForm.reset();
        if (submitBtn) {
            const textContainer = submitBtn.querySelector('.btn-text-content');
            const spinnerContainer = submitBtn.querySelector('.btn-spinner-icon-load');
            if (textContainer && spinnerContainer) {
                textContainer.classList.remove('hide');
                spinnerContainer.classList.add('hide');
                submitBtn.disabled = false;
            }
        }
    }

    // Geographic Mapping Layer Generation Framework - Pokhara (28.248137, 83.880585)
    const mapRootNode = document.getElementById('interactive-gis-map-root');
    if (mapRootNode) {
        const lat = parseFloat(mapRootNode.getAttribute('data-lat'));
        const lng = parseFloat(mapRootNode.getAttribute('data-lng'));

        // Inject standard cross-origin sandboxed operational map frame inside node canvas target matrix container
        mapRootNode.innerHTML = `<iframe 
            src="https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed" 
            width="100%" 
            height="100%" 
            style="border:0; filter: grayscale(1) invert(0.9) contrast(1.2);" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>`;
    }
});
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Rate Limiting Logic (1 message per 5 minutes)
    const lastSent = localStorage.getItem("pk_last_contact_time");
    if (lastSent && (Date.now() - parseInt(lastSent)) < 300000) {
        showFeedback("Please wait a few minutes before sending another message.", "warning");
        return;
    }

    // UI Loading State (Apple Style)
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="animate-pulse">Dispatching...</span>`;
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-70", "cursor-not-allowed");

    try {
        // Assume EmailJS is mapped here
        await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);
        
        localStorage.setItem("pk_last_contact_time", Date.now().toString());
        showFeedback("Message dispatched successfully via secure pipeline.", "success");
        form.reset();
    } catch (error) {
        showFeedback("Transmission failed. Please verify your network.", "error");
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
    }
});