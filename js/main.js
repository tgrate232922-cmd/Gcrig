/* ===================================================
   GCRIG - Global Credit Rating & Intelligence Group
   Main JavaScript
   =================================================== */

/* =====================
   NAVBAR
   ===================== */

(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!navbar) return;

  // Scroll effect
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active link highlighting
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* =====================
   SCROLL ANIMATIONS
   ===================== */

(function initScrollAnimations() {
  var elements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
  if (!elements.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* =====================
   ANIMATED STAT COUNTERS
   ===================== */

(function initStatCounters() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = el.getAttribute('data-decimals') || 0;
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;
      el.textContent = prefix + current.toFixed(parseInt(decimals)) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toFixed(parseInt(decimals)) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
})();

/* =====================
   CANVAS PARTICLE NETWORK
   ===================== */

function initParticleCanvas(canvasId) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: null, y: null };
  var animFrame;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '200,168,93' : '23,195,178';
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color + ',' + this.alpha + ')';
    ctx.fill();
  };

  function connectParticles() {
    var maxDist = 120;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          var alpha = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(23,195,178,' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      // Mouse interaction
      if (mouse.x !== null) {
        var mdx = particles[i].x - mouse.x;
        var mdy = particles[i].y - mouse.y;
        var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          var malpha = (1 - mdist / 150) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = 'rgba(200,168,93,' + malpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (p) {
      p.update();
      p.draw();
    });
    connectParticles();
    animFrame = requestAnimationFrame(animate);
  }

  function init() {
    resize();
    particles = [];
    var count = Math.floor((canvas.width * canvas.height) / 8000);
    count = Math.max(40, Math.min(count, 120));
    for (var i = 0; i < count; i++) {
      particles.push(new Particle());
    }
    cancelAnimationFrame(animFrame);
    animate();
  }

  canvas.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', init);
  init();
}

// Initialize on home page
document.addEventListener('DOMContentLoaded', function () {
  initParticleCanvas('hero-canvas');
});

/* =====================
   WORLD MAP PINGS
   ===================== */

(function initWorldMapPings() {
  var nodes = document.querySelectorAll('.map-node');
  if (!nodes.length) return;

  nodes.forEach(function (node, i) {
    var delay = i * 300;
    var pulseCircles = node.querySelectorAll('.pulse-outer');
    pulseCircles.forEach(function (circle) {
      circle.style.animationDelay = delay + 'ms';
    });

    // Tooltip on hover
    var tooltip = node.querySelector('.map-tooltip');
    if (tooltip) {
      node.addEventListener('mouseenter', function () {
        tooltip.style.display = 'block';
      });
      node.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
      });
    }
  });
})();

/* =====================
   CONTACT FORM VALIDATION
   ===================== */

(function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('error');
    if (error) {
      error.textContent = message;
      error.classList.add('visible');
    }
  }

  function clearError(fieldId) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (field) field.classList.remove('error');
    if (error) error.classList.remove('visible');
  }

  function clearAllErrors() {
    form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function (f) {
      f.classList.remove('error');
    });
    form.querySelectorAll('.form-error').forEach(function (e) {
      e.classList.remove('visible');
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    clearAllErrors();
    var isValid = true;

    var name = document.getElementById('contact-name');
    if (name && name.value.trim().length < 2) {
      showError('contact-name', 'Please enter your full name (at least 2 characters).');
      isValid = false;
    }

    var email = document.getElementById('contact-email');
    if (email) {
      if (!email.value.trim()) {
        showError('contact-email', 'Please enter your email address.');
        isValid = false;
      } else if (!validateEmail(email.value.trim())) {
        showError('contact-email', 'Please enter a valid email address.');
        isValid = false;
      }
    }

    var org = document.getElementById('contact-org');
    if (org && org.value.trim().length < 2) {
      showError('contact-org', 'Please enter your organization name.');
      isValid = false;
    }

    var message = document.getElementById('contact-message');
    if (message && message.value.trim().length < 10) {
      showError('contact-message', 'Please enter a message (at least 10 characters).');
      isValid = false;
    }

    return isValid;
  }

  // Real-time validation
  ['contact-name', 'contact-email', 'contact-org', 'contact-message'].forEach(function (id) {
    var field = document.getElementById(id);
    if (field) {
      field.addEventListener('input', function () {
        clearError(id);
      });
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    var btn = form.querySelector('.form-submit');
    var formBody = form.querySelector('.form-fields');
    var success = document.getElementById('form-success');

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }

    // Simulate submission delay
    setTimeout(function () {
      if (formBody) formBody.style.display = 'none';
      if (success) success.classList.add('visible');
    }, 1200);
  });
})();

/* =====================
   AI METRIC BARS ANIMATION
   ===================== */

(function initMetricBars() {
  var fills = document.querySelectorAll('.ai-metric-fill');
  if (!fills.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var width = el.getAttribute('data-width') || '0%';
          el.style.width = width;
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach(function (fill) {
    fill.style.width = '0%';
    observer.observe(fill);
  });
})();

/* =====================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ===================== */

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 90;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});

/* =====================
   REVENUE PERCENTAGE BARS
   ===================== */

(function initRevenueBars() {
  var fills = document.querySelectorAll('.revenue-pct-fill');
  if (!fills.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var pct = el.getAttribute('data-pct') || '0%';
          el.style.transition = 'width 1.5s ease';
          el.style.width = '0%';
          setTimeout(function () {
            el.style.width = pct;
          }, 100);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach(function (fill) {
    fill.style.width = '0%';
    observer.observe(fill);
  });
})();
