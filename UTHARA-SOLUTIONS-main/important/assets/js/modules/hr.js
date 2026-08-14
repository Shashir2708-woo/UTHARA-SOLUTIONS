/**
 * UTTHARA SOLUTIONS - Workforce & Shift Roster Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderHRModule(container) {
  const org = window.Auth.getCurrentOrg();
  const users = window.FVDB.getUsers(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="users" class="w-5 h-5 text-blue-600"></i>
            Industrial Workforce & Shift Roster
          </h1>
          <p class="text-xs text-slate-600 mt-1">Plant personnel, operator certifications, shift rosters, and safety training logs.</p>
        </div>
      </div>

      <div class="fv-card">
        <div class="fv-card-header"><div class="fv-card-title text-slate-900">Active Personnel & Roles</div></div>
        <div class="table-container">
          <table class="fv-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Corporate Email</th>
                <th>Platform Role</th>
                <th>Department</th>
                <th>Shift Roster</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td class="font-bold text-slate-900">${u.name}</td>
                  <td class="font-mono text-xs text-slate-600">${u.email}</td>
                  <td class="text-xs font-bold text-sky-700">${u.role}</td>
                  <td class="text-slate-600 text-xs">${u.department}</td>
                  <td class="text-xs font-mono text-slate-800 font-bold">Shift A (06:00 - 14:00)</td>
                  <td><span class="status-badge status-running">${u.status}</span></td>
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

window.Router.register('hr', renderHRModule);
