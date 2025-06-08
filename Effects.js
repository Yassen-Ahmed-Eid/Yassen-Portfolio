const canvas = document.getElementById("circle-visualizer");
const ctx = canvas.getContext("2d");

const size = 450;
canvas.width = size;
canvas.height = size;
const centerX = size / 2;
const centerY = size / 2;

const imageRadius = 225;
const glowStartRadius = imageRadius + 10;
const bars = 64;

canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "2";

const frame = document.getElementById("circle-frame");
frame.style.position = "relative";
frame.appendChild(canvas);

let angle = 0;

function animate() {
  ctx.clearRect(0, 0, size, size);
  const step = (Math.PI * 2) / bars;

  for (let i = 0; i < bars; i++) {
    const a = angle + i * step;

    const xStart = centerX + Math.cos(a) * glowStartRadius;
    const yStart = centerY + Math.sin(a) * glowStartRadius;

    const len = 20 + Math.sin(a * 3 + angle * 4) * 30;

    const xEnd = centerX + Math.cos(a) * (glowStartRadius + len);
    const yEnd = centerY + Math.sin(a) * (glowStartRadius + len);

    const gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
    gradient.addColorStop(0, "rgba(174,112,255, 0.8)");
    gradient.addColorStop(1, "rgba(0,234,255, 0)");

    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.shadowColor = "rgba(174,112,255, 0.7)";
    ctx.shadowBlur = 15;
    ctx.stroke();
  }

  angle += 0.01;
  requestAnimationFrame(animate);
}

animate();
/**************************************/
document.addEventListener("DOMContentLoaded", function () {
  const musicToggle = document.getElementById("music-toggle");
  const backgroundMusic = document.getElementById("background-music");
  let isPlaying = false;

  musicToggle.addEventListener("click", function (e) {
    e.preventDefault();

    if (isPlaying) {
      backgroundMusic.pause();
      isPlaying = false;
      musicToggle.querySelector("i").style.color = "#fff";
    } else {
      backgroundMusic.play().then(() => {
        isPlaying = true;
        musicToggle.querySelector("i").style.color = "#ae70ff";
      }).catch((err) => {
        console.warn("المتصفح منع تشغيل الصوت التلقائي، حاول تضغط تاني.");
      });
    }
  });
});
