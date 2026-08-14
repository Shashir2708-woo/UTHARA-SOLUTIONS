/**
 * UTTHARA SOLUTIONS - Industrial Toast Notification Manager
 * Developed by UTTHARA SOLUTIONS
 */

class ToastManager {
  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    document.body.appendChild(this.container);
  }

  show(title, message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'critical' ? 'toast-critical' : ''}`;
    
    let iconName = 'info';
    let iconClass = 'text-cyan-400';
    if (type === 'critical') { iconName = 'alert-triangle'; iconClass = 'text-red-400'; }
    if (type === 'warning') { iconName = 'alert-circle'; iconClass = 'text-amber-400'; }
    if (type === 'success') { iconName = 'check-circle'; iconClass = 'text-emerald-400'; }

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-5 h-5 ${iconClass} flex-shrink-0 mt-0.5"></i>
      <div class="flex-1">
        <span class="text-xs font-bold block text-white">${title}</span>
        <span class="text-xs text-secondary block mt-0.5">${message}</span>
      </div>
      <button class="text-muted hover:text-white text-xs font-bold" onclick="this.parentElement.remove()">✕</button>
    `;

    this.container.appendChild(toast);

    if (window.lucide) {
      window.lucide.createIcons();
    }

    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, duration);
  }
}

window.Toast = new ToastManager();
