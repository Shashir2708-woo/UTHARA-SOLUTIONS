/**
 * UTTHARA SOLUTIONS - Machine Inventory & Passports Launcher Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderMachinesModule(container) {
  const org = window.Auth.getCurrentOrg();
  const machines = window.FVDB.getMachines(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="hard-drive" class="w-5 h-5 text-sky-600"></i>
            Industrial Machine Inventory
          </h1>
          <p class="text-xs text-slate-600 mt-1">Master machine inventory, operational states, criticality ratings, and Machine Digital Passports.</p>
        </div>

        <button class="btn btn-primary btn-sm shadow-sm" onclick="window.Toast.show('Machines', 'Machine registration form opened.', 'info')">
          + Register Industrial Machine
        </button>
      </div>

      <div class="fv-card">
        <div class="table-container">
          <table class="fv-table">
            <thead>
              <tr>
                <th>Machine Name & Serial</th>
                <th>Manufacturer / Model</th>
                <th>Machine Type</th>
                <th>Status</th>
                <th>Health Score</th>
                <th>Criticality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${machines.map(m => `
                <tr>
                  <td class="font-bold text-slate-900">
                    <div>${m.name}</div>
                    <span class="text-slate-500 font-mono text-[11px]">SN: ${m.serialNumber}</span>
                  </td>
                  <td class="text-slate-600 text-xs font-mono">${m.manufacturer}<br/>${m.model}</td>
                  <td class="text-slate-800 text-xs font-semibold">${m.type}</td>
                  <td>
                    <span class="status-badge status-${m.status.toLowerCase()}">
                      <span class="status-dot"></span> ${m.status}
                    </span>
                  </td>
                  <td class="font-mono font-bold ${m.healthScore < 70 ? 'text-red-600' : 'text-emerald-700'}">
                    ${m.healthScore}%
                  </td>
                  <td>
                    <span class="text-xs font-bold font-mono px-2 py-0.5 rounded ${m.criticality === 'Critical' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-slate-100 text-slate-700 border border-slate-300'}">
                      ${m.criticality}
                    </span>
                  </td>
                  <td>
                    <button onclick="window.PassportModule.openPassport('${m.id}')" class="btn btn-ai btn-sm shadow-sm">
                      <i data-lucide="qr-code" class="w-3.5 h-3.5"></i>
                      Passport
                    </button>
                  </td>
                </tr>
              `).join('')}
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

window.Router.register('machines', renderMachinesModule);
