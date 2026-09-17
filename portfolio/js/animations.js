/**
 * S. VISWA - ANIMATIONS & INTERACTIVE VISUAL EFFECTS
 * PCB Canvas traces, typing carousel, scroll reveals, and metric counters.
 */

document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initTypingAnimation();
  initPCBCanvas();
  initScrollReveals();
  initMetricCounters();
});

/* --- 1. INITIAL LOADING SCREEN DISMISSAL --- */
function initLoadingScreen() {
  const loader = document.getElementById("loadingScreen");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 600);
    }, 450);
  });

  // Fallback safety timeout if window.load took too long
  setTimeout(() => {
    if (document.body.contains(loader)) {
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 600);
    }
  }, 1800);
}

/* --- 2. HERO TYPING ROTATION ANIMATION --- */
function initTypingAnimation() {
  const typingElement = document.getElementById("typingText");
  if (!typingElement) return;

  const roles = [
    "Internet of Things (IoT) Student",
    "Embedded C Programmer",
    "IoT Developer",
    "ECE Student"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function typeTick() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(typeTick, typeSpeed);
  }

  typeTick();
}

/* --- 3. INTERACTIVE PCB CIRCUIT CANVAS --- */
function initPCBCanvas() {
  const canvas = document.getElementById("pcbCanvas");
  if (!canvas) return;

  // Check prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    generateCircuitGrid();
  });

  // Circuit trace nodes
  const nodes = [];
  const packets = [];
  const gridSize = 80;

  function generateCircuitGrid() {
    nodes.length = 0;
    packets.length = 0;

    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Only generate nodes sparsely for a clean aesthetic
        if (Math.random() > 0.65) {
          nodes.push({
            x: i * gridSize + (gridSize / 2),
            y: j * gridSize + (gridSize / 2),
            radius: Math.random() > 0.8 ? 3.5 : 2,
            isPad: Math.random() > 0.85
          });
        }
      }
    }

    // Connect some nodes with PCB traces
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = Math.abs(nodes[i].x - nodes[j].x);
        const dy = Math.abs(nodes[i].y - nodes[j].y);

        if ((dx === gridSize && dy === 0) || (dx === 0 && dy === gridSize) || (dx === gridSize && dy === gridSize)) {
          if (Math.random() > 0.5) {
            packets.push({
              x1: nodes[i].x,
              y1: nodes[i].y,
              x2: nodes[j].x,
              y2: nodes[j].y,
              progress: Math.random(),
              speed: 0.004 + Math.random() * 0.005,
              color: Math.random() > 0.5 ? "#10b981" : "#06b6d4"
            });
          }
        }
      }
    }
  }

  generateCircuitGrid();

  let animationFrameId;

  function renderCircuit() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const traceColor = isLight ? "rgba(5, 150, 105, 0.12)" : "rgba(16, 185, 129, 0.12)";
    const nodeColor = isLight ? "rgba(5, 150, 105, 0.25)" : "rgba(16, 185, 129, 0.25)";
    const padColor = isLight ? "#d97706" : "#f59e0b";

    // Draw static traces
    ctx.lineWidth = 1;
    ctx.strokeStyle = traceColor;

    for (let i = 0; i < packets.length; i++) {
      const p = packets[i];
      ctx.beginPath();
      ctx.moveTo(p.x1, p.y1);
      ctx.lineTo(p.x2, p.y2);
      ctx.stroke();
    }

    // Draw nodes and pads
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      if (n.isPad) {
        ctx.fillStyle = padColor;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = isLight ? "#ffffff" : "#070a13";
        ctx.stroke();
      } else {
        ctx.fillStyle = nodeColor;
        ctx.fill();
      }
    }

    // Draw traveling signal packets
    for (let i = 0; i < packets.length; i++) {
      const p = packets[i];
      p.progress += p.speed;
      if (p.progress > 1) {
        p.progress = 0;
      }

      const currX = p.x1 + (p.x2 - p.x1) * p.progress;
      const currY = p.y1 + (p.y2 - p.y1) * p.progress;

      ctx.beginPath();
      ctx.arc(currX, currY, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    animationFrameId = requestAnimationFrame(renderCircuit);
  }

  renderCircuit();
}

/* --- 4. SCROLL REVEAL OBSERVER --- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".pcb-card, .section-header, .stat-card");
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";
    el.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    observer.observe(el);
  });
}

/* --- 5. ACHIEVEMENT METRIC COUNTERS --- */
function initMetricCounters() {
  const metrics = document.querySelectorAll(".achieve-metric");
  if (!metrics.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transform = "scale(1.08)";
        setTimeout(() => {
          entry.target.style.transform = "scale(1)";
        }, 300);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  metrics.forEach((m) => {
    m.style.transition = "transform 0.3s ease-out";
    observer.observe(m);
  });
}
