(function () {
  var fullMessage = "प्रिय बेलिना राई, जन्मदिनको असीम शुभकामना 🎂 तिमी मेरो जीवनको सबैभन्दा मूल्यवान उपहार हौ — तिम्रो मुस्कान नै मेरो संसार, तिम्रो साथ नै मेरो शान्ति । हजार जन्म पनि कम भए तिमीजस्तो जीवनसाथी पाउन । म तिमीलाई अनन्त माया गर्छु, सधैँ गर्नेछु 💖";
  var typedEl = document.getElementById("typedMessage");
  var btn = document.getElementById("surpriseBtn");
  var heartsLayer = document.getElementById("heartsLayer");
  var fxLayer = document.getElementById("fxLayer");
  var started = false;
  var typeIndex = 0;
  var typeTimer = null;

  var birthdayAudio = document.getElementById("birthdayAudio");
  var audioBar = document.getElementById("audioBar");
  var audioToggle = document.getElementById("audioToggle");

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var galleryImages = Array.prototype.slice.call(document.querySelectorAll("img[data-lightbox]"));
  var currentIdx = 0;

  var heartChars = ["❤️", "💖", "💕", "💗", "🩷"];

  function spawnHearts() {
    for (var i = 0; i < 18; i++) {
      var h = document.createElement("span");
      h.className = "heart";
      h.textContent = heartChars[i % heartChars.length];
      h.style.setProperty("--x", (5 + Math.random() * 90) + "%");
      h.style.setProperty("--dur", (12 + Math.random() * 10) + "s");
      h.style.setProperty("--delay", (i * 0.4) + "s");
      h.style.setProperty("--rot", (Math.random() * 40 - 20) + "deg");
      heartsLayer.appendChild(h);
    }
  }

  function spawnBalloons() {
    var colors = ["#ff6b9d", "#ffd93d", "#6bcb77", "#4d96ff", "#ff7979", "#c44569"];
    for (var i = 0; i < 14; i++) {
      var b = document.createElement("div");
      b.className = "balloon";
      b.style.left = (Math.random() * 100) + "%";
      b.style.background = colors[i % colors.length];
      b.style.animationDuration = (8 + Math.random() * 8) + "s";
      b.style.animationDelay = (i * 0.25) + "s";
      b.style.setProperty("--spin", (Math.random() * 20 - 10) + "deg");
      fxLayer.appendChild(b);
    }
  }

  function spawnConfetti() {
    var colors = ["#fff", "#ffd93d", "#ff6b9d", "#e84a5f", "#c44569", "#ffe4ec"];
    for (var i = 0; i < 50; i++) {
      var c = document.createElement("div");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "%";
      c.style.background = colors[i % colors.length];
      c.style.width = (6 + Math.random() * 8) + "px";
      c.style.height = (6 + Math.random() * 8) + "px";
      c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      c.style.animationDuration = (5 + Math.random() * 6) + "s";
      c.style.animationDelay = (Math.random() * 2) + "s";
      c.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
      fxLayer.appendChild(c);
    }
  }

  function typeNext() {
    if (typeIndex <= fullMessage.length) {
      typedEl.textContent = fullMessage.slice(0, typeIndex);
      typeIndex++;
      // Slightly slower for Nepali (Devanagari) readability
      typeTimer = setTimeout(typeNext, typeIndex > 20 ? 38 : 55);
    } else {
      typedEl.classList.add("done");
    }
  }

  function playBirthdaySound() {
    if (!birthdayAudio) return;
    birthdayAudio.volume = 0.85;
    var p = birthdayAudio.play();
    if (p && typeof p.then === "function") {
      p.then(function () {
        if (audioBar) audioBar.classList.add("visible");
      }).catch(function () {
        // No file or autoplay blocked — show bar so user can try
        if (audioBar) audioBar.classList.add("visible");
        if (audioToggle) audioToggle.textContent = "बजाउनुहोस्";
      });
    } else {
      if (audioBar) audioBar.classList.add("visible");
    }
  }

  if (audioToggle && birthdayAudio) {
    audioToggle.addEventListener("click", function () {
      if (birthdayAudio.paused) {
        birthdayAudio.play();
        audioToggle.textContent = "रोक्नुहोस्";
        audioToggle.setAttribute("aria-pressed", "true");
      } else {
        birthdayAudio.pause();
        audioToggle.textContent = "बजाउनुहोस्";
        audioToggle.setAttribute("aria-pressed", "false");
      }
    });
  }

  function getVisibleGallery() {
    return galleryImages.filter(function (img) {
      var item = img.closest(".gallery-item");
      if (!item) return true;
      return item.style.display !== "none";
    });
  }

  function openLightboxAt(index) {
    var visible = getVisibleGallery();
    if (!visible.length || !lightbox || !lightboxImg) return;
    currentIdx = Math.max(0, Math.min(index, visible.length - 1));
    lightboxImg.src = visible[currentIdx].src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function stepLightbox(dir) {
    var visible = getVisibleGallery();
    if (!visible.length || !lightboxImg) return;
    currentIdx = (currentIdx + dir + visible.length) % visible.length;
    lightboxImg.src = visible[currentIdx].src;
  }

  galleryImages.forEach(function (img, idx) {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", function () {
      openLightboxAt(idx);
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.getAttribute) {
        if (t.getAttribute("data-close") === "1") return closeLightbox();
        if (t.getAttribute("data-prev") === "1") return stepLightbox(-1);
        if (t.getAttribute("data-next") === "1") return stepLightbox(1);
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") return closeLightbox();
    if (e.key === "ArrowLeft") return stepLightbox(-1);
    if (e.key === "ArrowRight") return stepLightbox(1);
  });

  (function enableSwipe() {
    if (!lightbox || !lightboxImg) return;
    var startX = 0;
    var startY = 0;
    var touching = false;
    lightboxImg.addEventListener("touchstart", function (e) {
      if (!e.touches || !e.touches[0]) return;
      touching = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    lightboxImg.addEventListener("touchend", function (e) {
      if (!touching) return;
      touching = false;
      if (!e.changedTouches || !e.changedTouches[0]) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      stepLightbox(dx < 0 ? 1 : -1);
    }, { passive: true });
  })();

  function runSurprise() {
    if (started) return;
    started = true;
    btn.disabled = true;
    btn.textContent = "यो दिन तिम्रो, माया सधैँ तिम्रै साथ 🎉";

    typedEl.classList.remove("done");
    typedEl.textContent = "";
    typeIndex = 0;
    if (typeTimer) clearTimeout(typeTimer);

    spawnHearts();
    spawnBalloons();
    spawnConfetti();
    typeNext();
    playBirthdaySound();
  }

  btn.addEventListener("click", runSurprise);
  btn.addEventListener("touchend", function (e) {
    e.preventDefault();
    runSurprise();
  }, { passive: false });
})();

