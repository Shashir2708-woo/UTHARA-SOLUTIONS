/**
 * UTTHARA SOLUTIONS - Authentication & Role-Based Access Control (RBAC) Manager
 * Developed by UTTHARA SOLUTIONS
 */

class AuthManager {
  constructor() {
    this.currentOrgId = localStorage.getItem('fv_current_org') || 'org_apex';
    this.currentRoleId = localStorage.getItem('fv_current_role') || 'Founder / Managing Director';
    
    // Industrial Roles Master List
    this.roles = [
      'Founder / Managing Director',
      'Administrator',
      'Operations Manager',
      'Factory Manager',
      'Production Manager',
      'Maintenance Lead Engineer',
      'Quality Control Manager',
      'HR Manager',
      'Finance Manager',
      'Inventory Specialist',
      'IoT Systems Engineer',
      'Line Operator',
      'Client User'
    ];

    // RBAC Permission Mapping Matrix
    this.permissions = {
      'Founder / Managing Director': ['*'], // Full platform access
      'Administrator': ['*'],
      'Operations Manager': ['machines:view', 'machines:edit', 'digital_twin:view', 'iot:view', 'ai:access', 'production:view', 'quality:view', 'inventory:view', 'reports:generate', 'reports:export', 'audit:view'],
      'Factory Manager': ['machines:view', 'machines:create', 'machines:edit', 'digital_twin:view', 'iot:view', 'ai:access', 'production:view', 'maintenance:view', 'reports:generate'],
      'Maintenance Lead Engineer': ['machines:view', 'machines:edit', 'passport:edit', 'digital_twin:view', 'iot:view', 'ai:access', 'maintenance:manage', 'knowledge:upload'],
      'Quality Control Manager': ['machines:view', 'digital_twin:view', 'iot:view', 'ai:access', 'quality:manage', 'reports:generate'],
      'Line Operator': ['machines:view', 'digital_twin:view', 'iot:view', 'passport:view'],
      'Client User': ['machines:view', 'digital_twin:view', 'reports:view']
    };
  }

  getCurrentOrg() {
    return window.FVDB.getOrgById(this.currentOrgId) || window.FVDB.getOrganizations()[0];
  }

  setOrg(orgId) {
    this.currentOrgId = orgId;
    localStorage.setItem('fv_current_org', orgId);
    
    window.FVDB.addAuditLog({
      orgId: this.currentOrgId,
      actorName: this.getCurrentUser().name,
      role: this.currentRoleId,
      action: 'SWITCH_TENANT',
      target: `Organization: ${this.getCurrentOrg().displayName}`,
      ip: '103.21.140.12'
    });

    window.location.reload();
  }

  getRole() {
    return this.currentRoleId;
  }

  setRole(roleId) {
    this.currentRoleId = roleId;
    localStorage.setItem('fv_current_role', roleId);
    
    window.FVDB.addAuditLog({
      orgId: this.currentOrgId,
      actorName: this.getCurrentUser().name,
      role: this.currentRoleId,
      action: 'SWITCH_ROLE',
      target: `Role set to: ${roleId}`,
      ip: '103.21.140.12'
    });

    window.location.reload();
  }

  getCurrentUser() {
    const users = window.FVDB.getUsers(this.currentOrgId);
    return users.find(u => u.role === this.currentRoleId) || {
      id: 'usr_active',
      orgId: this.currentOrgId,
      name: `User (${this.currentRoleId.split(' ')[0]})`,
      email: 'user@factoryverse.ai',
      role: this.currentRoleId,
      department: 'Operations'
    };
  }

  hasPermission(permKey) {
    const rolePerms = this.permissions[this.currentRoleId] || [];
    if (rolePerms.includes('*')) return true;
    return rolePerms.includes(permKey);
  }
}

window.Auth = new AuthManager();
