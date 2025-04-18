
    // Stars
    const starsContainer = document.querySelector('.stars');
    const starColors = ['#e8f4f8', '#f0e4d7', '#d4c1e8', '#a0d9d2'];
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random();
      star.classList.add(size < 0.5 ? 'small' : size < 0.8 ? 'medium' : 'large');
      if (Math.random() < 0.2) star.classList.add('orbit');
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.background = starColors[Math.floor(Math.random() * starColors.length)];
      star.style.transform = `translateZ(${Math.random() * 20}px)`;
      starsContainer.appendChild(star);
    }

    // Constellation Drawing
    let selectedStars = [];
    const constellationMessages = [
      "Our love lights the sky",
      "A star for every kiss",
      "Together, we shine forever",
      "You are my constellation"
    ];
    document.querySelectorAll('.star').forEach(star => {
      star.addEventListener('click', (e) => {
        if (selectedStars.length < 2) {
          selectedStars.push({ x: e.clientX, y: e.clientY });
          star.style.transform = 'scale(2)';
          star.style.background = '#f0e4d7';
        }
        if (selectedStars.length === 2) {
          const line = document.createElement('div');
          line.className = 'constellation-line';
          const x1 = selectedStars[0].x, y1 = selectedStars[0].y;
          const x2 = selectedStars[1].x, y2 = selectedStars[1].y;
          const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
          line.style.width = `${length}px`;
          line.style.left = `${x1}px`;
          line.style.top = `${y1}px`;
          line.style.transform = `rotate(${angle}deg)`;
          document.body.appendChild(line);

          const message = document.createElement('div');
          message.className = 'constellation-message';
          message.textContent = constellationMessages[Math.floor(Math.random() * constellationMessages.length)];
          message.style.left = `${(x1 + x2) / 2}px`;
          message.style.top = `${(y1 + y2) / 2 - 20}px`;
          document.body.appendChild(message);

          [selectedStars[0], selectedStars[1]].forEach(pos => {
            const colors = ['#f5a6b8', '#ffb6c1', '#a0d9d2', '#d4c1e8', '#f0e4d7'];
            for (let i = 0; i < 10; i++) {
              const isHeart = Math.random() < 0.5;
              const spark = document.createElement('div');
              spark.className = isHeart ? 'floating-heart' : 'love-spark';
              spark.style.left = `${pos.x}px`;
              spark.style.top = `${pos.y}px`;
              spark.style.setProperty('--spark-x', `${(Math.random() - 0.5) * 100}px`);
              spark.style.setProperty('--spark-y', `${(Math.random() - 0.5) * 100}px`);
              const color = colors[Math.floor(Math.random() * colors.length)];
              if (isHeart) {
                spark.style.setProperty('--heart-color', color);
                spark.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 80}px`);
                spark.style.setProperty('--heart-scale', `${0.8 + Math.random() * 0.4}`);
              } else {
                spark.style.setProperty('--spark-color', color);
                spark.style.setProperty('--spark-rotate', `${(Math.random() - 0.5) * 360}deg`);
              }
              document.body.appendChild(spark);
              setTimeout(() => spark.remove(), 2000);
            }
          });

          setTimeout(() => {
            line.remove();
            message.remove();
            selectedStars = [];
            document.querySelectorAll('.star').forEach(s => {
              s.style.transform = 'scale(1)';
              s.style.background = starColors[Math.floor(Math.random() * starColors.length)];
            });
          }, 3000);
        }
      });
    });

    // Fireflies
    for (let i = 0; i < 20; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      firefly.style.left = `${Math.random() * 100}%`;
      firefly.style.top = `${Math.random() * 100}%`;
      firefly.style.animationDelay = `${Math.random() * 10}s`;
      document.body.appendChild(firefly);
    }

    // Moon Sparkles and Hearts
    const moon = document.querySelector('.moon');
    const moonColors = ['#f5a6b8', '#ffb6c1', '#d4c1e8'];
    for (let i = 0; i < 8; i++) {
      const isHeart = Math.random() < 0.5;
      const element = document.createElement('div');
      element.className = isHeart ? 'moon-heart' : 'moon-sparkle';
      const angle = Math.random() * 2 * Math.PI;
      const radius = 60 + Math.random() * 20;
      element.style.setProperty('--sparkle-x', `${Math.cos(angle) * radius}px`);
      element.style.setProperty('--sparkle-y', `${Math.sin(angle) * radius}px`);
      element.style.setProperty('--orbit-x', `${Math.cos(angle) * radius * 0.5}px`);
      element.style.setProperty('--orbit-y', `${Math.sin(angle) * radius * 0.5}px`);
      element.style.animationDelay = `${Math.random() * 3}s`;
      if (isHeart) {
        const color = moonColors[Math.floor(Math.random() * moonColors.length)];
        element.style.setProperty('--heart-color', color);
      }
      moon.appendChild(element);
    }

    // Moon Interaction
    moon.addEventListener('click', (e) => {
      const moonRect = moon.getBoundingClientRect();
      const centerX = moonRect.left + moonRect.width / 2;
      const centerY = moonRect.top + moonRect.height / 2;
      const colors = ['#f5a6b8', '#ffb6c1', '#d4c1e8'];
      for (let i = 0; i < 10; i++) {
        const isHeart = Math.random() < 0.7;
        const element = document.createElement('div');
        element.className = isHeart ? 'moon-heart' : 'moon-sparkle';
        element.style.left = `${centerX}px`;
        element.style.top = `${centerY}px`;
        const angle = Math.random() * 2 * Math.PI;
        const radius = 50 + Math.random() * 30;
        element.style.setProperty('--sparkle-x', `${Math.cos(angle) * radius}px`);
        element.style.setProperty('--sparkle-y', `${Math.sin(angle) * radius}px`);
        element.style.setProperty('--orbit-x', `${Math.cos(angle) * radius * 0.5}px`);
        element.style.setProperty('--orbit-y', `${Math.sin(angle) * radius * 0.5}px`);
        element.style.animationDuration = `${2 + Math.random() * 2}s`;
        if (isHeart) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          element.style.setProperty('--heart-color', color);
        }
        document.body.appendChild(element);
        setTimeout(() => element.remove(), 5000);
      }
    });

    // Butterfly Interaction
    const butterflies = document.querySelectorAll('.butterfly');
    butterflies.forEach(butterfly => {
      butterfly.addEventListener('click', () => {
        butterfly.style.animation = 'flutterFast 2s infinite ease-in-out';
        const colors = ['#f5a6b8', '#ffb6c1', '#a0d9d2', '#d4c1e8'];
        for (let i = 0; i < 12; i++) {
          const trail = document.createElement('div');
          trail.className = 'butterfly-trail';
          trail.style.left = `${butterfly.getBoundingClientRect().left + 15}px`;
          trail.style.top = `${butterfly.getBoundingClientRect().top + 10}px`;
          trail.style.background = colors[Math.floor(Math.random() * colors.length)];
          trail.style.setProperty('--trail-x', `${(Math.random() - 0.5) * 80}px`);
          trail.style.setProperty('--trail-y', `${(Math.random() - 0.5) * 80}px`);
          document.body.appendChild(trail);
          setTimeout(() => trail.remove(), 1500);
        }
      });
    });

    // Sparkle Trail
    document.addEventListener('mousemove', (e) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 2000);
    });

    // Heart Drawing
    document.addEventListener('click', (e) => {
      if (!e.target.classList.contains('butterfly') && !e.target.classList.contains('star') && !e.target.closest('.moon')) {
        const heart = document.createElement('div');
        heart.className = 'drawn-heart';
        heart.style.left = `${e.clientX - 10}px`;
        heart.style.top = `${e.clientY - 10}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
      }
    });

    // Parallax
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      document.querySelector('.container').style.transform = `translate(${x}px, ${y}px) translateZ(0)`;
      document.querySelector('.image-slot').style.transform = `translateZ(20px) translate(${x * 0.5}px, ${y * 0.5}px)`;
      document.querySelector('.stars').style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      document.querySelector('.moon').style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    // Love Note
    const loveNote = document.querySelector('.love-note');
    const quotes = [
      '"With every heartbeat, I dream of you."',
      '"You are my forever and always."',
      '"Our love is a story written in the stars."',
      '"Every moment with you feels like magic."'
    ];
    let quoteIndex = 0;
    function updateQuote() {
      loveNote.style.opacity = 0;
      loveNote.style.transform = 'translateY(40px)';
      setTimeout(() => {
        loveNote.textContent = quotes[quoteIndex];
        loveNote.style.opacity = 1;
        loveNote.style.transform = 'translateY(0)';
        quoteIndex = (quoteIndex + 1) % quotes.length;
      }, 500);
    }
    updateQuote();
    setInterval(updateQuote, 5000);

    // Floating Hearts
    const heartsContainer = document.querySelector('.hearts');
    const heartColors = ['#f5a6b8', '#ffb6c1', '#a0d9d2', '#d4c1e8', '#f0e4d7'];
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${8 + Math.random() * 6}s`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      heart.style.setProperty('--heart-scale', `${0.8 + Math.random() * 0.4}`);
      heart.style.setProperty('--heart-color', heartColors[Math.floor(Math.random() * heartColors.length)]);
      heartsContainer.appendChild(heart);
    }

    // Petals
    document.querySelectorAll('.petal').forEach(petal => {
      petal.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 40}px`);
    });

    // Floating Hearts on Image Click
    const imageSlot = document.querySelector('.image-slot');
    imageSlot.addEventListener('click', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const colors = ['#f5a6b8', '#ffb6c1', '#a0d9d2', '#d4c1e8', '#f0e4d7'];

      for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = `${x + (Math.random() - 0.5) * 40}px`;
        heart.style.top = `${y + (Math.random() - 0.5) * 40}px`;
        heart.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 80}px`);
        heart.style.setProperty('--heart-scale', `${0.8 + Math.random() * 0.4}`);
        const color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.setProperty('--heart-color', color);
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
      }
    });

    // Animate Overlay Text Letter by Letter and Add Sparkles/Hearts
    const overlayText = document.querySelector('.image-overlay-text');
    const text = overlayText.textContent;
    overlayText.innerHTML = '';
    let delayIndex = 0;

    text.split('').forEach(letter => {
      const span = document.createElement('span');
      span.textContent = letter;
      if (letter !== ' ') {
        span.style.transitionDelay = `${delayIndex * 0.08}s`;
        delayIndex++;
      } else {
        span.style.opacity = 1;
        span.style.transform = 'none';
      }
      overlayText.appendChild(span);
    });

    // Add Sparkles and Hearts on Hover
    imageSlot.addEventListener('mouseenter', () => {
      const overlayRect = overlayText.getBoundingClientRect();
      const colors = ['#f5a6b8', '#ffb6c1', '#a0d9d2', '#d4c1e8'];

      for (let i = 0; i < 15; i++) {
        const isHeart = Math.random() < 0.6;
        const element = document.createElement('div');
        element.className = isHeart ? 'overlay-heart' : 'overlay-sparkle';
        element.style.left = `${overlayRect.left + Math.random() * overlayRect.width}px`;
        element.style.top = `${overlayRect.top + Math.random() * overlayRect.height}px`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        element.style.background = color;
        if (isHeart) {
          element.style.setProperty('--heart-color', color);
          element.style.setProperty('--heart-scale', `${0.7 + Math.random() * 0.3}`);
          element.style.setProperty('--heart-delay', `${Math.random() * 0.5}s`);
        } else {
          element.style.setProperty('--spark-rotate', `${(Math.random() - 0.5) * 360}deg`);
        }
        overlayText.appendChild(element);
        setTimeout(() => element.remove(), 2500);
      }
    });
