/**
 * UTTHARA SOLUTIONS - Predictive Maintenance & Work Orders Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderMaintenanceModule(container) {
  const org = window.Auth.getCurrentOrg();

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="wrench" class="w-5 h-5 text-amber-600"></i>
            Predictive Maintenance & Work Orders
          </h1>
          <p class="text-xs text-slate-600 mt-1">AI failure risk scoring, scheduled PM cycles, and active maintenance work orders.</p>
        </div>

        <button class="btn btn-primary btn-sm shadow-sm" onclick="window.Toast.show('Work Order', 'New Maintenance Work Order created.', 'success')">
          + Create Work Order
        </button>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="stat-card">
          <span class="stat-label">AI Predictive Risk Score</span>
          <span class="stat-value text-amber-700">Medium (34%)</span>
          <span class="stat-meta warning">1 machine elevated (Haas VF-4SS)</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Open Work Orders</span>
          <span class="stat-value text-sky-700">2 Active</span>
          <span class="stat-meta positive">Technicians assigned</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">MTBF (Mean Time Between Failures)</span>
          <span class="stat-value text-emerald-700">420 Hours</span>
          <span class="stat-meta positive">+14% improvement YTD</span>
        </div>
      </div>

      <div class="fv-card">
        <div class="fv-card-header">
          <div class="fv-card-title text-slate-900">Active Maintenance Work Orders</div>
        </div>
        <div class="table-container">
          <table class="fv-table">
            <thead>
              <tr>
                <th>WO ID</th>
                <th>Target Machine</th>
                <th>Maintenance Type</th>
                <th>Assigned Technician</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-mono text-xs text-sky-700 font-bold">WO-2026-0811</td>
                <td class="text-slate-900 font-semibold">Haas VF-4SS CNC Machine</td>
                <td class="text-slate-600 text-xs">Spindle Fan & Bearing Inspection</td>
                <td class="text-slate-800 text-xs font-semibold">Rajesh K. Kumar</td>
                <td><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">HIGH</span></td>
                <td><span class="status-badge status-warning">In Progress</span></td>
              </tr>
              <tr>
                <td class="font-mono text-xs text-sky-700 font-bold">WO-2026-0809</td>
                <td class="text-slate-900 font-semibold">Schuler 1000T Stamping Press</td>
                <td class="text-slate-600 text-xs">Hydraulic Oil Filter Replacement</td>
                <td class="text-slate-800 text-xs font-semibold">Suresh Raina</td>
                <td><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">MEDIUM</span></td>
                <td><span class="status-badge status-running">Completed</span></td>
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

window.Router.register('maintenance', renderMaintenanceModule);
