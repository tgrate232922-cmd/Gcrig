/*!
 * GCRIG – main.js
 * Pure vanilla JS – no modules, no build tools
 */

(function () {
  'use strict';

  /* ============================================================
     CONSTANTS & SHARED STATE
  ============================================================ */
  var FALLBACK_RATES = {
    EUR: 0.9234, GBP: 0.7891, JPY: 149.82, CNY: 7.2341,
    AED: 3.6725, INR: 83.12,  CAD: 1.3612, AUD: 1.5234,
    CHF: 0.8923, NGN: 1590.5
  };

  var cachedRates = null; // shared USD-base rates cache

  /* ============================================================
     1. PAGE TRANSITION
  ============================================================ */
  function initPageTransition() {
    var overlay = document.createElement('div');
    overlay.className = 'page-transition active';
    document.body.appendChild(overlay);

    // Fade in (remove active)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.remove('active');
      });
    });

    // Intercept anchor clicks to .html pages
    document.addEventListener('click', function (e) {
      var anchor = e.target.closest('a');
      if (!anchor) return;
      var href = anchor.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('mailto:') ||
          href.startsWith('tel:') || href.startsWith('http') ||
          anchor.target === '_blank') return;
      if (!href.endsWith('.html') && href !== '/') return;
      if (anchor.hostname && anchor.hostname !== window.location.hostname) return;

      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(function () {
        window.location.href = href;
      }, 300);
    });
  }

  /* ============================================================
     2. NAVBAR
  ============================================================ */
  function initNavbar() {
    var navbar = document.querySelector('.navbar') ||
                 document.querySelector('nav') ||
                 document.querySelector('header');
    if (!navbar) return;

    // Scroll detection
    function onScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    var hamburger = navbar.querySelector('.hamburger') ||
                    navbar.querySelector('.navbar-toggle') ||
                    navbar.querySelector('[data-toggle="menu"]');
    var mobileMenu = document.getElementById('mobile-menu') ||
                     navbar.querySelector('.navbar-menu') ||
                     navbar.querySelector('.nav-menu');

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        hamburger.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on nav link click
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenu.classList.remove('active');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('active');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    // Active page highlighting
    var path = window.location.pathname.split('/').pop() || 'index.html';
    navbar.querySelectorAll('a').forEach(function (link) {
      var linkPath = (link.getAttribute('href') || '').split('/').pop();
      if (linkPath === path ||
          (path === '' && (linkPath === 'index.html' || linkPath === ''))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ============================================================
     3. SCROLL ANIMATIONS (IntersectionObserver)
  ============================================================ */
  function initScrollAnimations() {
    if (!window.IntersectionObserver) return;

    // Set up delay classes
    for (var d = 1; d <= 5; d++) {
      var style = document.getElementById('anim-delay-' + d);
      if (!style) {
        var s = document.createElement('style');
        s.id = 'anim-delay-' + d;
        s.textContent = '.delay-' + d + ' { transition-delay: ' + (d * 0.1) + 's !important; }';
        document.head.appendChild(s);
      }
    }

    var selector = '.fade-up, .slide-left, .slide-right, .scale-up';
    var elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     4. COUNTER ANIMATIONS
  ============================================================ */
  function initCounters() {
    if (!window.IntersectionObserver) return;

    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var decimals = parseInt(el.getAttribute('data-decimals'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1500;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var elapsed = timestamp - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = easeOutQuart(progress);
        var current = eased * target;
        el.textContent = current.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      }
      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }



  /* ============================================================
     7. TYPING EFFECT
  ============================================================ */
  function initTypingEffect() {
    var el = document.getElementById('typing-text');
    if (!el) return;

    var phrases = [
      'Investment Opportunities',
      'Global Cash Recycling',
      'Emerging Market Growth',
      'Sustainable Returns'
    ];

    // Create cursor
    var cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    el.insertAdjacentElement('afterend', cursor);

    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var timer;

    function tick() {
      var current = phrases[phraseIndex];
      if (isDeleting) {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 40);
      } else {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2500);
          return;
        }
        timer = setTimeout(tick, 80);
      }
    }

    tick();
  }

  /* ============================================================
     8. AI METRIC BARS ANIMATION
  ============================================================ */
  function initMetricBars() {
    var bars = document.querySelectorAll('.ai-metric-fill[data-width]');
    if (!bars.length || !window.IntersectionObserver) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var width = el.getAttribute('data-width');
          setTimeout(function () {
            el.style.width = width;
          }, 100);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    bars.forEach(function (bar) {
      bar.style.width = '0%';
      observer.observe(bar);
    });
  }

  /* ============================================================
     9. LIVE CURRENCY TICKER
  ============================================================ */
  function initCurrencyTicker() {
    var track = document.getElementById('ticker-track');
    if (!track) return;

    var PAIRS = [
      'USD/EUR','USD/GBP','USD/JPY','USD/CNY','USD/AED','USD/INR',
      'USD/CAD','USD/AUD','USD/CHF','EUR/GBP','GBP/JPY','USD/NGN'
    ];

    function getRateFromUSD(rates, from, to) {
      if (from === 'USD') return rates[to];
      if (to === 'USD') return 1 / rates[from];
      // Cross rate
      return rates[to] / rates[from];
    }

    function formatRate(rate, pair) {
      if (pair.includes('JPY')) return rate.toFixed(2);
      if (rate >= 100) return rate.toFixed(2);
      return rate.toFixed(4);
    }

    function buildTickerHTML(rates) {
      var items = PAIRS.map(function (pair) {
        var parts = pair.split('/');
        var from = parts[0];
        var to = parts[1];
        var rate = getRateFromUSD(rates, from, to);
        if (!rate || isNaN(rate)) return '';
        var up = Math.random() > 0.5;
        var changeClass = up ? 'ticker-up' : 'ticker-down';
        var arrow = up ? '▲' : '▼';
        var changeVal = (Math.random() * 0.5).toFixed(2) + '%';
        return '<span class="ticker-item">' +
               '<span class="ticker-pair">' + pair + '</span>' +
               '<span class="ticker-rate">' + formatRate(rate, pair) + '</span>' +
               '<span class="ticker-change ' + changeClass + '">' + arrow + ' ' + changeVal + '</span>' +
               '</span>';
      }).filter(Boolean);

      var html = items.join('');
      track.innerHTML = html + html; // duplicate for seamless loop
    }

    function fetchAndBuild() {
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.rates) {
            cachedRates = data.rates;
            buildTickerHTML(data.rates);
          } else {
            buildTickerHTML(FALLBACK_RATES);
          }
        })
        .catch(function () {
          buildTickerHTML(FALLBACK_RATES);
        });
    }

    fetchAndBuild();
    setInterval(fetchAndBuild, 60000);
  }

  /* ============================================================
     10. LIVE CURRENCY CONVERTER
  ============================================================ */
  function initCurrencyConverter() {
    var form = document.getElementById('currency-converter');
    if (!form) return;

    var amountEl   = document.getElementById('conv-amount');
    var fromEl     = document.getElementById('conv-from');
    var toEl       = document.getElementById('conv-to');
    var btn        = document.getElementById('conv-btn');
    var swapBtn    = document.getElementById('conv-swap');
    var resultCont = document.getElementById('conv-result-container');
    var resultEl   = document.getElementById('conv-result');
    var rateEl     = document.getElementById('conv-rate');
    var updatedEl  = document.getElementById('conv-updated');

    if (!amountEl || !fromEl || !toEl) return;

    function calcFromCache(amount, from, to, rates) {
      // rates are all USD-based
      var usdAmount;
      if (from === 'USD') {
        usdAmount = amount;
      } else {
        if (!rates[from]) return null;
        usdAmount = amount / rates[from];
      }
      if (to === 'USD') return usdAmount;
      if (!rates[to]) return null;
      return usdAmount * rates[to];
    }

    function formatResult(value) {
      if (value >= 1000) return value.toFixed(2);
      return value.toFixed(4);
    }

    function setLoading(loading) {
      if (!btn) return;
      btn.disabled = loading;
      btn.textContent = loading ? 'Converting…' : 'Convert';
    }

    function showResult(amount, from, to, result, rate, timestamp) {
      if (resultCont) resultCont.style.display = 'block';
      if (resultEl) resultEl.textContent = formatResult(result) + ' ' + to;
      if (rateEl) rateEl.textContent = '1 ' + from + ' = ' + formatResult(rate) + ' ' + to;
      if (updatedEl) {
        var d = timestamp ? new Date(timestamp * 1000) : new Date();
        updatedEl.textContent = 'Updated: ' + d.toLocaleString();
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var amount = parseFloat(amountEl.value);
      var from   = (fromEl.value || 'USD').toUpperCase();
      var to     = (toEl.value   || 'EUR').toUpperCase();
      if (isNaN(amount) || amount <= 0) return;

      setLoading(true);

      fetch('https://open.er-api.com/v6/latest/' + from)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          setLoading(false);
          if (data && data.rates && data.rates[to] != null) {
            var rate = data.rates[to];
            var result = amount * rate;
            showResult(amount, from, to, result, rate, data.time_last_update_unix);
          } else {
            // Use fallback via USD cross
            var fallbackResult = calcFromCache(amount, from, to, FALLBACK_RATES);
            if (fallbackResult != null) {
              var fallbackRate = calcFromCache(1, from, to, FALLBACK_RATES);
              showResult(amount, from, to, fallbackResult, fallbackRate, null);
            }
          }
        })
        .catch(function () {
          setLoading(false);
          var result = calcFromCache(amount, from, to, FALLBACK_RATES);
          if (result != null) {
            var rate = calcFromCache(1, from, to, FALLBACK_RATES);
            showResult(amount, from, to, result, rate, null);
          }
        });
    });

    if (swapBtn) {
      swapBtn.addEventListener('click', function () {
        var tmp = fromEl.value;
        fromEl.value = toEl.value;
        toEl.value = tmp;
      });
    }
  }

  /* ============================================================
     11. CURRENCY CHARTS (Chart.js)
  ============================================================ */
  function initCurrencyCharts() {
    if (typeof window.Chart === 'undefined') return;

    Chart.defaults.color = '#B0B0CC';
    Chart.defaults.borderColor = 'rgba(123,47,242,0.15)';
    Chart.defaults.font.family = 'Inter, sans-serif';

    var chartConfigs = [
      { id: 'chart-eurusd', currency: 'EUR', color: '#3b82f6', rateId: 'chart-rate-eur' },
      { id: 'chart-gbpusd', currency: 'GBP', color: '#8b5cf6', rateId: 'chart-rate-gbp' },
      { id: 'chart-jpyusd', currency: 'JPY', color: '#00C6FB', rateId: 'chart-rate-jpy' },
      { id: 'chart-cnyusd', currency: 'CNY', color: '#B881FF', rateId: 'chart-rate-cny' }
    ];

    // Check if any canvas exists
    var anyCanvas = chartConfigs.some(function (c) {
      return document.getElementById(c.id);
    });
    if (!anyCanvas) return;

    function generateMockData(base, count) {
      var data = [];
      var v = base;
      for (var i = 0; i < count; i++) {
        v += (Math.random() - 0.5) * base * 0.008;
        v = Math.max(base * 0.85, Math.min(base * 1.15, v));
        data.push(parseFloat(v.toFixed(4)));
      }
      return data;
    }

    function generateLabels(count) {
      var labels = [];
      var start = new Date('2024-01-01');
      for (var i = 0; i < count; i++) {
        var d = new Date(start);
        d.setDate(d.getDate() + i);
        labels.push(d.toISOString().slice(0, 10));
      }
      return labels;
    }

    function createGradient(ctx, color) {
      var gradient = ctx.createLinearGradient(0, 0, 0, 300);
      var rgb = color === '#3b82f6' ? '59,130,246' :
                color === '#8b5cf6' ? '139,92,246' :
                color === '#00C6FB' ? '0,198,251'  : '184,129,255';
      gradient.addColorStop(0, 'rgba(' + rgb + ',0.4)');
      gradient.addColorStop(1, 'rgba(' + rgb + ',0)');
      return gradient;
    }

    function buildChart(config, labels, values) {
      var canvas = document.getElementById(config.id);
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var gradient = createGradient(ctx, config.color);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            borderColor: config.color,
            borderWidth: 2,
            backgroundColor: gradient,
            fill: true,
            pointRadius: 0,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15,12,41,0.95)',
              titleColor: '#B0B0CC',
              bodyColor: '#fff',
              borderColor: 'rgba(123,47,242,0.3)',
              borderWidth: 1,
              padding: 10
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(123,47,242,0.08)', drawBorder: false },
              ticks: {
                maxTicksLimit: 6,
                color: '#B0B0CC',
                font: { size: 11 }
              }
            },
            y: {
              grid: { color: 'rgba(123,47,242,0.08)', drawBorder: false },
              ticks: {
                color: '#B0B0CC',
                font: { size: 11 }
              }
            }
          }
        }
      });
    }

    // Fetch historical data
    try {
      fetch('https://api.frankfurter.app/2024-01-01..2024-12-31?from=USD&to=EUR,GBP,JPY,CNY')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || !data.rates) throw new Error('no data');
          var dates = Object.keys(data.rates).sort();
          var labels = dates;
          var EUR = dates.map(function (d) { return data.rates[d].EUR || null; }).filter(Boolean);
          var GBP = dates.map(function (d) { return data.rates[d].GBP || null; }).filter(Boolean);
          var JPY = dates.map(function (d) { return data.rates[d].JPY || null; }).filter(Boolean);
          var CNY = dates.map(function (d) { return data.rates[d].CNY || null; }).filter(Boolean);

          buildChart(chartConfigs[0], labels, EUR);
          buildChart(chartConfigs[1], labels, GBP);
          buildChart(chartConfigs[2], labels, JPY);
          buildChart(chartConfigs[3], labels, CNY);
        })
        .catch(function () {
          var labels = generateLabels(365);
          buildChart(chartConfigs[0], labels, generateMockData(0.9234, 365));
          buildChart(chartConfigs[1], labels, generateMockData(0.7891, 365));
          buildChart(chartConfigs[2], labels, generateMockData(149.82, 365));
          buildChart(chartConfigs[3], labels, generateMockData(7.2341, 365));
        });
    } catch (err) {
      console.warn('Chart init error:', err);
    }

    // Update rate display elements
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.rates) return;
        var map = { 'chart-rate-eur': 'EUR', 'chart-rate-gbp': 'GBP',
                    'chart-rate-jpy': 'JPY', 'chart-rate-cny': 'CNY' };
        Object.keys(map).forEach(function (id) {
          var el = document.getElementById(id);
          if (el && data.rates[map[id]]) {
            var v = data.rates[map[id]];
            el.textContent = map[id] === 'JPY' ? v.toFixed(2) : v.toFixed(4);
          }
        });
      })
      .catch(function () {
        var fb = { 'chart-rate-eur': FALLBACK_RATES.EUR, 'chart-rate-gbp': FALLBACK_RATES.GBP,
                   'chart-rate-jpy': FALLBACK_RATES.JPY, 'chart-rate-cny': FALLBACK_RATES.CNY };
        Object.keys(fb).forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.textContent = id === 'chart-rate-jpy' ? fb[id].toFixed(2) : fb[id].toFixed(4);
        });
      });
  }

  /* ============================================================
     12. MARKET OVERVIEW
  ============================================================ */
  function initMarketOverview() {
    var ids = {
      'mkt-usdeur': { from: 'USD', to: 'EUR' },
      'mkt-usdgbp': { from: 'USD', to: 'GBP' },
      'mkt-usdjpy': { from: 'USD', to: 'JPY' },
      'mkt-eurgbp': { from: 'EUR', to: 'GBP' },
      'mkt-usdcny': { from: 'USD', to: 'CNY' },
      'mkt-gbpjpy': { from: 'GBP', to: 'JPY' }
    };

    var anyEl = Object.keys(ids).some(function (id) { return document.getElementById(id); });
    if (!anyEl) return;

    function getRate(rates, from, to) {
      if (from === 'USD') return rates[to];
      if (to === 'USD') return 1 / rates[from];
      return rates[to] / rates[from];
    }

    function formatMktRate(rate, to) {
      if (to === 'JPY') return rate.toFixed(2);
      return rate.toFixed(4);
    }

    function flashEl(el, up) {
      var cls = up ? 'flash-up' : 'flash-down';
      el.classList.add(cls);
      setTimeout(function () { el.classList.remove(cls); }, 800);
    }

    function updateMarket(rates) {
      Object.keys(ids).forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var pair = ids[id];
        var rate = getRate(rates, pair.from, pair.to);
        if (!rate || isNaN(rate)) return;
        var formatted = formatMktRate(rate, pair.to);
        var prev = el.textContent;
        el.textContent = formatted;
        if (prev && prev !== formatted && prev !== '--') {
          flashEl(el, parseFloat(formatted) > parseFloat(prev));
        }
      });
    }

    function fetchMarket() {
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.rates) {
            cachedRates = data.rates;
            updateMarket(data.rates);
          } else {
            updateMarket(FALLBACK_RATES);
          }
        })
        .catch(function () {
          updateMarket(FALLBACK_RATES);
        });
    }

    fetchMarket();
    setInterval(fetchMarket, 60000);
  }

  /* ============================================================
     13. 3D CARD TILT
  ============================================================ */
  function initCardTilt() {
    var cards = document.querySelectorAll('.tilt-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = (e.clientX - cx) / (rect.width / 2);
        var dy = (e.clientY - cy) / (rect.height / 2);
        var maxDeg = 10;
        var rotX = -dy * maxDeg;
        var rotY = dx * maxDeg;
        card.style.transform = 'perspective(1000px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale3d(1.02,1.02,1.02)';
        card.style.transition = 'transform 0.05s linear';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        card.style.transition = 'transform 0.4s ease';
      });
    });
  }

  /* ============================================================
     14. MAGNETIC BUTTON EFFECT
  ============================================================ */
  function initMagneticButtons() {
    var btns = document.querySelectorAll('.magnetic-btn');
    if (!btns.length) return;

    btns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = (e.clientX - cx) / (rect.width / 2);
        var dy = (e.clientY - cy) / (rect.height / 2);
        var maxOffset = 8;
        btn.style.transform = 'translate(' + (dx * maxOffset) + 'px, ' + (dy * maxOffset) + 'px)';
        btn.style.transition = 'transform 0.1s linear';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0,0)';
        btn.style.transition = 'transform 0.3s ease';
      });
    });
  }

  /* ============================================================
     15. PARALLAX SCROLLING
  ============================================================ */
  function initParallax() {
    var els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;

    var ticking = false;

    function updateParallax() {
      var scrollY = window.scrollY;
      els.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     16. CONFETTI ON FORM SUBMIT
  ============================================================ */
  function initConfetti() {
    var CONFETTI_COLORS = ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ec4899'];

    function launchConfetti() {
      var style = document.createElement('style');
      style.textContent = [
        '@keyframes confetti-fall {',
        '  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }',
        '  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }',
        '}',
        '.confetti-particle {',
        '  position: fixed; top: 0; pointer-events: none; z-index: 99999;',
        '  border-radius: 2px;',
        '}'
      ].join('\n');
      document.head.appendChild(style);

      var frag = document.createDocumentFragment();
      for (var i = 0; i < 80; i++) {
        var p = document.createElement('div');
        p.className = 'confetti-particle';
        var size = 6 + Math.random() * 6;
        var duration = 1.5 + Math.random() * 1.5;
        var delay = Math.random();
        p.style.cssText = [
          'left:' + (Math.random() * 100) + 'vw',
          'width:' + size + 'px',
          'height:' + size + 'px',
          'background:' + CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          'transform:rotate(' + (Math.random() * 360) + 'deg)',
          'animation:confetti-fall ' + duration + 's ' + delay + 's ease-in forwards'
        ].join(';');
        frag.appendChild(p);
      }
      document.body.appendChild(frag);
      setTimeout(function () {
        document.querySelectorAll('.confetti-particle').forEach(function (p) {
          p.remove();
        });
        style.remove();
      }, 4000);
    }

    // Contact forms
    document.querySelectorAll('.contact-form').forEach(function (form) {
      form.addEventListener('submit', function () {
        setTimeout(launchConfetti, 100);
      });
    });

    // Currency converter success (patched via custom event)
    document.addEventListener('converter-success', launchConfetti);
  }

  /* ============================================================
     17. SCROLL TO TOP BUTTON
  ============================================================ */
  function initScrollToTop() {
    var btn = document.createElement('button');
    btn.id = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '&#8679;';
    btn.style.cssText = [
      'position:fixed', 'bottom:2rem', 'right:2rem',
      'width:48px', 'height:48px', 'border-radius:50%',
      'background:#0f172a',
      'color:#fff', 'border:none', 'cursor:pointer',
      'font-size:1.4rem', 'line-height:1', 'z-index:9000',
      'box-shadow:0 4px 20px rgba(15,23,42,0.15)',
      'opacity:0', 'pointer-events:none',
      'transition:opacity 0.3s ease, transform 0.3s ease',
      'display:flex', 'align-items:center', 'justify-content:center'
    ].join(';');
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      } else {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseenter', function () {
      btn.style.transform = 'scale(1.1)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'scale(1)';
    });
  }

  /* ============================================================
     18. SMOOTH SECTION DETECTION
  ============================================================ */
  function initSectionDetection() {
    if (!window.IntersectionObserver) return;

    var sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    var navLinks = document.querySelectorAll('.navbar a[href], nav a[href]');
    if (!navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          var href = link.getAttribute('href') || '';
          var isActive = href === '#' + id || href.endsWith('#' + id);
          link.classList.toggle('section-active', isActive);
        });
      });
    }, { threshold: 0.4 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ============================================================
     19. INITIALIZE ALL
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    try { initPageTransition(); }   catch (e) { console.warn('PageTransition:', e); }
    try { initNavbar(); }           catch (e) { console.warn('Navbar:', e); }
    try { initScrollAnimations(); } catch (e) { console.warn('ScrollAnims:', e); }
    try { initCounters(); }         catch (e) { console.warn('Counters:', e); }
    try { initTypingEffect(); }     catch (e) { console.warn('Typing:', e); }
    try { initMetricBars(); }       catch (e) { console.warn('MetricBars:', e); }
    try { initCurrencyTicker(); }   catch (e) { console.warn('Ticker:', e); }
    try { initCurrencyConverter(); }catch (e) { console.warn('Converter:', e); }
    try { initCurrencyCharts(); }   catch (e) { console.warn('Charts:', e); }
    try { initMarketOverview(); }   catch (e) { console.warn('Market:', e); }
    try { initCardTilt(); }         catch (e) { console.warn('CardTilt:', e); }
    try { initMagneticButtons(); }  catch (e) { console.warn('MagneticBtns:', e); }
    try { initParallax(); }         catch (e) { console.warn('Parallax:', e); }
    try { initConfetti(); }         catch (e) { console.warn('Confetti:', e); }
    try { initScrollToTop(); }      catch (e) { console.warn('ScrollTop:', e); }
    try { initSectionDetection(); } catch (e) { console.warn('SectionDetect:', e); }
  });

}());
