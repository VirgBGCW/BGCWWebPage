// site.js

document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     Expertise dropdown (ARIA + keyboard)
  ========================== */
  const toggle = document.getElementById('expertise-toggle');
  const navItem = toggle?.closest('.nav-item');
  const panel = document.getElementById('expertise-dropdown');

  if (toggle && navItem && panel) {
    // ARIA wiring
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    panel.setAttribute('role', 'menu');

    const open = () => { navItem.classList.add('active'); toggle.setAttribute('aria-expanded', 'true'); };
    const close = () => { navItem.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); };
    const isOpen = () => navItem.classList.contains('active');

    // Click / touch
    toggle.addEventListener('click', (e) => { e.preventDefault(); isOpen() ? close() : open(); });

    // Keyboard on toggle
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      if (e.key === 'Escape') { close(); toggle.focus(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); open(); panel.querySelector('a,button,[tabindex]')?.focus(); }
    });

    // Close on outside click / Escape anywhere
    document.addEventListener('click', (e) => { if (!navItem.contains(e.target)) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* =========================
     Project filters (work.html)
  ========================== */
  const filterBar = document.getElementById('filters');
  if (filterBar) {
    const buttons = filterBar.querySelectorAll('.btn');
    const projects = document.querySelectorAll('.project');

    const applyFilter = (value) => {
      projects.forEach(p => {
        const tags = (p.getAttribute('data-tags') || '').split(/\s+/);
        const show = value === 'all' || tags.includes(value);
        p.style.display = show ? '' : 'none';
      });
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // active state
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    });

    // Optional: default to 'all'
    const defaultBtn = filterBar.querySelector('.btn[data-filter="all"]') || buttons[0];
    defaultBtn?.click();
  }
/* ligh panel */
// Highlight current page in Expertise dropdown
const currentPath = window.location.pathname.toLowerCase();

// Map page filenames to dropdown panel selectors
const expertisePages = {
  "crm-transformation.html": "CRM for DIGITAL TRANSFORMATION",
  "web-mobile-integration.html": "WEB and MOBILE Integration",
  "ai-utilization.html": "AI Utilization",
  "full-stack-development.html": "Full Stack Development"
};

// Find which matches the current URL
Object.keys(expertisePages).forEach(file => {
  if (currentPath.endsWith(file)) {
    const panels = document.querySelectorAll('#expertise-dropdown .panel');
    panels.forEach(panel => {
      const heading = panel.querySelector("h4")?.textContent.trim();
      if (heading === expertisePages[file]) {
        panel.classList.add("current-page");
      }
    });
  }
});

  /* =========================
     Minor: prevent # links jumping to top for CTA placeholders
  ========================== */
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener('click', (e) => e.preventDefault());
  });
});
// MOBILE NAV
(function () {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = drawer?.querySelector('.drawer-close');

  if (!hamburger || !drawer) return;

  const open = () => {
    drawer.classList.add('is-open');
    hamburger.classList.add('is-active');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('body-locked');
  };

  const close = () => {
    drawer.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('body-locked');
    hamburger.focus();
  };

  // Toggle with button
  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    isOpen ? close() : open();
  });

  // Close button
  closeBtn?.addEventListener('click', close);

  // Close on ESC or click outside
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !hamburger.contains(e.target) && drawer.classList.contains('is-open')) {
      close();
    }
  });

  // Optional: close when a mobile link is clicked
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { close(); });
  });
})();
// Also highlight mobile Expertise links
Object.keys(expertisePages).forEach(file => {
  if (currentPath.endsWith(file)) {
    const mobileLinks = document.querySelectorAll('.mobile-panel');
    mobileLinks.forEach(link => {
      const text = link.querySelector("span")?.textContent.trim();
      if (text === expertisePages[file]) {
        link.classList.add("current-page");
      }
    });
  }
});
