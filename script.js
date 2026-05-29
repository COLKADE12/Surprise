// ================================================
// CONFIGURATION - CUSTOMIZE THESE VALUES
// ================================================

// RELATIONSHIP START DATE - CHANGE THIS TO YOUR DATE
const RELATIONSHIP_START_DATE = new Date('2026-04-02').getTime();

// SWEET MESSAGES ARRAY - ADD YOUR OWN MESSAGES HERE
const sweetMessages = [
    "You are my greatest blessing and my answered prayer.",
    "Every moment with you is a moment I treasure forever.",
    "Your love is the most beautiful gift I've ever received.",
    "I fall in love with you more with each passing day.",
    "You make my heart smile in ways I never knew possible.",
    "Being with you feels like coming home to my soulmate.",
    "You are the reason I believe in true love.",
    "My love for you grows stronger with every heartbeat.",
    "You are my favorite person and my greatest adventure.",
    "Forever with you is not enough, I want infinity.",
    "You complete me in ways words could never express.",
    "My heart chose you before my mind could understand why."
];

// ROMANTIC LETTER TEXT - CUSTOMIZE YOUR LETTER
const romanticLetter = `My Dearest Love,

I wanted to write these words to you, to capture the feelings that have filled my heart since the moment I met you. Every day with you is a gift, and I am forever grateful for your presence in my life.

Your smile brightens my darkest days, and your love gives me strength to face whatever comes our way. You are not just my lover, but my best friend, my confidant, and my greatest inspiration.

I promise to love you with all my heart, to support your dreams, and to be your rock through all of life's storms. With you, I have found my home, my peace, and my forever.

Always yours,
Forever and always 💕`;

// ================================================
// PARTICLE ANIMATION SYSTEM
// ================================================

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }

    // Set canvas to fill the window
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Create floating particles
    createParticles() {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5,
                opacity: Math.random() * 0.5 + 0.2,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3
            });
        }
    }

    // Animate particles
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.particles.length === 0) {
            this.createParticles();
        }

        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;

            // Draw particle
            this.ctx.fillStyle = `rgba(255, 0, 110, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
const particleSystem = new ParticleSystem();

// ================================================
// FLOATING HEARTS ANIMATION
// ================================================

function createFloatingHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.className = 'heart';
    
    // Random horizontal position
    const x = Math.random() * 90 + 5;
    heart.style.left = x + '%';
    heart.style.bottom = '-10vh';
    
    // Random animation duration for variety
    const duration = Math.random() * 2 + 4;
    heart.style.animationDuration = duration + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => heart.remove(), duration * 1000);
}

// Create a floating heart every 2 seconds
setInterval(createFloatingHeart, 2000);

// ================================================
// WELCOME SCREEN & MAIN CONTENT REVEAL
// ================================================

const openButton = document.getElementById('openButton');
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');

openButton.addEventListener('click', () => {
    // Hide welcome screen
    welcomeScreen.classList.add('hidden');
    
    // Show main content
    setTimeout(() => {
        mainContent.classList.add('visible');
        // Start animations
        startCounterAnimation();
        startTypingAnimation();
    }, 100);
});

// ================================================
// RELATIONSHIP COUNTER ANIMATION
// ================================================

function updateCounter() {
    const now = new Date().getTime();
    const elapsed = now - RELATIONSHIP_START_DATE;
    
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    
    // Update display with leading zeros for minutes and seconds
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function startCounterAnimation() {
    updateCounter();
    // Update counter every second
    setInterval(updateCounter, 1000);
}

// ================================================
// SWEET MESSAGES FEATURE
// ================================================

const messageButton = document.getElementById('messageButton');
const messageDisplay = document.getElementById('messageDisplay');

messageButton.addEventListener('click', () => {
    // Get random message from array
    const randomMessage = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    
    // Trigger animation
    messageDisplay.style.animation = 'none';
    setTimeout(() => {
        messageDisplay.textContent = `"${randomMessage}"`;
        messageDisplay.style.animation = 'messageAppear 0.6s ease';
    }, 10);
});

// ================================================
// TYPING ANIMATION FOR ROMANTIC LETTER
// ================================================

let isTyping = false;

function typeText(element, text, speed = 30) {
    if (isTyping) return;
    isTyping = true;
    
    element.textContent = '';
    let index = 0;
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            // Auto scroll to show new text
            element.scrollTop = element.scrollHeight;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
        }
    }, speed);
}

function startTypingAnimation() {
    const letterContent = document.getElementById('letterContent');
    typeText(letterContent, romanticLetter, 20);
}

// ================================================
// HEART EXPLOSION ANIMATION
// ================================================

function createHeartExplosion(x, y) {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.className = 'heart-burst';
        
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        // Calculate explosion direction
        const angle = (i / heartCount) * Math.PI * 2;
        const distance = 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        heartsContainer.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => heart.remove(), 1000);
    }
}

// ================================================
// SURPRISE BUTTON & HIDDEN MESSAGE
// ================================================

const surpriseButton = document.getElementById('surpriseButton');
const hiddenMessage = document.getElementById('hiddenMessage');
let hasRevealed = false;

surpriseButton.addEventListener('click', () => {
    if (!hasRevealed) {
        // Get button position for explosion center
        const rect = surpriseButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create heart explosion
        createHeartExplosion(x, y);
        
        // Reveal hidden message
        setTimeout(() => {
            hiddenMessage.classList.add('revealed');
            hasRevealed = true;
        }, 200);
    }
});

// ================================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ================================================
// INITIALIZATION
// ================================================

console.log('🎉 Romantic Surprise Website Loaded!');
console.log('💕 Made with love and JavaScript');