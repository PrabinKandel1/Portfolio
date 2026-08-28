/* ==========================================================================
   AMBIENT SCENE MATRIX ENGINE - CANVAS GRAPHICS GENERATION LOOPS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const parentCanvasNodeBox = document.getElementById('three-canvas-container');
    if (!parentCanvasNodeBox) return;

    // Create premium geometric abstract node architecture directly using semantic performance HTML5 Canvas elements
    const canvasElement = document.createElement('canvas');
    canvasElement.style.width = "100%";
    canvasElement.style.height = "100%";
    parentCanvasNodeBox.appendChild(canvasElement);

    const renderingContext = canvasElement.getContext('2d');
    let boundingWidth = canvasElement.width = parentCanvasNodeBox.offsetWidth;
    let boundingHeight = canvasElement.height = parentCanvasNodeBox.offsetHeight;

    const particleCloudMatrixArray = [];
    const configurationMaxParticleDensityLimit = 45;
    let baseThemeModeTrackingString = document.documentElement.getAttribute('data-theme') || 'dark';

    class StructuralParticleNode {
        constructor() {
            this.reinitializeParticlePositionCoordinates();
        }

        reinitializeParticlePositionCoordinates() {
            this.positionX = Math.random() * boundingWidth;
            this.positionY = Math.random() * boundingHeight;
            this.velocityTrajectoryDeltaX = (Math.random() - 0.5) * 0.35;
            this.velocityTrajectoryDeltaY = (Math.random() - 0.5) * 0.35;
            this.nodeElementRadiusSize = Math.random() * 2 + 1;
        }

        computeNextPositionCoordinatesStep() {
            this.positionX += this.velocityTrajectoryDeltaX;
            this.positionY += this.velocityTrajectoryDeltaY;

            if (this.positionX < 0 || this.positionX > boundingWidth || this.positionY < 0 || this.positionY > boundingHeight) {
                this.reinitializeParticlePositionCoordinates();
            }
        }

        drawNodeElementGraphic() {
            if (!renderingContext) return;
            renderingContext.beginPath();
            renderingContext.arc(this.positionX, this.positionY, this.nodeElementRadiusSize, 0, Math.PI * 2);
            renderingContext.fillStyle = baseThemeModeTrackingString === 'dark' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(37, 99, 235, 0.15)';
            renderingContext.fill();
        }
    }

    for (let i = 0; i < configurationMaxParticleDensityLimit; i++) {
        particleCloudMatrixArray.push(new StructuralParticleNode());
    }

    function executeMainGraphicsRenderingLoop() {
        if (!renderingContext) return;
        renderingContext.clearRect(0, 0, boundingWidth, boundingHeight);

        // Core processing draw steps
        for (let currentParticleNodeInstance of particleCloudMatrixArray) {
            currentParticleNodeInstance.computeNextPositionCoordinatesStep();
            currentParticleNodeInstance.drawNodeElementGraphic();
        }

        // Draw mathematical vector node connection grid pipelines matching Linear/Vercel styling models
        for (let primaryNodeIndex = 0; primaryNodeIndex < particleCloudMatrixArray.length; primaryNodeIndex++) {
            for (let secondaryNodeIndex = primaryNodeIndex + 1; secondaryNodeIndex < particleCloudMatrixArray.length; secondaryNodeIndex++) {
                const deltaDistanceX = particleCloudMatrixArray[primaryNodeIndex].positionX - particleCloudMatrixArray[secondaryNodeIndex].positionX;
                const deltaDistanceY = particleCloudMatrixArray[primaryNodeIndex].positionY - particleCloudMatrixArray[secondaryNodeIndex].positionY;
                const absoluteScalarDistanceValue = Math.sqrt(deltaDistanceX * deltaDistanceX + deltaDistanceY * deltaDistanceY);

                if (absoluteScalarDistanceValue < 130) {
                    const lineOpacityLevelAlpha = (1 - (absoluteScalarDistanceValue / 130)) * 0.08;
                    renderingContext.beginPath();
                    renderingContext.moveTo(particleCloudMatrixArray[primaryNodeIndex].positionX, particleCloudMatrixArray[primaryNodeIndex].positionY);
                    renderingContext.lineTo(particleCloudMatrixArray[secondaryNodeIndex].positionX, particleCloudMatrixArray[secondaryNodeIndex].positionY);
                    renderingContext.strokeStyle = baseThemeModeTrackingString === 'dark' ? `rgba(139, 92, 246, ${lineOpacityLevelAlpha})` : `rgba(124, 58, 237, ${lineOpacityLevelAlpha})`;
                    renderingContext.lineWidth = 0.8;
                    renderingContext.stroke();
                }
            }
        }

        requestAnimationFrame(executeMainGraphicsRenderingLoop);
    }

    window.addEventListener('resize', () => {
        boundingWidth = canvasElement.width = parentCanvasNodeBox.offsetWidth;
        boundingHeight = canvasElement.height = parentCanvasNodeBox.offsetHeight;
    });

    window.addEventListener('themeChanged', (e) => {
        baseThemeModeTrackingString = e.detail.theme;
    });

    executeMainGraphicsRenderingLoop();
});