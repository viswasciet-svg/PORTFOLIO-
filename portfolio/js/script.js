/**
 * S. VISWA - CORE PORTFOLIO APPLICATION LOGIC
 * Handles theme switching, mobile menu, dynamic rendering from PORTFOLIO_DATA,
 * modal dialogs, contact form validation, and toast notifications.
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  renderPortfolioContent();
  initProjectModals();
  initContactForm();
  initScrollTop();
});

/* ==========================================================================
   1. THEME TOGGLE (Dark / Light with LocalStorage & System Preference)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const html = document.documentElement;

  // Retrieve saved preference or check system preference
  const savedTheme = localStorage.getItem("viswa-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  let currentTheme = savedTheme || (systemPrefersDark ? "dark" : "dark"); // Dark mode default for PCB tech aesthetic
  html.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      currentTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", currentTheme);
      localStorage.setItem("viswa-theme", currentTheme);
      updateThemeIcon(currentTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector("i");
    if (!icon) return;
    if (theme === "light") {
      icon.className = "fas fa-moon";
      themeToggleBtn.setAttribute("aria-label", "Switch to Dark Mode");
    } else {
      icon.className = "fas fa-sun";
      themeToggleBtn.setAttribute("aria-label", "Switch to Light Mode");
    }
  }
}

/* ==========================================================================
   2. NAVBAR & NAVIGATION INTERACTIONS
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById("mainNavbar");
  const hamburgerBtn = document.getElementById("navHamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky navbar shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNav();
  });

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen);
      const icon = hamburgerBtn.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "fas fa-times" : "fas fa-bars";
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
          hamburgerBtn.setAttribute("aria-expanded", "false");
          const icon = hamburgerBtn.querySelector("i");
          if (icon) icon.className = "fas fa-bars";
        }
      });
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

/* ==========================================================================
   3. DYNAMIC CONTENT RENDERING FROM CENTRAL DATA STORE
   ========================================================================== */
function renderPortfolioContent() {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  renderSkills(data.skillsCategories);
  renderProjects(data.projects);
  renderCertifications(data.certifications, data.areaOfInterest);
  renderAchievements(data.achievements);
}

// Render Skills
function renderSkills(categories) {
  const container = document.getElementById("skillsGridContainer");
  const tabsContainer = document.getElementById("skillsTabsContainer");
  if (!container) return;

  // Render Tabs
  if (tabsContainer) {
    tabsContainer.innerHTML = '<button class="skill-tab-btn active" data-filter="all"><i class="fas fa-layer-group"></i> All Domains</button>';
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "skill-tab-btn";
      btn.setAttribute("data-filter", cat.id);
      btn.innerHTML = `<i class="${cat.icon}"></i> ${cat.name}`;
      tabsContainer.appendChild(btn);
    });

    // Tab filtering click event
    const tabBtns = tabsContainer.querySelectorAll(".skill-tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        filterSkills(filter);
      });
    });
  }

  // Render Category Cards
  container.innerHTML = "";
  categories.forEach((cat) => {
    const card = document.createElement("div");
    card.className = "pcb-card skill-category-card";
    card.setAttribute("data-category", cat.id);

    const pillsHtml = cat.skills
      .map(
        (s) => `
        <span class="skill-pill">
          <span>${s.name}</span>
          <span class="pill-tag">${s.tag}</span>
        </span>`
      )
      .join("");

    card.innerHTML = `
      <span class="ic-corner ic-corner-tl"></span>
      <span class="ic-corner ic-corner-tr"></span>
      <span class="ic-corner ic-corner-bl"></span>
      <span class="ic-corner ic-corner-br"></span>
      <div class="skill-card-top">
        <div class="skill-cat-icon"><i class="${cat.icon}"></i></div>
        <div>
          <h3 class="skill-cat-title">${cat.name}</h3>
          <span class="badge badge-green">${cat.skills.length} Competencies</span>
        </div>
      </div>
      <p class="skill-cat-desc">${cat.description}</p>
      <div class="skill-badge-cloud">
        ${pillsHtml}
      </div>
    `;

    container.appendChild(card);
  });

  function filterSkills(filter) {
    const cards = container.querySelectorAll(".skill-category-card");
    cards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }
}

// Render Projects
function renderProjects(projects) {
  const container = document.getElementById("projectsGridContainer");
  if (!container) return;

  container.innerHTML = "";
  projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "pcb-card project-card";

    const techBadges = proj.technologies
      .slice(0, 5)
      .map((t) => `<span class="badge badge-cyan">${t}</span>`)
      .join("");

    const featuresHtml = proj.keyFeatures
      .slice(0, 3)
      .map((f) => `<li><i class="fas fa-check-circle"></i><span>${f}</span></li>`)
      .join("");

    card.innerHTML = `
      <span class="ic-corner ic-corner-tl"></span>
      <span class="ic-corner ic-corner-tr"></span>
      <div class="project-img-wrapper">
        <img src="${proj.image}" alt="${proj.name}" class="project-img" loading="lazy">
        <div class="project-category-overlay">
          <span class="badge badge-green">${proj.category}</span>
        </div>
        <div class="project-highlight-overlay">
          <span class="badge badge-copper">${proj.highlight}</span>
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${proj.name}</h3>
        <p class="project-desc">${proj.shortDescription}</p>
        <div class="project-tech-tags">
          ${techBadges}
          ${proj.technologies.length > 5 ? `<span class="badge">+${proj.technologies.length - 5} more</span>` : ""}
        </div>
        <ul class="project-features-list">
          ${featuresHtml}
        </ul>
        <div class="project-actions">
          <button class="btn btn-primary btn-sm view-project-btn" data-project-id="${proj.id}">
            <i class="fas fa-layer-group"></i> View Architecture
          </button>
          <button class="btn btn-secondary btn-sm btn-disabled" aria-disabled="true" title="Project repository in progress">
            <i class="fab fa-github"></i> GitHub (Coming Soon)
          </button>
          <button class="btn btn-secondary btn-sm btn-disabled" aria-disabled="true" title="Live demo link coming soon">
            <i class="fas fa-external-link-alt"></i> Demo (Coming Soon)
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Render Certifications & Learning
function renderCertifications(certs, learning) {
  const certContainer = document.getElementById("certificationsListContainer");
  const learnContainer = document.getElementById("currentlyLearningContainer");

  if (certContainer) {
    certContainer.innerHTML = "";
    certs.forEach((c) => {
      const card = document.createElement("div");
      card.className = "pcb-card cert-card";
      card.innerHTML = `
        <span class="ic-corner ic-corner-tl"></span>
        <span class="ic-corner ic-corner-tr"></span>
        <div class="cert-card-top">
          <div>
            <h4 class="cert-name">${c.name}</h4>
            <div class="cert-org">${c.organization}</div>
            <div class="cert-domain">${c.domain}</div>
          </div>
          <span class="badge ${c.badge ? "badge-green" : "badge-copper"}">${c.status}</span>
        </div>
        ${c.note ? `<p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.6rem;">${c.note}</p>` : ""}
        <div class="cert-footer">
          <span>Date: ${c.date}</span>
          <span class="cert-link-placeholder"><i class="fas fa-clock"></i> ${c.linkText}</span>
        </div>
      `;
      certContainer.appendChild(card);
    });
  }

  if (learnContainer) {
    learnContainer.innerHTML = "";
    learning.forEach((item) => {
      const card = document.createElement("div");
      card.className = "pcb-card learning-card";
      card.innerHTML = `
        <div class="learning-card-header">
          <div class="learning-icon"><i class="${item.icon}"></i></div>
          <div>
            <h4 class="learning-title">${item.title}</h4>
            <div class="learning-domain">${item.domain}</div>
          </div>
        </div>
        <p class="learning-desc">${item.description}</p>
        <span class="badge badge-cyan"><i class="fas fa-spinner fa-spin"></i> ${item.progressStatus}</span>
      `;
      learnContainer.appendChild(card);
    });
  }
}

// Render Achievements
function renderAchievements(achievements) {
  const container = document.getElementById("achievementsGridContainer");
  if (!container) return;

  container.innerHTML = "";
  achievements.forEach((a) => {
    const card = document.createElement("div");
    card.className = "pcb-card achievement-card";
    card.innerHTML = `
      <span class="ic-corner ic-corner-tl"></span>
      <span class="ic-corner ic-corner-tr"></span>
      <span class="ic-corner ic-corner-bl"></span>
      <span class="ic-corner ic-corner-br"></span>
      <div class="achieve-icon-box"><i class="${a.icon}"></i></div>
      <div class="achieve-metric">${a.metric}</div>
      <h3 class="achieve-title">${a.title}</h3>
      <p class="achieve-detail">${a.detail}</p>
    `;
    container.appendChild(card);
  });
}

/* ==========================================================================
   4. PROJECT MODAL DEEP-DIVE
   ========================================================================== */
function initProjectModals() {
  const backdrop = document.getElementById("projectModalBackdrop");
  const modalBody = document.getElementById("projectModalBody");
  const closeBtn = document.getElementById("modalCloseBtn");

  if (!backdrop || !modalBody) return;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-project-btn");
    if (!btn) return;
    const projId = btn.getAttribute("data-project-id");
    openProjectModal(projId);
  });

  function openProjectModal(id) {
    const data = window.PORTFOLIO_DATA;
    if (!data) return;
    const proj = data.projects.find((p) => p.id === id);
    if (!proj) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="badge badge-green">${proj.category}</span>
        <span class="badge badge-copper" style="margin-left: 0.5rem;">${proj.status}</span>
        <h2 style="font-size: 1.75rem; margin-top: 0.65rem; color: var(--text-primary);">${proj.name}</h2>
      </div>
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; max-height: 280px;">
        <img src="${proj.image}" alt="${proj.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${proj.shortDescription}</p>
      
      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--pcb-cyan);">Architecture & Key Capabilities</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.5rem;">
        ${proj.keyFeatures.map((f) => `<li style="display: flex; gap: 0.6rem; font-size: 0.95rem; color: var(--text-secondary);"><i class="fas fa-microchip" style="color: var(--pcb-green); margin-top: 0.25rem;"></i><span>${f}</span></li>`).join("")}
      </ul>

      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--pcb-cyan);">Implemented Technologies & Concepts</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem;">
        ${proj.technologies.map((t) => `<span class="badge badge-cyan">${t}</span>`).join("")}
      </div>

      <div style="padding: 1rem; background: var(--bg-tertiary); border: 1px dashed var(--border-subtle); border-radius: 8px; font-size: 0.85rem; color: var(--text-muted);">
        <i class="fas fa-info-circle" style="color: var(--pcb-copper); margin-right: 0.4rem;"></i>
        Source code and live hardware demonstrations are shared during interview rounds and college placement evaluations upon request.
      </div>
    `;

    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. CONTACT FORM & TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const subjectInput = document.getElementById("contactSubject");
  const messageInput = document.getElementById("contactMessage");
  const submitBtn = document.getElementById("contactSubmitBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, "Please enter your name.");
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please provide a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
      showError(subjectInput, "Subject must be at least 3 characters.");
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(messageInput, "Message must contain at least 10 characters.");
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) return;

    // Simulate sending state
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Transmission...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
      form.reset();

      showToast("Transmission Prepared! Your message details are ready. Email client fallback or Formspree integration is pre-configured.", "success");
    }, 900);
  });

  function showError(inputEl, msg) {
    const errorEl = inputEl.parentElement.querySelector(".form-field-error");
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add("active");
    }
    inputEl.style.borderColor = "#ef4444";
  }

  function clearError(inputEl) {
    const errorEl = inputEl.parentElement.querySelector(".form-field-error");
    if (errorEl) {
      errorEl.classList.remove("active");
    }
    inputEl.style.borderColor = "";
  }
}

// Global Toast System
function showToast(message, type = "success") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease-in";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   6. SCROLL TO TOP
   ========================================================================== */
function initScrollTop() {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
