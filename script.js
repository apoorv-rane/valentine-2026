/* Loader delay */
setTimeout(() => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main").style.display = "block";
  typeName();
  updateCountdown();
}, 5000);

/* Typing effect */
const nameText = "Hi Bhakti\nMy Favourite Human ❤️";
let index = 0;

function typeName() {
  if (index < nameText.length) {
    document.getElementById("typedName").innerHTML += nameText.charAt(index);
    index++;
    setTimeout(typeName, 70);
  }
}

/* Reveal proposal */
function reveal() {
  document.querySelectorAll('.photo').forEach(img => img.style.display = 'none');
  document.querySelector('button[onclick="reveal()"]').style.display = 'none';
  document.getElementById("question").style.display = "block";
  document.getElementById("question").scrollIntoView({ behavior: 'smooth' });
}

/* Countdown to Valentine's Day */
function updateCountdown() {
  // Create Valentine's Day date in IST (UTC+5:30)
  const valentineDate = new Date('2026-02-14T00:00:00+05:30').getTime();

  // Get current time and convert to IST
  const nowUTC = new Date().getTime();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const nowIST = nowUTC + istOffset;

  const distance = valentineDate - nowIST;

  if (distance > 0) {
    const msDay = 1000 * 60 * 60 * 24;
    const totalDays = distance / msDay;
    const hours = Math.floor((distance % msDay) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    let countdown = document.getElementById("countdown");
    if (totalDays >= 1) {
      // Show days rounded up so today's remaining portion counts toward the next day
      const days = Math.ceil(totalDays);
      countdown.innerHTML = `💕 ${days} days until Valentine's Day ❤️`;
    } else if (hours > 0) {
      countdown.innerHTML = `💕 ${hours} hours until Valentine's Day ❤️`;
    } else {
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      countdown.innerHTML = `💕 ${minutes}m ${seconds}s until Valentine's Day ❤️`;
    }
  } else {
    document.getElementById("countdown").innerHTML = "💕 Happy Valentine's Day! 💕";
  }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);

function yes() {
  createConfetti();
  alert("Best decision you've made today 😘\n\nI can't wait to celebrate with you! 💕");
  document.getElementById("question").innerHTML = "<h2>You've made me the happiest! 🎉&nbsp;💕</h2>";
}

/* Confetti animation */
function createConfetti() {
  const colors = ['#e63946', '#ff006e', '#ff10f0', '#ffbe0b', '#fb5607', '#ff006e', '#a01a7d'];
  const confettiCount = 80;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

    const duration = 2 + Math.random() * 1;
    const xMove = (Math.random() - 0.5) * 300;

    confetti.style.animation = `confettiFall ${duration}s ease-out forwards`;
    confetti.style.setProperty('--x-move', xMove + 'px');

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), duration * 1000);
  }
}

/* No button - playful interaction */
let noClickCount = 0;
function no() {
  noClickCount++;
  const noBtn = event.target;
  const yesBtn = document.querySelector('button[onclick="yes()"]');

  if (noClickCount === 1) {
    noBtn.innerHTML = "Are you sure?";
  } else if (noClickCount === 2) {
    noBtn.innerHTML = "Really sure?";
  } else if (noClickCount === 3) {
    noBtn.innerHTML = "Think again... 💔";
    yesBtn.style.fontSize = "20px";
  } else if (noClickCount === 4) {
    noBtn.innerHTML = "Last chance!";
    yesBtn.style.fontSize = "24px";
  } else {
    noBtn.style.display = "none";
    yesBtn.style.fontSize = "32px";
    yesBtn.innerHTML = "YES! 💕<br><span style=\"font-size: 0.6em; display: block; margin-top: 4px;\">(chal ata natka nako karus)</span>";
  }
}

/* Floating hearts */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (6 + Math.random() * 4) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}, 800);

/* Music control */
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let playing = false;

function toggleMusic() {
  // Remove animation on first click
  musicToggle.classList.add("clicked");

  if (!playing) {
    music.muted = false;
    music.play().catch(() => {
      console.log("Music playback failed - file may not exist or browser blocked autoplay");
    });
    playing = true;
    musicToggle.classList.add("playing");
  } else {
    music.pause();
    music.muted = true;
    playing = false;
    musicToggle.classList.remove("playing");
  }
}

// Auto-start music playback on load (will be muted until user clicks)
window.addEventListener('load', () => {
  music.play().catch(() => {
    console.log("Music playback failed - file may not exist or browser blocked autoplay");
  });
});

/* Scroll hint - hide on first scroll */
window.addEventListener('scroll', () => {
  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    scrollHint.classList.add('hidden');
  }
}, { once: true });
