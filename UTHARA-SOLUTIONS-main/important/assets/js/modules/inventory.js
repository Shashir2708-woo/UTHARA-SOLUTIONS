/**
 * UTTHARA SOLUTIONS - Spare Parts & Materials Inventory Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderInventoryModule(container) {
  const org = window.Auth.getCurrentOrg();

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="boxes" class="w-5 h-5 text-sky-600"></i>
            Spare Parts & Critical Inventory
          </h1>
          <p class="text-xs text-slate-600 mt-1">Machine replacement components, reorder thresholds, and warehouse stock levels.</p>
        </div>
      </div>

      <div class="fv-card">
        <div class="fv-card-header"><div class="fv-card-title text-slate-900">Critical Machine Spare Parts</div></div>
        <div class="table-container">
          <table class="fv-table">
            <thead>
              <tr>
                <th>Part Number</th>
                <th>Part Description</th>
                <th>Compatible Machine</th>
                <th>Stock Quantity</th>
                <th>Reorder Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-mono text-xs text-sky-700 font-bold">SP-H-9921</td>
                <td class="text-slate-900 font-semibold">High Precision Spindle Bearing Set</td>
                <td class="text-slate-600 text-xs">Haas VF-4SS CNC</td>
                <td class="font-mono font-bold text-slate-900">2 Units</td>
                <td class="font-mono text-xs text-slate-500">1 Unit</td>
                <td><span class="status-badge status-running">In Stock</span></td>
              </tr>
              <tr>
                <td class="font-mono text-xs text-sky-700 font-bold">KUK-ACT-01</td>
                <td class="text-slate-900 font-semibold">Axis 3 Servo Motor Encoder</td>
                <td class="text-slate-600 text-xs">KUKA KR-210 Robotic Welder</td>
                <td class="font-mono font-bold text-amber-700">1 Unit</td>
                <td class="font-mono text-xs text-slate-500">1 Unit</td>
                <td><span class="status-badge status-warning">Low Stock</span></td>
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

window.Router.register('inventory', renderInventoryModule);
