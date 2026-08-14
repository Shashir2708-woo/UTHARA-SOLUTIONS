/**
 * UTTHARA SOLUTIONS - Header Component with Classic Neumorphic Gold Theme
 * Developed by UTTHARA SOLUTIONS
 */

class HeaderComponent {
  render(container) {
    const currentOrg = window.Auth.getCurrentOrg();
    const currentRole = window.Auth.getRole();
    const notifications = window.FVDB.getNotifications(currentOrg.id);
    const unreadCount = notifications.filter(n => !n.read).length;

    container.innerHTML = `
      <header class="flex items-center justify-between h-full px-6 bg-surface border-b border-subtle shadow-sm">
        <!-- Logo & Branding -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-700 flex items-center justify-center font-bold text-white shadow-md border border-yellow-200">
              <i data-lucide="cpu" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-base tracking-wide text-amber-950">UTTHARA SOLUTIONS</span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold">OS v1.0 Enterprise</span>
              </div>
              <span class="text-xs text-amber-800 font-semibold block -mt-0.5">Autonomous AI Operating System</span>
            </div>
          </div>

          <div class="h-6 w-px bg-amber-200 mx-2 hidden sm:block"></div>

          <!-- Demo Client Website Label -->
          <div class="hidden sm:flex items-center gap-2 bg-amber-50/70 px-3 py-1.5 rounded-xl border border-amber-200 shadow-inner">
            <i data-lucide="globe" class="w-4 h-4 text-amber-700"></i>
            <span class="text-xs text-amber-800 font-bold whitespace-nowrap">Demo Client Website</span>
          </div>
        </div>

        <!-- Right Action Controls -->
        <div class="flex items-center gap-3">
          <!-- AI Assistant Quick Launch -->
          <button id="btn-ai-drawer" class="btn btn-ai btn-sm shadow-sm">
            <i data-lucide="sparkles" class="w-4 h-4 text-yellow-200"></i>
            <span class="hidden sm:inline">Factory Agent</span>
          </button>

          <!-- Notifications Button -->
          <button id="btn-notif-drawer" class="btn btn-secondary btn-icon relative">
            <i data-lucide="bell" class="w-4 h-4 text-amber-800"></i>
            ${unreadCount > 0 ? `
              <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                ${unreadCount}
              </span>
            ` : ''}
          </button>

          <!-- Theme Toggle -->
          <div class="theme-switch" title="Toggle dark / light theme">
            <input type="checkbox" id="hdr-theme-checkbox" class="theme-checkbox" aria-label="Toggle dark mode" />
            <label for="hdr-theme-checkbox" class="theme-label">
              <span class="theme-glyph theme-glyph-sun">☀</span>
              <span class="theme-glyph theme-glyph-moon">☾</span>
            </label>
          </div>

          <div class="h-6 w-px bg-amber-200 mx-1"></div>

          <!-- User Profile Summary -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700 to-yellow-600 border border-yellow-300 flex items-center justify-center font-bold text-xs text-white shadow-sm">
              ${window.Auth.getCurrentUser().name.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="hidden md:block">
              <span class="text-xs font-bold block text-slate-900">${window.Auth.getCurrentUser().name}</span>
              <span class="text-xs text-amber-800 font-semibold block -mt-0.5">${currentRole}</span>
            </div>
          </div>
        </div>
      </header>
    `;

    // Event Handlers
    document.getElementById('btn-ai-drawer').addEventListener('click', () => {
      window.Router.navigate('ai');
    });

    document.getElementById('btn-notif-drawer').addEventListener('click', () => {
      window.Router.navigate('notifications');
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
    if (window.Theme) {
      window.Theme.syncIcons();
    }

    document.getElementById('hdr-theme-checkbox').addEventListener('change', () => {
      window.Theme.toggle();
    });
  }
}

window.Header = new HeaderComponent();
