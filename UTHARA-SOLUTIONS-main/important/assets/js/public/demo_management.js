/**
 * UTTHARA SOLUTIONS - Public Demo Management Portals
 * Developed by UTTHARA SOLUTIONS
 * Contains: Booking Success, Demo Status Tracker, Reschedule, & Cancel Portals
 */

// 1. Booking Success Confirmation Page (#public-book-demo-success)
function renderBookDemoSuccessPage(container) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const ref = urlParams.get('ref') || 'FV-DEMO-2026-1088';
  const call = window.FVDB.getDemoCallByRef(ref) || {
    bookingReference: ref,
    customerName: 'Rajesh Sharma',
    companyName: 'Kirloskar Heavy Engineering Ltd',
    customerEmail: 'rajesh.sharma@kirloskareng.in',
    demoType: 'General Product Demo',
    scheduledDate: '2026-08-12',
    scheduledTime: '02:00 PM',
    timezone: 'IST — India Standard Time (UTC+5:30)',
    meetingUrl: 'https://meet.factoryverse.ai/demo/' + ref,
    assignedSales: 'Sanjay Verma (UTTHARA Lead)'
  };

  container.innerHTML = `
    <div class="max-w-3xl mx-auto w-full px-6 py-12 flex flex-col gap-8">
      <!-- Top Success Banner -->
      <div class="fv-card p-8 bg-gradient-to-br from-white via-amber-50/50 to-white border-amber-300 shadow-xl rounded-2xl text-center flex flex-col items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-md">
          <i data-lucide="check-circle" class="w-8 h-8"></i>
        </div>
        <h1 class="text-3xl font-black text-amber-950">Your Demo Is Confirmed!</h1>
        <p class="text-xs text-slate-600 max-w-md">Thank you ${call.customerName}. Your UTTHARA SOLUTIONS demonstration has been scheduled and assigned to UTTHARA engineering team.</p>

        <div class="p-4 bg-amber-100/80 rounded-xl border border-amber-300 text-center font-mono w-full max-w-sm">
          <span class="text-[10px] font-bold text-amber-900 block uppercase tracking-wider">Booking Reference ID</span>
          <strong class="text-2xl font-black text-amber-950 block my-0.5">${call.bookingReference}</strong>
          <span class="text-[11px] text-amber-800">Status: Confirmed & Scheduled</span>
        </div>
      </div>

      <!-- Demo Details Card -->
      <div class="fv-card p-6">
        <h2 class="text-base font-extrabold text-amber-950 mb-4 pb-2 border-b border-amber-200">Scheduled Meeting Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div><strong class="text-slate-900 block">Company:</strong> ${call.companyName}</div>
          <div><strong class="text-slate-900 block">Demo Type:</strong> ${call.demoType}</div>
          <div><strong class="text-slate-900 block">Date & Time:</strong> ${call.scheduledDate} at ${call.scheduledTime}</div>
          <div><strong class="text-slate-900 block">Timezone:</strong> ${call.timezone}</div>
          <div><strong class="text-slate-900 block">Assigned Representative:</strong> ${call.assignedSales}</div>
          <div><strong class="text-slate-900 block">Meeting Video URL:</strong> <a href="${call.meetingUrl}" target="_blank" class="text-amber-800 font-bold underline font-mono text-[11px]">${call.meetingUrl}</a></div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <button onclick="window.addToCalendar('${call.bookingReference}')" class="btn btn-secondary btn-md shadow-sm">
          <i data-lucide="calendar-plus" class="w-4 h-4"></i> Add to Calendar
        </button>

        <div class="flex items-center gap-3">
          <a href="#public-demo-reschedule?ref=${call.bookingReference}" class="btn btn-secondary btn-md shadow-sm">
            <i data-lucide="refresh-cw" class="w-4 h-4"></i> Reschedule
          </a>
          <a href="#public-demo-cancel?ref=${call.bookingReference}" class="btn btn-danger btn-md shadow-sm">
            <i data-lucide="x-circle" class="w-4 h-4"></i> Cancel
          </a>
          <a href="#public-demo-status?ref=${call.bookingReference}" class="btn btn-primary btn-md shadow-md">
            Track Status →
          </a>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.addToCalendar = function(ref) {
    window.Toast.show('Calendar File', `ICS calendar file exported for reference ${ref}`, 'info');
  };
}

// 2. Customer Secure Demo Status Tracker (#public-demo-status)
function renderDemoStatusPage(container) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const queryRef = urlParams.get('ref') || '';
  const call = queryRef ? window.FVDB.getDemoCallByRef(queryRef) : null;

  container.innerHTML = `
    <div class="max-w-4xl mx-auto w-full px-6 py-12 flex flex-col gap-8">
      <div class="text-center max-w-2xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Customer Self-Service</span>
        <h1 class="text-3xl font-extrabold text-amber-950 mt-1">Track Demo & Assessment Progress</h1>
        <p class="text-xs text-slate-600 mt-1">Enter your Booking Reference and Work Email to securely verify your request status.</p>
      </div>

      <!-- Verification Form -->
      <div class="fv-card p-6 bg-white border-amber-300 shadow-md">
        <form onsubmit="event.preventDefault(); window.verifyDemoStatus();" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div class="form-group mb-0">
            <label class="form-label">Booking Reference *</label>
            <input type="text" id="status-ref" class="form-input font-mono font-bold" required value="${queryRef || 'FV-DEMO-2026-1088'}" placeholder="e.g. FV-DEMO-2026-1088" />
          </div>
          <div class="form-group mb-0">
            <label class="form-label">Work Email *</label>
            <input type="email" id="status-email" class="form-input" required value="rajesh.sharma@kirloskareng.in" placeholder="email@company.com" />
          </div>
          <button type="submit" class="btn btn-primary btn-md shadow-md">
            Verify & Track →
          </button>
        </form>
      </div>

      <!-- Status Stepper Display -->
      ${call ? renderStatusStepper(call) : `
        <div class="fv-card p-8 text-center text-xs text-slate-500">
          Enter your valid booking reference above to view your real-time onboarding lifecycle.
        </div>
      `}
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.verifyDemoStatus = function() {
    const ref = document.getElementById('status-ref').value.trim();
    window.Router.navigate(`public-demo-status?ref=${ref}`);
  };
}

function renderStatusStepper(call) {
  const stages = [
    { title: 'Demo Requested', status: 'completed' },
    { title: 'Sales Review', status: 'completed' },
    { title: 'Demo Scheduled', status: call.status === 'Confirmed' || call.status === 'Rescheduled' ? 'active' : 'completed' },
    { title: 'Demo Confirmed', status: call.status === 'Confirmed' ? 'active' : 'pending' },
    { title: 'Demo Completed', status: call.status === 'Completed' ? 'completed' : 'pending' },
    { title: 'Technical Assessment', status: 'pending' },
    { title: 'Factory Visit', status: 'pending' },
    { title: 'Proposal', status: 'pending' },
    { title: 'Customer Onboarding', status: 'pending' }
  ];

  return `
    <div class="fv-card p-8 bg-white border-amber-300 shadow-xl rounded-2xl flex flex-col gap-6">
      <div class="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 class="text-xl font-black text-amber-950">${call.companyName}</h2>
          <span class="text-xs text-slate-600">Booking Ref: <strong class="font-mono text-amber-900">${call.bookingReference}</strong></span>
        </div>
        <span class="status-badge ${call.status === 'Cancelled' ? 'status-stopped' : 'status-running'}">
          <span class="status-dot"></span> ${call.status}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        ${stages.map((st, idx) => `
          <div class="p-3 rounded-xl border ${st.status === 'active' ? 'bg-amber-100 border-amber-400 font-bold' : (st.status === 'completed' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400')} text-xs flex items-center gap-2">
            <span class="w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center ${st.status === 'active' ? 'bg-amber-700 text-white' : (st.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500')}">${idx + 1}</span>
            <span>${st.title}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 3. Customer Reschedule Portal (#public-demo-reschedule)
function renderDemoReschedulePage(container) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const ref = urlParams.get('ref') || '';
  const call = window.FVDB.getDemoCallByRef(ref);

  container.innerHTML = `
    <div class="max-w-xl mx-auto w-full px-6 py-12 flex flex-col gap-6">
      <div class="text-center">
        <h1 class="text-2xl font-black text-amber-950">Reschedule Demo Appointment</h1>
        <p class="text-xs text-slate-600 mt-1">Select a new date and time for booking reference <strong class="font-mono text-amber-900">${ref}</strong>.</p>
      </div>

      <div class="fv-card p-6 bg-white border-amber-300 shadow-xl rounded-2xl">
        <form onsubmit="event.preventDefault(); window.handleRescheduleSubmit('${ref}');">
          <div class="form-group">
            <label class="form-label">New Date *</label>
            <input type="date" id="resched-date" class="form-input" required value="2026-08-14" />
          </div>
          <div class="form-group">
            <label class="form-label">New Time Slot *</label>
            <select id="resched-time" class="form-select font-mono">
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="02:00 PM" selected>02:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Reason for Rescheduling</label>
            <textarea id="resched-reason" rows="2" class="form-textarea" placeholder="Provide brief reason for date change..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-md w-full shadow-md mt-2">
            Confirm Reschedule →
          </button>
        </form>
      </div>
    </div>
  `;

  window.handleRescheduleSubmit = function(bookingRef) {
    const d = document.getElementById('resched-date').value;
    const t = document.getElementById('resched-time').value;
    const r = document.getElementById('resched-reason').value.trim();

    window.FVDB.rescheduleDemoCall(bookingRef, d, t, r);
    window.Toast.show('Rescheduled!', `Appointment updated to ${d} at ${t}`, 'success');
    setTimeout(() => {
      window.Router.navigate(`public-book-demo-success?ref=${bookingRef}`);
    }, 1000);
  };
}

// 4. Customer Cancel Portal (#public-demo-cancel)
function renderDemoCancelPage(container) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const ref = urlParams.get('ref') || '';

  container.innerHTML = `
    <div class="max-w-xl mx-auto w-full px-6 py-12 flex flex-col gap-6">
      <div class="text-center">
        <h1 class="text-2xl font-black text-amber-950">Cancel Demo Appointment</h1>
        <p class="text-xs text-slate-600 mt-1">Cancel booking reference <strong class="font-mono text-amber-900">${ref}</strong>.</p>
      </div>

      <div class="fv-card p-6 bg-white border-amber-300 shadow-xl rounded-2xl">
        <form onsubmit="event.preventDefault(); window.handleCancelSubmit('${ref}');">
          <div class="form-group">
            <label class="form-label">Reason for Cancellation *</label>
            <textarea id="cancel-reason" rows="3" class="form-textarea" required placeholder="Please let us know why you are cancelling..."></textarea>
          </div>
          <button type="submit" class="btn btn-danger btn-md w-full shadow-md mt-2">
            Confirm Cancellation
          </button>
        </form>
      </div>
    </div>
  `;

  window.handleCancelSubmit = function(bookingRef) {
    const r = document.getElementById('cancel-reason').value.trim();
    window.FVDB.cancelDemoCall(bookingRef, r);
    window.Toast.show('Cancelled', `Booking ${bookingRef} has been cancelled.`, 'warning');
    setTimeout(() => {
      window.Router.navigate('public-home');
    }, 1200);
  };
}

window.Router.register('public-book-demo-success', renderBookDemoSuccessPage);
window.Router.register('public-demo-status', renderDemoStatusPage);
window.Router.register('public-demo-reschedule', renderDemoReschedulePage);
window.Router.register('public-demo-cancel', renderDemoCancelPage);
