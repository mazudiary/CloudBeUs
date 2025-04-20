// Stars
const starsContainer = document.querySelector('.stars');
const starColors = ['#f5a6b8', '#ffb6c1', '#d4c1e8'];
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

function createHeart(x, y, color = 'rgba(230, 57, 70, 0.8)') {
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
  const colors = ['#e63946', '#f5a6b8', '#d4c1e8'];
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

// Heart Trail and Sparkles on Mouse Move
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

// Polaroid Interaction
const polaroidImage = document.querySelector('.polaroid-image');
polaroidImage.addEventListener('click', (e) => {
  const colors = ['#e63946', '#f5a6b8', '#d4c1e8'];
  for (let i = 0; i < 20; i++) {
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

// Kiss Button
const kissButton = document.getElementById('kissButton');
kissButton.addEventListener('click', (e) => {
  const kiss = document.createElement('div');
  kiss.className = 'kiss-mark';
  kiss.style.left = `${e.clientX}px`;
  kiss.style.top = `${e.clientY}px`;
  document.body.appendChild(kiss);
  setTimeout(() => kiss.remove(), 2000);
  launchConfetti();
});

// Confetti Blast
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#e63946', '#f5a6b8', '#d4c1e8'],
    shapes: ['circle', 'square', 'heart'],
    scalar: 1.2
  });
}

// Vows Submission with Typewriter Effect
const submitVows = document.getElementById('submitVows');
const userVows = document.getElementById('userVows');
const vowsText = document.getElementById('vowsText');

submitVows.addEventListener('click', () => {
  const text = userVows.value.trim();
  if (text) {
    vowsText.innerHTML = '';
    let i = 0;
    function typeVows() {
      if (i < text.length) {
        vowsText.innerHTML += text.charAt(i);
        if (text.charAt(i) !== ' ') {
          const splash = document.createElement('div');
          splash.className = 'ink-splash';
          const rect = vowsText.getBoundingClientRect();
          splash.style.left = `${rect.left + rect.width}px`;
          splash.style.top = `${rect.top + rect.height / 2}px`;
          splash.style.setProperty('--ink-x', `${(Math.random() - 0.5) * 40}px`);
          splash.style.setProperty('--ink-y', `${(Math.random() - 0.5) * 40}px`);
          document.body.appendChild(splash);
          setTimeout(() => splash.remove(), 1000);
        }
        i++;
        setTimeout(typeVows, 150);
      } else {
        launchConfetti();
        const colors = ['#e63946', '#f5a6b8', '#d4c1e8'];
        for (let j = 0; j < 15; j++) {
          const heart = document.createElement('div');
          heart.className = 'heart-trail';
          const rect = vowsText.getBoundingClientRect();
          heart.style.left = `${rect.left + Math.random() * rect.width}px`;
          heart.style.top = `${rect.top + Math.random() * rect.height}px`;
          heart.style.setProperty('--heart-x', `${(Math.random() - 0.5) * 60}px`);
          heart.style.setProperty('--heart-y', `${(Math.random() - 0.5) * 60}px`);
          heart.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 2000);
        }
      }
    }
    typeVows();
    userVows.value = '';
  }
});