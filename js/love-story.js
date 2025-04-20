// Stars
const starsContainer = document.querySelector('.stars');
const starColors = ['#d4c1e8', '#f5a6b8', '#ffb6c1'];
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random();
  star.classList.add(size < 0.5 ? 'small' : size < 0.8 ? 'medium' : 'large');
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.background = starColors[Math.floor(Math.random() * starColors.length)];
  starsContainer.appendChild(star);
}

// Popup Logic
const loveButton = document.getElementById('loveButton');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

loveButton.addEventListener('click', () => {
  popup.classList.remove('hidden');
  launchConfetti();
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
});

/*
// Music Toggle
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '♡ Play Music';
  } else {
    bgMusic.play();
    musicToggle.textContent = '♡ Pause Music';
  }
  isPlaying = !isPlaying;
});
*/
// Typewriter Effect with Sparkles
const typewriterText = "Our Beautiful Journey";
const typewriterElement = document.getElementById('typewriter');
let i = 0;

function typeWriter() {
  if (i < typewriterText.length) {
    typewriterElement.innerHTML += typewriterText.charAt(i);
    if (typewriterText.charAt(i) !== ' ') {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      const rect = typewriterElement.getBoundingClientRect();
      sparkle.style.left = `${rect.left + rect.width}px`;
      sparkle.style.top = `${rect.top + rect.height / 2}px`;
      sparkle.style.setProperty('--spark-x', `${(Math.random() - 0.5) * 60}px`);
      sparkle.style.setProperty('--spark-y', `${(Math.random() - 0.5) * 60}px`);
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1500);
    }
    i++;
    setTimeout(typeWriter, 150);
  } else {
    // Heart Sparkle Explosion at End
    const rect = typewriterElement.getBoundingClientRect();
    const colors = ['#f5a6b8', '#ffb6c1', '#d4c1e8'];
    for (let j = 0; j < 15; j++) {
      const heart = document.createElement('div');
      heart.className = 'heart-trail';
      heart.style.left = `${rect.left + rect.width / 2}px`;
      heart.style.top = `${rect.top + rect.height / 2}px`;
      heart.style.setProperty('--heart-x', `${(Math.random() - 0.5) * 100}px`);
      heart.style.setProperty('--heart-y', `${(Math.random() - 0.5) * 100}px`);
      heart.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }
  }
}
typeWriter();

// Floating Hearts Animation
const heartCanvas = document.getElementById('heartCanvas');
const heartCtx = heartCanvas.getContext('2d');
let hearts = [];

function resizeCanvas() {
  heartCanvas.width = window.innerWidth;
  heartCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createHeart(x, y, color = 'rgba(245, 166, 184, 0.8)') {
  const size = Math.random() * 10 + 5;
  const speed = Math.random() * 1 + 0.5;
  hearts.push({ x, y, size, speed, color });
}

function drawHeart(x, y, size, color) {
  heartCtx.fillStyle = color;
  heartCtx.beginPath();
  heartCtx.moveTo(x, y);
  heartCtx.bezierCurveTo(x + size / 2, y - size, x + size * 2, y + size / 3, x, y + size * 2);
  heartCtx.bezierCurveTo(x - size * 2, y + size / 3, x - size / 2, y - size, x, y);
  heartCtx.fill();
}

function animateHearts() {
  heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
  
  for (let i = 0; i < hearts.length; i++) {
    const heart = hearts[i];
    heart.y -= heart.speed;
    drawHeart(heart.x, heart.y, heart.size, heart.color);

    if (heart.y + heart.size * 2 < 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateHearts);
}

heartCanvas.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 2; i++) {
    createHeart(e.clientX, e.clientY);
  }
});
animateHearts();

// Heart Trail on Mouse Move
document.addEventListener('mousemove', (e) => {
  const heart = document.createElement('div');
  heart.className = 'heart-trail';
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  heart.style.setProperty('--heart-x', `${(Math.random() - 0.5) * 40}px`);
  heart.style.setProperty('--heart-y', `${(Math.random() - 0.5) * 40}px`);
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);

  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.top = `${e.clientY}px`;
  sparkle.style.setProperty('--spark-x', `${(Math.random() - 0.5) * 30}px`);
  sparkle.style.setProperty('--spark-y', `${(Math.random() - 0.5) * 30}px`);
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1500);
});

// Bubbles Animation
const bubbleCanvas = document.getElementById('bubbleCanvas');
const bubbleCtx = bubbleCanvas.getContext('2d');
let bubbles = [];

function resizeBubbleCanvas() {
  bubbleCanvas.width = window.innerWidth;
  bubbleCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeBubbleCanvas);
resizeBubbleCanvas();

function createBubble() {
  const radius = Math.random() * 5 + 2;
  const x = Math.random() * bubbleCanvas.width;
  const y = bubbleCanvas.height + radius;
  const speed = Math.random() * 1 + 0.5;
  bubbles.push({ x, y, radius, speed });
}

function drawBubble(bubble) {
  bubbleCtx.beginPath();
  bubbleCtx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
  bubbleCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  bubbleCtx.fill();
}

function animateBubbles() {
  bubbleCtx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
  
  bubbles.forEach((bubble, index) => {
    bubble.y -= bubble.speed;
    drawBubble(bubble);
    
    if (bubble.y + bubble.radius < 0) {
      bubbles.splice(index, 1);
    }
  });
  requestAnimationFrame(animateBubbles);
}

setInterval(createBubble, 500);
animateBubbles();

// Petals
function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  const colors = ['#f5a6b8', '#ffb6c1', '#d4c1e8'];
  const width = Math.random() * 8 + 8;
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.top = '-20px';
  petal.style.setProperty('--petal-width', `${width}px`);
  petal.style.setProperty('--petal-height', `${width * 1.8}px`);
  petal.style.setProperty('--petal-color', colors[Math.floor(Math.random() * colors.length)]);
  petal.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 50}px`);
  petal.style.animationDelay = `${Math.random() * 5}s`;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 8000);
}

setInterval(createPetal, 800);

// Image Interaction
const coupleImage = document.querySelector('.couple-image');
coupleImage.addEventListener('click', (e) => {
  const colors = ['#f5a6b8', '#ffb6c1', '#d4c1e8'];
  for (let i = 0; i < 30; i++) {
    createHeart(
      e.clientX + (Math.random() - 0.5) * 60,
      e.clientY + (Math.random() - 0.5) * 60,
      colors[Math.floor(Math.random() * colors.length)]
    );
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${e.clientX + (Math.random() - 0.5) * 60}px`;
    sparkle.style.top = `${e.clientY + (Math.random() - 0.5) * 60}px`;
    sparkle.style.setProperty('--spark-x', `${(Math.random() - 0.5) * 80}px`);
    sparkle.style.setProperty('--spark-y', `${(Math.random() - 0.5) * 80}px`);
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
  }
});

// Confetti Blast
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#f5a6b8', '#ffb6c1', '#d4c1e8'],
    shapes: ['circle', 'square', 'heart'], // Custom heart shape
    scalar: 1.2
  });
}

// Random Love Quotes
const loveQuotes = [
  "You are my today and all of my tomorrows.",
  "Together is my favorite place to be.",
  "I still fall for you every single day.",
  "Home is wherever I'm with you.",
  "You’re my endless love story."
];

function showRandomQuote() {
  const quoteElement = document.getElementById('loveQuote');
  const randomIndex = Math.floor(Math.random() * loveQuotes.length);
  quoteElement.innerText = loveQuotes[randomIndex];
}

setInterval(showRandomQuote, 8000);

// Timeline Scroll Animation
const timelineItems = document.querySelectorAll('.timeline-item');
function checkScroll() {
  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkScroll);
checkScroll();

// Message Submission
const submitMessage = document.getElementById('submitMessage');
const userMessage = document.getElementById('userMessage');
const messageDisplay = document.getElementById('messageDisplay');

submitMessage.addEventListener('click', () => {
  const text = userMessage.value.trim();
  if (text) {
    messageDisplay.textContent = text;
    userMessage.value = '';
    launchConfetti();
    const colors = ['#f5a6b8', '#ffb6c1', '#d4c1e8'];
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-trail';
      const rect = messageDisplay.getBoundingClientRect();
      heart.style.left = `${rect.left + Math.random() * rect.width}px`;
      heart.style.top = `${rect.top + Math.random() * rect.height}px`;
      heart.style.setProperty('--heart-x', `${(Math.random() - 0.5) * 60}px`);
      heart.style.setProperty('--heart-y', `${(Math.random() - 0.5) * 60}px`);
      heart.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }
  }
});