/**
 * UTTHARA SOLUTIONS - Factories & Production Lines Hierarchy Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderFactoriesModule(container) {
  const org = window.Auth.getCurrentOrg();
  const factories = window.FVDB.getFactories(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="factory" class="w-5 h-5 text-sky-600"></i>
            Factories & Production Hierarchy
          </h1>
          <p class="text-xs text-slate-600 mt-1">Multi-factory topology: Factory → Department → Production Line → Machines.</p>
        </div>
        <button class="btn btn-primary btn-sm shadow-sm" onclick="window.Toast.show('Factories', 'New Factory facility creation form.', 'info')">
          + Add New Factory Facility
        </button>
      </div>

      <div class="grid grid-cols-2 gap-6">
        ${factories.map(f => {
          const depts = window.FVDB.getDepartments(f.id);
          const lines = window.FVDB.getProductionLines(f.id);

          return `
            <div class="fv-card">
              <div class="fv-card-header">
                <span class="text-xs font-bold font-mono text-sky-700">${f.id}</span>
                <span class="status-badge status-running">${f.status}</span>
              </div>
              <h2 class="text-lg font-bold text-slate-900 mb-1">${f.name}</h2>
              <p class="text-xs text-slate-600 mb-4"><i data-lucide="map-pin" class="w-3.5 h-3.5 inline"></i> ${f.location}</p>

              <!-- Departments list -->
              <div class="mb-4">
                <span class="text-[11px] font-bold uppercase text-slate-500 block mb-2 font-mono">Departments & Lines</span>
                <div class="flex flex-col gap-2">
                  ${depts.map(d => `
                    <div class="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs">
                      <div class="flex justify-between items-center mb-1">
                        <strong class="text-slate-900">${d.name}</strong>
                        <span class="text-slate-500 text-[10px]">Manager: ${d.manager}</span>
                      </div>
                      <div class="flex gap-2">
                        ${lines.filter(l => l.departmentId === d.id).map(l => `
                          <span class="px-2 py-0.5 rounded bg-white border border-slate-300 text-[11px] font-mono text-sky-800 font-bold">
                            ${l.name} (OEE: ${l.currentOee}%)
                          </span>
                        `).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="flex justify-between items-center pt-3 border-t border-slate-200">
                <span class="text-xs text-slate-600 font-mono">${f.operatingHours}</span>
                <button onclick="window.Router.navigate('digital-twin')" class="btn btn-secondary btn-sm">
                  View in 3D Digital Twin →
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('factories', renderFactoriesModule);
