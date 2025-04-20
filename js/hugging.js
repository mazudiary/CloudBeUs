// Reflecting Stars
const lagoonSky = document.querySelector('.lagoon-sky');
const starColors = ['#E6F9FF', '#B2F7FF', '#D9CCFF'];
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.className = 'reflecting-star';
  const size = Math.random();
  star.classList.add(size < 0.5 ? 'small' : size < 0.8 ? 'medium' : 'large');
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.background = starColors[Math.floor(Math.random() * starColors.length)];
  lagoonSky.appendChild(star);
}

// Starlight Animation (Locket)
const starlightCanvas = document.getElementById('starlightCanvas');
const starlightCtx = starlightCanvas.getContext('2d');
let starlights = [];

function resizeStarlightCanvas() {
  starlightCanvas.width = window.innerWidth;
  starlightCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeStarlightCanvas);
resizeStarlightCanvas();

function createStarlight() {
  const locket = document.querySelector('.locket-frame');
  const rect = locket.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const angle = Math.random() * 2 * Math.PI;
  const radius = 80;
  starlights.push({ x, y, angle, radius, speed: 0.015 });
}

function drawStarlight(starlight) {
  const img = new Image();
  img.src = 'assets/fairy-dust.png';
  const x = starlight.x + Math.cos(starlight.angle) * starlight.radius;
  const y = starlight.y + Math.sin(starlight.angle) * starlight.radius;
  starlightCtx.drawImage(img, x, y, 20, 20);
}

function animateStarlights() {
  starlightCtx.clearRect(0, 0, starlightCanvas.width, starlightCanvas.height);
  starlights.forEach((starlight) => {
    starlight.angle += starlight.speed;
    drawStarlight(starlight);
  });
  requestAnimationFrame(animateStarlights);
}

for (let i = 0; i < 8; i++) createStarlight();
animateStarlights();

// Fairy Dust on Mouse Move
document.addEventListener('mousemove', (e) => {
  const dust = document.createElement('div');
  dust.className = 'fairy-dust';
  dust.style.left = `${e.clientX}px`;
  dust.style.top = `${e.clientY}px`;
  dust.style.setProperty('--dust-x', `${(Math.random() - 0.5) * 40}px`);
  dust.style.setProperty('--dust-y', `${(Math.random() - 0.5) * 40}px`);
  document.body.appendChild(dust);
  setTimeout(() => dust.remove(), 1000);
});

// Locket Interaction
const locketImage = document.querySelector('.locket-image');
locketImage.addEventListener('click', (e) => {
  starlights = [];
  const colors = ['#B2F7FF', '#D9CCFF', '#E6F9FF'];
  for (let i = 0; i < 10; i++) {
    const lotus = document.createElement('div');
    lotus.className = 'lotus';
    lotus.style.left = `${e.clientX}px`;
    lotus.style.top = `${e.clientY}px`;
    lotus.style.setProperty('--float-x', `${(Math.random() - 0.5) * 50}px`);
    document.body.appendChild(lotus);
    setTimeout(() => lotus.remove(), 5000);
  }
  confetti({
    particleCount: 80,
    spread: 50,
    origin: { y: 0.6 },
    colors: colors,
    shapes: ['heart', 'circle'],
    scalar: 1.5
  });
});

// Lagoon Waltz (Double Click)
locketImage.addEventListener('dblclick', () => {
  for (let i = 0; i < 15; i++) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${Math.random() * window.innerWidth}px`;
    ripple.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 5000);
  }
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#B2F7FF', '#D9CCFF', '#E6F9FF', '#FFD700'],
    shapes: ['heart', 'star'],
    scalar: 1.8
  });
});

// Message Submission
const submitMessage = document.getElementById('submitMessage');
const messageInput = document.getElementById('messageInput');
const messageText = document.getElementById('messageText');

submitMessage.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (text) {
    messageText.innerHTML = '';
    let i = 0;
    const displayText = `Our lagoon lullaby: ${text}`;
    function typeMessage() {
      if (i < displayText.length) {
        messageText.innerHTML += displayText.charAt(i);
        if (displayText.charAt(i) !== ' ') {
          const bubble = document.createElement('div');
          bubble.className = 'bubble';
          const rect = messageText.getBoundingClientRect();
          bubble.style.left = `${rect.left + rect.width}px`;
          bubble.style.top = `${rect.top}px`;
          bubble.style.setProperty('--float-x', `${(Math.random() - 0.5) * 50}px`);
          bubble.style.setProperty('--bubble-message', `"${['Peace!', 'Glow!', 'Love!'][Math.floor(Math.random() * 3)]}"`);
          document.body.appendChild(bubble);
          setTimeout(() => bubble.remove(), 2000);
          const dust = document.createElement('div');
          dust.className = 'fairy-dust';
          dust.style.left = `${rect.left + rect.width}px`;
          dust.style.top = `${rect.top}px`;
          dust.style.setProperty('--dust-x', `${(Math.random() - 0.5) * 40}px`);
          dust.style.setProperty('--dust-y', `${(Math.random() - 0.5) * 40}px`);
          document.body.appendChild(dust);
          setTimeout(() => dust.remove(), 1000);
        }
        i++;
        setTimeout(typeMessage, 80);
      } else {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#B2F7FF', '#D9CCFF', '#E6F9FF'],
          shapes: ['heart', 'circle'],
          scalar: 1.5
        });
      }
    }
    typeMessage();
    messageInput.value = '';
  }
});