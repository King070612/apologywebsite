// JavaScript for Interactive Apology Website

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const heartsContainer = document.getElementById('hearts-container');
    const sparklesContainer = document.getElementById('sparkles-container');
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const isForgivenPage = document.body.classList.contains('page-forgiven');

    // 1. FLOATING HEARTS GENERATOR (Both Pages)
    const heartEmojis = ['❤️', '💖', '💝', '💕', '💗', '💓', '🧸'];
    
    function createHeart() {
        if (!heartsContainer) return;
        
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random properties
        const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        const randomLeft = Math.random() * 100; // Percentage
        const randomSize = Math.random() * 20 + 15; // 15px to 35px
        const duration = Math.random() * 4 + 4; // 4s to 8s
        const opacity = Math.random() * 0.4 + 0.5; // 0.5 to 0.9
        
        heart.innerText = randomEmoji;
        heart.style.left = `${randomLeft}vw`;
        heart.style.fontSize = `${randomSize}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.opacity = opacity;
        
        // Horizontal drift variation
        heart.style.transform = `translateX(${Math.random() * 30 - 15}px)`;
        
        heartsContainer.appendChild(heart);
        
        // Clean up memory
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Spawn hearts periodically
    setInterval(createHeart, 350);
    // Initial batch of hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, Math.random() * 2000);
    }

    // 2. SPARKLING PARTICLES EFFECT
    function createSparkle() {
        const container = sparklesContainer || document.body;
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        const size = Math.random() * 6 + 2;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 2 + 1;
        
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.top = `${top}vh`;
        sparkle.style.left = `${left}vw`;
        sparkle.style.animationDuration = `${duration}s`;
        
        container.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, duration * 1000);
    }
    
    setInterval(createSparkle, 200);

    // 3. EVASIVE NO BUTTON LOGIC (First Page Only)
    if (noBtn) {
        let mouseX = 0;
        let mouseY = 0;
        const proximityThreshold = 75; // Pixels distance to trigger evasiveness

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Check if cursor is getting too close to the No button
            const rect = noBtn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;
            
            // Distance formula
            const distance = Math.sqrt(
                Math.pow(mouseX - btnCenterX, 2) + 
                Math.pow(mouseY - btnCenterY, 2)
            );
            
            if (distance < proximityThreshold) {
                moveNoButton();
            }
        });

        // Teleport on hover/mouseenter (just in case they move mouse too fast)
        noBtn.addEventListener('mouseenter', moveNoButton);
        noBtn.addEventListener('mouseover', moveNoButton);

        // Mobile touch devices handling - teleport immediately before click triggers
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Stop click events and double taps
            moveNoButton();
        });
        
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveNoButton();
        });

        function moveNoButton() {
            // Apply absolute evasive positioning if not already applied
            if (!noBtn.classList.contains('evasive')) {
                noBtn.classList.add('evasive');
            }

            const btnWidth = noBtn.offsetWidth || 80;
            const btnHeight = noBtn.offsetHeight || 40;
            
            // Ensure generous margins to avoid clipping and account for overshooting css animations
            const marginX = Math.max(40, window.innerWidth * 0.15);
            const marginY = Math.max(40, window.innerHeight * 0.15);
            
            const minX = marginX;
            const maxX = Math.max(minX, window.innerWidth - btnWidth - marginX);
            const minY = marginY;
            const maxY = Math.max(minY, window.innerHeight - btnHeight - marginY);

            let newX = 0;
            let newY = 0;
            let distanceToMouse = 0;
            let attempts = 0;

            // Generate coordinates and ensure they don't land right under the user's cursor
            do {
                newX = Math.random() * (maxX - minX) + minX;
                newY = Math.random() * (maxY - minY) + minY;
                
                // Calculate distance from new position to the current mouse position
                const newCenterX = newX + btnWidth / 2;
                const newCenterY = newY + btnHeight / 2;
                distanceToMouse = Math.sqrt(
                    Math.pow(mouseX - newCenterX, 2) + 
                    Math.pow(mouseY - newCenterY, 2)
                );
                
                attempts++;
            } while (distanceToMouse < 120 && attempts < 30);

            noBtn.style.left = `${newX}px`;
            noBtn.style.top = `${newY}px`;
        }
    }

    // 4. CELEBRATION EFFECTS: CONFETTI (Second Page Only)
    if (isForgivenPage) {
        const confettiContainer = document.getElementById('confetti-container');
        const confettiColors = ['#ff6b6b', '#ff8787', '#fcc2d7', '#e64980', '#d6336c', '#ffd43b', '#4dabf7', '#a9e34b'];
        const confettiShapes = ['circle', 'square', 'triangle'];

        function spawnConfettiPiece() {
            if (!confettiContainer) return;

            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            
            // Random properties
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
            const left = Math.random() * 100;
            const scale = Math.random() * 0.8 + 0.4;
            const duration = Math.random() * 3 + 2.5; // 2.5s to 5.5s
            
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}vw`;
            confetti.style.transform = `scale(${scale})`;
            confetti.style.animationDuration = `${duration}s`;
            
            // Shape customization
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.backgroundColor = 'transparent';
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = '6px solid transparent';
                confetti.style.borderRight = '6px solid transparent';
                confetti.style.borderBottom = `12px solid ${color}`;
            }

            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }

        // Initial burst of confetti
        for (let i = 0; i < 60; i++) {
            setTimeout(spawnConfettiPiece, Math.random() * 1500);
        }
        
        // Continuous confetti shower
        setInterval(spawnConfettiPiece, 80);
    }
});
