/**
 * UTTHARA SOLUTIONS - Multi-Tenant Organizations Manager Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderOrganizationsModule(container) {
  const orgs = window.FVDB.getOrganizations();

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="building" class="w-5 h-5 text-sky-600"></i>
            Multi-Tenant Customer Organizations
          </h1>
          <p class="text-xs text-slate-600 mt-1">Tenant data isolation boundaries, subscription plans, and corporate accounts.</p>
        </div>
        <button class="btn btn-primary btn-sm shadow-sm" onclick="window.Toast.show('Organizations', 'Tenant Onboarding Wizard initialized.', 'info')">
          + Onboard New Customer Org
        </button>
      </div>

      <div class="grid grid-cols-2 gap-6">
        ${orgs.map(o => `
          <div class="fv-card ${o.id === window.Auth.currentOrgId ? 'border-sky-500 shadow-md ring-2 ring-sky-200' : ''}">
            <div class="fv-card-header">
              <span class="text-xs font-bold font-mono text-sky-700">${o.id}</span>
              <span class="status-badge status-running">${o.subscriptionStatus}</span>
            </div>
            <h2 class="text-lg font-bold text-slate-900 mb-1">${o.displayName}</h2>
            <p class="text-xs text-slate-600 mb-3">${o.legalName}</p>

            <div class="grid grid-cols-2 gap-2 text-xs mb-4 p-3 bg-slate-50 rounded border border-slate-200">
              <div><span class="text-slate-500 block font-semibold">Industry:</span> <strong class="text-slate-900">${o.industry}</strong></div>
              <div><span class="text-slate-500 block font-semibold">Plan:</span> <strong class="text-sky-700">${o.subscriptionPlan}</strong></div>
              <div><span class="text-slate-500 block font-semibold">Company Size:</span> <strong class="text-slate-900">${o.companySize}</strong></div>
              <div><span class="text-slate-500 block font-semibold">Contact:</span> <strong class="text-slate-900 font-mono">${o.contactEmail}</strong></div>
            </div>

            <div class="flex justify-between items-center pt-3 border-t border-slate-200">
              ${o.id === window.Auth.currentOrgId ? `
                <span class="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <i data-lucide="check-circle" class="w-4 h-4"></i> Active Tenant Session
                </span>
              ` : `
                <button onclick="window.Auth.setOrg('${o.id}')" class="btn btn-secondary btn-sm">
                  Switch to Tenant →
                </button>
              `}
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

window.Router.register('organizations', renderOrganizationsModule);
