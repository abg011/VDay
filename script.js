// Audio Context for sound effects
let audioContext = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Play sound effects
function playSound(type) {
    const ctx = getAudioContext();
    
    if (type === 'yes') {
        // Happy chime sound
        playTone(ctx, 523.25, 0.15); // C5
        setTimeout(() => playTone(ctx, 659.25, 0.15), 100); // E5
        setTimeout(() => playTone(ctx, 783.99, 0.2), 200); // G5
    } else if (type === 'omg') {
        // Celebration fanfare with applause-like noise
        // Fanfare trumpets
        playTone(ctx, 523.25, 0.15); // C5
        playTone(ctx, 659.25, 0.15); // E5
        playTone(ctx, 783.99, 0.15); // G5
        
        setTimeout(() => {
            playTone(ctx, 698.46, 0.15); // F5
            playTone(ctx, 880.00, 0.15); // A5
            playTone(ctx, 1046.50, 0.15); // C6
        }, 150);
        
        setTimeout(() => {
            playTone(ctx, 783.99, 0.2); // G5
            playTone(ctx, 987.77, 0.2); // B5
            playTone(ctx, 1174.66, 0.2); // D6
        }, 300);
        
        // Final triumphant chord
        setTimeout(() => {
            playTone(ctx, 1046.50, 0.4); // C6
            playTone(ctx, 1318.51, 0.4); // E6
            playTone(ctx, 1567.98, 0.4); // G6
        }, 450);
        
        // Applause-like noise bursts
        for (let i = 0; i < 15; i++) {
            setTimeout(() => playNoise(ctx, 0.08), 100 + i * 40);
        }
        for (let i = 0; i < 20; i++) {
            setTimeout(() => playNoise(ctx, 0.06), 500 + i * 30);
        }
    } else if (type === 'no') {
        // Sad trombone sound
        playTone(ctx, 311.13, 0.3, 'triangle'); // Eb4
        setTimeout(() => playTone(ctx, 293.66, 0.3, 'triangle'), 250); // D4
        setTimeout(() => playTone(ctx, 277.18, 0.3, 'triangle'), 500); // Db4
        setTimeout(() => playTone(ctx, 261.63, 0.5, 'triangle'), 750); // C4
    } else if (type === 'reveal') {
        // Card reveal celebration - cheerful and sparkly
        // Magical chime
        playTone(ctx, 1318.51, 0.2); // E6
        setTimeout(() => playTone(ctx, 1567.98, 0.2), 100); // G6
        setTimeout(() => playTone(ctx, 1975.53, 0.3), 200); // B6
        setTimeout(() => playTone(ctx, 2093.00, 0.4), 300); // C7
        
        // Sparkle sounds
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                playTone(ctx, 2000 + Math.random() * 1000, 0.1);
            }, 150 + i * 50);
        }
        
        // Happy chord
        setTimeout(() => {
            playTone(ctx, 1046.50, 0.3); // C6
            playTone(ctx, 1318.51, 0.3); // E6
            playTone(ctx, 1567.98, 0.3); // G6
        }, 450);
        
        // Light applause
        for (let i = 0; i < 10; i++) {
            setTimeout(() => playNoise(ctx, 0.06), 300 + i * 40);
        }
        
    } else if (type === 'ultimate') {
        // ULTIMATE Valentine's Day celebration! 🎆🎇🎉
        
        // Epic fanfare opening
        playTone(ctx, 523.25, 0.2); // C5
        playTone(ctx, 659.25, 0.2); // E5
        playTone(ctx, 783.99, 0.2); // G5
        
        setTimeout(() => {
            playTone(ctx, 587.33, 0.2); // D5
            playTone(ctx, 739.99, 0.2); // F#5
            playTone(ctx, 880.00, 0.2); // A5
        }, 200);
        
        setTimeout(() => {
            playTone(ctx, 659.25, 0.2); // E5
            playTone(ctx, 830.61, 0.2); // G#5
            playTone(ctx, 987.77, 0.2); // B5
        }, 400);
        
        // Triumphant climax chord
        setTimeout(() => {
            playTone(ctx, 1046.50, 0.6); // C6
            playTone(ctx, 1318.51, 0.6); // E6
            playTone(ctx, 1567.98, 0.6); // G6
            playTone(ctx, 2093.00, 0.6); // C7
        }, 600);
        
        // Firework explosions (multiple bursts)
        for (let burst = 0; burst < 5; burst++) {
            setTimeout(() => {
                // Each firework burst
                playFirework(ctx);
            }, 800 + burst * 300);
        }
        
        // Continuous sparkles
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                playTone(ctx, 1500 + Math.random() * 2000, 0.08);
            }, 600 + i * 80);
        }
        
        // Big applause
        for (let i = 0; i < 40; i++) {
            setTimeout(() => playNoise(ctx, 0.1), 500 + i * 50);
        }
        
        // Final glorious chord
        setTimeout(() => {
            playTone(ctx, 1046.50, 0.8); // C6
            playTone(ctx, 1318.51, 0.8); // E6
            playTone(ctx, 1567.98, 0.8); // G6
            playTone(ctx, 2093.00, 0.8); // C7
            playTone(ctx, 2637.02, 0.8); // E7
        }, 2000);
        
        // Final applause wave
        for (let i = 0; i < 30; i++) {
            setTimeout(() => playNoise(ctx, 0.08), 2000 + i * 40);
        }
    }
}

// Play a single tone
function playTone(ctx, frequency, duration, type = 'sine') {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
}

// Play firework explosion sound
function playFirework(ctx) {
    // Rising whistle
    const whistle = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    whistle.connect(whistleGain);
    whistleGain.connect(ctx.destination);
    whistle.frequency.setValueAtTime(400, ctx.currentTime);
    whistle.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.15);
    whistleGain.gain.setValueAtTime(0.1, ctx.currentTime);
    whistleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    whistle.start(ctx.currentTime);
    whistle.stop(ctx.currentTime + 0.15);
    
    // Explosion burst
    setTimeout(() => {
        const bufferSize = ctx.sampleRate * 0.3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
        }
        
        const explosion = ctx.createBufferSource();
        explosion.buffer = buffer;
        
        const lowpass = ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.value = 3000;
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        
        explosion.connect(lowpass);
        lowpass.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        explosion.start(ctx.currentTime);
        
        // Sparkle tones after explosion
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                playTone(ctx, 1000 + Math.random() * 2000, 0.1);
            }, i * 30);
        }
    }, 150);
}

// Play noise burst (for applause effect)
function playNoise(ctx, duration) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1000 + Math.random() * 2000;
    bandpass.Q.value = 0.5;
    
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    noise.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + duration);
}

// Navigate with delay for sound to play
function navigateTo(url) {
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Configuration - Unlock dates for each card (Valentine Week: Feb 7-14, 2026)
const unlockDates = {
    1: new Date('2026-02-07T00:00:00'), // Rose Day - Part 1
    2: new Date('2026-02-08T00:00:00'), // Propose Day
    3: new Date('2026-02-09T00:00:00'), // Chocolate Day
    4: new Date('2026-02-10T00:00:00'), // Teddy Day
    5: new Date('2026-02-11T00:00:00'), // Promise Day
    6: new Date('2026-02-12T00:00:00'), // Hug Day
    7: new Date('2026-02-13T12:00:00'), // Kiss Day - unlocks at noon
    8: new Date('2026-02-14T00:00:00')  // Valentine's Day
};

// Part 2 unlock times (noon)
const part2UnlockDates = {
    2: new Date('2026-02-08T12:00:00') // Propose Day - Part 2 at noon
};

// Track if Part 2 has been viewed
const part2Viewed = JSON.parse(localStorage.getItem('part2Viewed')) || {};
const dateChoices = JSON.parse(localStorage.getItem('dateChoices')) || {};

// Store scratched cards in localStorage
const scratchedCards = JSON.parse(localStorage.getItem('scratchedCards')) || {};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.cards-page')) {
        initializeCards();
        startTimers();
    }
});

// Secret unlock tracking
const clickCounts = {};
const clickTimers = {};

// Initialize all cards
function initializeCards() {
    for (let day = 1; day <= 8; day++) {
        const card = document.getElementById(`card-${day}`);
        const canvas = document.getElementById(`canvas-${day}`);
        const overlay = document.getElementById(`overlay-${day}`);
        
        // Initialize click counter for secret unlock
        clickCounts[day] = 0;
        
        // Add secret triple-click unlock on day label
        const wrapper = document.querySelector(`.scratch-card-wrapper[data-day="${day}"]`);
        const dayLabel = wrapper.querySelector('.day-label');
        
        dayLabel.addEventListener('click', () => {
            clickCounts[day]++;
            
            // Reset click count after 500ms of no clicks
            clearTimeout(clickTimers[day]);
            clickTimers[day] = setTimeout(() => {
                clickCounts[day] = 0;
            }, 500);
            
            // Triple click detected - secret unlock!
            if (clickCounts[day] >= 3) {
                secretUnlock(day);
                clickCounts[day] = 0;
            }
        });
        
        // Add triple-click on Part 2 timer for secret Part 2 unlock
        const part2Timer = document.getElementById(`part2-timer-${day}`);
        if (part2Timer) {
            let part2Clicks = 0;
            let part2ClickTimer;
            
            part2Timer.addEventListener('click', (e) => {
                // If already unlocked normally, let the default handler work
                if (part2Timer.classList.contains('unlocked')) return;
                
                part2Clicks++;
                clearTimeout(part2ClickTimer);
                part2ClickTimer = setTimeout(() => {
                    part2Clicks = 0;
                }, 500);
                
                // Triple click - secret Part 2 unlock!
                if (part2Clicks >= 3) {
                    secretUnlockPart2(day);
                    part2Clicks = 0;
                    e.stopPropagation();
                }
            });
        }
        
        if (scratchedCards[day]) {
            // Card was already scratched
            card.classList.add('scratched');
            card.classList.remove('locked');
            overlay.classList.add('hidden');
            canvas.style.display = 'none';
            // Add click handler to open modal
            card.addEventListener('click', () => openModal(day));
        } else if (isUnlocked(day)) {
            // Card is unlocked but not scratched
            card.classList.remove('locked');
            overlay.classList.add('hidden');
            initScratchCanvas(day);
        }
    }
}

// Secret unlock Part 2 - triple click on Part 2 timer
function secretUnlockPart2(day) {
    const card = document.getElementById(`card-${day}`);
    const part2Timer = document.getElementById(`part2-timer-${day}`);
    
    if (!card.classList.contains('scratched')) {
        console.log('Scratch the card first!');
        return;
    }
    
    if (dateChoices[day]) {
        // Already made a choice, just show it
        openModal(day);
        return;
    }
    
    // Unlock Part 2
    part2Timer.classList.add('unlocked');
    part2Timer.innerHTML = `<span class="timer-icon">🔓</span><span class="timer-text">Part 2 secret unlock!</span>`;
    
    // Open Part 2 modal
    openPart2Modal(day);
    
    console.log(`🔓 Day ${day} Part 2 secretly unlocked!`);
}

// Secret unlock function - triple click on day label
function secretUnlock(day) {
    const card = document.getElementById(`card-${day}`);
    const overlay = document.getElementById(`overlay-${day}`);
    const timerDisplay = document.getElementById(`timer-${day}`);
    const timerText = timerDisplay.querySelector('.timer-text');
    const timerIcon = timerDisplay.querySelector('.timer-icon');
    
    if (scratchedCards[day] || !card.classList.contains('locked')) {
        return; // Already unlocked or scratched
    }
    
    // Unlock the card
    card.classList.remove('locked');
    overlay.classList.add('hidden');
    timerDisplay.classList.add('unlocked');
    timerIcon.textContent = '🔓';
    timerText.textContent = 'Secret unlock!';
    
    initScratchCanvas(day);
    
    console.log(`🔓 Day ${day} secretly unlocked!`);
}

// Check if a card is unlocked
function isUnlocked(day) {
    const now = new Date();
    return now >= unlockDates[day];
}

// Start countdown timers
function startTimers() {
    updateAllTimers();
    setInterval(updateAllTimers, 1000);
}

// Update all timer displays
function updateAllTimers() {
    for (let day = 1; day <= 8; day++) {
        updateTimer(day);
    }
}

// Update individual timer
function updateTimer(day) {
    const timerDisplay = document.getElementById(`timer-${day}`);
    const timerText = timerDisplay.querySelector('.timer-text');
    const timerIcon = timerDisplay.querySelector('.timer-icon');
    const card = document.getElementById(`card-${day}`);
    const overlay = document.getElementById(`overlay-${day}`);
    
    const now = new Date();
    const unlockDate = unlockDates[day];
    const diff = unlockDate - now;
    
    if (diff <= 0) {
        // Card is unlocked
        timerDisplay.classList.add('unlocked');
        timerIcon.textContent = '✨';
        timerText.textContent = 'Ready to scratch!';
        
        if (!scratchedCards[day] && card.classList.contains('locked')) {
            card.classList.remove('locked');
            overlay.classList.add('hidden');
            initScratchCanvas(day);
        }
    } else {
        // Calculate remaining time
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        let timeString = '';
        if (days > 0) {
            timeString = `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
            timeString = `${hours}h ${minutes}m ${seconds}s`;
        } else {
            timeString = `${minutes}m ${seconds}s`;
        }
        
        timerText.textContent = timeString;
    }
    
    // Update Part 2 timer if exists
    updatePart2Timer(day);
}

// Update Part 2 timer for cards that have it
function updatePart2Timer(day) {
    const part2Timer = document.getElementById(`part2-timer-${day}`);
    if (!part2Timer) return;
    
    const card = document.getElementById(`card-${day}`);
    const hasPart2 = card.dataset.hasPart2 === 'true';
    if (!hasPart2) return;
    
    const now = new Date();
    const part2Date = part2UnlockDates[day];
    
    // Only show Part 2 timer if card is scratched
    if (!scratchedCards[day]) {
        part2Timer.style.display = 'none';
        return;
    }
    
    // If user already made a choice, show that instead
    if (dateChoices[day]) {
        part2Timer.style.display = 'flex';
        part2Timer.classList.add('unlocked');
        part2Timer.innerHTML = `<span class="timer-icon">💖</span><span class="timer-text">Date: ${dateChoices[day].name}</span>`;
        part2Timer.onclick = () => openModal(day);
        return;
    }
    
    part2Timer.style.display = 'flex';
    
    if (now >= part2Date) {
        part2Timer.classList.add('unlocked');
        part2Timer.innerHTML = `<span class="timer-icon">🎁</span><span class="timer-text">Part 2 is ready! Tap to reveal!</span>`;
        part2Timer.onclick = () => openModal(day);
    } else {
        part2Timer.classList.remove('unlocked');
        const timeLeft = getTimeRemaining(part2Date);
        part2Timer.innerHTML = `<span class="timer-icon">🎁</span><span class="timer-text">Part 2 unlocks at noon (${timeLeft})</span>`;
        part2Timer.onclick = null;
    }
}

// Initialize scratch canvas for a card
function initScratchCanvas(day) {
    const canvas = document.getElementById(`canvas-${day}`);
    const card = document.getElementById(`card-${day}`);
    
    if (!canvas || scratchedCards[day]) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const rect = card.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Create gradient scratch surface
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff6b9d');
    gradient.addColorStop(0.5, '#ffc1e3');
    gradient.addColorStop(1, '#c44569');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add "Scratch Me!" text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Poppins';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch Me! ✨', canvas.width / 2, canvas.height / 2);
    
    // Add decorative hearts
    ctx.font = '20px Arial';
    ctx.fillText('💕', canvas.width * 0.2, canvas.height * 0.3);
    ctx.fillText('💖', canvas.width * 0.8, canvas.height * 0.3);
    ctx.fillText('💗', canvas.width * 0.2, canvas.height * 0.7);
    ctx.fillText('💝', canvas.width * 0.8, canvas.height * 0.7);
    
    // Scratch functionality
    let isScratching = false;
    let scratchedPixels = 0;
    const totalPixels = canvas.width * canvas.height;
    
    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
        
        // Check scratch progress
        checkScratchProgress();
    }
    
    function checkScratchProgress() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        
        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] === 0) {
                transparent++;
            }
        }
        
        const scratchedPercent = (transparent / (canvas.width * canvas.height)) * 100;
        
        if (scratchedPercent > 50) {
            revealCard(day);
        }
    }
    
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        let x, y;
        
        if (e.touches) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        
        return { x, y };
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        isScratching = true;
        const pos = getPosition(e);
        scratch(pos.x, pos.y);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isScratching) {
            const pos = getPosition(e);
            scratch(pos.x, pos.y);
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        isScratching = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
        isScratching = false;
    });
    
    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isScratching = true;
        const pos = getPosition(e);
        scratch(pos.x, pos.y);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isScratching) {
            const pos = getPosition(e);
            scratch(pos.x, pos.y);
        }
    });
    
    canvas.addEventListener('touchend', () => {
        isScratching = false;
    });
}

// Reveal card after sufficient scratching
function revealCard(day) {
    const card = document.getElementById(`card-${day}`);
    const canvas = document.getElementById(`canvas-${day}`);
    
    // Play celebration sound (ultimate for day 8)
    if (day === 8) {
        playSound('ultimate');
    } else {
        playSound('reveal');
    }
    
    // Mark as scratched
    scratchedCards[day] = true;
    localStorage.setItem('scratchedCards', JSON.stringify(scratchedCards));
    
    // Animate reveal
    card.classList.add('scratched');
    canvas.style.transition = 'opacity 0.5s ease';
    canvas.style.opacity = '0';
    
    // Create confetti effect
    createConfetti(card);
    
    // Add click handler for popup
    card.addEventListener('click', () => openModal(day));
    
    setTimeout(() => {
        canvas.style.display = 'none';
        // Auto-open modal after reveal
        openModal(day);
    }, 500);
}

// Open modal popup with card message
function openModal(day) {
    const card = document.getElementById(`card-${day}`);
    if (!card.classList.contains('scratched')) return;
    
    const hasPart2 = card.dataset.hasPart2 === 'true';
    const now = new Date();
    const part2Unlocked = part2UnlockDates[day] && now >= part2UnlockDates[day];
    
    // Check if user already made a choice for this day
    if (dateChoices[day]) {
        showConfirmationModal(dateChoices[day]);
        return;
    }
    
    // If Part 2 is unlocked and not viewed yet, show Part 2
    if (hasPart2 && part2Unlocked && scratchedCards[day]) {
        openPart2Modal(day);
        return;
    }
    
    const emoji = card.dataset.emoji;
    const title = card.dataset.title;
    const message = card.dataset.message;
    const isSpecial = card.dataset.special === 'true';
    
    const overlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalEmoji = document.getElementById('modal-emoji');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    modalEmoji.textContent = emoji;
    modalTitle.textContent = title;
    
    let messageHtml = message.replace(/\n/g, '<br>');
    
    // Add Part 2 teaser if applicable
    if (hasPart2 && !part2Unlocked) {
        const timeLeft = getTimeRemaining(part2UnlockDates[day]);
        messageHtml += `<br><br><span style="color: #ff6b9d; font-weight: 600;">🎁 Part 2 unlocks at noon! (${timeLeft})</span>`;
    } else if (hasPart2 && part2Unlocked) {
        messageHtml += `<br><br><span style="color: #28a745; font-weight: 600;">🎉 Part 2 is ready! Close this to see it!</span>`;
    }
    
    modalMessage.innerHTML = messageHtml;

    const wheelWrap = document.getElementById('modal-wheel-wrap');
    const wheelResult = document.getElementById('wheel-result');
    const spinBtn = document.getElementById('spin-wheel-btn');
    if (day === 8) {
        wheelWrap.style.display = 'block';
        wheelResult.textContent = '';
        const wheel = document.getElementById('valentine-wheel');
        if (wheel) wheel.style.transform = 'rotate(0deg)';
        spinBtn.disabled = false;
        spinBtn.onclick = () => spinValentineWheel();
    } else {
        wheelWrap.style.display = 'none';
    }
    
    if (isSpecial) {
        modalContent.classList.add('special-modal');
    } else {
        modalContent.classList.remove('special-modal');
    }
    
    overlay.classList.add('active');
}

// Open Part 2 modal with date options
function openPart2Modal(day) {
    const card = document.getElementById(`card-${day}`);
    const emoji = card.dataset.part2Emoji;
    const title = card.dataset.part2Title;
    const message = card.dataset.part2Message;
    const options = JSON.parse(card.dataset.options);
    
    const overlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalEmoji = document.getElementById('modal-emoji');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    modalEmoji.textContent = emoji;
    modalTitle.textContent = title;
    
    let messageHtml = message.replace(/\n/g, '<br>');
    messageHtml += '<div class="date-options">';
    
    options.forEach(option => {
        if (option.link) {
            messageHtml += `
                <div class="date-option-wrapper">
                    <a href="${option.link}" target="_blank" class="preview-link">👀 Preview location</a>
                    <button class="date-option" onclick="selectDateOption(${day}, '${option.id}', '${option.name}')">${option.name}</button>
                </div>`;
        } else {
            messageHtml += `
                <div class="date-option-wrapper">
                    <button class="date-option" onclick="selectDateOption(${day}, '${option.id}', '${option.name}')">${option.name}</button>
                </div>`;
        }
    });
    
    messageHtml += '</div>';
    
    modalMessage.innerHTML = messageHtml;
    modalContent.classList.remove('special-modal');
    
    overlay.classList.add('active');
    
    // Play reveal sound
    playSound('reveal');
}

// Handle date option selection
function selectDateOption(day, optionId, optionName) {
    // Save the choice
    dateChoices[day] = { id: optionId, name: optionName };
    localStorage.setItem('dateChoices', JSON.stringify(dateChoices));
    
    // Play celebration sound
    playSound('omg');
    
    // Show confirmation
    showConfirmationModal(dateChoices[day]);
}

// Show confirmation modal after selection
function showConfirmationModal(choice) {
    const overlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalEmoji = document.getElementById('modal-emoji');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    modalEmoji.textContent = '💖';
    modalEmoji.classList.add('confirmation-emoji');
    modalTitle.textContent = "It's a Date!";
    
    const cleanName = choice.name.replace(/^[^\s]+\s/, ''); // Remove emoji prefix
    modalMessage.innerHTML = `<p class="confirmation-message">Get ready to dress up for your date at<br><strong>${cleanName}</strong>! 💕</p>`;
    
    modalContent.classList.remove('special-modal');
    overlay.classList.add('active');
    
    // Create confetti
    setTimeout(() => {
        createConfetti(modalContent);
    }, 300);
}

// Get time remaining string
function getTimeRemaining(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) return 'Now!';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

// Valentine's Day wheel - always lands on Bharatiya Mall of Bengaluru (index 0)
function spinValentineWheel() {
    const wheel = document.getElementById('valentine-wheel');
    const spinBtn = document.getElementById('spin-wheel-btn');
    const wheelResult = document.getElementById('wheel-result');
    const popup = document.getElementById('wheel-result-popup');
    const popupPlace = document.getElementById('wheel-result-popup-place');
    if (!wheel || spinBtn.disabled) return;

    spinBtn.disabled = true;
    wheelResult.textContent = '';
    if (popup) popup.setAttribute('hidden', '');

    const fullSpins = 5 + Math.floor(Math.random() * 2);
    const totalRotation = fullSpins * 360;

    wheel.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        playSound('reveal');
        wheelResult.innerHTML = '🎉 <strong>Bharatiya Mall of Bengaluru!</strong><br>That\'s where we\'re getting the dress — then we head on for Step 2! 💕';
        spinBtn.disabled = false;
        if (popup && popupPlace) {
            popupPlace.textContent = 'Bharatiya Mall of Bengaluru';
            popup.removeAttribute('hidden');
            popup.setAttribute('aria-hidden', 'false');
        }
    }, 4200);
}

function closeWheelResultPopup() {
    const popup = document.getElementById('wheel-result-popup');
    if (popup) {
        popup.setAttribute('hidden', '');
        popup.setAttribute('aria-hidden', 'true');
    }
}

document.getElementById('wheel-result-popup')?.addEventListener('click', function(e) {
    if (e.target === this) closeWheelResultPopup();
});

// Close modal popup
function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');
    document.getElementById('modal-wheel-wrap').style.display = 'none';
    closeWheelResultPopup();

    // Reset emoji class
    const modalEmoji = document.getElementById('modal-emoji');
    modalEmoji.classList.remove('confirmation-emoji');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const overlay = document.getElementById('modal-overlay');
    if (e.target === overlay) {
        closeModal();
    }
});

// Create confetti celebration
function createConfetti(container) {
    const colors = ['#ff6b9d', '#ffc1e3', '#c44569', '#ff8a80', '#ffd700'];
    const rect = container.getBoundingClientRect();
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * 100}px;
            top: ${rect.top + rect.height / 2}px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 200;
        
        let x = parseFloat(confetti.style.left);
        let y = parseFloat(confetti.style.top);
        let rotation = 0;
        let opacity = 1;
        
        function animateConfetti() {
            x += vx * 0.02;
            y += vy * 0.02 + 5; // Add gravity
            rotation += 10;
            opacity -= 0.02;
            
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }
        
        requestAnimationFrame(animateConfetti);
    }
}

// Handle window resize for canvas
window.addEventListener('resize', function() {
    if (document.querySelector('.cards-page')) {
        for (let day = 1; day <= 7; day++) {
            if (isUnlocked(day) && !scratchedCards[day]) {
                const canvas = document.getElementById(`canvas-${day}`);
                const card = document.getElementById(`card-${day}`);
                if (canvas && card) {
                    const rect = card.getBoundingClientRect();
                    canvas.width = rect.width;
                    canvas.height = rect.height;
                    initScratchCanvas(day);
                }
            }
        }
    }
});
