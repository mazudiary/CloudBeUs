// common.js
// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const magicSound = document.getElementById('magicSound');

if (hamburger && navbar) {
  hamburger.addEventListener('click', (e) => {
    hamburger.classList.toggle('open');
    navbar.classList.toggle('open');
    magicSound.play();
    // Fairy Dust Effect
    for (let i = 0; i < 5; i++) {
      const dust = document.createElement('div');
      dust.className = 'fairy-dust';
      dust.style.left = `${e.clientX}px`;
      dust.style.top = `${e.clientY}px`;
      dust.style.setProperty('--dust-x', `${(Math.random() - 0.5) * 40}px`);
      dust.style.setProperty('--dust-y', `${(Math.random() - 0.5) * 40}px`);
      document.body.appendChild(dust);
      setTimeout(() => dust.remove(), 1000);
    }
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      magicSound.play();
      hamburger.classList.remove('open');
      navbar.classList.remove('open');
      for (let i = 0; i < 5; i++) {
        const dust = document.createElement('div');
        dust.className = 'fairy-dust';
        dust.style.left = `${e.clientX}px`;
        dust.style.top = `${e.clientY}px`;
        dust.style.setProperty('--dust-x', `${(Math.random() - 0.5) * 40}px`);
        dust.style.setProperty('--dust-y', `${(Math.random() - 0.5) * 40}px`);
        document.body.appendChild(dust);
        setTimeout(() => dust.remove(), 1000);
      }
    });
  });
}

// Music Toggle
const bgMusic = document.getElementById('bgMusic');
// const musicToggle = document.getElementById('musicToggle');
// const giggleSound = document.getElementById('giggleSound');
let isPlaying = false;

if (bgMusic && musicToggle) {
  function fadeAudio(audio, targetVolume, duration) {
    let currentVolume = audio.volume;
    const step = (targetVolume - currentVolume) / (duration / 50);
    const fadeInterval = setInterval(() => {
      currentVolume += step;
      if (currentVolume <= 0) {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeInterval);
      } else if (currentVolume >= 1) {
        audio.volume = 1;
        clearInterval(fadeInterval);
      } else {
        audio.volume = currentVolume;
      }
    }, 50);
  }

  musicToggle.addEventListener('click', (e) => {
  //  magicSound.play();
//    giggleSound.play();
    const castText = musicToggle.dataset.castText;
    const pauseText = musicToggle.dataset.pauseText;
    if (isPlaying) {
      fadeAudio(bgMusic, 0, 1000);
      musicToggle.textContent = castText;
    } else {
      bgMusic.play().catch(() => {});
      fadeAudio(bgMusic, 1, 1000);
      musicToggle.textContent = pauseText;
    }
    isPlaying = !isPlaying;
    for (let i = 0; i < 5; i++) {
      const dust = document.createElement('div');
      dust.className = 'fairy-dust';
      dust.style.left = `${e.clientX}px`;
      dust.style.top = `${e.clientY}px`;
      dust.style.setProperty('--dust-x', `${(Math.random() - 0.5) * 40}px`);
      dust.style.setProperty('--dust-y', `${(Math.random() - 0.5) * 40}px`);
      document.body.appendChild(dust);
      setTimeout(() => dust.remove(), 1000);
    }
  });

  bgMusic.volume = 0.3;
}