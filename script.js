// ============ CONFIGURATION ============
const memes = [
    'meme1.png', // Crying guy
    'meme2.png', // How to not cry
    'meme3.png', // Keep going
    'meme4.png', // Disappointed dog
    'meme1.png'  // Crying guy again
];

// Track state
let selectedCard = null;
let currentMemeIndex = 0;
let guessAttempt = 0;

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();


});

function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const emojis = ['✨', '💫', '⭐', '🌟', '💕', '🃏', '🎩'];

    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.className = 'float-item';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        el.style.animationDelay = Math.random() * 5 + 's';
        el.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(el);
    }
}



// ============ SCREEN NAVIGATION ============
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
    }
}

// ============ INTRO -> CARDS ============
function showCardScreen() {
    showScreen('screen-cards');

    // Reset card states
    document.querySelectorAll('.playing-card').forEach(card => {
        card.classList.remove('selected');
    });
    selectedCard = null;
    guessAttempt = 0;
}

// ============ CARD SELECTION ============
function pickCard(cardElement, cardName) {
    // Prevent multiple selections
    if (selectedCard) return;

    selectedCard = cardName;

    // Flip the selected card
    cardElement.classList.add('selected');

    // Fade out other cards
    document.querySelectorAll('.playing-card').forEach(card => {
        if (card !== cardElement) {
            card.style.opacity = '0.3';
            card.style.pointerEvents = 'none';
        }
    });

    // After a moment, start guessing
    setTimeout(() => {
        showScreen('screen-guess1');
    }, 1200);
}

// ============ GUESSING GAME ============
function guessCorrect(attempt) {
    // They admitted it was Queen of Hearts!
    if (attempt === 1) {
        // First try - they actually picked Queen of Hearts
        showScreen('screen-right');
        createSparkleBurst();
    } else {
        // Later attempt - they "admitted" it
        showScreen('screen-guess3');
    }
}

function guessWrong(attempt) {
    guessAttempt = attempt;

    if (attempt === 1) {
        // First guess wrong, ask if they're sure
        showScreen('screen-guess2');
    } else if (attempt === 2) {
        // Second guess wrong, hit them with the pickup line
        showScreen('screen-guess3');
    }
}

function createSparkleBurst() {
    const burst = document.getElementById('sparkleBurst');
    if (!burst) return;

    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('span');
        sparkle.textContent = ['✨', '💕', '⭐', '💫'][Math.floor(Math.random() * 4)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = '50%';
        sparkle.style.top = '50%';
        sparkle.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem';
        sparkle.style.animation = `sparkleFly ${Math.random() * 1 + 0.5}s forwards`;
        sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        sparkle.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
        burst.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1500);
    }
}

// Add dynamic keyframes for sparkle burst
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFly {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============ COFFEE SECTION ============
function showCoffeeScreen() {
    showScreen('screen-coffee');
    currentMemeIndex = 0;
}

function sayYes() {
    showScreen('screen-success');
    createConfetti();
}

function sayYesFriends() {
    showScreen('screen-success');
    createConfetti();
}

function sayNo() {


    // Show meme
    if (currentMemeIndex < memes.length) {
        showMeme();
    } else {
        showAreYouSure();
    }
}

function showMeme() {
    const memeImg = document.getElementById('meme-image');
    memeImg.src = memes[currentMemeIndex];
    showScreen('screen-meme');

    currentMemeIndex++;

    // Show meme for 2 seconds
    setTimeout(() => {
        if (currentMemeIndex < memes.length) {
            showScreen('screen-coffee');
        } else {
            showAreYouSure();
        }
    }, 2000);
}

function showAreYouSure() {
    showScreen('screen-sure');
}

function showTombstone() {

    showScreen('screen-tombstone');
}

function showFriendsScreen() {
    showScreen('screen-friends');
}

function showSike() {
    showScreen('screen-sike');
}

function restart() {
    // Reset everything
    selectedCard = null;
    currentMemeIndex = 0;
    guessAttempt = 0;

    // Reset card visuals
    document.querySelectorAll('.playing-card').forEach(card => {
        card.classList.remove('selected');
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
    });

    showScreen('screen-intro');
}

// ============ CONFETTI ============
function createConfetti() {
    const colors = ['#ff6b9d', '#a855f7', '#3b82f6', '#fbbf24', '#10b981', '#06b6d4'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}


