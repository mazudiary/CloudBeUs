// Glowing Stars
const forestSky = document.querySelector('.forest-sky');
const starColors = ['#FFD1E6', '#FF99CC', '#99FFCC'];
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.className = 'glowing-star';
  const size = Math.random();
  star.classList.add(size < 0.5 ? 'small' : size < 0.8 ? 'medium' : 'large');
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 2.5}s`;
  star.style.background = starColors[Math.floor(Math.random() * starColors.length)];
  forestSky.appendChild(star);
}

// Leaf Animation
const leafCanvas = document.getElementById('leafCanvas');
const leafCtx = leafCanvas.getContext('2d');
let leaves = [];

function resizeLeafCanvas() {
  leafCanvas.width = window.innerWidth;
  leafCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeLeafCanvas);
resizeLeafCanvas();

function createLeaf() {
  const x = Math.random() * leafCanvas.width;
  const y = -40;
  leaves.push({ x, y });
}

function drawLeaf(leaf) {
  const img = new Image();
  img.src = 'assets/leaf.png';
  leafCtx.drawImage(img, leaf.x, leaf.y, 40, 40);
}

function animateLeaves() {
  leafCtx.clearRect(0, 0, leafCanvas.width, leafCanvas.height);
  leaves.forEach((leaf, index) => {
    leaf.y += 2;
    if (leaf.y > leafCanvas.height) {
      leaves.splice(index, 1);
    } else {
      drawLeaf(leaf);
    }
  });
  requestAnimationFrame(animateLeaves);
}

setInterval(createLeaf, 800);
animateLeaves();

// Firefly Animation (Locket)
const fireflyCanvas = document.getElementById('fireflyCanvas');
const fireflyCtx = fireflyCanvas.getContext('2d');
let fireflies = [];

function resizeFireflyCanvas() {
  fireflyCanvas.width = window.innerWidth;
  fireflyCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeFireflyCanvas);
resizeFireflyCanvas();

function createFirefly() {
  const locket = document.querySelector('.locket-frame');
  const rect = locket.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const angle = Math.random() * 2 * Math.PI;
  const radius = 100;
  fireflies.push({ x, y, angle, radius, speed: 0.02 });
}

function drawFirefly(firefly) {
  const img = new Image();
  img.src = 'assets/fairy-dust.png';
  const x = firefly.x + Math.cos(firefly.angle) * firefly.radius;
  const y = firefly.y + Math.sin(firefly.angle) * firefly.radius;
  fireflyCtx.drawImage(img, x, y, 20, 20);
}

function animateFireflies() {
  fireflyCtx.clearRect(0, 0, fireflyCanvas.width, fireflyCanvas.height);
  fireflies.forEach((firefly) => {
    firefly.angle += firefly.speed;
    drawFirefly(firefly);
  });
  requestAnimationFrame(animateFireflies);
}

for (let i = 0; i < 10; i++) createFirefly();
animateFireflies();

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
  fireflies = [];
  const colors = ['#FF99CC', '#99FFCC', '#FFD1E6'];
  for (let i = 0; i < 10; i++) {
    const acorn = document.createElement('div');
    acorn.className = 'acorn';
    acorn.style.left = `${e.clientX}px`;
    acorn.style.top = `${e.clientY}px`;
    acorn.style.setProperty('--bounce-x', `${(Math.random() - 0.5) * 100}px`);
    acorn.style.setProperty('--bounce-y', `${(Math.random() - 0.5) * 100}px`);
    document.body.appendChild(acorn);
    setTimeout(() => acorn.remove(), 1500);
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

// Forest Fiesta (Double Click)
locketImage.addEventListener('dblclick', () => {
  for (let i = 0; i < 20; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = `${Math.random() * window.innerWidth}px`;
    leaf.style.top = `${-40}px`;
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 6000);
  }
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#FF99CC', '#99FFCC', '#FFD1E6', '#FFD700'],
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
    const displayText = `Our forest spell: ${text}`;
    function typeMessage() {
      if (i < displayText.length) {
        messageText.innerHTML += displayText.charAt(i);
        if (displayText.charAt(i) !== ' ') {
          const vine = document.createElement('div');
          vine.className = 'sparkling-vine';
          const rect = messageText.getBoundingClientRect();
          vine.style.left = `${rect.left + rect.width}px`;
          vine.style.top = `${rect.top}px`;
          vine.style.setProperty('--vine-message', `"${['Love!', 'Sparkle!', 'Magic!'][Math.floor(Math.random() * 3)]}"`);
          document.body.appendChild(vine);
          setTimeout(() => vine.remove(), 1500);
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
          colors: ['#FF99CC', '#99FFCC', '#FFD1E6'],
          shapes: ['heart', 'circle'],
          scalar: 1.5
        });
      }
    }
    typeMessage();
    messageInput.value = '';
  }
});