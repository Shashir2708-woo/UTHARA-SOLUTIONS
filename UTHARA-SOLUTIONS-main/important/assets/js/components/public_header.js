/**
 * UTTHARA SOLUTIONS - Public Marketing Navigation Header
 * Developed by UTTHARA SOLUTIONS
 */

class PublicHeaderComponent {
  render(container) {
    const publicNavItems = [
      { id: 'public-home', label: 'Home', icon: 'home' },
      { id: 'public-platform', label: 'Platform', icon: 'layers' },
      { id: 'public-features', label: 'Features', icon: 'sparkles' },
      { id: 'public-ai', label: 'AI Solutions', icon: 'brain-circuit' },
      { id: 'public-twin', label: 'Digital Twin', icon: 'box' },
      { id: 'public-passport', label: 'Passports', icon: 'qr-code' },
      { id: 'public-iot', label: 'Industrial IoT', icon: 'activity' },
      { id: 'public-operations', label: 'Operations', icon: 'settings-2' },
      { id: 'public-industries', label: 'Industries', icon: 'factory' },
      { id: 'public-pricing', label: 'Pricing', icon: 'tag' },
      { id: 'public-journey', label: 'Journey', icon: 'route' },
      { id: 'public-resources', label: 'Resources', icon: 'book-open' },
      { id: 'public-about', label: 'About', icon: 'info' },
      { id: 'public-contact', label: 'Contact', icon: 'mail' }
    ];

    container.innerHTML = `
      <header class="w-full bg-white border-b border-amber-200/80 shadow-md sticky top-0 z-50">
        <!-- Top Announcement Bar -->
        <div class="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white text-[11px] font-bold py-1 px-6 flex justify-between items-center tracking-wide">
          <div class="flex items-center gap-2">
            <span class="px-1.5 py-0.5 rounded bg-yellow-400 text-amber-950 font-mono text-[10px] font-extrabold uppercase">UTTHARA AI</span>
            <span class="hidden sm:inline">UTTHARA SOLUTIONS — Autonomous AI Operating System for Smart Manufacturing</span>
          </div>
          <div class="hidden md:flex items-center gap-4">
            <a href="#sales-portal" class="text-yellow-200 hover:text-white transition-colors flex items-center gap-1 text-decoration-none">
              <i data-lucide="shield-check" class="w-3 h-3"></i> Internal Sales Portal
            </a>
            <span class="text-amber-300">|</span>
            <a href="#public-demo-status" class="text-yellow-100 hover:text-white transition-colors flex items-center gap-1 text-decoration-none">
              <i data-lucide="search" class="w-3 h-3"></i> Track Demo Status
            </a>
            <span class="text-amber-300">|</span>
            <a href="#login" class="text-yellow-100 hover:text-white transition-colors flex items-center gap-1 text-decoration-none">
              <i data-lucide="lock" class="w-3 h-3"></i> Customer Login
            </a>
          </div>
        </div>

        <!-- Main Marketing Navigation Bar -->
        <div class="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <!-- Left: Menu Toggle + Logo & Brand -->
          <div class="flex items-center gap-2 sm:gap-3 min-w-0">
            <!-- Sidebar Menu Toggle (Hamburger) -->
            <button id="pub-menu-toggle" class="btn btn-secondary btn-icon shrink-0" aria-label="Open menu" title="Open menu">
              <i data-lucide="menu" class="w-5 h-5 text-amber-900"></i>
            </button>

            <a href="#public-home" class="flex items-center gap-2 sm:gap-3 text-decoration-none min-w-0">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-700 flex items-center justify-center font-bold text-white shadow-md border border-yellow-300 shrink-0">
                <i data-lucide="cpu" class="w-5 h-5"></i>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <span class="font-extrabold text-base sm:text-lg text-amber-950 tracking-tight truncate">UTTHARA SOLUTIONS</span>
                  <span class="hidden sm:inline text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shrink-0">UTTHARA OS</span>
                </div>
                <span class="hidden md:block text-[11px] text-amber-800 font-semibold -mt-0.5 truncate">Smart Manufacturing OS</span>
              </div>
            </a>
          </div>

          <!-- Right: CTAs -->
          <div class="flex items-center gap-1.5 sm:gap-2">
            <a href="#public-demo-status" class="btn btn-secondary btn-sm shadow-sm">
              <i data-lucide="search" class="w-3.5 h-3.5 text-amber-800 shrink-0"></i>
              <span class="hidden sm:inline">Track Demo</span>
            </a>
            <a href="#public-book-demo" class="btn btn-primary btn-sm shadow-md">
              <i data-lucide="calendar" class="w-4 h-4 shrink-0"></i>
              <span class="hidden sm:inline">Book a Demo</span>
            </a>
            <a href="#dashboard" class="btn btn-secondary btn-sm shadow-sm hidden xl:flex">
              <i data-lucide="layout-dashboard" class="w-4 h-4 text-amber-800 shrink-0"></i>
              <span class="hidden sm:inline">Website Demo</span>
            </a>

            <!-- Theme Toggle -->
            <div class="theme-switch shrink-0" title="Toggle dark / light theme">
              <input type="checkbox" id="pub-theme-checkbox" class="theme-checkbox" aria-label="Toggle dark mode" />
              <label for="pub-theme-checkbox" class="theme-label">
                <span class="theme-glyph theme-glyph-sun">☀</span>
                <span class="theme-glyph theme-glyph-moon">☾</span>
              </label>
            </div>
          </div>
        </div>
      </header>

      <!-- Off-canvas Sidebar Navigation Drawer -->
      <div id="pub-menu-backdrop" class="drawer-backdrop left">
        <aside class="drawer-panel" style="width: 320px; max-width: 85vw;">
          <div class="drawer-header">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-700 flex items-center justify-center text-white shadow-sm border border-yellow-300">
                <i data-lucide="cpu" class="w-4 h-4"></i>
              </div>
              <h3 class="text-base font-bold text-amber-950">Menu</h3>
            </div>
            <button id="pub-menu-close" class="btn btn-secondary btn-icon" aria-label="Close menu">
              <i data-lucide="x" class="w-4 h-4 text-amber-900"></i>
            </button>
          </div>
          <div class="drawer-body">
            <nav class="flex flex-col gap-1">
              ${publicNavItems.map(item => `
                <a href="#${item.id}" id="pub-nav-${item.id}" class="pub-nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-amber-950 hover:bg-amber-50 transition-all text-decoration-none">
                  <i data-lucide="${item.icon}" class="w-4 h-4 text-amber-800"></i>
                  <span>${item.label}</span>
                </a>
              `).join('')}
            </nav>
            <div class="mt-6 pt-5 border-t border-amber-100 flex flex-col gap-2">
              <a href="#public-demo-status" class="btn btn-secondary btn-sm">
                <i data-lucide="search" class="w-3.5 h-3.5 text-amber-800"></i>
                Track Demo
              </a>
              <a href="#public-book-demo" class="btn btn-primary btn-sm">
                <i data-lucide="calendar" class="w-4 h-4"></i>
                Book a Demo
              </a>
            </div>
          </div>
        </aside>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
    if (window.Theme) {
      window.Theme.syncIcons();
    }

    // Theme Toggle
    const themeCheckbox = container.querySelector('#pub-theme-checkbox');
    if (themeCheckbox) {
      themeCheckbox.addEventListener('change', () => window.Theme.toggle());
    }

    // Sidebar Menu Toggle Logic
    const menuBackdrop = container.querySelector('#pub-menu-backdrop');
    const menuToggle = container.querySelector('#pub-menu-toggle');
    const menuClose = container.querySelector('#pub-menu-close');

    const openMenu = () => menuBackdrop.classList.add('open');
    const closeMenu = () => menuBackdrop.classList.remove('open');

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    menuBackdrop.addEventListener('click', (e) => {
      if (e.target === menuBackdrop) closeMenu();
    });
    menuBackdrop.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  setActive(routeId) {
    document.querySelectorAll('.pub-nav-link').forEach(el => {
      el.classList.remove('text-amber-950', 'bg-amber-100', 'font-extrabold');
      el.classList.add('text-slate-700');
    });

    const activeEl = document.getElementById(`pub-nav-${routeId}`);
    if (activeEl) {
      activeEl.classList.add('text-amber-950', 'bg-amber-100', 'font-extrabold');
      activeEl.classList.remove('text-slate-700');
    }
  }
}

window.PublicHeader = new PublicHeaderComponent();
