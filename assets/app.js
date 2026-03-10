(function () {
  var fullMessage = "प्रिय जीवनसंगिनी बेलिना राई, जन्मदिनको असीम शुभकामना 🎂 आजको दिन तिम्रो हो—तर खुशी मेरो पनि, किनकि मेरो संसार तिमीबाट सुरु हुन्छ र तिमीमै शान्त हुन्छ । तिम्रो मुस्कान मेरो प्रार्थना हो, तिम्रो हात मेरो भरोसा, तिम्रो साथ मेरो घर । मैले जीवनमा धेरै कुरा खोजिनँ—सधैं तिमीलाई रोजेँ, र अझै रोजिरहनेछु । तिमी जस्तो साथ पाउन हजार जन्म पनि कम लाग्छ; तिमी मेरो सबैभन्दा मूल्यवान उपहार, मेरो भाग्य, मेरो माया हौ । सधैं तिम्रो सम्मान गर्नेछु, जोगाउनेछु, र हरेक दिन तिमीलाई अझ बढी माया गर्नेछु 💖";
  var typedEl = document.getElementById("typedMessage");
  var btn = document.getElementById("surpriseBtn");
  var memoriesBtn = document.getElementById("memoriesBtn");
  var heartsLayer = document.getElementById("heartsLayer");
  var fxLayer = document.getElementById("fxLayer");
  var fireworksLayer = document.getElementById("fireworksLayer");
  var petalsLayer = document.getElementById("petalsLayer");
  var started = false;
  var typeIndex = 0;
  var typeTimer = null;

  var birthdayAudio = document.getElementById("birthdayAudio");
  var audioBar = document.getElementById("audioBar");
  var audioToggle = document.getElementById("audioToggle");

  var memoriesModal = document.getElementById("memoriesModal");
  var photoGallery = document.getElementById("photoGallery");
  var galleryAutoSlideTimer = null;

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var galleryImages = Array.prototype.slice.call(document.querySelectorAll("img[data-lightbox]"));
  var currentIdx = 0;

  var heartChars = ["❤️", "💖", "💕", "💗", "🩷"];

  // Background slideshow
  var bgImages = [
    "images/background/bg2.JPG",
    "images/background/bg3.JPG",
    "images/background/bg4.png"
  ];
  var bgIndex = 0;

  function setBackground(index) {
    if (!document.body) return;
    var safeIndex = ((index % bgImages.length) + bgImages.length) % bgImages.length;
    document.body.style.backgroundImage = 'url("' + bgImages[safeIndex] + '")';
  }

  function startBackgroundSlideshow() {
    if (!bgImages.length) return;
    setBackground(bgIndex);
    setInterval(function () {
      bgIndex = (bgIndex + 1) % bgImages.length;
      setBackground(bgIndex);
    }, 3000);
  }

  function addBurstAt(parent, xPct, yPct, delayMs, isCracker) {
    var colors = isCracker
      ? ["#ff9800", "#ff5722", "#ffeb3b", "#ffc107", "#e65100", "#ff6d00", "#ffab00"]
      : ["#ff6b9d", "#ffd93d", "#e91e63", "#ffeb3b", "#ff7979", "#ffffff", "#c44569"];
    var burst = document.createElement("div");
    burst.className = "firework-burst";
    burst.style.setProperty("--x", xPct + "%");
    burst.style.setProperty("--y", yPct + "%");

    var numSparks = isCracker ? 24 : 36;
    var radius = isCracker ? 120 + Math.random() * 50 : 220 + Math.random() * 60;
    for (var i = 0; i < numSparks; i++) {
      var angle = (i / numSparks) * Math.PI * 2 + Math.random() * 0.5;
      var dist = radius * (0.85 + Math.random() * 0.3);
      var tx = Math.cos(angle) * dist;
      var ty = Math.sin(angle) * dist;
      var spark = document.createElement("div");
      spark.className = "firework-spark" + (Math.random() > 0.6 ? " streak" : "") + (isCracker ? " cracker" : "");
      spark.style.setProperty("--tx", tx + "px");
      spark.style.setProperty("--ty", ty + "px");
      spark.style.setProperty("--spark-color", colors[i % colors.length]);
      spark.style.animationDelay = (delayMs || 0) + "ms";
      burst.appendChild(spark);
    }
    parent.appendChild(burst);
    setTimeout(function () {
      if (burst.parentNode) burst.parentNode.removeChild(burst);
    }, (delayMs || 0) + (isCracker ? 1200 : 1600));
  }

  function launchBoomFirework(xPercent, yPercent, delayMs) {
    if (!fireworksLayer) return;
    addBurstAt(fireworksLayer, xPercent, yPercent, delayMs || 0, false);
  }

  function launchFirecracker(xPercent, yPercent, delayMs) {
    if (!fireworksLayer) return;
    delayMs = delayMs || 0;

    var wrap = document.createElement("div");
    wrap.className = "firecracker";
    wrap.style.setProperty("--x", xPercent + "%");
    wrap.style.setProperty("--y", yPercent + "%");

    var tube = document.createElement("div");
    tube.className = "firecracker-tube";
    var fuse = document.createElement("div");
    fuse.className = "firecracker-fuse";
    var tip = document.createElement("div");
    tip.className = "firecracker-fuse-tip";

    wrap.appendChild(tube);
    wrap.appendChild(fuse);
    wrap.appendChild(tip);
    fireworksLayer.appendChild(wrap);

    var fuseTime = 700;
    setTimeout(function () {
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      addBurstAt(fireworksLayer, xPercent, yPercent, 0, true);
      setTimeout(function () {
        addBurstAt(fireworksLayer, xPercent + (Math.random() * 4 - 2), yPercent + (Math.random() * 4 - 2), 0, true);
      }, 80);
      setTimeout(function () {
        addBurstAt(fireworksLayer, xPercent + (Math.random() * 6 - 3), yPercent + (Math.random() * 6 - 3), 0, true);
      }, 160);
    }, delayMs + fuseTime);
  }

  function launchBoomFireworksOnOpen() {
    launchFirecracker(78, 22, 0);   /* top right */
    launchFirecracker(22, 22, 400); /* top left */
    launchFirecracker(50, 42, 750); /* center */
  }

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

  function spawnPetals() {
    if (!petalsLayer) return;
    for (var i = 0; i < 10; i++) {
      var p = document.createElement("div");
      p.className = "petal";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = (11 + Math.random() * 7) + "s";
      p.style.animationDelay = (Math.random() * 4) + "s";
      p.style.setProperty("--sway", (Math.random() * 60 - 30) + "px");
      petalsLayer.appendChild(p);
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

  function startFloatingEffects() {
    spawnHearts();
    spawnBalloons();
    spawnPetals();
    spawnConfetti();

    // keep balloons coming
    setInterval(spawnBalloons, 7000);
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

  // Start background image slideshow and ambient effects immediately
  startBackgroundSlideshow();
  startFloatingEffects();

  // Boom fireworks shortly after load so they're visible
  if (document.readyState === "complete") {
    setTimeout(launchBoomFireworksOnOpen, 150);
  } else {
    window.addEventListener("load", function () {
      setTimeout(launchBoomFireworksOnOpen, 150);
    });
  }

  function openMemories() {
    if (!memoriesModal) return;
    memoriesModal.classList.add("open");
    memoriesModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    startGalleryAutoSlide();
  }

  function closeMemories() {
    if (!memoriesModal) return;
    memoriesModal.classList.remove("open");
    memoriesModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    stopGalleryAutoSlide();
  }

  function startGalleryAutoSlide() {
    stopGalleryAutoSlide();
    if (!photoGallery) return;
    var items = photoGallery.querySelectorAll(".gallery-item");
    if (!items.length) return;
    var step = items[0].offsetWidth + 12;
    galleryAutoSlideTimer = setInterval(function () {
      var maxScroll = photoGallery.scrollWidth - photoGallery.clientWidth;
      if (maxScroll <= 0) return;
      var next = photoGallery.scrollLeft + step;
      if (next >= maxScroll - 10) {
        photoGallery.scrollLeft = 0;
      } else {
        photoGallery.scrollLeft = next;
      }
    }, 3500);
  }

  function stopGalleryAutoSlide() {
    if (galleryAutoSlideTimer) {
      clearInterval(galleryAutoSlideTimer);
      galleryAutoSlideTimer = null;
    }
  }

  if (memoriesBtn) {
    memoriesBtn.addEventListener("click", openMemories);
  }

  if (memoriesModal) {
    memoriesModal.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.getAttribute && t.getAttribute("data-mem-close") === "1") {
        closeMemories();
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

  document.addEventListener("keydown", function (e) {
    if (!memoriesModal || !memoriesModal.classList.contains("open")) return;
    if (e.key === "Escape") return closeMemories();
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
    if (memoriesBtn) memoriesBtn.hidden = false;

    typedEl.classList.remove("done");
    typedEl.textContent = "";
    typeIndex = 0;
    if (typeTimer) clearTimeout(typeTimer);

    launchBoomFireworksOnOpen();
    typeNext();
    playBirthdaySound();
  }

  btn.addEventListener("click", runSurprise);
  btn.addEventListener("touchend", function (e) {
    e.preventDefault();
    runSurprise();
  }, { passive: false });
})();

