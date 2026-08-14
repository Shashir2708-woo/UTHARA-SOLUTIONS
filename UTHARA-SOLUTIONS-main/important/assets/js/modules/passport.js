/**
 * UTTHARA SOLUTIONS - Machine Digital Passport Inspector Drawer (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

class PassportModule {
  static openPassport(machineId) {
    const machine = window.FVDB.getMachineById(machineId);
    if (!machine) {
      alert('Machine passport not found.');
      return;
    }

    const passport = window.FVDB.getPassport(machineId) || {
      serialNumber: machine.serialNumber,
      commissioningDate: machine.installationDate,
      warrantyExpiration: '2027-01-01',
      supplier: machine.manufacturer + ' Official',
      specifications: { Power: '22 kW', Status: machine.status },
      manuals: [],
      maintenanceHistory: [],
      spareParts: [],
      defectsHistory: [],
      aiRecommendations: []
    };

    const telemetry = window.API.getLiveTelemetry(machineId);

    const passportHtml = `
      <div class="flex flex-col gap-6">
        <!-- Machine Header Banner -->
        <div class="p-4 rounded-lg bg-white border border-slate-200 flex justify-between items-center shadow-sm">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-bold text-slate-900">${machine.name}</h2>
              <span class="status-badge status-${machine.status.toLowerCase()}">
                <span class="status-dot"></span> ${machine.status}
              </span>
            </div>
            <span class="text-xs text-slate-500 font-mono">Serial #: ${machine.serialNumber} | Model: ${machine.model}</span>
          </div>
          <div class="text-right">
            <span class="text-xs text-slate-500 block uppercase tracking-wider font-semibold">Health Score</span>
            <span class="text-2xl font-bold font-mono ${machine.healthScore < 70 ? 'text-red-600' : 'text-emerald-600'}">${machine.healthScore}%</span>
          </div>
        </div>

        <!-- Real-Time Telemetry Gauge Inspector -->
        <div class="passport-section">
          <div class="passport-section-title">
            <i data-lucide="activity" class="w-4 h-4 text-sky-600"></i>
            Live Telemetry Stream (ESP32 Gateway Node)
          </div>
          <div class="grid grid-cols-4 gap-3 text-center">
            <div class="p-3 bg-slate-50 rounded border border-slate-200">
              <span class="text-[10px] text-slate-500 uppercase block font-semibold">Spindle Vibration</span>
              <span class="text-base font-bold font-mono text-sky-700">${telemetry.vibration} mm/s</span>
            </div>
            <div class="p-3 bg-slate-50 rounded border border-slate-200">
              <span class="text-[10px] text-slate-500 uppercase block font-semibold">Core Temperature</span>
              <span class="text-base font-bold font-mono ${telemetry.temperature > 65 ? 'text-amber-700' : 'text-emerald-700'}">${telemetry.temperature} °C</span>
            </div>
            <div class="p-3 bg-slate-50 rounded border border-slate-200">
              <span class="text-[10px] text-slate-500 uppercase block font-semibold">Current Draw</span>
              <span class="text-base font-bold font-mono text-purple-700">${telemetry.current} A</span>
            </div>
            <div class="p-3 bg-slate-50 rounded border border-slate-200">
              <span class="text-[10px] text-slate-500 uppercase block font-semibold">Power Consumption</span>
              <span class="text-base font-bold font-mono text-blue-700">${telemetry.powerKw} kW</span>
            </div>
          </div>
        </div>

        <!-- Specifications & Supplier -->
        <div class="passport-section">
          <div class="passport-section-title">
            <i data-lucide="info" class="w-4 h-4 text-sky-600"></i>
            Machine Specifications & Warranties
          </div>
          <div class="passport-grid-kv">
            <div class="kv-item"><span class="kv-label">Manufacturer</span><span class="kv-value text-slate-900">${machine.manufacturer}</span></div>
            <div class="kv-item"><span class="kv-label">Commissioning Date</span><span class="kv-value text-slate-900">${passport.commissioningDate}</span></div>
            <div class="kv-item"><span class="kv-label">Warranty Expiration</span><span class="kv-value text-slate-900">${passport.warrantyExpiration}</span></div>
            <div class="kv-item"><span class="kv-label">Authorized Supplier</span><span class="kv-value text-slate-900">${passport.supplier}</span></div>
          </div>
        </div>

        <!-- AI Predictive Recommendations -->
        <div class="passport-section border-sky-300 bg-sky-50">
          <div class="passport-section-title text-sky-800">
            <i data-lucide="sparkles" class="w-4 h-4 text-sky-600"></i>
            AI Predictive Maintenance Intelligence
          </div>
          ${passport.aiRecommendations.map(r => `
            <div class="p-3 rounded bg-white border border-sky-200 text-xs">
              <span class="font-bold text-sky-900 block mb-1">${r.type} (${r.date})</span>
              <p class="text-slate-700">${r.action}</p>
            </div>
          `).join('') || '<p class="text-xs text-slate-500">No pending maintenance alerts.</p>'}
        </div>

        <!-- Maintenance History Log -->
        <div class="passport-section">
          <div class="passport-section-title">
            <i data-lucide="wrench" class="w-4 h-4 text-sky-600"></i>
            Service & Maintenance Records
          </div>
          <div class="flex flex-col gap-2">
            ${passport.maintenanceHistory.map(m => `
              <div class="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <span class="font-bold text-slate-900 block">${m.type} - ${m.date}</span>
                  <span class="text-slate-600">${m.summary}</span>
                </div>
                <span class="text-[10px] text-slate-500 font-mono">${m.technician}</span>
              </div>
            `).join('') || '<p class="text-xs text-slate-500">No maintenance logs registered.</p>'}
          </div>
        </div>
      </div>
    `;

    window.ModalManager.openDrawer(`Machine Digital Passport: ${machine.name}`, passportHtml);

    window.AuditLogger.log('VIEW_MACHINE_PASSPORT', `Machine: ${machine.name}`, { machineId: machineId });
  }
}

function renderPassportsModule(container) {
  const org = window.Auth.getCurrentOrg();
  const machines = window.FVDB.getMachines(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900">Machine Digital Passports</h1>
          <p class="text-xs text-slate-600 mt-1">Lifecycle passports, SOP manuals, warranties, spare parts, and predictive maintenance history.</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        ${machines.map(m => `
          <div class="fv-card">
            <div class="fv-card-header">
              <span class="text-xs font-bold font-mono text-sky-700">${m.serialNumber}</span>
              <span class="status-badge status-${m.status.toLowerCase()}">
                <span class="status-dot"></span> ${m.status}
              </span>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">${m.name}</h3>
            <p class="text-xs text-slate-600 mb-4">${m.manufacturer} ${m.model} | Installed ${m.installationDate}</p>
            <div class="flex justify-between items-center pt-3 border-t border-slate-200">
              <span class="text-xs text-slate-500">Health: <strong class="text-slate-900">${m.healthScore}%</strong></span>
              <button onclick="window.PassportModule.openPassport('${m.id}')" class="btn btn-ai btn-sm shadow-sm">
                <i data-lucide="qr-code" class="w-3.5 h-3.5"></i>
                Open Passport
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.PassportModule = PassportModule;
window.Router.register('passports', renderPassportsModule);
