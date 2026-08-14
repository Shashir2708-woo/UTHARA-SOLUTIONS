/**
 * UTTHARA SOLUTIONS - Sidebar Navigation Component (Neumorphic Gold Theme)
 * Developed by UTTHARA SOLUTIONS
 */

class NavComponent {
  render(container) {
    const navSections = [
      {
        title: 'Core Platform',
        items: [
          { id: 'dashboard', label: 'Executive Dashboard', icon: 'layout-dashboard' },
          { id: 'organizations', label: 'Organizations', icon: 'building' },
          { id: 'factories', label: 'Factories & Lines', icon: 'factory' },
          { id: 'machines', label: 'Machine Inventory', icon: 'hard-drive' },
          { id: 'passports', label: 'Digital Passports', icon: 'qr-code' },
          { id: 'digital-twin', label: 'Digital Twin (2D/3D)', icon: 'box', badge: 'Interactive' }
        ]
      },
      {
        title: 'IoT & AI Intelligence',
        items: [
          { id: 'iot', label: 'Industrial Telemetry', icon: 'activity' },
          { id: 'ai', label: 'Factory Agent', icon: 'bot', badge: 'RAG' },
          { id: 'knowledge', label: 'Knowledge Base & SOPs', icon: 'book-open' }
        ]
      },
      {
        title: 'Industrial Modules',
        items: [
          { id: 'maintenance', label: 'Predictive Maintenance', icon: 'wrench' },
          { id: 'production', label: 'Production & OEE', icon: 'gauge' },
          { id: 'quality', label: 'Quality Control', icon: 'check-circle' },
          { id: 'inventory', label: 'Spare Parts & Materials', icon: 'boxes' },
          { id: 'hr', label: 'Workforce & Roster', icon: 'users' },
          { id: 'finance', label: 'Financial Analytics', icon: 'dollar-sign', perm: 'finance:view' }
        ]
      },
      {
        title: 'Governance & Security',
        items: [
          { id: 'reports', label: 'Executive Reports', icon: 'file-text' },
          { id: 'notifications', label: 'Alert Center', icon: 'bell' },
          { id: 'audit', label: 'Security Audit Log', icon: 'shield-alert' },
          { id: 'settings', label: 'System Settings', icon: 'settings' }
        ]
      }
    ];

    container.innerHTML = `
      <nav class="flex flex-col h-full py-4 overflow-y-auto bg-slate-50 border-r border-amber-200/60">
        ${navSections.map(sec => `
          <div class="px-4 mb-4">
            <span class="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 px-2 block mb-2 font-mono">${sec.title}</span>
            <div class="flex flex-col gap-1">
              ${sec.items
                .filter(item => !item.perm || window.Auth.hasPermission(item.perm))
                .map(item => `
                  <a href="#${item.id}" id="nav-link-${item.id}" class="nav-item flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-amber-950 hover:bg-amber-100/50 transition-all text-decoration-none">
                    <div class="flex items-center gap-3">
                      <i data-lucide="${item.icon}" class="w-4 h-4 text-amber-800"></i>
                      <span>${item.label}</span>
                    </div>
                    ${item.badge ? `
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                        ${item.badge}
                      </span>
                    ` : ''}
                  </a>
                `).join('')}
            </div>
          </div>
        `).join('')}
      </nav>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setActive(routeId) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.remove('bg-amber-100/80', 'text-amber-950', 'font-extrabold', 'border-l-4', 'border-amber-600', 'shadow-sm');
      el.classList.add('text-slate-700');
    });

    const activeEl = document.getElementById(`nav-link-${routeId}`);
    if (activeEl) {
      activeEl.classList.add('bg-amber-100/80', 'text-amber-950', 'font-extrabold', 'border-l-4', 'border-amber-600', 'shadow-sm');
      activeEl.classList.remove('text-slate-700');
    }
  }
}

window.Nav = new NavComponent();
