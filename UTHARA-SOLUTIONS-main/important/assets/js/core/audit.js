/**
 * UTTHARA SOLUTIONS - Centralized Audit Logger
 * Developed by UTTHARA SOLUTIONS
 */

class AuditLogger {
  static log(action, target, metadata = {}) {
    if (!window.Auth || !window.FVDB) return;

    const user = window.Auth.getCurrentUser();
    const org = window.Auth.getCurrentOrg();

    window.FVDB.addAuditLog({
      orgId: org ? org.id : 'org_default',
      actorName: user ? user.name : 'System',
      role: user ? user.role : 'Automated Agent',
      action: action,
      target: target,
      metadata: metadata,
      ip: '192.168.1.100'
    });
  }
}

window.AuditLogger = AuditLogger;
