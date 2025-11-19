import { ModuleRegistry } from '@workflow-automation/backend-common';
import type { ModuleName } from '@workflow-automation/backend-common';
import { Container } from '@workflow-automation/di';

export async function loadModules(moduleNames: ModuleName[]) {
	await Container.get(ModuleRegistry).loadModules(moduleNames);
}
