/**
 * UTTHARA SOLUTIONS - Financial Analytics & Machine ROI Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderFinanceModule(container) {
  const org = window.Auth.getCurrentOrg();

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="dollar-sign" class="w-5 h-5 text-emerald-600"></i>
            Financial Analytics & Downtime Cost Engine
          </h1>
          <p class="text-xs text-slate-600 mt-1">Machine asset ROI, energy bill analytics, and financial cost of unplanned downtime.</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="stat-card">
          <span class="stat-label">Daily Revenue Generated</span>
          <span class="stat-value text-emerald-700">$48,200</span>
          <span class="stat-meta positive">Target $45,000/day</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Cost of Unplanned Downtime</span>
          <span class="stat-value text-red-600">$2,400</span>
          <span class="stat-meta negative">1.4 hrs CNC speed throttling</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Energy Cost (PZEM Metering)</span>
          <span class="stat-value text-sky-700">$1,180</span>
          <span class="stat-meta positive">1,420 kWh consumed</span>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('finance', renderFinanceModule);
