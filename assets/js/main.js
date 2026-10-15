(function () {
  "use strict";

  var config = window.LANDLORD_GOPHER_CONFIG || {};
  var root = document.documentElement;
  root.classList.remove("no-js");

  // Mobile navigation
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  function setNavOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNavOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setNavOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", function (mq) {
      if (mq.matches) setNavOpen(false);
    });
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Reviews link (only shown when a real review profile is configured)
  var reviewsWrap = document.querySelector("[data-reviews-link]");
  if (reviewsWrap && config.reviewsUrl) {
    var reviewsLink = reviewsWrap.querySelector("a");
    reviewsLink.href = config.reviewsUrl;
    reviewsLink.target = "_blank";
    reviewsLink.rel = "noopener";
    reviewsWrap.hidden = false;
  }

  // Inquiry form
  var form = document.getElementById("inquiry-form");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var submit = form.querySelector('[type="submit"]');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(message, kind) {
    status.textContent = message;
    status.classList.toggle("is-error", kind === "error");
    status.classList.toggle("is-success", kind === "success");
  }

  function setFieldError(input, message) {
    var errorEl = document.getElementById(input.id + "-error");
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (errorEl) errorEl.textContent = message;
  }

  function validate() {
    var firstInvalid = null;
    var first = form.elements.firstName;
    var email = form.elements.email;

    var firstMsg = first.value.trim() ? "" : "Please enter your first name.";
    setFieldError(first, firstMsg);
    if (firstMsg) firstInvalid = first;

    var emailValue = email.value.trim();
    var emailMsg = !emailValue
      ? "Please enter your email address."
      : emailPattern.test(emailValue)
        ? ""
        : "Please enter a valid email address, like name@example.com.";
    setFieldError(email, emailMsg);
    if (emailMsg && !firstInvalid) firstInvalid = email;

    return firstInvalid;
  }

  ["firstName", "email"].forEach(function (name) {
    var input = form.elements[name];
    input.addEventListener("blur", function () {
      if (input.getAttribute("aria-invalid") === "true") validate();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setStatus("", null);

    var firstInvalid = validate();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    if (!config.inquiryEndpoint) {
      setStatus(
        "Online inquiries aren’t connected yet, so this message was not sent. Please check back soon.",
        "error"
      );
      status.focus();
      return;
    }

    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    setStatus("Sending your inquiry…", null);

    fetch(config.inquiryEndpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed with status " + response.status);
        form.reset();
        setStatus("Thanks! Your inquiry was sent. We’ll be in touch soon.", "success");
      })
      .catch(function () {
        setStatus(
          "Sorry, we couldn’t send your inquiry. Please check your connection and try again.",
          "error"
        );
      })
      .finally(function () {
        submit.disabled = false;
        submit.removeAttribute("aria-busy");
        status.focus();
      });
  });
})();
