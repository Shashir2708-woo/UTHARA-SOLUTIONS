/**
 * UTTHARA SOLUTIONS - Internal UTTHARA SOLUTIONS Sales Lead & Customer Acquisition Portal
 * Developed by UTTHARA SOLUTIONS
 */

function renderSalesPortalPage(container) {
  const requests = window.FVDB.getDemoRequests();
  const meetings = window.FVDB.getTechnicalMeetings();
  const visits = window.FVDB.getFactoryVisits();
  const calls = window.FVDB.getDemoCalls();

  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-10 flex flex-col gap-8">
      <div class="flex items-center justify-between bg-white p-6 rounded-2xl border border-amber-300 shadow-md">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-black text-amber-950">UTTHARA Sales & Technical Lead Portal</h1>
            <span class="status-badge status-running"><span class="status-dot"></span> Internal UTTHARA Console</span>
          </div>
          <p class="text-xs text-slate-600 mt-1">Lead acquisition pipeline, technical evaluation meetings, factory visits, and 1-click customer onboarding.</p>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="window.Router.navigate('public-book-demo')" class="btn btn-secondary btn-sm shadow-sm">
            + Submit Test Lead
          </button>
          <a href="#dashboard" class="btn btn-primary btn-sm shadow-md">
            Go to SaaS Console →
          </a>
        </div>
      </div>

      <!-- Pipeline Summary KPI Cards -->
      <div class="grid grid-cols-4 gap-4">
        <div class="stat-card">
          <span class="stat-label">Total Demo Requests</span>
          <span class="stat-value text-amber-800">${requests.length} Leads</span>
          <span class="stat-meta positive">Incoming web prospects</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Qualified Prospect Leads</span>
          <span class="stat-value text-sky-700">${requests.filter(r => r.status === 'Qualified' || r.status === 'New').length} Active</span>
          <span class="stat-meta positive">In sales discussion</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Technical Meetings</span>
          <span class="stat-value text-purple-700">${meetings.length} Meetings</span>
          <span class="stat-meta positive">Architecture reviews</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Converted Customer Orgs</span>
          <span class="stat-value text-emerald-700">${requests.filter(r => r.status === 'Converted').length} Converted</span>
          <span class="stat-meta positive">Onboarded Tenants</span>
        </div>
      </div>

      <!-- Demo Requests Table -->
      <div class="fv-card p-6">
        <div class="fv-card-header">
          <div class="fv-card-title text-slate-900">
            <i data-lucide="users" class="w-5 h-5 text-amber-700"></i>
            Incoming Demo Requests & Prospect Pipeline
          </div>
        </div>

        <div class="table-container">
          <table class="fv-table">
            <thead>
              <tr>
                <th>Req ID & Date</th>
                <th>Prospect & Company</th>
                <th>Industry / Location</th>
                <th>Machines & Software</th>
                <th>Status</th>
                <th>Actions & Onboarding</th>
              </tr>
            </thead>
            <tbody>
              ${requests.map(r => `
                <tr>
                  <td class="font-mono text-xs font-bold text-amber-800">
                    ${r.id}<br/>
                    <span class="text-slate-500 font-normal text-[11px]">${r.createdAt}</span>
                  </td>
                  <td class="text-slate-900 font-semibold text-xs">
                    <strong class="block text-amber-950 font-bold">${r.name}</strong>
                    <span class="text-slate-600">${r.company}</span><br/>
                    <span class="text-slate-500 font-mono text-[10px]">${r.email} | ${r.phone}</span>
                  </td>
                  <td class="text-slate-600 text-xs">
                    ${r.industry}<br/>
                    <span class="text-slate-500">${r.factoryLocation} (${r.factoryCount} Plants)</span>
                  </td>
                  <td class="text-slate-600 font-mono text-xs">
                    <strong class="text-slate-900 font-bold">${r.machineCount} Machines</strong><br/>
                    <span class="text-slate-500">${r.currentSoftware || 'Manual'}</span>
                  </td>
                  <td>
                    <select onchange="window.updateLeadStatus('${r.id}', this.value)" class="form-select text-xs font-bold py-1 px-2 ${r.status === 'Converted' ? 'text-emerald-700 bg-emerald-50 border-emerald-300' : 'text-amber-800 bg-amber-50 border-amber-300'}">
                      <option value="New" ${r.status === 'New' ? 'selected' : ''}>New</option>
                      <option value="Contacted" ${r.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                      <option value="Qualified" ${r.status === 'Qualified' ? 'selected' : ''}>Qualified</option>
                      <option value="Technical Discussion" ${r.status === 'Technical Discussion' ? 'selected' : ''}>Technical Discussion</option>
                      <option value="Factory Assessment" ${r.status === 'Factory Assessment' ? 'selected' : ''}>Factory Assessment</option>
                      <option value="Proposal" ${r.status === 'Proposal' ? 'selected' : ''}>Proposal</option>
                      <option value="Converted" ${r.status === 'Converted' ? 'selected' : ''}>Converted</option>
                      <option value="Rejected" ${r.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    </select>
                  </td>
                  <td>
                    <div class="flex flex-col gap-2">
                      ${r.status === 'Converted' ? `
                        <span class="text-xs font-extrabold text-emerald-700 flex items-center gap-1 font-mono">
                          <i data-lucide="check-circle" class="w-4 h-4"></i> Onboarded Tenant
                        </span>
                      ` : `
                        <button onclick="window.convertLead('${r.id}')" class="btn btn-primary btn-sm shadow-sm">
                          <i data-lucide="user-check" class="w-3.5 h-3.5"></i>
                          Convert to Customer Org →
                        </button>
                      `}
                      <a href="#sales-demo-workspace" class="btn btn-secondary btn-sm shadow-sm mt-1">
                        <i data-lucide="presentation" class="w-3.5 h-3.5 text-amber-800"></i>
                        Open Pre-Demo Brief →
                      </a>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Demo Calls Log Panel -->
      ${calls.length > 0 ? `
        <div class="fv-card p-6 mt-6">
          <div class="fv-card-header">
            <div class="fv-card-title text-slate-900">
              <i data-lucide="video" class="w-5 h-5 text-amber-700"></i>
              Scheduled Demo Calls & Booking References
            </div>
          </div>
          <div class="table-container">
            <table class="fv-table">
              <thead>
                <tr>
                  <th>Booking Reference</th>
                  <th>Customer & Company</th>
                  <th>Demo Type</th>
                  <th>Scheduled Time</th>
                  <th>Status</th>
                  <th>Workspace</th>
                </tr>
              </thead>
              <tbody>
                ${calls.map(c => `
                  <tr>
                    <td class="font-mono text-xs font-bold text-amber-900">${c.bookingReference}</td>
                    <td class="text-slate-900 font-semibold text-xs">
                      <strong class="block">${c.customerName}</strong>
                      <span class="text-slate-500 font-normal">${c.companyName}</span>
                    </td>
                    <td class="text-xs text-slate-700">${c.demoType}</td>
                    <td class="font-mono text-xs">${c.scheduledDate} at ${c.scheduledTime}</td>
                    <td>
                      <span class="status-badge ${c.status === 'Cancelled' ? 'status-stopped' : (c.status === 'Rescheduled' ? 'status-warning' : 'status-running')}">
                        <span class="status-dot"></span> ${c.status}
                      </span>
                    </td>
                    <td>
                      <a href="#sales-demo-workspace?ref=${c.bookingReference}" class="btn btn-primary btn-sm shadow-sm">
                        Open Workspace →
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.updateLeadStatus = function(id, newStatus) {
    window.FVDB.updateDemoRequestStatus(id, newStatus);
    window.Toast.show('Lead Status Updated', `Lead ${id} status updated to ${newStatus}`, 'success');
  };

  window.convertLead = function(id) {
    const newOrg = window.FVDB.convertDemoRequestToOrg(id);
    if (newOrg) {
      window.Toast.show('Customer Organization Created!', `Lead converted into multi-tenant organization: ${newOrg.displayName} (${newOrg.id})`, 'success');
      window.Auth.setOrg(newOrg.id);
      setTimeout(() => {
        window.Router.navigate('organizations');
      }, 1200);
    }
  };
}

window.Router.register('sales-portal', renderSalesPortalPage);
