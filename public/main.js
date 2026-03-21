'use strict';

/* ── LOADER ─────────────────────────────────── */
(function initLoader() {
  const fill   = document.getElementById('loader-fill');
  const loader = document.getElementById('loader');
  if(!fill || !loader) return;
  let progress = 0;

  const interval = setInterval(() => {
    // Fast start, slow finish
    const increment = progress < 60 ? 8 : progress < 85 ? 3 : 1;
    progress = Math.min(progress + increment, 95);
    fill.style.width = progress + '%';
  }, 80);

  window.addEventListener('load', () => {
    clearInterval(interval);
    fill.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 400);
  });

  // Fallback — hide after 3s regardless
  setTimeout(() => {
    clearInterval(interval);
    fill.style.width = '100%';
    loader.classList.add('hidden');
  }, 3000);
})();

/* ── STARSCAPE ───────────────────────────────── */
(function initStarscape() {
  const canvas = document.getElementById('starscape');
  if(!canvas) return;
  const ctx    = canvas.getContext('2d');
  const STAR_COUNT = 180;
  let   stars  = [];
  let   W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x:           Math.random() * W,
      y:           Math.random() * H,
      r:           Math.random() * 1.2 + 0.3,
      opacity:     Math.random() * 0.7 + 0.1,
      twinkleSpd:  Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      driftX:      (Math.random() - 0.5) * 0.08,
      driftY:      (Math.random() - 0.5) * 0.06,
    }));
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    for (const s of stars) {
      s.x = (s.x + s.driftX + W) % W;
      s.y = (s.y + s.driftY + H) % H;

      const alpha = s.opacity * (0.5 + 0.5 * Math.sin(frame * s.twinkleSpd + s.twinklePhase));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  resize();
  createStars();
  animate();
  window.addEventListener('resize', () => { resize(); createStars(); });
})();

/* ── SCROLL PROGRESS BAR ─────────────────────── */
const progressBar = document.getElementById('scroll-progress');
function updateScrollProgress() {
  if(!progressBar) return;
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}

/* ── NAVBAR PILL TRANSFORM ───────────────────── */
const navbar = document.getElementById('navbar');
function updateNavbar() {
  if(!navbar) return;
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/* ── SCROLL REVEAL ───────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── COUNT-UP ANIMATION ──────────────────────── */
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed  = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const value    = Math.round(easeOutExpo(progress) * target);

    el.textContent = value + suffix;
    el.classList.add('counting');

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + suffix;
      el.classList.remove('counting');
    }
  }

  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => animateCount(e.target), i * 200);
        statsObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.stat-number[data-target]').forEach(el => statsObserver.observe(el));

/* ── UNIFIED SCROLL LISTENER ─────────────────── */
window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateNavbar();
}, { passive: true });

// Fire first tick
updateScrollProgress();
updateNavbar();

/* ── HAMBURGER MENU ──────────────────────────── */
const hamburger = document.getElementById('hamburger');
if(hamburger) {
  const navLinks  = navbar.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(6,10,18,0.95)';
    navLinks.style.padding = '1.5rem';
    navLinks.style.backdropFilter = 'blur(20px)';
    hamburger.setAttribute('aria-expanded', !isOpen);
  });
}

/* ── TYPEWRITER ──────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'Sites profissionais que atraem clientes e geram resultados reais.',
    'Identidade visual estratégica que posiciona sua marca acima da concorrência.',
    'Do logo ao site: criação completa com a velocidade e precisão da IA.',
    'Design moderno que transforma visitantes em clientes fiéis.',
    'Mais de 500 projetos entregues. O próximo pode ser o seu.',
    'Somos a agência digital que une criatividade humana e inteligência artificial.',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  function tick() {
    if (paused) return;
    const current = phrases[phraseIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { deleting = true; paused = false; tick(); }, 2400);
        return;
      }
      setTimeout(tick, 38);
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
      setTimeout(tick, 18);
    }
  }

  setTimeout(tick, 800);
})();

/* ── HERO NEURAL PARTICLES ───────────────────── */
(function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = document.getElementById('hero');

  let W, H, mouse = { x: -9999, y: -9999 };
  const NODES = [];
  const MAX_NODES = 55;
  const CONNECT_DIST = 130;

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  function spawnNode(x, y) {
    NODES.push({
      x, y,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(Math.random() * 0.5 + 0.2),
      life: 1,
      decay: Math.random() * 0.004 + 0.002,
      r: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '0,229,255' : '255,30,205',
    });
  }

  function seedNodes() {
    for (let i = 0; i < 30; i++) {
        spawnNode(Math.random() * W, Math.random() * H);
        NODES[NODES.length - 1].life = Math.random();
    }
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    if (frame % 4 === 0 && mouse.x > 0 && NODES.length < MAX_NODES) {
      spawnNode(
        mouse.x + (Math.random() - 0.5) * 30,
        mouse.y + (Math.random() - 0.5) * 30
      );
    }

    if (frame % 40 === 0 && NODES.length < MAX_NODES) {
        spawnNode(Math.random() * W, Math.random() * H * 0.8 + H * 0.1);
    }

    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        const a = NODES[i], b = NODES[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * Math.min(a.life, b.life) * 0.35;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    for (let i = NODES.length - 1; i >= 0; i--) {
      const n = NODES[i];
      n.x    += n.vx;
      n.y    += n.vy;
      n.life -= n.decay;

      if (n.life <= 0) { NODES.splice(i, 1); continue; }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},${n.life * 0.8})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},${n.life * 0.08})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  resize();
  seedNodes();
  draw();
  window.addEventListener('resize', resize);
})();

/* ── AI CHAT WIDGET ──────────────────────────── */
(function initAIChat() {
  const toggleBtn  = document.getElementById('ai-chat-toggle');
  const panel      = document.getElementById('ai-chat-panel');
  const closeBtn   = document.getElementById('chat-close-btn');
  const messagesEl = document.getElementById('chat-messages');
  const inputEl    = document.getElementById('chat-input');
  const sendBtn    = document.getElementById('chat-send-btn');
  if(!toggleBtn || !panel) return;

  let isOpen = false;
  let botTyping = false;

  const DEFAULT_REPLIES = [
    'Boa pergunta! Para te dar a resposta mais completa, recomendo enviar uma proposta pelo formulário — nossa equipe entra em contato em até 48h.',
    'Essa é uma das especialidades que mais gostamos de explorar! Que tal começarmos no WhatsApp?',
    'Posso te direcionar melhor se você detalhar um pouco mais a proposta formalmente.',
  ];
  let defaultIdx = 0;

  function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + type;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'chat-typing';
    t.id = 'chat-typing-indicator';
    t.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(t);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('chat-typing-indicator');
    if (t) t.remove();
  }

  function sendMessage() {
    const text = inputEl.value.trim();
    if (!text || botTyping) return;
    inputEl.value = '';
    addMessage(text, 'user');
    botTyping = true;
    showTyping();
    const delay = 900 + Math.random() * 700;
    setTimeout(() => {
      removeTyping();
      addMessage(DEFAULT_REPLIES[defaultIdx++ % DEFAULT_REPLIES.length], 'bot');
      botTyping = false;
    }, delay);
  }

  function openChat() {
    isOpen = true;
    panel.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    inputEl.focus();
    if (messagesEl.children.length === 0) {
      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          removeTyping();
          addMessage('Olá! Sou o assistente de IA primário. Posso te ajudar com informações sobre UX com IA, design, branding e desenvolvimento. O que você quer saber? 🧠', 'bot');
        }, 1000);
      }, 300);
    }
  }

  function closeChat() {
    isOpen = false;
    panel.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);
  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
})();

/* ── AUTOMATION WIDGET ───────────────────────── */
(function initAutomationWidget() {
  const btn = document.getElementById('simulate-lead-btn');
  if (!btn) return;
  
  const nodes = [
    document.getElementById('node-1'),
    document.getElementById('node-2'),
    document.getElementById('node-3')
  ];
  const lines = document.querySelectorAll('.flow-line');
  
  let isSimulating = false;

  btn.addEventListener('click', () => {
    if(isSimulating) return;
    isSimulating = true;
    btn.textContent = 'Processando...';
    btn.style.opacity = '0.7';

    nodes.forEach(n => { n.classList.remove('active', 'done'); });
    lines.forEach(l => l.classList.remove('active'));

    setTimeout(() => { nodes[0].classList.add('active'); }, 300);
    setTimeout(() => {
      nodes[0].classList.replace('active', 'done');
      lines[0].classList.add('active');
      nodes[1].classList.add('active');
    }, 1500);
    setTimeout(() => {
      nodes[1].classList.replace('active', 'done');
      lines[1].classList.add('active');
      nodes[2].classList.add('active');
    }, 3000);
    setTimeout(() => {
      nodes[2].classList.replace('active', 'done');
      btn.textContent = 'Fluxo Concluído! Reiniciar';
      btn.style.opacity = '1';
      isSimulating = false;
    }, 4500);
  });
})();
