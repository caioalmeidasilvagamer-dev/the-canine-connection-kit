/**
 * main.js — The Canine Connection Kit
 * Smooth navigation · Carousel · Lightbox · Policy Modals · Checkout handling · Promo Timer
 */
(function () {
  'use strict';

  var cfg   = window.CCK_CONFIG || {};
  var track = window.CCK_TRACK  || function () {};

  /* ── Footer year ──────────────────────────────────────────── */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════════════════════════
     SMOOTH SCROLL FOR ALL IN-PAGE ANCHOR BUTTONS & LINKS
     Compensates for the fixed top promo banner automatically.
  ══════════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    // Ignore checkout button and modal triggers
    if (link.id === 'checkoutBtn' || link.hasAttribute('data-modal')) return;

    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.length < 2) return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var banner = document.getElementById('promoBanner');
        var bannerH = banner ? banner.offsetHeight : 0;
        var elementPos = targetEl.getBoundingClientRect().top + window.pageYOffset;
        var offsetPosition = elementPos - bannerH - 12;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });

        if (window.history && window.history.pushState) {
          window.history.pushState(null, null, targetId);
        }
      }
    });
  });

  /* ══════════════════════════════════════════════════════════
     CHECKOUT BUTTON WIRING
     The ONLY button that is non-operational until configured.
  ══════════════════════════════════════════════════════════ */
  var checkoutBtn    = document.getElementById('checkoutBtn');
  var checkoutNotice = document.getElementById('checkoutNotice');

  if (checkoutBtn) {
    if (cfg.CHECKOUT_URL && cfg.CHECKOUT_URL.trim() !== '') {
      checkoutBtn.href = cfg.CHECKOUT_URL;
      checkoutBtn.removeAttribute('aria-disabled');
      checkoutBtn.classList.remove('btn--disabled');
      checkoutBtn.addEventListener('click', function () {
        track('checkout_click', { url: cfg.CHECKOUT_URL });
      });
      if (checkoutNotice) checkoutNotice.style.display = 'none';
    } else {
      // Checkout URL not yet supplied
      checkoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (checkoutNotice) {
          checkoutNotice.style.display = 'block';
          checkoutNotice.classList.remove('checkout-notice--pulse');
          // Trigger reflow for CSS pulse re-animation
          void checkoutNotice.offsetWidth;
          checkoutNotice.classList.add('checkout-notice--pulse');
        }
      });
      if (checkoutNotice) checkoutNotice.style.display = 'block';
    }
  }

  /* ══════════════════════════════════════════════════════════
     POLICY & INFO MODALS (Support, Terms, Privacy, Refund)
     Always functional: opens external link if set, or modal if not.
  ══════════════════════════════════════════════════════════ */
  var infoModal        = document.getElementById('infoModal');
  var infoModalOverlay = document.getElementById('infoModalOverlay');
  var infoModalTitle   = document.getElementById('infoModalTitle');
  var infoModalBody    = document.getElementById('infoModalBody');
  var infoModalClose   = document.getElementById('infoModalClose');

  var modalContents = {
    support: {
      title: 'Customer Support',
      html: '<p>Need help with your order or have a question about <strong>The Canine Connection Kit</strong>?</p>' +
            '<p>' + (cfg.SUPPORT_EMAIL ? 'Email our support team directly at: <a href="mailto:' + cfg.SUPPORT_EMAIL + '"><strong>' + cfg.SUPPORT_EMAIL + '</strong></a>' : 'Support email can be configured in <code>config.js</code> under <code>SUPPORT_EMAIL</code>.') + '</p>' +
            '<p>We are available to help you with downloading, opening, or printing your guide.</p>'
    },
    terms: {
      title: 'Terms of Service',
      html: '<p><strong>The Canine Connection Kit</strong> is a digital educational guide provided in PDF format for personal, non-commercial use by the purchaser.</p>' +
            '<p>All illustrations, exercises, and activity sheets are copyright protected. Reselling, redistributing, or reproducing this material without prior permission is strictly prohibited.</p>' +
            '<p>This product does not replace professional veterinary or clinical behavioral diagnosis.' + (cfg.TERMS_URL ? '<br><a href="' + cfg.TERMS_URL + '" target="_blank" rel="noopener">Read full terms page →</a>' : '') + '</p>'
    },
    privacy: {
      title: 'Privacy Policy',
      html: '<p>We respect your privacy. When purchasing, your payment is processed securely through encrypted merchant gateways.</p>' +
            '<p>We do not sell, rent, or trade your personal information. Any data collected is used solely to deliver your digital purchase and provide support.' + (cfg.PRIVACY_URL ? '<br><a href="' + cfg.PRIVACY_URL + '" target="_blank" rel="noopener">Read full privacy policy →</a>' : '') + '</p>'
    },
    refund: {
      title: 'Refund Policy & Guarantee',
      html: '<p>We stand behind the quality of <strong>The Canine Connection Kit</strong>.</p>' +
            '<p>If you experience any issues opening, downloading, or reading your digital guide, reach out to our support team and we will ensure you receive your complete files promptly.</p>' +
            '<p>' + (cfg.REFUND_POLICY_URL ? '<a href="' + cfg.REFUND_POLICY_URL + '" target="_blank" rel="noopener">Review our complete refund terms here →</a>' : 'Detailed refund terms can be linked in <code>config.js</code> under <code>REFUND_POLICY_URL</code>.') + '</p>'
    }
  };

  function openInfoModal(type) {
    if (!infoModal || !modalContents[type]) return;
    infoModalTitle.textContent = modalContents[type].title;
    infoModalBody.innerHTML    = modalContents[type].html;
    infoModal.hidden           = false;
    infoModalOverlay.hidden    = false;
    infoModal.classList.add('is-open');
    infoModalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (infoModalClose) infoModalClose.focus();
  }

  function closeInfoModal() {
    if (!infoModal) return;
    infoModal.hidden        = true;
    infoModalOverlay.hidden = true;
    infoModal.classList.remove('is-open');
    infoModalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Wire footer & policy links
  var supportLink = document.getElementById('footerSupport');
  var termsLink   = document.getElementById('footerTerms');
  var privacyLink = document.getElementById('footerPrivacy');
  var refundLink  = document.getElementById('refundLink');

  if (supportLink) {
    supportLink.addEventListener('click', function (e) {
      if (cfg.SUPPORT_EMAIL) {
        window.location.href = 'mailto:' + cfg.SUPPORT_EMAIL;
      } else {
        e.preventDefault();
        openInfoModal('support');
      }
    });
  }

  if (termsLink) {
    termsLink.addEventListener('click', function (e) {
      if (cfg.TERMS_URL) {
        window.open(cfg.TERMS_URL, '_blank', 'noopener');
      } else {
        e.preventDefault();
        openInfoModal('terms');
      }
    });
  }

  if (privacyLink) {
    privacyLink.addEventListener('click', function (e) {
      if (cfg.PRIVACY_URL) {
        window.open(cfg.PRIVACY_URL, '_blank', 'noopener');
      } else {
        e.preventDefault();
        openInfoModal('privacy');
      }
    });
  }

  if (refundLink) {
    refundLink.addEventListener('click', function (e) {
      if (cfg.REFUND_POLICY_URL) {
        window.open(cfg.REFUND_POLICY_URL, '_blank', 'noopener');
      } else {
        e.preventDefault();
        openInfoModal('refund');
      }
    });
  }

  if (infoModalClose)   infoModalClose.addEventListener('click', closeInfoModal);
  if (infoModalOverlay) infoModalOverlay.addEventListener('click', closeInfoModal);

  /* ── Delivery section ─────────────────────────────────────── */
  if (cfg.SHOW_DELIVERY_BLOCK && cfg.DELIVERY_METHOD) {
    var delivSection = document.getElementById('delivery');
    var delivContent = document.getElementById('deliveryContent');
    var faqDelivery  = document.getElementById('faqDelivery');
    var faqDelivAns  = document.getElementById('faqDeliveryAnswer');
    if (delivSection) delivSection.style.display = '';
    if (delivContent) delivContent.innerHTML = '<p>' + cfg.DELIVERY_METHOD + '</p>';
    if (faqDelivery)  faqDelivery.style.display = '';
    if (faqDelivAns)  faqDelivAns.innerHTML = '<p>' + cfg.DELIVERY_METHOD + '</p>';
  }

  /* ── Analytics tracking attributes ────────────────────────── */
  document.querySelectorAll('[data-event]').forEach(function (el) {
    el.addEventListener('click', function () {
      track(el.dataset.event);
    });
  });

  /* ── Offer section IntersectionObserver ───────────────────── */
  var offerSection = document.getElementById('offer');
  if (offerSection && 'IntersectionObserver' in window) {
    var offerSeen = false;
    var offerObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !offerSeen) {
        offerSeen = true;
        track('offer_view');
        offerObs.disconnect();
      }
    }, { threshold: 0.2 });
    offerObs.observe(offerSection);
  }

  /* ══════════════════════════════════════════════════════════
     PROMO COUNTDOWN TIMER (15 Minutes Rolling Window)
  ══════════════════════════════════════════════════════════ */
  (function initTimer() {
    var hEl = document.getElementById('timerH');
    var mEl = document.getElementById('timerM');
    var sEl = document.getElementById('timerS');
    if (!hEl || !mEl || !sEl) return;

    var STORAGE_KEY = 'cck_promo_end_v2';
    var minutesConfig = (typeof cfg.PROMO_DURATION_MINUTES === 'number') ? cfg.PROMO_DURATION_MINUTES : 15;
    var DURATION_MS = minutesConfig * 60 * 1000;

    var endTime;
    if (cfg.PROMO_END_DATE) {
      endTime = new Date(cfg.PROMO_END_DATE).getTime();
    } else {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        endTime = parseInt(stored, 10);
        if (endTime <= Date.now() || isNaN(endTime)) {
          endTime = Date.now() + DURATION_MS;
          localStorage.setItem(STORAGE_KEY, String(endTime));
        }
      } else {
        endTime = Date.now() + DURATION_MS;
        localStorage.setItem(STORAGE_KEY, String(endTime));
      }
    }

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function tick() {
      var diff = endTime - Date.now();
      if (diff <= 0) {
        hEl.textContent = '00';
        mEl.textContent = '00';
        sEl.textContent = '00';
        return;
      }

      var totalSec = Math.floor(diff / 1000);
      var hours    = Math.floor(totalSec / 3600);
      var minutes  = Math.floor((totalSec % 3600) / 60);
      var seconds  = totalSec % 60;

      hEl.textContent = pad(hours);
      mEl.textContent = pad(minutes);
      sEl.textContent = pad(seconds);

      setTimeout(tick, 1000);
    }

    tick();
  })();

  /* ══════════════════════════════════════════════════════════
     CAROUSEL — High reliability & smooth horizontal tracking
  ══════════════════════════════════════════════════════════ */
  var carTrack = document.getElementById('carouselTrack');
  var prevBtn  = document.getElementById('prevBtn');
  var nextBtn  = document.getElementById('nextBtn');
  var dotsWrap = document.getElementById('carouselDots');

  if (carTrack && prevBtn && nextBtn) {
    var slides  = Array.from(carTrack.querySelectorAll('.carousel__slide'));
    var current = 0;
    var dots    = [];

    // Create pagination dots
    dotsWrap.innerHTML = '';
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'listitem');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function updateDots(activeIdx) {
      dots.forEach(function (d, i) {
        if (i === activeIdx) {
          d.classList.add('carousel__dot--active');
          d.setAttribute('aria-current', 'true');
        } else {
          d.classList.remove('carousel__dot--active');
          d.removeAttribute('aria-current');
        }
      });
    }

    function goTo(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
      current = index;
      updateDots(current);

      var targetSlide = slides[current];
      if (targetSlide) {
        var trackCenter = carTrack.clientWidth / 2;
        var slideCenter = targetSlide.offsetLeft + targetSlide.clientWidth / 2;
        var scrollTarget = slideCenter - trackCenter;

        carTrack.scrollTo({
          left: Math.max(0, scrollTarget),
          behavior: 'smooth'
        });
      }
    }

    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      goTo(current - 1);
    });

    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      goTo(current + 1);
    });

    // Keyboard navigation within carousel
    carTrack.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });

    // Synchronize dots on manual user scroll/swipe
    var scrollDebounceTimer;
    carTrack.addEventListener('scroll', function () {
      clearTimeout(scrollDebounceTimer);
      scrollDebounceTimer = setTimeout(function () {
        var trackCenter = carTrack.scrollLeft + carTrack.clientWidth / 2;
        var closestIdx = 0;
        var minDiff = Infinity;

        slides.forEach(function (slide, idx) {
          var slideCenter = slide.offsetLeft + slide.clientWidth / 2;
          var diff = Math.abs(trackCenter - slideCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        if (closestIdx !== current) {
          current = closestIdx;
          updateDots(current);
        }
      }, 50);
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════════════════
     LIGHTBOX — Full preview enlargement
  ══════════════════════════════════════════════════════════ */
  var lightbox        = document.getElementById('lightbox');
  var lightboxOverlay = document.getElementById('lightboxOverlay');
  var lightboxImg     = document.getElementById('lightboxImg');
  var lightboxClose   = document.getElementById('lightboxClose');
  var lastFocusedEl   = null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Preview';

    lightbox.hidden        = false;
    lightboxOverlay.hidden = false;
    lightbox.classList.add('is-open');
    lightboxOverlay.classList.add('is-open');

    document.body.style.overflow = 'hidden';
    lastFocusedEl = document.activeElement;
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightboxOverlay.classList.remove('is-open');
    lightbox.hidden        = true;
    lightboxOverlay.hidden = true;

    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  // Bind all enlargement buttons in carousel
  document.querySelectorAll('.carousel__enlarge-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var src = btn.getAttribute('data-src');
      var alt = btn.getAttribute('data-alt');
      if (src) openLightbox(src, alt);
    });
  });

  if (lightboxClose)   lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Global ESC key closes active dialog
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightbox && !lightbox.hidden) {
        closeLightbox();
      } else if (infoModal && !infoModal.hidden) {
        closeInfoModal();
      }
    }
  });

})();
