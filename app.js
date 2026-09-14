(function () {
  "use strict";
  var root = document.documentElement;
  var themeButton = document.querySelector(".theme-toggle");
  var themeLabel = document.querySelector(".theme-label");
  var savedTheme = localStorage.getItem("sawyer-theme");

  function setTheme(theme) {
    root.dataset.theme = theme;
    var light = theme === "light";
    themeButton.setAttribute("aria-pressed", String(light));
    themeLabel.textContent = light ? "Night mode" : "Light mode";
    localStorage.setItem("sawyer-theme", theme);
  }
  if (savedTheme) setTheme(savedTheme);
  themeButton.addEventListener("click", function () { setTheme(root.dataset.theme === "light" ? "night" : "light"); });

  var clock = document.getElementById("local-time");
  function updateClock() { clock.textContent = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Phoenix" }).format(new Date()); }
  updateClock();
  window.setInterval(updateClock, 30000);

  var pointerGlow = document.querySelector(".pointer-glow");
  window.addEventListener("pointermove", function (event) { pointerGlow.style.left = event.clientX + "px"; pointerGlow.style.top = event.clientY + "px"; }, { passive: true });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(function (tile) {
      tile.addEventListener("pointermove", function (event) {
        var box = tile.getBoundingClientRect();
        var x = (event.clientX - box.left) / box.width - .5;
        var y = (event.clientY - box.top) / box.height - .5;
        tile.style.transform = "perspective(900px) rotateX(" + (y * -2) + "deg) rotateY(" + (x * 2) + "deg)";
      });
      tile.addEventListener("pointerleave", function () { tile.style.transform = ""; });
    });
  }

  var emailButton = document.querySelector("[data-copy-email]");
  var toast = document.querySelector(".toast");
  emailButton.addEventListener("click", function () {
    navigator.clipboard.writeText(emailButton.dataset.copyEmail).then(function () {
      toast.classList.add("is-visible");
      window.setTimeout(function () { toast.classList.remove("is-visible"); }, 1800);
    });
  });
})();
