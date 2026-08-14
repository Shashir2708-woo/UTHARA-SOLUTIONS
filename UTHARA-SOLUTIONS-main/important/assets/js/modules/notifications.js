/**
 * UTTHARA SOLUTIONS - Centralized Alert Center Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderNotificationsModule(container) {
  const org = window.Auth.getCurrentOrg();
  const notifs = window.FVDB.getNotifications(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="bell" class="w-5 h-5 text-amber-600"></i>
            Centralized Alert Center
          </h1>
          <p class="text-xs text-slate-600 mt-1">Real-time industrial notifications, IoT threshold triggers, and maintenance requests.</p>
        </div>
        <button class="btn btn-secondary btn-sm shadow-sm" onclick="window.Toast.show('Notifications', 'All notifications marked as read.', 'success')">
          Mark All as Read
        </button>
      </div>

      <div class="flex flex-col gap-3">
        ${notifs.map(n => `
          <div class="fv-card p-4 flex justify-between items-center ${n.severity === 'critical' ? 'border-red-300 bg-red-50' : 'border-amber-300 bg-amber-50'} shadow-sm">
            <div class="flex items-center gap-3">
              <i data-lucide="${n.severity === 'critical' ? 'alert-triangle' : 'alert-circle'}" class="w-5 h-5 ${n.severity === 'critical' ? 'text-red-600' : 'text-amber-600'}"></i>
              <div>
                <span class="font-bold text-slate-900 block text-sm">${n.title}</span>
                <p class="text-xs text-slate-700 mt-0.5">${n.message}</p>
              </div>
            </div>
            <span class="font-mono text-xs text-slate-500 font-semibold">${n.timestamp}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('notifications', renderNotificationsModule);
