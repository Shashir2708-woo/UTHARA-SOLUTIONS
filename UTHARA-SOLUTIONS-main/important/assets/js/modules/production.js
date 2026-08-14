/**
 * UTTHARA SOLUTIONS - Production Line & OEE Analytics Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderProductionModule(container) {
  const org = window.Auth.getCurrentOrg();

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="gauge" class="w-5 h-5 text-emerald-600"></i>
            Production Lines & OEE Intelligence
          </h1>
          <p class="text-xs text-slate-600 mt-1">Overall Equipment Effectiveness (Availability x Performance x Quality) tracking.</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="stat-card">
          <span class="stat-label">Availability Factor</span>
          <span class="stat-value text-emerald-700">92.4%</span>
          <span class="stat-meta positive">Planned vs Unplanned Uptime</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Performance Factor</span>
          <span class="stat-value text-sky-700">94.8%</span>
          <span class="stat-meta positive">Actual vs Ideal Cycle Times</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Quality Yield Factor</span>
          <span class="stat-value text-purple-700">99.1%</span>
          <span class="stat-meta positive">First Pass Yield</span>
        </div>
      </div>

      <div class="fv-card">
        <div class="fv-card-header">
          <div class="fv-card-title text-slate-900">Production Line OEE Matrix</div>
        </div>
        <div class="table-container">
          <table class="fv-table">
            <thead>
              <tr>
                <th>Production Line</th>
                <th>Department</th>
                <th>Target OEE</th>
                <th>Current OEE</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-bold text-slate-900">Line A - High Pressure Press</td>
                <td class="text-slate-600 text-xs">Stamping & Pressing</td>
                <td class="font-mono text-xs text-slate-800 font-bold">88%</td>
                <td class="font-mono font-bold text-emerald-700">84.5%</td>
                <td><span class="status-badge status-running">Running</span></td>
              </tr>
              <tr>
                <td class="font-bold text-slate-900">Line B - Robotic Spot Welding</td>
                <td class="text-slate-600 text-xs">Robotic Welding</td>
                <td class="font-mono text-xs text-slate-800 font-bold">92%</td>
                <td class="font-mono font-bold text-emerald-700">91.2%</td>
                <td><span class="status-badge status-running">Running</span></td>
              </tr>
              <tr>
                <td class="font-bold text-slate-900">Line C - 5-Axis CNC Cell</td>
                <td class="text-slate-600 text-xs">Precision Machining</td>
                <td class="font-mono text-xs text-slate-800 font-bold">90%</td>
                <td class="font-mono font-bold text-amber-700">76.8%</td>
                <td><span class="status-badge status-warning">Warning</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('production', renderProductionModule);
