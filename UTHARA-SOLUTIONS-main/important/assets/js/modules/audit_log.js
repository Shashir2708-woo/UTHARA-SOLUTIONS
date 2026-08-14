/**
 * UTTHARA SOLUTIONS - Security Activity & Audit Log Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderAuditLogModule(container) {
  const org = window.Auth.getCurrentOrg();
  const logs = window.FVDB.getAuditLogs(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="shield-alert" class="w-5 h-5 text-amber-600"></i>
            Security Activity & Immutable Audit Log
          </h1>
          <p class="text-xs text-slate-600 mt-1">Tenant activity history, user logins, machine updates, RBAC role switches, and system events.</p>
        </div>
      </div>

      <div class="fv-card">
        <div class="table-container">
          <table class="fv-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor Name & Role</th>
                <th>Action Type</th>
                <th>Target Resource</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map(l => `
                <tr>
                  <td class="font-mono text-xs text-slate-600 font-bold">${l.timestamp}</td>
                  <td class="text-slate-900 text-xs">
                    <strong class="block">${l.actorName}</strong>
                    <span class="text-slate-500 text-[11px]">${l.role}</span>
                  </td>
                  <td>
                    <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-300">
                      ${l.action}
                    </span>
                  </td>
                  <td class="text-slate-700 text-xs font-semibold">${l.target}</td>
                  <td class="font-mono text-xs text-slate-500">${l.ip || '192.168.1.1'}</td>
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

window.Router.register('audit', renderAuditLogModule);
