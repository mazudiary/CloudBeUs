// Stars
const starsContainer = document.querySelector('.stars');
const starColors = ['#f7a8b8', '#ffb6c1', '#d4c1e8'];
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

function createHeart(x, y, color = 'rgba(200, 43, 58, 0.8)') {
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

// Rose Petals
function createRosePetal() {
  const petal = document.createElement('div');
  petal.className = 'rose-petal';
  const colors = ['#c42b3a', '#f7a8b8', '#d4a017'];
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

setInterval(createRosePetal, 600);

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

// Quill Sparkle Effect for Title
const traditionsTitle = document.getElementById('traditionsTitle');
traditionsTitle.addEventListener('animationstart', () => {
  const rect = traditionsTitle.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
    sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
    sparkle.style.setProperty('--spark-x', `${(Math.random() - 0.5) * 20}px`);
    sparkle.style.setProperty('--spark-y', `${(Math.random() - 0.5) * 20}px`);
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
  }
});

// Scroll Animation for Tradition Items
const traditionItems = document.querySelectorAll('.tradition-item');
function checkScroll() {
  traditionItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      item.classList.add('visible');
      if (!item.querySelector('.flame-animation') && item.classList.contains('unity-candle')) {
        const flame = document.createElement('div');
        flame.className = 'flame-animation';
        flame.style.left = '50%';
        flame.style.top = '50%';
        item.appendChild(flame);
        setTimeout(() => flame.remove(), 2000);
      }
      if (!item.querySelector('.scroll-animation') && item.classList.contains('wedding-vows')) {
        const scroll = document.createElement('div');
        scroll.className = 'scroll-animation';
        scroll.style.left = '50%';
        scroll.style.top = '50%';
        item.appendChild(scroll);
        setTimeout(() => scroll.remove(), 2000);
      }
    }
  });
}
window.addEventListener('scroll', checkScroll);
checkScroll();

// Vow Previews
const vowButtons = document.querySelectorAll('.vow-button');
const vows = [
  "My eternal flame, with this candle’s light, I vow to merge my heart with yours, our love a beacon that burns forever.",
  "My muse, I vow to speak my soul’s truth, binding us with words that dance like starlight through eternity.",
  "My beloved, with this cord, I vow to entwine our lives, our love aglow with the unity candle’s fire.",
  "My heart, I vow to gift you my rose, its petals warmed by our sacred vows, blooming for you always."
];

vowButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const vowText = button.nextElementSibling;
    vowText.innerHTML = '';
    let i = 0;
    const vow = vows[index];
    function typeVow() {
      if (i < vow.length) {
        vowText.innerHTML += vow.charAt(i);
        if (vow.charAt(i) !== ' ') {
          const splash = document.createElement('div');
          splash.className = 'ink-splash';
          const rect = vowText.getBoundingClientRect();
          splash.style.left = `${rect.left + rect.width}px`;
          splash.style.top = `${rect.top + rect.height / 2}px`;
          splash.style.setProperty('--ink-x', `${(Math.random() - 0.5) * 40}px`);
          splash.style.setProperty('--ink-y', `${(Math.random() - 0.5) * 40}px`);
          document.body.appendChild(splash);
          setTimeout(() => splash.remove(), 1000);
          if (button.parentElement.parentElement.classList.contains('unity-candle')) {
            const flame = document.createElement('div');
            flame.className = 'flame-animation';
            flame.style.left = `${rect.left + rect.width}px`;
            flame.style.top = `${rect.top}px`;
            document.body.appendChild(flame);
            setTimeout(() => flame.remove(), 2000);
          }
          if (button.parentElement.parentElement.classList.contains('wedding-vows')) {
            const scroll = document.createElement('div');
            scroll.className = 'scroll-animation';
            scroll.style.left = `${rect.left + rect.width}px`;
            scroll.style.top = `${rect.top}px`;
            document.body.appendChild(scroll);
            setTimeout(() => scroll.remove(), 2000);
          }
        }
        i++;
        setTimeout(typeVow, 150);
      }
    }
    typeVow();
  });
});

// Unity Candle and Vows Hover Animation
const unityCandleItem = document.querySelector('.unity-candle');
const weddingVowsItem = document.querySelector('.wedding-vows');
unityCandleItem.addEventListener('mouseenter', () => {
  const flame = unityCandleItem.querySelector('.flame-icon');
  flame.style.animation = 'flickerIcon 1.5s infinite ease-in-out';
});
unityCandleItem.addEventListener('mouseleave', () => {
  const flame = unityCandleItem.querySelector('.flame-icon');
  flame.style.animation = 'none';
});
weddingVowsItem.addEventListener('mouseenter', () => {
  const scroll = weddingVowsItem.querySelector('.scroll-icon');
  scroll.style.animation = 'unrollScroll 1.5s infinite ease-in-out';
});
weddingVowsItem.addEventListener('mouseleave', () => {
  const scroll = weddingVowsItem.querySelector('.scroll-icon');
  scroll.style.animation = 'none';
});

// Polaroid Interaction
const polaroidImage = document.querySelector('.polaroid-image');
polaroidImage.addEventListener('click', (e) => {
  const colors = ['#c42b3a', '#f7a8b8', '#d4a017'];
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
  confetti({
    particleCount: 100,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#c42b3a', '#f7a8b8', '#d4a017'],
    shapes: ['heart'],
    scalar: 1.2
  });
});

// Custom Tradition Submission (Write Our Vow)
const submitTradition = document.getElementById('submitTradition');
const customTradition = document.getElementById('customTradition');
const customTraditionText = document.getElementById('customTraditionText');

submitTradition.addEventListener('click', () => {
  const text = customTradition.value.trim();
  if (text) {
    customTraditionText.innerHTML = '';
    let i = 0;
    const displayText = `Our sacred vow: ${text}`;
    function typeTradition() {
      if (i < displayText.length) {
        customTraditionText.innerHTML += displayText.charAt(i);
        if (displayText.charAt(i) !== ' ') {
          const splash = document.createElement('div');
          splash.className = 'ink-splash';
          const rect = customTraditionText.getBoundingClientRect();
          splash.style.left = `${rect.left + rect.width}px`;
          splash.style.top = `${rect.top + rect.height / 2}px`;
          splash.style.setProperty('--ink-x', `${(Math.random() - 0.5) * 40}px`);
          splash.style.setProperty('--ink-y', `${(Math.random() - 0.5) * 40}px`);
          document.body.appendChild(splash);
          setTimeout(() => splash.remove(), 1000);
        }
        i++;
        setTimeout(typeTradition, 150);
      } else {
        confetti({
          particleCount: 150,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#c42b3a', '#f7a8b8', '#d4a017'],
          shapes: ['circle', 'square', 'heart'],
          scalar: 1.2
        });
        const colors = ['#c42b3a', '#f7a8b8', '#d4a017'];
        for (let j = 0; j < 15; j++) {
          const effect = j % 2 === 0 ? 'flame-animation' : 'scroll-animation';
          const element = document.createElement('div');
          element.className = effect;
          const rect = customTraditionText.getBoundingClientRect();
          element.style.left = `${rect.left + Math.random() * rect.width}px`;
          element.style.top = `${rect.top + Math.random() * rect.height}px`;
          document.body.appendChild(element);
          setTimeout(() => element.remove(), 2000);
        }
      }
    }
    typeTradition();
    customTradition.value = '';
  }
});