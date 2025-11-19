import type { ModuleInterface } from '@workflow-automation/decorators';
import { BackendModule } from '@workflow-automation/decorators';

@BackendModule({ name: 'breaking-changes' })
export class BreakingChangesModule implements ModuleInterface {
	async init() {
		await import('./breaking-changes.controller');
	}
}
