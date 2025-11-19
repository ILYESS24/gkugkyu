import type { IWorkflowBase, JsonValue } from 'workflow-automation-workflow';

export interface AbstractEventPayload {
	[key: string]: JsonValue | IWorkflowBase | undefined;
}
