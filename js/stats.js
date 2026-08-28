/* ==========================================================================
   STATISTICS ENGINE - CORE COUNTER TICK OPERATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const statsGrid = document.getElementById('stats-counter-grid');
    const counterElements = document.querySelectorAll('.counter-value');
    let dynamicCountersInitialized = false;

    function triggerCounterSequence() {
        counterElements.forEach(counter => {
            const destinationValue = parseFloat(counter.getAttribute('data-target'));
            const isFloat = counter.getAttribute('data-target').includes('.');
            const baselineStart = 0;
            const executionDuration = 2000;
            const absoluteStartTimestamp = performance.now();

            function updateCounterValue(currentHighResTime) {
                const elapsedDelta = currentHighResTime - absoluteStartTimestamp;
                const timelineProgressRatio = Math.min(elapsedDelta / executionDuration, 1);
                
                // Easing curve output acceleration check
                const easedProgressMultiplier = 1 - Math.pow(1 - timelineProgressRatio, 4);
                const currentNumericalOutput = baselineStart + easedProgressMultiplier * (destinationValue - baselineStart);

                if (isFloat) {
                    counter.textContent = currentNumericalOutput.toFixed(2);
                } else {
                    counter.textContent = Math.floor(currentNumericalOutput);
                }

                if (timelineProgressRatio < 1) {
                    requestAnimationFrame(updateCounterValue);
                } else {
                    if (isFloat) {
                        counter.textContent = destinationValue.toFixed(2);
                    } else {
                        counter.textContent = destinationValue;
                    }
                }
            }

            requestAnimationFrame(updateCounterValue);
        });
    }

    if (statsGrid && 'IntersectionObserver' in window) {
        const gridViewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !dynamicCountersInitialized) {
                    dynamicCountersInitialized = true;
                    triggerCounterSequence();
                    gridViewObserver.unobserve(statsGrid);
                }
            });
        }, { threshold: 0.2 });

        gridViewObserver.observe(statsGrid);
    } else {
        triggerCounterSequence();
    }
});