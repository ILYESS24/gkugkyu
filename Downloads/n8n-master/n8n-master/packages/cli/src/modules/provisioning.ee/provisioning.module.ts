import type { ModuleInterface } from '@workflow-automation/decorators';
import { BackendModule } from '@workflow-automation/decorators';

@BackendModule({ name: 'provisioning', licenseFlag: ['feat:oidc', 'feat:saml', 'feat:ldap'] })
export class ProvisioningModule implements ModuleInterface {
	async init() {
		await import('./provisioning.controller.ee');
	}
}
