document.addEventListener("DOMContentLoaded", function () {
  const ctaBtn = document.getElementById("ctaBtn");
  if (ctaBtn) {
    ctaBtn.addEventListener("click", function () {
      window.location.href = "contact.html";
    });
  }

  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const counters = document.querySelectorAll(".counter");

  const startCounter = (counter) => {
    const target = Number(counter.getAttribute("data-target"));
    const duration = 1200;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counter.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => startCounter(counter));
  }

  const reveals = document.querySelectorAll(".reveal, .timeline-item");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();

  const donateForm = document.getElementById("donateForm");
  if (donateForm) {
    donateForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const amount = document.getElementById("amount").value;
      const frequency = document.getElementById("frequency").value;
      const payment = document.getElementById("payment").value;

      if (payment === "paystack") {
        const confirmPaystack = confirm(
          `Hello ${fullName}, you are about to donate ₦${amount} (${frequency}) via Paystack. Click OK to proceed.`
        );
        if (confirmPaystack) {
          window.location.href = "https://paystack.com/pay/";
        }
      } else if (payment === "bank") {
        const confirmBank = confirm(
          `Hello ${fullName}, you are about to donate ₦${amount} (${frequency}) via Bank Transfer. Click OK to view AESI bank account details.`
        );
        if (confirmBank) {
          window.location.href = "bank-details.html";
        }
      }

      donateForm.reset();
    });
  }

  const volunteerForm = document.getElementById("volunteerForm");
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const tasks = document.getElementById("tasks").value;
      const availability = document.getElementById("availability").value;
      const reminder = document.getElementById("reminder") ? document.getElementById("reminder").checked : false;

      const confirmVol = confirm(
        `Thank you ${fullName} for volunteering!\nTask: ${tasks}\nAvailability: ${availability}\n${
          reminder ? "You will receive email reminders." : ""
        }\nClick OK to join our WhatsApp group.`
      );

      if (confirmVol) {
        window.open("https://chat.whatsapp.com/YOURGROUPLINK", "_blank");
        volunteerForm.submit();
      }
    });
  }

  const resourceType = document.getElementById("resourceType");
  const digitalUploadField = document.getElementById("digitalUploadField");
  const digitalResourceInput = document.getElementById("digitalResource");

  if (resourceType && digitalUploadField && digitalResourceInput) {
    const toggleDigitalUpload = () => {
      const isDigitalResource = resourceType.value === "digital";
      digitalUploadField.hidden = !isDigitalResource;
      digitalResourceInput.required = isDigitalResource;
      digitalResourceInput.disabled = !isDigitalResource;
    };

    toggleDigitalUpload();
    resourceType.addEventListener("change", toggleDigitalUpload);
  }
});