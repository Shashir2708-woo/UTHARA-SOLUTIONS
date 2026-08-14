/**
 * UTTHARA SOLUTIONS - Customer Login & Trial Onboarding Wizard
 * Developed by UTTHARA SOLUTIONS
 */

function renderLoginPage(container) {
  const orgs = window.FVDB.getOrganizations();

  container.innerHTML = `
    <div class="max-w-md mx-auto w-full px-6 py-16 flex flex-col gap-6">
      <div class="text-center">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center font-bold text-white shadow-md mx-auto mb-3">
          <i data-lucide="cpu" class="w-6 h-6"></i>
        </div>
        <h1 class="text-2xl font-black text-amber-950">UTTHARA SOLUTIONS Customer Login</h1>
        <p class="text-xs text-slate-600 mt-1">Select your organization and login to your manufacturing OS console.</p>
      </div>

      <div class="fv-card p-6 bg-white border-amber-300 shadow-xl rounded-2xl">
        <form onsubmit="event.preventDefault(); window.handleCustomerLogin();">
          <div class="form-group">
            <label class="form-label">Select Customer Organization *</label>
            <select id="login-org-select" class="form-select font-bold text-amber-950">
              ${orgs.map(o => `
                <option value="${o.id}">${o.displayName} (${o.industry.split('&')[0]})</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Work Email Address *</label>
            <input type="email" id="login-email" class="form-input" required value="vikram@apexindustrial.com" />
          </div>

          <div class="form-group">
            <label class="form-label">Password *</label>
            <input type="password" id="login-pass" class="form-input" required value="••••••••••••" />
          </div>

          <button type="submit" class="btn btn-primary btn-md w-full shadow-md mt-2">
            <i data-lucide="log-in" class="w-4 h-4"></i>
            Login to Manufacturing Console →
          </button>
        </form>
      </div>

      <div class="text-center text-xs text-slate-500">
        Don't have an account? <a href="#onboarding-portal" class="text-amber-800 font-bold hover:underline">Start 14-Day Free Trial</a>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.handleCustomerLogin = function() {
    const orgId = document.getElementById('login-org-select').value;
    window.Auth.setOrg(orgId);
    window.Toast.show('Login Successful', `Authenticated into tenant session: ${orgId}`, 'success');
    setTimeout(() => {
      window.Router.navigate('dashboard');
    }, 1000);
  };
}

function renderOnboardingPortalPage(container) {
  container.innerHTML = `
    <div class="max-w-xl mx-auto w-full px-6 py-12 flex flex-col gap-6">
      <div class="text-center">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Self-Service Setup</span>
        <h1 class="text-3xl font-extrabold text-amber-950 mt-1">Start 14-Day Free Trial</h1>
        <p class="text-xs text-slate-600 mt-1">Instant organization creation & plant setup wizard.</p>
      </div>

      <div class="fv-card p-8 bg-white border-amber-300 shadow-xl rounded-2xl">
        <form onsubmit="event.preventDefault(); window.handleTrialOnboard();">
          <div class="form-group">
            <label class="form-label">Organization / Company Name *</label>
            <input type="text" id="onboard-company" class="form-input" required placeholder="e.g. Precision Forge Tech Ltd" />
          </div>

          <div class="form-group">
            <label class="form-label">Industry Sector *</label>
            <select id="onboard-industry" class="form-select" required>
              <option value="Automotive Components">Automotive Components</option>
              <option value="Precision Engineering">Precision Engineering</option>
              <option value="Textile & Garments">Textile & Garments</option>
              <option value="General MSME">General MSME Manufacturing</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Admin User Full Name *</label>
            <input type="text" id="onboard-name" class="form-input" required placeholder="e.g. Suresh Kumar" />
          </div>

          <div class="form-group">
            <label class="form-label">Work Email Address *</label>
            <input type="email" id="onboard-email" class="form-input" required placeholder="suresh@precisionforge.com" />
          </div>

          <button type="submit" class="btn btn-primary btn-lg w-full shadow-md mt-4">
            <i data-lucide="zap" class="w-5 h-5"></i>
            Initialize Trial Organization & Launch Console →
          </button>
        </form>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.handleTrialOnboard = function() {
    const compName = document.getElementById('onboard-company').value.trim();
    const ind = document.getElementById('onboard-industry').value;
    const name = document.getElementById('onboard-name').value.trim();
    const email = document.getElementById('onboard-email').value.trim();

    const dummyLead = window.FVDB.addDemoRequest({
      name: name,
      company: compName,
      email: email,
      phone: '+91 99000 11111',
      role: 'Founder / Managing Director',
      industry: ind,
      companySize: '50-250',
      factoryLocation: 'Trial Plant',
      factoryCount: 1,
      machineCount: 10,
      challenges: 'Free Trial Setup',
      interestedFeatures: ['Digital Twin', 'AI Assistant', 'Passports'],
      message: 'Self-service 14-day trial onboarding'
    });

    const newOrg = window.FVDB.convertDemoRequestToOrg(dummyLead.id);
    window.Auth.setOrg(newOrg.id);
    window.Toast.show('Trial Organization Created!', `Welcome ${name}! Session initialized for ${newOrg.displayName}`, 'success');
    setTimeout(() => {
      window.Router.navigate('dashboard');
    }, 1200);
  };
}

window.Router.register('login', renderLoginPage);
window.Router.register('onboarding-portal', renderOnboardingPortalPage);
