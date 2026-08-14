/**
 * UTTHARA SOLUTIONS - Internal Sales Pre-Demo Brief & Live Call Workspace
 * Developed by UTTHARA SOLUTIONS
 * Prompt 04 Execution Engine
 */

function renderSalesDemoWorkspacePage(container) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const ref = urlParams.get('ref') || 'FV-DEMO-2026-1088';
  const calls = window.FVDB.getDemoCalls();
  const call = window.FVDB.getDemoCallByRef(ref) || calls[0] || {
    bookingReference: 'FV-DEMO-2026-1088',
    customerName: 'Rajesh Sharma',
    companyName: 'Kirloskar Heavy Engineering Ltd',
    customerEmail: 'rajesh.sharma@kirloskareng.in',
    customerPhone: '+91 98230 44120',
    demoType: 'General Product Demo',
    scheduledDate: '2026-08-12',
    scheduledTime: '02:00 PM',
    timezone: 'IST — India Standard Time (UTC+5:30)',
    meetingUrl: 'https://meet.factoryverse.ai/demo/FV-DEMO-2026-1088',
    assignedSales: 'Sanjay Verma (UTTHARA Lead)'
  };

  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
      <!-- Top Action Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-amber-300 shadow-md">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-black text-amber-950">Pre-Demo Brief & Live Call Workspace</h1>
            <span class="status-badge status-running"><span class="status-dot"></span> Sales Rep: ${call.assignedSales}</span>
          </div>
          <p class="text-xs text-slate-600 mt-1">Ref: <strong class="font-mono text-amber-900">${call.bookingReference}</strong> | Customer: <strong>${call.customerName} (${call.companyName})</strong></p>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="window.startLiveDemoCall('${call.bookingReference}')" class="btn btn-primary btn-md shadow-md">
            <i data-lucide="video" class="w-4 h-4"></i> Launch Video Call
          </button>
          <a href="#sales-portal" class="btn btn-secondary btn-md shadow-sm">
            ← Return to Sales Portal
          </a>
        </div>
      </div>

      <!-- 3-Column Split Workspace -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left Column: Pre-Demo Brief (4 cols) -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <div class="fv-card p-5">
            <h2 class="text-base font-extrabold text-amber-950 mb-3 pb-2 border-b border-amber-200">Customer & Factory Profile</h2>
            <div class="space-y-2 text-xs">
              <div><strong class="text-slate-900 block">Contact Name:</strong> ${call.customerName}</div>
              <div><strong class="text-slate-900 block">Company:</strong> ${call.companyName}</div>
              <div><strong class="text-slate-900 block">Email & Phone:</strong> ${call.customerEmail} | ${call.customerPhone || 'N/A'}</div>
              <div><strong class="text-slate-900 block">Demo Type:</strong> ${call.demoType}</div>
              <div><strong class="text-slate-900 block">Scheduled Slot:</strong> ${call.scheduledDate} at ${call.scheduledTime} (${call.timezone})</div>
            </div>
          </div>

          <div class="fv-card p-5 bg-amber-50/70 border-amber-300">
            <h3 class="text-sm font-extrabold text-amber-950 mb-2">Primary Manufacturing Challenges</h3>
            <p class="text-xs text-slate-700 leading-snug">"Unexpected spindle downtime, paper logbooks, and zero real-time visibility into machine health."</p>
          </div>
        </div>

        <!-- Center Column: Features Demonstrated Checklist (4 cols) -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <div class="fv-card p-5">
            <h2 class="text-base font-extrabold text-amber-950 mb-3 pb-2 border-b border-amber-200">Features Demonstrated Checklist</h2>
            <div class="space-y-2 text-xs max-h-96 overflow-y-auto pr-1">
              ${[
                'Platform Overview Shell',
                '3D WebGL Digital Twin Engine',
                '2D Floorplan Canvas & Tooltips',
                'Machine Digital Passports Drawer',
                'ESP32 IoT Telemetry Telemetry',
                'Predictive Maintenance Risk Score',
                'OEE Availability x Yield Engine',
                '10 Specialized AI Personas',
                'SOP Manual RAG Vector Knowledge Base',
                'Quality CMM Laser Probe Logs',
                'Spare Parts Inventory Reorder',
                'Financial Downtime Cost Analysis',
                'Executive Briefings & PDF Reports',
                'Multi-Tenant Tenant Isolation & RBAC'
              ].map(feat => `
                <label class="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="demo-feat-chk" value="${feat}" />
                  <span class="font-bold text-slate-800">${feat}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Column: Live Call Notes & Outcome Triggers (4 cols) -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <div class="fv-card p-5">
            <h2 class="text-base font-extrabold text-amber-950 mb-3 pb-2 border-b border-amber-200">Structured Live Call Notes</h2>
            <div class="space-y-3 text-xs">
              <div>
                <label class="form-label">Customer Goals & Requirements</label>
                <textarea id="note-goals" rows="2" class="form-textarea" placeholder="Note customer goals..."></textarea>
              </div>
              <div>
                <label class="form-label">Current Software & Machine Specs</label>
                <textarea id="note-specs" rows="2" class="form-textarea" placeholder="Note PLC / machine details..."></textarea>
              </div>
              <div>
                <label class="form-label">Objections / Next Steps</label>
                <textarea id="note-next" rows="2" class="form-textarea" placeholder="Note objections or follow-ups..."></textarea>
              </div>
            </div>
          </div>

          <!-- Call Outcome Action Trigger -->
          <div class="fv-card p-5 bg-gradient-to-br from-white to-amber-50 border-amber-300">
            <h3 class="text-sm font-extrabold text-amber-950 mb-2">Call Outcome & Next Phase</h3>
            <div class="form-group mb-3">
              <label class="form-label">Select Call Outcome *</label>
              <select id="call-outcome-select" class="form-select font-bold text-xs">
                <option value="Technical Discussion">Proceed to Technical Assessment</option>
                <option value="Factory Visit">Schedule Factory Site Visit</option>
                <option value="Proposal">Generate Enterprise Proposal</option>
                <option value="Follow-up Required">Follow-up Required</option>
                <option value="Completed">Completed (No Action)</option>
              </select>
            </div>

            <button onclick="window.finalizeSalesCall('${call.bookingReference}')" class="btn btn-primary btn-md w-full shadow-md">
              Complete Call & Trigger Next Phase →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.startLiveDemoCall = function(bookingRef) {
    window.open(`https://meet.factoryverse.ai/demo/${bookingRef}`, '_blank');
    window.Toast.show('Live Meeting Initialized', `Connecting to video bridge for ${bookingRef}...`, 'info');
  };

  window.finalizeSalesCall = function(bookingRef) {
    const outcome = document.getElementById('call-outcome-select').value;
    window.Toast.show('Sales Call Completed', `Outcome registered: ${outcome}`, 'success');

    if (outcome === 'Technical Discussion') {
      setTimeout(() => {
        window.Router.navigate('sales-portal');
      }, 1000);
    } else {
      setTimeout(() => {
        window.Router.navigate('sales-portal');
      }, 1000);
    }
  };
}

window.Router.register('sales-demo-workspace', renderSalesDemoWorkspacePage);
