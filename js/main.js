/*!
 * GCRIG – main.js
 * Global Cash Recycle Investment Group
 * Pure vanilla JS — no modules, no build tools
 * ES6 compatible, IIFE pattern
 */
(function () {
  'use strict';

  /* =====================================================
     SECTION 1: PAGE TRANSITION
     Fades out the overlay on load; fades in on link click
     ===================================================== */
  function initPageTransition() {
    var overlay = document.querySelector('.page-transition');
    if (!overlay) return;

    // Already animated out via CSS keyframes — just remove from flow
    overlay.addEventListener('animationend', function () {
      overlay.style.display = 'none';
    });

    // On internal link click — fade in briefly before navigating
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      // Only handle same-origin, non-anchor, non-JS links
      if (!href || href.startsWith('#') || href.startsWith('mailto:')
          || href.startsWith('tel:') || href.startsWith('javascript:')
          || link.target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey) return;
      // External URLs
      try {
        var url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
      } catch (err) {
        return;
      }
      e.preventDefault();
      overlay.style.display = 'block';
      overlay.style.opacity = '0';
      overlay.style.animation = 'none';
      // Force reflow
      overlay.offsetHeight; // eslint-disable-line no-unused-expressions
      overlay.style.transition = 'opacity 0.3s ease';
      overlay.style.opacity = '1';
      setTimeout(function () {
        window.location.href = href;
      }, 320);
    });
  }

  /* =====================================================
     SECTION 2: NAVBAR SCROLL
     Adds/removes "scrolled" class after 80px scroll
     ===================================================== */
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  /* =====================================================
     SECTION 3: MOBILE MENU
     Hamburger toggles active class on menu + backdrop
     ===================================================== */
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    // Create or find backdrop
    var backdrop = document.querySelector('.mobile-menu-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-menu-backdrop';
      document.body.appendChild(backdrop);
    }

    function openMenu() {
      hamburger.classList.add('active');
      mobileMenu.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    backdrop.addEventListener('click', closeMenu);

    // Close on nav link click
    mobileMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  /* =====================================================
     SECTION 4: SCROLL REVEAL ANIMATIONS
     IntersectionObserver on .reveal, .fade-up, .slide-left, .slide-right
     ===================================================== */
  function initScrollAnimations() {
    var selectors = '.reveal, .fade-up, .slide-left, .slide-right';
    var elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all immediately
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* =====================================================
     SECTION 5: COUNTER ANIMATIONS
     Animates elements with data-count attribute
     Also handles .stat-card-number with text content
     ===================================================== */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count], .stat-card-number');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) return;

    function animateCount(el) {
      var raw = el.getAttribute('data-count') || el.textContent.replace(/[^0-9.]/g, '') || '0';
      var target = parseFloat(raw);
      if (isNaN(target)) return;

      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

      // Try to detect suffix from content
      if (!suffix) {
        var content = el.textContent.trim();
        var numPart = content.replace(/[^0-9.]/g, '');
        if (numPart && content !== numPart) {
          suffix = content.slice(content.indexOf(numPart) + numPart.length);
          prefix = content.slice(0, content.indexOf(numPart));
        }
      }

      var duration = 1800;
      var start = performance.now();
      var startVal = 0;

      function step(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        var ease = 1 - Math.pow(1 - progress, 3);
        var current = startVal + (target - startVal) * ease;

        el.textContent = prefix + current.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(step);
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (el) { obs.observe(el); });
  }

  /* =====================================================
     SECTION 6: TYPING EFFECT
     Cycles words in element #typing-text
     ===================================================== */
  function initTypingEffect() {
    var el = document.getElementById('typing-text');
    if (!el) return;

    var words = el.getAttribute('data-words')
      ? el.getAttribute('data-words').split(',').map(function (w) { return w.trim(); })
      : ['Investments', 'Growth', 'Wealth', 'Returns', 'Futures'];

    var typingSpeed = 90;
    var deletingSpeed = 55;
    var pauseAfterType = 1800;
    var pauseAfterDelete = 400;
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function type() {
      var current = words[wordIndex];
      var display = isDeleting
        ? current.slice(0, charIndex - 1)
        : current.slice(0, charIndex + 1);

      el.textContent = display;
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      var delay = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && display === current) {
        delay = pauseAfterType;
        isDeleting = true;
      } else if (isDeleting && display === '') {
        isDeleting = false;
        charIndex = 0;
        wordIndex = (wordIndex + 1) % words.length;
        delay = pauseAfterDelete;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* =====================================================
     SECTION 7: AI METRIC BARS
     Animates .ai-metric-fill width from 0 → data-width on scroll
     ===================================================== */
  function initAIMetricBars() {
    var bars = document.querySelectorAll('.ai-metric-fill');
    if (!bars.length) return;

    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (bar) {
        bar.style.width = (bar.getAttribute('data-width') || '70') + '%';
      });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var w = entry.target.getAttribute('data-width') || '70';
          entry.target.style.width = w + '%';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (bar) {
      bar.style.width = '0%';
      obs.observe(bar);
    });
  }

  /* =====================================================
     SECTION 8: CURRENCY TICKER
     Fetches live rates; scrolls pairs in the ticker bar
     Falls back to static rates if API fails
     ===================================================== */
  var FALLBACK_RATES = {
    EUR: 0.9234, GBP: 0.7865, JPY: 149.45, CHF: 0.8821,
    AUD: 1.5234, CAD: 1.3612, CNY: 7.2415, HKD: 7.8234,
    SGD: 1.3421, NZD: 1.6123, SEK: 10.4523, NOK: 10.8765,
    DKK: 6.8945, ZAR: 18.6234, BRL: 4.9765, MXN: 17.2341,
    INR: 83.2156, KRW: 1325.45, AED: 3.6725, SAR: 3.7501
  };

  var liveRates = {};
  var previousRates = {};

  function buildTickerHTML(rates) {
    var pairs = Object.keys(rates);
    var html = '';
    pairs.forEach(function (pair) {
      var rate = rates[pair];
      var prev = previousRates[pair];
      var changeClass = '';
      var changeText = '';
      if (prev) {
        var diff = ((rate - prev) / prev) * 100;
        changeClass = diff >= 0 ? 'up' : 'down';
        changeText = (diff >= 0 ? '▲' : '▼') + ' ' + Math.abs(diff).toFixed(3) + '%';
      }
      html += '<span class="ticker-item">'
        + '<span class="ticker-pair">USD/' + pair + '</span>'
        + '<span class="ticker-rate">' + rate.toFixed(4) + '</span>'
        + (changeText ? '<span class="ticker-change ' + changeClass + '">' + changeText + '</span>' : '')
        + '</span>';
    });
    // Duplicate for seamless loop
    return html + html;
  }

  function updateTicker(rates) {
    var track = document.querySelector('.ticker-track');
    if (!track) return;
    track.innerHTML = buildTickerHTML(rates);
  }

  function fetchTicker() {
    var track = document.querySelector('.ticker-track');
    if (!track) return;

    // Build with fallback first
    updateTicker(FALLBACK_RATES);

    fetch('https://open.er-api.com/v6/latest/USD')
      .then(function (res) {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(function (data) {
        if (data && data.rates) {
          previousRates = Object.assign({}, liveRates);
          var keys = Object.keys(FALLBACK_RATES);
          keys.forEach(function (k) {
            if (data.rates[k]) liveRates[k] = data.rates[k];
          });
          if (Object.keys(liveRates).length) {
            updateTicker(liveRates);
          }
        }
      })
      .catch(function () {
        // Keep fallback already rendered
        liveRates = Object.assign({}, FALLBACK_RATES);
      });

    // Refresh every 60 seconds
    setInterval(function () {
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.rates) {
            previousRates = Object.assign({}, liveRates);
            var keys = Object.keys(FALLBACK_RATES);
            keys.forEach(function (k) {
              if (data.rates[k]) liveRates[k] = data.rates[k];
            });
            updateTicker(liveRates);
          }
        })
        .catch(function () {});
    }, 60000);
  }

  /* =====================================================
     SECTION 9: CURRENCY CONVERTER
     Form: #converter-form with from/to selects and amount input
     ===================================================== */
  var CURRENCY_LIST = [
    'USD','EUR','GBP','JPY','CHF','AUD','CAD','CNY','HKD',
    'SGD','NZD','SEK','NOK','DKK','ZAR','BRL','MXN','INR',
    'KRW','AED','SAR','NGN','KES','GHS','TZS','EGP','MAD'
  ];

  function buildCurrencyOptions(selected) {
    return CURRENCY_LIST.map(function (c) {
      return '<option value="' + c + '"' + (c === selected ? ' selected' : '') + '>' + c + '</option>';
    }).join('');
  }

  function getRate(from, to, rates) {
    if (from === 'USD') return rates[to] || null;
    if (to === 'USD') return rates[from] ? 1 / rates[from] : null;
    var toUSD = rates[from] ? 1 / rates[from] : null;
    var fromUSD = rates[to] || null;
    if (toUSD && fromUSD) return toUSD * fromUSD;
    return null;
  }

  function initConverter() {
    var form = document.getElementById('converter-form');
    if (!form) return;

    var fromSelect = document.getElementById('conv-from');
    var toSelect   = document.getElementById('conv-to');
    var amountInput = document.getElementById('conv-amount');
    var swapBtn    = document.getElementById('conv-swap');
    var resultBox  = document.getElementById('conv-result');

    // Populate dropdowns if present
    if (fromSelect) fromSelect.innerHTML = buildCurrencyOptions('USD');
    if (toSelect)   toSelect.innerHTML   = buildCurrencyOptions('EUR');

    function getRates() {
      return Object.keys(liveRates).length ? liveRates : FALLBACK_RATES;
    }

    function convert() {
      if (!fromSelect || !toSelect || !amountInput || !resultBox) return;
      var from   = fromSelect.value;
      var to     = toSelect.value;
      var amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        resultBox.style.display = 'none';
        return;
      }

      var rates = getRates();
      // Build a pseudo-rates map with USD as base
      var usdRates = Object.assign({ USD: 1 }, rates);
      var rate = getRate(from, to, usdRates);

      if (!rate) {
        resultBox.style.display = 'none';
        return;
      }

      var result = amount * rate;
      var mainEl    = resultBox.querySelector('.conv-result-main');
      var rateEl    = resultBox.querySelector('.conv-result-rate');
      var updatedEl = resultBox.querySelector('.conv-result-updated');

      if (mainEl) mainEl.textContent = result.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      }) + ' ' + to;
      if (rateEl) rateEl.textContent = '1 ' + from + ' = ' + rate.toFixed(6) + ' ' + to;
      if (updatedEl) {
        var now = new Date();
        updatedEl.textContent = 'Updated ' + now.toLocaleTimeString();
      }

      resultBox.style.display = 'block';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      convert();
    });

    if (swapBtn) {
      swapBtn.addEventListener('click', function () {
        var temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value   = temp;
        convert();
      });
    }

    if (amountInput) {
      amountInput.addEventListener('input', function () {
        if (amountInput.value) convert();
      });
    }
    if (fromSelect) fromSelect.addEventListener('change', convert);
    if (toSelect)   toSelect.addEventListener('change', convert);
  }

  /* =====================================================
     SECTION 10: CURRENCY CHARTS (Chart.js)
     Renders small line charts using Frankfurter historical API
     ===================================================== */
  var CHART_PAIRS = [
    { pair: 'EUR/USD', base: 'EUR', to: 'USD', canvasId: 'chart-eurusd' },
    { pair: 'GBP/USD', base: 'GBP', to: 'USD', canvasId: 'chart-gbpusd' },
    { pair: 'USD/JPY', base: 'USD', to: 'JPY', canvasId: 'chart-usdjpy' }
  ];

  function getLast30Days() {
    var dates = [];
    var now = new Date();
    for (var i = 29; i >= 0; i--) {
      var d = new Date(now);
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().slice(0, 10));
    }
    return dates;
  }

  function generateFallbackChartData(base, points) {
    // Generate realistic-looking sine-wave data
    var seed = base.charCodeAt(0) + base.charCodeAt(1);
    var data = [];
    var val = (seed % 50) * 0.02 + 0.9;
    for (var i = 0; i < points; i++) {
      val += (Math.sin(i * 0.4 + seed) * 0.003) + (Math.random() * 0.002 - 0.001);
      data.push(parseFloat(val.toFixed(5)));
    }
    return data;
  }

  function renderChart(canvasId, labels, data, pair, color) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    if (typeof Chart === 'undefined') return;

    var ctx = canvas.getContext('2d');
    var grad = ctx.createLinearGradient(0, 0, 0, 160);
    grad.addColorStop(0, color + '44');
    grad.addColorStop(1, color + '00');

    // Update display elements
    var card = canvas.closest('.chart-card');
    if (card) {
      var rateEl = card.querySelector('.chart-rate');
      var changeEl = card.querySelector('.chart-change');
      if (rateEl && data.length) {
        rateEl.textContent = data[data.length - 1].toFixed(4);
      }
      if (changeEl && data.length > 1) {
        var first = data[0], last = data[data.length - 1];
        var pct = ((last - first) / first) * 100;
        changeEl.textContent = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
        changeEl.className = 'chart-change ' + (pct >= 0 ? 'up' : 'down');
      }
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          borderColor: color,
          borderWidth: 2,
          backgroundColor: grad,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (ctx) {
                return pair + ': ' + ctx.parsed.y.toFixed(4);
              }
            }
          }
        },
        scales: {
          x: { display: false },
          y: {
            display: false,
            grace: '5%'
          }
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false }
      }
    });
  }

  function initCharts() {
    var hasCanvas = CHART_PAIRS.some(function (p) {
      return document.getElementById(p.canvasId);
    });
    if (!hasCanvas) return;
    if (typeof Chart === 'undefined') {
      // Chart.js not loaded yet — skip
      return;
    }

    var colors = ['#7B2FF2', '#00D4AA', '#F5B041'];
    var dates = getLast30Days();

    CHART_PAIRS.forEach(function (config, i) {
      var canvas = document.getElementById(config.canvasId);
      if (!canvas) return;

      // Fetch from Frankfurter API
      var startDate = dates[0];
      var endDate   = dates[dates.length - 1];
      var apiUrl = 'https://api.frankfurter.app/' + startDate + '..' + endDate
        + '?from=' + config.base + '&to=' + config.to;

      fetch(apiUrl)
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data.rates) throw new Error('No rate data');
          var dataPoints = [];
          var labels = [];
          Object.keys(data.rates).sort().forEach(function (date) {
            labels.push(date.slice(5)); // MM-DD
            dataPoints.push(data.rates[date][config.to]);
          });
          renderChart(config.canvasId, labels, dataPoints, config.pair, colors[i]);
        })
        .catch(function () {
          var fb = generateFallbackChartData(config.base, 30);
          var labels = dates.map(function (d) { return d.slice(5); });
          renderChart(config.canvasId, labels, fb, config.pair, colors[i]);
        });
    });
  }

  /* =====================================================
     SECTION 11: MARKET OVERVIEW
     Populates #market-grid with live rates + color coding
     ===================================================== */
  var MARKET_PAIRS = [
    { pair: 'EUR/USD', base: 'USD', quote: 'EUR' },
    { pair: 'GBP/USD', base: 'USD', quote: 'GBP' },
    { pair: 'USD/JPY', base: 'USD', quote: 'JPY' },
    { pair: 'USD/CHF', base: 'USD', quote: 'CHF' },
    { pair: 'AUD/USD', base: 'USD', quote: 'AUD' },
    { pair: 'USD/CAD', base: 'USD', quote: 'CAD' }
  ];

  var marketPrevRates = {};

  function buildMarketCard(pairConfig, rate, change) {
    var changeClass = change >= 0 ? 'rate-up' : 'rate-down';
    var changeSign  = change >= 0 ? '+' : '';
    return '<div class="market-card">'
      + '<div class="market-card-header">'
      + '<span class="market-pair">' + pairConfig.pair + '</span>'
      + '<span class="market-status">LIVE</span>'
      + '</div>'
      + '<div class="market-rate ' + changeClass + '">' + rate.toFixed(4) + '</div>'
      + '<div class="market-change ' + changeClass + '">'
      + changeSign + change.toFixed(3) + '%</div>'
      + '</div>';
  }

  function updateMarketGrid(rates) {
    var grid = document.getElementById('market-grid');
    if (!grid) return;

    var html = '';
    MARKET_PAIRS.forEach(function (config) {
      var rate = rates[config.quote];
      if (!rate) return;
      var prev = marketPrevRates[config.pair] || rate;
      var change = ((rate - prev) / prev) * 100;
      html += buildMarketCard(config, rate, change);
    });

    if (html) grid.innerHTML = html;
  }

  function initMarketOverview() {
    var grid = document.getElementById('market-grid');
    if (!grid) return;

    // Use already fetched live rates or fallback
    var rates = Object.keys(liveRates).length ? liveRates : FALLBACK_RATES;
    updateMarketGrid(rates);

    // Simulate small rate fluctuations every 5 seconds for demo
    setInterval(function () {
      var currentRates = Object.keys(liveRates).length ? liveRates : FALLBACK_RATES;
      marketPrevRates = {};
      MARKET_PAIRS.forEach(function (p) {
        marketPrevRates[p.pair] = currentRates[p.quote];
      });
      // Add tiny random fluctuation
      var simRates = Object.assign({}, currentRates);
      Object.keys(simRates).forEach(function (k) {
        simRates[k] = simRates[k] * (1 + (Math.random() * 0.0004 - 0.0002));
      });
      updateMarketGrid(simRates);
    }, 5000);
  }

  /* =====================================================
     SECTION 12: 3D CARD TILT
     .tilt-card elements get perspective tilt on mousemove
     ===================================================== */
  function initCardTilt() {
    var cards = document.querySelectorAll('.tilt-card');
    if (!cards.length) return;

    // Skip on touch devices
    if ('ontouchstart' in window) return;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var midX = rect.width / 2;
        var midY = rect.height / 2;
        var rotateX = ((y - midY) / midY) * -8;
        var rotateY = ((x - midX) / midX) * 8;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
        card.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.4s ease';
      });
    });
  }

  /* =====================================================
     SECTION 13: MAGNETIC BUTTONS
     .magnetic-btn elements subtly follow cursor
     ===================================================== */
  function initMagneticButtons() {
    var btns = document.querySelectorAll('.magnetic-btn');
    if (!btns.length) return;
    if ('ontouchstart' in window) return;

    btns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
        btn.style.transition = 'transform 0.1s ease';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s ease';
      });
    });
  }

  /* =====================================================
     SECTION 14: PARALLAX
     [data-parallax] elements shift on scroll
     ===================================================== */
  function initParallax() {
    var elements = document.querySelectorAll('[data-parallax]');
    if (!elements.length) return;
    if ('ontouchstart' in window) return;

    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      elements.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax') || '0.3');
        el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
    }, { passive: true });
  }

  /* =====================================================
     SECTION 15: SCROLL TO TOP BUTTON
     Shows #scroll-top after scrolling 400px
     ===================================================== */
  function initScrollTop() {
    var btn = document.getElementById('scroll-top') || document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =====================================================
     SECTION 16: ACTIVE NAV LINK (section-based)
     Highlights the matching nav link based on scroll position
     ===================================================== */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link[href]');
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href') || '';
            if (href === '#' + id || href.endsWith('#' + id)) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });

    // Also set active based on current page filename
    var path = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('/').pop();
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* =====================================================
     SECTION 17: CONFETTI
     Canvas confetti on .contact-form submit
     ===================================================== */
  function createConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      document.body.appendChild(canvas);
    }

    var ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9000';

    var colors = ['#7B2FF2','#F5B041','#00D4AA','#9B4FFF','#5A00D6','#fff'];
    var particles = [];

    for (var i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 200,
        w: 8 + Math.random() * 8,
        h: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 4,
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 8,
        opacity: 1
      });
    }

    var startTime = Date.now();
    var duration  = 3500; // ms

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var elapsed = Date.now() - startTime;
      var fade = Math.max(0, 1 - elapsed / duration);

      particles.forEach(function (p) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.rot += p.rotV;
        p.vy  += 0.08; // gravity

        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < duration) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    requestAnimationFrame(draw);
  }

  function initContactForm() {
    var forms = document.querySelectorAll('.contact-form');
    if (!forms.length) return;

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show success message
        var existing = form.querySelector('.form-success');
        if (!existing) {
          var successDiv = document.createElement('div');
          successDiv.className = 'form-success';
          successDiv.innerHTML = '<span class="form-success-icon">✓</span>'
            + '<span>Thank you! Your message has been received. We\'ll be in touch soon.</span>';
          form.appendChild(successDiv);
        }

        // Launch confetti
        createConfetti();

        // Reset after delay
        setTimeout(function () {
          form.reset();
          var msg = form.querySelector('.form-success');
          if (msg) {
            msg.style.opacity = '0';
            msg.style.transition = 'opacity 0.4s';
            setTimeout(function () { if (msg.parentNode) msg.parentNode.removeChild(msg); }, 400);
          }
        }, 4000);
      });
    });
  }

  /* =====================================================
     SECTION 18: REVENUE PCT BAR ANIMATION
     Animates .revenue-pct-fill bars on scroll
     ===================================================== */
  function initRevenueBars() {
    var bars = document.querySelectorAll('.revenue-pct-fill');
    if (!bars.length) return;

    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (bar) {
        bar.style.width = (bar.getAttribute('data-width') || bar.style.width || '50%');
      });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var w = entry.target.getAttribute('data-width') || '50';
          entry.target.style.width = w + '%';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (bar) {
      bar.style.width = '0%';
      obs.observe(bar);
    });
  }

  /* =====================================================
     SECTION 19: ACCORDION
     Simple show/hide for .accordion-item
     ===================================================== */
  function initAccordions() {
    var triggers = document.querySelectorAll('.accordion-trigger');
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.accordion-item');
        if (!item) return;
        var isOpen = item.classList.contains('open');

        // Close all in same parent
        var parent = item.parentElement;
        parent.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
          openItem.classList.remove('open');
        });

        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  /* =====================================================
     SECTION 20: TABS
     Tab buttons with .tab-btn / .tab-panel
     ===================================================== */
  function initTabs() {
    var tabContainers = document.querySelectorAll('[data-tabs]');
    if (!tabContainers.length) return;

    tabContainers.forEach(function (container) {
      var btns   = container.querySelectorAll('.tab-btn');
      var panels = container.querySelectorAll('.tab-panel');

      btns.forEach(function (btn, index) {
        btn.addEventListener('click', function () {
          btns.forEach(function (b) { b.classList.remove('active'); });
          panels.forEach(function (p) { p.classList.remove('active'); });
          btn.classList.add('active');
          if (panels[index]) panels[index].classList.add('active');
        });
      });

      // Activate first by default
      if (btns[0])   btns[0].classList.add('active');
      if (panels[0]) panels[0].classList.add('active');
    });
  }

  /* =====================================================
     SECTION 21: PROGRESS BARS
     Animates .progress-fill on scroll
     ===================================================== */
  function initProgressBars() {
    var bars = document.querySelectorAll('.progress-fill');
    if (!bars.length) return;

    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (bar) {
        bar.style.width = (bar.getAttribute('data-width') || '70') + '%';
      });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = (entry.target.getAttribute('data-width') || '70') + '%';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (bar) {
      bar.style.width = '0%';
      obs.observe(bar);
    });
  }

  /* =====================================================
     SECTION 22: SMOOTH ANCHOR SCROLLING
     Internal #anchor links scroll smoothly
     ===================================================== */
  function initSmoothAnchors() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute('href');
      if (hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* =====================================================
     SECTION 23: WORLD MAP ANIMATION
     Animates SVG nodes and connections on the map
     ===================================================== */
  function initWorldMap() {
    var mapNodes = document.querySelectorAll('.map-node');
    if (!mapNodes.length) return;

    // Stagger pulse animations
    mapNodes.forEach(function (node, i) {
      node.style.animationDelay = (i * 0.4) + 's';
    });

    var pulseOuters = document.querySelectorAll('.pulse-outer');
    pulseOuters.forEach(function (el, i) {
      el.style.animationDelay = (i * 0.6) + 's';
    });
  }

  /* =====================================================
     SECTION 24: FLOATING NUMBERS / SPARKLE HERO EFFECT
     Creates small floating number elements behind hero
     ===================================================== */
  function initHeroSparkle() {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    var symbols = ['+2.4%', '$', '€', '¥', '£', '98.3', '↑', '7.12%', '1.0832'];
    for (var i = 0; i < 12; i++) {
      (function (idx) {
        var span = document.createElement('span');
        span.textContent = symbols[idx % symbols.length];
        span.style.cssText = [
          'position:absolute',
          'color:rgba(255,255,255,0.06)',
          'font-size:' + (12 + Math.random() * 18) + 'px',
          'font-weight:700',
          'left:' + (Math.random() * 90) + '%',
          'top:' + (10 + Math.random() * 80) + '%',
          'pointer-events:none',
          'user-select:none',
          'animation:float ' + (4 + Math.random() * 4) + 's ease-in-out ' + (Math.random() * 3) + 's infinite',
          'z-index:1'
        ].join(';');
        hero.appendChild(span);
      })(i);
    }
  }

  /* =====================================================
     SECTION 25: INITIALIZE EVERYTHING
     Called on DOMContentLoaded
     ===================================================== */
  function init() {
    initPageTransition();
    initNavbarScroll();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initTypingEffect();
    initAIMetricBars();
    fetchTicker();
    initConverter();
    initCharts();
    initMarketOverview();
    initCardTilt();
    initMagneticButtons();
    initParallax();
    initScrollTop();
    initActiveNav();
    initContactForm();
    initRevenueBars();
    initAccordions();
    initTabs();
    initProgressBars();
    initSmoothAnchors();
    initWorldMap();
    initHeroSparkle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
