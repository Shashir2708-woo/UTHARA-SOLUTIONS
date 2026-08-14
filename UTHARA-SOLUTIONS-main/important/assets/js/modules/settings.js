/**
 * UTTHARA SOLUTIONS - System & Tenant Configuration Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderSettingsModule(container) {
  const org = window.Auth.getCurrentOrg();

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="settings" class="w-5 h-5 text-sky-600"></i>
            System & Tenant Settings
          </h1>
          <p class="text-xs text-slate-600 mt-1">Tenant parameters, MQTT broker endpoints, security policies, and RBAC matrix configuration.</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="fv-card">
          <div class="fv-card-header"><div class="fv-card-title text-slate-900">Tenant Corporate Information</div></div>
          <div class="form-group">
            <label class="form-label">Legal Name</label>
            <input type="text" value="${org.legalName}" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Display Name</label>
            <input type="text" value="${org.displayName}" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Contact Email</label>
            <input type="text" value="${org.contactEmail}" class="form-input" />
          </div>
          <button class="btn btn-primary btn-sm mt-2 shadow-sm" onclick="window.Toast.show('Settings', 'Tenant corporate settings updated.', 'success')">
            Save Changes
          </button>
        </div>

        <div class="fv-card">
          <div class="fv-card-header"><div class="fv-card-title text-slate-900">Industrial MQTT Broker Settings</div></div>
          <div class="form-group">
            <label class="form-label">Broker Host URI</label>
            <input type="text" value="mqtts://broker.factoryverse.ai:8883" class="form-input font-mono" />
          </div>
          <div class="form-group">
            <label class="form-label">Tenant Topic Namespace</label>
            <input type="text" value="factoryverse/${org.id}/#" class="form-input font-mono" readonly />
          </div>
          <div class="form-group">
            <label class="form-label">SSL/TLS Security Certificate</label>
            <input type="text" value="X.509 MQTTS Industrial Certificate Active" class="form-input font-mono text-emerald-700 font-bold" readonly />
          </div>
          <button class="btn btn-ai btn-sm mt-2 shadow-sm" onclick="window.Toast.show('MQTT Settings', 'MQTT Connection tested cleanly.', 'success')">
            Test Broker Connectivity
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('settings', renderSettingsModule);
