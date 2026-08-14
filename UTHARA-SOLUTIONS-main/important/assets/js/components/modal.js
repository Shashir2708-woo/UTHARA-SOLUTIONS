/**
 * UTTHARA SOLUTIONS - Modal & Slide-out Drawer Component Manager
 * Developed by UTTHARA SOLUTIONS
 */

class ModalManager {
  openDrawer(title, contentHtml) {
    let backdrop = document.getElementById('global-drawer-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'global-drawer-backdrop';
      backdrop.className = 'drawer-backdrop';
      backdrop.innerHTML = `
        <div class="drawer-panel">
          <div class="drawer-header">
            <h3 id="drawer-title" class="text-base font-bold text-amber-950"></h3>
            <button id="drawer-close-btn" class="btn btn-secondary btn-icon">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>
          <div id="drawer-body-content" class="drawer-body"></div>
        </div>
      `;
      document.body.appendChild(backdrop);

      backdrop.querySelector('#drawer-close-btn').addEventListener('click', () => {
        this.closeDrawer();
      });
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.closeDrawer();
      });
    }

    backdrop.querySelector('#drawer-title').textContent = title;
    backdrop.querySelector('#drawer-body-content').innerHTML = contentHtml;
    
    requestAnimationFrame(() => {
      backdrop.classList.add('open');
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  closeDrawer() {
    const backdrop = document.getElementById('global-drawer-backdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
    }
  }
}

window.ModalManager = new ModalManager();
