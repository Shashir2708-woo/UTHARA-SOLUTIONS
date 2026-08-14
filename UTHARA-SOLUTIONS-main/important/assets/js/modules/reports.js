/**
 * UTTHARA SOLUTIONS - Executive Report Generator Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderReportsModule(container) {
  const org = window.Auth.getCurrentOrg();
  const machines = window.FVDB.getMachines(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="file-text" class="w-5 h-5 text-sky-600"></i>
            Executive Reports & AI Daily Briefings
          </h1>
          <p class="text-xs text-slate-600 mt-1">Automated daily production summaries, OEE reports, and maintenance audits.</p>
        </div>

        <button onclick="window.print()" class="btn btn-primary btn-sm shadow-sm">
          <i data-lucide="printer" class="w-4 h-4"></i>
          Print / Export Report
        </button>
      </div>

      <!-- Printable Report Sheet -->
      <div class="fv-card p-8 bg-white border border-slate-300 shadow-md">
        <div class="flex justify-between items-start pb-6 border-b border-slate-200 mb-6">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 mb-1">${org.displayName}</h2>
            <span class="text-xs text-sky-700 font-mono font-bold block">UTTHARA SOLUTIONS - Autonomous Executive Briefing</span>
            <span class="text-xs text-slate-500 block mt-1">Generated: ${new Date().toLocaleDateString()} | Auth: ${window.Auth.getCurrentUser().name} (${window.Auth.getRole()})</span>
          </div>
          <div class="text-right font-mono text-xs text-slate-500">
            UTTHARA SOLUTIONS<br/>
            Ref #: EX-RPT-2026-0811
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="p-4 bg-slate-50 rounded border border-slate-200">
            <span class="text-xs text-slate-500 block uppercase font-bold">Plant Overall OEE</span>
            <span class="text-2xl font-bold font-mono text-sky-700">84.2%</span>
          </div>
          <div class="p-4 bg-slate-50 rounded border border-slate-200">
            <span class="text-xs text-slate-500 block uppercase font-bold">Active Machine Health</span>
            <span class="text-2xl font-bold font-mono text-emerald-700">91.5%</span>
          </div>
          <div class="p-4 bg-slate-50 rounded border border-slate-200">
            <span class="text-xs text-slate-500 block uppercase font-bold">Downtime Loss Today</span>
            <span class="text-2xl font-bold font-mono text-red-600">1.4 Hrs</span>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-sm font-bold text-sky-800 mb-2 uppercase tracking-wider">AI Executive Summary</h3>
          <p class="text-xs text-slate-700 leading-relaxed p-4 bg-slate-50 rounded border border-slate-200">
            During shift 1, <strong>Line B Robotic Welding Cell</strong> operated at peak efficiency (91.2% OEE). <strong>Line C 5-Axis CNC Cell</strong> experienced thermal vibration elevated up to 4.8 mm/s on Haas VF-4SS, resulting in minor speed throttling. Preventive bearing replacement is scheduled for the upcoming shift maintenance window. Total power consumption across GigaFactory 01 was 1,420 kWh.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Machine Status Matrix</h3>
          <table class="fv-table">
            <thead>
              <tr>
                <th>Machine Name</th>
                <th>Manufacturer & Model</th>
                <th>Status</th>
                <th>Health Score</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              ${machines.map(m => `
                <tr>
                  <td class="font-bold text-slate-900">${m.name}</td>
                  <td class="text-slate-600 font-mono text-xs">${m.manufacturer} ${m.model}</td>
                  <td><span class="status-badge status-${m.status.toLowerCase()}">${m.status}</span></td>
                  <td class="font-mono font-bold text-slate-900">${m.healthScore}%</td>
                  <td class="text-xs ${m.riskLevel === 'High' ? 'text-red-600 font-bold' : 'text-emerald-700'}">${m.riskLevel}</td>
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

window.Router.register('reports', renderReportsModule);
