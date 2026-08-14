/**
 * UTTHARA SOLUTIONS - Public Operations Intelligence Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicOperationsPage(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Executive Control</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Manufacturing Operations Intelligence</h1>
        <p class="text-xs text-slate-600 mt-2">Aggregate shop floor data into high-level plant health metrics, OEE indicators, and bottleneck predictions.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="stat-card">
          <span class="stat-label">Plant Overall OEE</span>
          <span class="stat-value text-amber-800">84.2%</span>
          <span class="stat-meta positive">Target 88.0%</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Active Machines</span>
          <span class="stat-value text-emerald-700">4 Connected</span>
          <span class="stat-meta positive">Telemetry Active</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Critical Alerts</span>
          <span class="stat-value text-amber-700">2 Alerts</span>
          <span class="stat-meta warning">Spindle Temp & Vib</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Quality Yield</span>
          <span class="stat-value text-purple-700">99.4%</span>
          <span class="stat-meta positive">CMM Scan Pass</span>
        </div>
      </div>

      <div class="fv-card p-8 text-center flex flex-col items-center justify-center gap-4">
        <h2 class="text-2xl font-bold text-amber-950">View Live Operations Console</h2>
        <p class="text-xs text-slate-600 max-w-xl">Explore live executive dashboards, machine status matrices, and automated daily AI briefings.</p>
        <a href="#dashboard" class="btn btn-primary btn-lg shadow-md">
          <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
          Open Live Operations Dashboard
        </a>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-operations', renderPublicOperationsPage);
