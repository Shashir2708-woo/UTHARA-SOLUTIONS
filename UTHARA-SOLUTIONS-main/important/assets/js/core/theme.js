/**
 * UTTHARA SOLUTIONS - Dark / Light Theme Controller
 * Developed by UTTHARA SOLUTIONS
 *
 * Sets `data-theme="dark"` on <html>, persists the choice in
 * localStorage, and syncs the sun/moon toggle icons.
 */
class ThemeController {
  STORAGE_KEY = 'utthara-theme';

  isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  set(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (e) {
      // localStorage unavailable (private mode etc.) - in-memory only
    }
    this.syncIcons();
  }

  toggle() {
    this.set(this.isDark() ? 'light' : 'dark');
  }

  /**
   * Sync every theme switch (pill toggle) with the current theme:
   * checked = dark mode, unchecked = light mode.
   */
  syncIcons() {
    const dark = this.isDark();
    document.querySelectorAll('.theme-checkbox').forEach(cb => {
      cb.checked = dark;
    });
  }
}

window.Theme = new ThemeController();
