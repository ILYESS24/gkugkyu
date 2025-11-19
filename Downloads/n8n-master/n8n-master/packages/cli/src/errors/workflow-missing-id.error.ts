import type { Workflow, IWorkflowBase } from 'workflow-automation-workflow';
import { UnexpectedError } from 'workflow-automation-workflow';

export class WorkflowMissingIdError extends UnexpectedError {
	constructor(workflow: Workflow | IWorkflowBase) {
		super('Detected ID-less worklfow', { extra: { workflow } });
	}
}
