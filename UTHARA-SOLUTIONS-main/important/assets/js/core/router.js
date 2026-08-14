/**
 * UTTHARA SOLUTIONS - Modular Hash Router with Dual Engine Support (Public vs SaaS Console)
 * Developed by UTTHARA SOLUTIONS
 */

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  register(route, renderFn) {
    this.routes[route] = renderFn;
  }

  navigate(route) {
    window.location.hash = route;
  }

  handleRoute() {
    const rawHash = window.location.hash.replace('#', '') || 'public-home';
    const [route, queryStr] = rawHash.split('?');
    const cleanRoute = route.trim();

    // Check if route is a Public Website Route
    const publicPrefixes = ['public-'];
    const publicExact = ['login', 'sales-portal', 'onboarding-portal', 'sales-demo-workspace'];
    const isPublicRoute = publicPrefixes.some(p => cleanRoute.startsWith(p)) || publicExact.includes(cleanRoute);

    const headerConsole = document.getElementById('header-container');
    const headerPublic = document.getElementById('public-header-container');
    const sidebar = document.getElementById('sidebar-container');
    const mainContent = document.getElementById('main-content');

    if (isPublicRoute) {
      // Public Website Layout Shell Mode
      if (headerConsole) headerConsole.style.display = 'none';
      if (headerPublic) headerPublic.style.display = 'block';
      if (sidebar) sidebar.style.display = 'none';
      if (mainContent) {
        mainContent.style.padding = '0';
        mainContent.style.backgroundColor = 'var(--bg-dark)';
      }
    } else {
      // Authenticated SaaS App Console Mode
      if (headerConsole) headerConsole.style.display = 'block';
      if (headerPublic) headerPublic.style.display = 'none';
      if (sidebar) sidebar.style.display = 'block';
      if (mainContent) {
        mainContent.style.padding = '24px';
        mainContent.style.backgroundColor = 'var(--bg-dark)';
      }
    }

    // Permission check for sensitive console routes
    if (route === 'finance' && !window.Auth.hasPermission('finance:view')) {
      alert('Access Denied: Your active role does not have permission to view Financial Data.');
      this.navigate('dashboard');
      return;
    }

    const renderFn = this.routes[cleanRoute] || this.routes['public-home'] || this.routes['dashboard'];
    
    if (mainContent && renderFn) {
      const renderIt = () => {
        mainContent.innerHTML = ''; // Clear container
        renderFn(mainContent, queryStr);
        window.scrollTo(0, 0);
        
        // Update active navigation state if in console mode
        if (!isPublicRoute && window.Nav) {
          window.Nav.setActive(route);
        }
        // Update active public header state if in public mode
        if (isPublicRoute && window.PublicHeader) {
          window.PublicHeader.setActive(route);
        }
      };

      // Show the entry loader on every page navigation
      const loader = document.getElementById('page-loader');
      if (loader) {
        mainContent.innerHTML = '';
        loader.classList.remove('hidden');
        const loadMs = cleanRoute === 'dashboard' ? 1000 : 600;
        setTimeout(() => {
          loader.classList.add('hidden');
          // Only reveal if the user is still on this route
          const currentHash = (window.location.hash.replace('#', '') || '').split('?')[0].trim();
          if (currentHash === cleanRoute) {
            renderIt();
          }
        }, loadMs);
      } else {
        renderIt();
      }
    }
  }
}

window.Router = new Router();
