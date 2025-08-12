// site.js
document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     Shared: path + page map
  ========================== */
  const currentPath = window.location.pathname.toLowerCase();
  const expertisePages = {
    "crm-transformation.html": "CRM for DIGITAL TRANSFORMATION",
    "web-mobile-integration.html": "WEB and MOBILE Integration",
    "ai-utilization.html": "AI Utilization",
    "full-stack-development.html": "Full Stack Development"
  };

  /* =========================
     Expertise dropdown (desktop)
  ========================== */
  const toggle  = document.getElementById('expertise-toggle');
  const navItem = toggle?.closest('.nav-item');
  const panel   = document.getElementById('expertise-dropdown');

  if (toggle && navItem && panel) {
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    panel.setAttribute('role', 'menu');

    const open  = () => { navItem.classList.add('active');  toggle.setAttribute('aria-expanded', 'true'); };
    const close = () => { navItem.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); };
    const isOpen = () => navItem.classList.contains('active');

    // Click
    toggle.addEventListener('click', (e) => { e.preventDefault(); isOpen() ? close() : open(); });

    // Keyboard
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      if (e.key === 'Escape') { close(); toggle.focus(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); open(); panel.querySelector('a,button,[tabindex]')?.focus(); }
    });

    // Outside click / Esc
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
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    });

    (filterBar.querySelector('.btn[data-filter="all"]') || buttons[0])?.click();
  }

  /* =========================
     Highlight current page in Expertise (desktop)
  ========================== */
  Object.keys(expertisePages).forEach(file => {
    if (currentPath.endsWith(file)) {
      document.querySelectorAll('#expertise-dropdown .panel').forEach(p => {
        const heading = p.querySelector('h4')?.textContent.trim();
        if (heading === expertisePages[file]) p.classList.add('current-page');
      });
    }
  });

  /* =========================
     Prevent "#" jumps (CTA placeholders)
  ========================== */
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener('click', (e) => e.preventDefault());
  });

  /* =========================
     Mobile drawer
  ========================== */
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.getElementById('mobile-drawer');
  const closeBtn  = drawer?.querySelector('.drawer-close');
  const drawerInner = drawer?.querySelector('.mobile-drawer-inner');
  const focusables = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocusedBeforeOpen = null;

  if (hamburger && drawer) {
    const open = () => {
      lastFocusedBeforeOpen = document.activeElement;
      drawer.classList.add('is-open');
      hamburger.classList.add('is-active');
      drawer.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('body-locked');
      drawer.querySelector(focusables)?.focus();
    };

    const close = () => {
      drawer.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      drawer.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('body-locked');
      lastFocusedBeforeOpen?.focus?.() || hamburger.focus();
    };

    hamburger.addEventListener('click', () => {
      drawer.classList.contains('is-open') ? close() : open();
    });

    closeBtn?.addEventListener('click', close);

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!drawer.classList.contains('is-open')) return;
      if (!drawerInner?.contains(e.target) && !hamburger.contains(e.target)) close();
    });

    // Close when any link inside is clicked
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  /* =========================
     Highlight current page in Expertise (mobile)
  ========================== */
  Object.keys(expertisePages).forEach(file => {
    if (currentPath.endsWith(file)) {
      document.querySelectorAll('.mobile-panel').forEach(link => {
        const text = link.querySelector('span')?.textContent.trim();
        if (text === expertisePages[file]) link.classList.add('current-page');
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('teamModal');
  const modalCard = modal?.querySelector('.modal-card');
  const modalClose = document.getElementById('modalClose');
  const modalName  = document.getElementById('modalName');
  const modalRole  = document.getElementById('modalRole');
  const modalBio   = document.getElementById('modalBio');
  const modalAvatar= document.getElementById('modalAvatar');

  if (!modal) return;

  const openModal = ({ name, role, bio, imgSrc, imgAlt }) => {
    modalName.textContent = name || '';
    modalRole.textContent = role || '';
    modalBio.textContent  = bio  || '';
    modalAvatar.src = imgSrc || '';
    modalAvatar.alt = imgAlt || name || 'Team member';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };

  // Click on any team card to open
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name || card.querySelector('h3')?.textContent?.trim();
      const role = card.dataset.role || card.querySelector('.text-muted')?.textContent?.trim();
      const bio  = card.dataset.bio  || '';
      const img  = card.querySelector('img');
      openModal({
        name, role, bio,
        imgSrc: img?.getAttribute('src'),
        imgAlt: img?.getAttribute('alt') || name
      });
    });
  });

  // Close controls
  modalClose?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
});
