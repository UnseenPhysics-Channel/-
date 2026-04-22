const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// 🌫️ NEBULOSAS (FUNDO)
const nebulae = [];

for (let i = 0; i < 6; i++) {
  nebulae.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 250 + 200,
    color: [
      "120, 80, 255",   // roxo
      "80, 200, 255",   // azul
      "255, 120, 200"   // rosa
    ][Math.floor(Math.random() * 3)],
    alpha: Math.random() * 0.08 + 0.03
  });
}


// ⭐ ESTRELAS FIXAS COLORIDAS
const stars = [];

const starColors = [
  "255,255,255",
  "255,245,220",
  "220,235,255",
  "255,210,180"
];

for (let i = 0; i < 350; i++) {
  const depth = Math.random();
  const color = starColors[Math.floor(Math.random() * starColors.length)];

  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: depth * 2.2,
    alpha: 0.2 + depth * 0.8,
    color: color,
    twinkle: Math.random() * 100
  });
}


// 🌠 METEOROS
const meteors = [];

function createMeteor() {
  meteors.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.3,
    length: Math.random() * 120 + 80,
    speed: Math.random() * 8 + 6,
    opacity: 1,
    flash: 1
  });
}

setInterval(() => {
  if (Math.random() < 0.6) {
    createMeteor();
  }
}, 2000);


// 🎨 LOOP PRINCIPAL
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // 🌫️ NEBULOSAS (FUNDO)
  for (let n of nebulae) {
    const gradient = ctx.createRadialGradient(
      n.x, n.y, 0,
      n.x, n.y, n.radius
    );

    gradient.addColorStop(0, `rgba(${n.color},${n.alpha})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
    ctx.fill();
  }


  // ⭐ ESTRELAS
  for (let star of stars) {

    star.twinkle += 0.02;
    const twinkleAlpha = star.alpha + Math.sin(star.twinkle) * 0.3;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${star.color},${twinkleAlpha})`;
    ctx.fill();
  }


  // 🌠 METEOROS
  for (let i = 0; i < meteors.length; i++) {
    const m = meteors[i];

    m.x += m.speed;
    m.y += m.speed;

    m.opacity -= 0.015;
    m.flash -= 0.05;

    // ✨ FLASH
    if (m.flash > 0) {
      ctx.beginPath();
      ctx.arc(m.x, m.y, 12 * m.flash, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${m.flash})`;
      ctx.fill();
    }

    // 🌠 CAUDA COM GRADIENTE
    const gradient = ctx.createLinearGradient(
      m.x,
      m.y,
      m.x - m.length,
      m.y - m.length
    );

    gradient.addColorStop(0, `rgba(255,255,255,${m.opacity})`);
    gradient.addColorStop(0.3, `rgba(180,220,255,${m.opacity * 0.6})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.length, m.y - m.length);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    if (m.opacity <= 0) {
      meteors.splice(i, 1);
      i--;
    }
  }


  requestAnimationFrame(draw);
}

draw();