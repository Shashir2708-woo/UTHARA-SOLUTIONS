/**
 * UTTHARA SOLUTIONS - Executive & Persona Dashboard Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

async function renderDashboardModule(container) {
  const summary = await window.API.getDashboardSummary();
  const org = window.Auth.getCurrentOrg();
  const role = window.Auth.getRole();
  const machines = window.FVDB.getMachines(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <!-- Header Banner -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-extrabold text-slate-900">${org.displayName} Dashboard</h1>
            <span class="status-badge status-running">
              <span class="status-dot"></span> System Nominal
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Persona View: <span class="text-sky-700 font-bold">${role}</span> | Connected Facilities: <span class="text-slate-800 font-bold">${summary.factoriesCount}</span>
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button id="btn-quick-ai" class="btn btn-ai shadow-sm">
            <i data-lucide="sparkles" class="w-4 h-4"></i>
            Run AI Plant Diagnosis
          </button>
          <button onclick="window.Router.navigate('reports')" class="btn btn-secondary shadow-sm">
            <i data-lucide="download" class="w-4 h-4"></i>
            Executive Briefing
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-4 gap-4">
        <div class="stat-card">
          <div class="flex justify-between items-center">
            <span class="stat-label">Overall Plant OEE</span>
            <i data-lucide="gauge" class="w-5 h-5 text-sky-600"></i>
          </div>
          <div class="stat-value text-sky-700">${summary.avgHealthScore + 6}%</div>
          <div class="stat-meta positive">
            <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
            +2.4% vs last shift (Target 88.0%)
          </div>
        </div>

        <div class="stat-card">
          <div class="flex justify-between items-center">
            <span class="stat-label">Connected Machines</span>
            <i data-lucide="hard-drive" class="w-5 h-5 text-emerald-600"></i>
          </div>
          <div class="stat-value text-emerald-700">${summary.runningCount} / ${summary.totalMachines}</div>
          <div class="stat-meta positive">
            <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
            ${summary.runningCount} Running | ${summary.warningCount} Warning | ${summary.stoppedCount} Stopped
          </div>
        </div>

        <div class="stat-card">
          <div class="flex justify-between items-center">
            <span class="stat-label">IoT Gateways & Sensors</span>
            <i data-lucide="activity" class="w-5 h-5 text-purple-600"></i>
          </div>
          <div class="stat-value text-purple-700">${summary.iotGatewaysCount} Nodes</div>
          <div class="stat-meta positive">
            <i data-lucide="wifi" class="w-3.5 h-3.5"></i>
            Telemetry Streaming (MQTT active)
          </div>
        </div>

        <div class="stat-card">
          <div class="flex justify-between items-center">
            <span class="stat-label">Active Critical Alerts</span>
            <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600"></i>
          </div>
          <div class="stat-value text-amber-700">${summary.unreadAlertsCount} Alerts</div>
          <div class="stat-meta warning">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
            Immediate action recommended
          </div>
        </div>
      </div>

      <!-- Factory & Machine Quick Grid -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Machine Status Overview Table -->
        <div class="col-span-12 lg:col-span-8 flex flex-col gap-4">
          <div class="fv-card">
            <div class="fv-card-header">
              <div class="fv-card-title text-slate-900">
                <i data-lucide="cpu" class="w-5 h-5 text-sky-600"></i>
                Connected Industrial Machines
              </div>
              <button onclick="window.Router.navigate('machines')" class="btn btn-secondary btn-sm">
                View All Passports →
              </button>
            </div>

            <div class="table-container">
              <table class="fv-table">
                <thead>
                  <tr>
                    <th>Machine Name</th>
                    <th>Type / Model</th>
                    <th>Factory / Line</th>
                    <th>Status</th>
                    <th>Health Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${machines.map(m => `
                    <tr>
                      <td class="font-bold text-slate-900">
                        <div class="flex items-center gap-2">
                          <i data-lucide="hard-drive" class="w-4 h-4 text-slate-500"></i>
                          ${m.name}
                        </div>
                      </td>
                      <td class="text-slate-600 font-mono text-xs">${m.manufacturer} ${m.model}</td>
                      <td class="text-slate-600 text-xs">GigaFactory 01 (Line C)</td>
                      <td>
                        <span class="status-badge status-${m.status.toLowerCase()}">
                          <span class="status-dot"></span> ${m.status}
                        </span>
                      </td>
                      <td class="font-mono font-bold ${m.healthScore < 70 ? 'text-red-600' : (m.healthScore < 85 ? 'text-amber-600' : 'text-emerald-600')}">
                        ${m.healthScore}%
                      </td>
                      <td>
                        <button onclick="window.PassportModule.openPassport('${m.id}')" class="btn btn-secondary btn-sm">
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

        <!-- AI Assistant & Digital Twin Launcher Sidebar -->
        <div class="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div class="fv-card bg-gradient-to-b from-sky-50 to-white border-sky-200">
            <div class="fv-card-header">
              <div class="fv-card-title text-sky-800">
                <i data-lucide="box" class="w-5 h-5 text-sky-600"></i>
                3D Digital Twin Command
              </div>
            </div>
            <p class="text-xs text-slate-600 mb-4 leading-relaxed">
              Explore your physical factory floor, live telemetry heatmap, and interactive machine digital twin nodes in real-time 3D WebGL viewport.
            </p>
            <button onclick="window.Router.navigate('digital-twin')" class="btn btn-ai w-full shadow-sm">
              <i data-lucide="eye" class="w-4 h-4"></i>
              Launch 3D Digital Twin Engine
            </button>
          </div>

          <!-- Quick AI Insights -->
          <div class="fv-card">
            <div class="fv-card-header">
              <div class="fv-card-title text-slate-900">
                <i data-lucide="sparkles" class="w-5 h-5 text-purple-600"></i>
                Automated AI Diagnostics
              </div>
            </div>
            <div class="flex flex-col gap-3 text-xs">
              <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span class="font-bold text-amber-700 block">Thermal Spike Risk</span>
                <p class="text-slate-600 mt-1">Haas VF-4SS CNC Machine spindle temp is 68.4°C. Thermal vibration limit nearing risk threshold.</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span class="font-bold text-emerald-700 block">KUKA Welder Arm Nominal</span>
                <p class="text-slate-600 mt-1">Weld seam alignment efficiency at 99.4%. Zero anomalies recorded across 1,200 cycles.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-quick-ai').addEventListener('click', () => {
    window.Router.navigate('ai');
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('dashboard', renderDashboardModule);
