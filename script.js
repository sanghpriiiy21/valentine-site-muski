const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const music = document.getElementById("bgMusic");

let noCount = 0;
const noTexts = [
  "No 🙃",
  "Are you sure? 🥺",
  "Pleeaaase? 🧸",
  "Don’t do this to me... 💔",
  "I'm gonna cry! 😭",
  "Wrong button 😈"
];

/* NO button escape */
function moveNo() {
  noCount++;

  const viewport = window.visualViewport || {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const padding = 16;

  const maxX = viewport.width - noBtn.offsetWidth - padding;
  const maxY = viewport.height - noBtn.offsetHeight - padding;

  // HARD CLAMPED RANDOM POSITION
  const x = Math.min(
    Math.max(padding, Math.random() * maxX),
    maxX
  );

  const y = Math.min(
    Math.max(padding, Math.random() * maxY),
    maxY
  );

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (noCount < noTexts.length) {
    noBtn.textContent = noTexts[noCount];
  }

  yesBtn.style.transform = `scale(${1 + noCount * 0.12})`;
}/* FULLY BLOCK NO BUTTON (DESKTOP + MOBILE) */
function blockNo(e) {
  e.preventDefault();
  e.stopPropagation();
  moveNo();
  return false;
}

["mouseover", "mousedown", "touchstart", "touchend", "click"].forEach(event => {
  noBtn.addEventListener(event, blockNo, { passive: false });
});
/* Celebration burst */
function createBurst() {
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("span");
    particle.innerHTML = ["🌸", "💖", "✨", "💗"][Math.floor(Math.random() * 4)];
    particle.className = "burst";
    particle.style.left = "50vw";
    particle.style.top = "50vh";

    const dx = (Math.random() - 0.5) * 120;
    const dy = (Math.random() - 0.5) * 120;

    particle.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${dx}vw, ${dy}vh) scale(0)`, opacity: 0 }
    ], { duration: 1500, easing: "ease-out" });

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
  }
}

/* YES click */
yesBtn.addEventListener("click", () => {
  createBurst();
  setTimeout(() => {
    page1.classList.remove("active");
    page2.classList.add("active");
    music.volume = 0.35;
    music.play().catch(() => {});
  }, 300);
});

/* Floating hearts */
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = Math.random() > 0.5 ? "💖" : "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 14 + "px";
  heart.style.animationDuration = Math.random() * 3 + 6 + "s";
  heart.style.animationTimingFunction = "ease-in-out";
  heart.style.transform = `translateX(${Math.random() * 40 - 20}px)`;
  document.querySelector(".hearts-container").appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}, 250);

/* Sparkles ✨ (MISSING PART FIXED) */
setInterval(() => {
  const sparkle = document.createElement("span");
  sparkle.innerHTML = "✨";
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.fontSize = Math.random() * 10 + 10 + "px";
  sparkle.style.animationDuration = Math.random() * 3 + 4 + "s";
  document.querySelector(".sparkles-container").appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 7000);
}, 500);
