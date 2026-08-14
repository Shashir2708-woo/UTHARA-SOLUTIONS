/**
 * UTTHARA SOLUTIONS - Quality Control & Defect Inspection Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderQualityModule(container) {
  const org = window.Auth.getCurrentOrg();

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="check-circle" class="w-5 h-5 text-purple-600"></i>
            Quality Control & Defect Inspection
          </h1>
          <p class="text-xs text-slate-600 mt-1">Automated vision inspection logs, tolerance checks, and defect heatmaps.</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="stat-card">
          <span class="stat-label">First Pass Yield (FPY)</span>
          <span class="stat-value text-emerald-700">99.4%</span>
          <span class="stat-meta positive">+0.3% this month</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Scrap Rate</span>
          <span class="stat-value text-sky-700">0.42%</span>
          <span class="stat-meta positive">Below 0.5% target</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Defects Identified Today</span>
          <span class="stat-value text-amber-700">3 Units</span>
          <span class="stat-meta warning">Isolated to Machining Line C</span>
        </div>
      </div>

      <div class="fv-card">
        <div class="fv-card-header"><div class="fv-card-title text-slate-900">Recent Inspection Log</div></div>
        <div class="table-container">
          <table class="fv-table">
            <thead>
              <tr>
                <th>Batch #</th>
                <th>Product / Component</th>
                <th>Inspection Method</th>
                <th>Tolerance Standard</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-mono text-xs text-sky-700 font-bold">B-2026-991</td>
                <td class="text-slate-900 font-semibold">Engine Crankshaft Housing</td>
                <td class="text-slate-600 text-xs">CMM Laser Probe Scan</td>
                <td class="text-slate-600 font-mono text-xs">±0.005 mm</td>
                <td><span class="status-badge status-running">PASS</span></td>
              </tr>
              <tr>
                <td class="font-mono text-xs text-sky-700 font-bold">B-2026-992</td>
                <td class="text-slate-900 font-semibold">Stamped Body Side Panel</td>
                <td class="text-slate-600 text-xs">Optical Vision Camera</td>
                <td class="text-slate-600 font-mono text-xs">Surface Contour</td>
                <td><span class="status-badge status-warning">REWORK</span></td>
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

window.Router.register('quality', renderQualityModule);
