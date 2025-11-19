import { WorkflowRepository } from '@workflow-automation/db';
import { Service } from '@workflow-automation/di';
import { UserError, type IWorkflowBase, type IWorkflowLoader } from 'workflow-automation-workflow';

@Service()
export class WorkflowLoaderService implements IWorkflowLoader {
	constructor(private readonly workflowRepository: WorkflowRepository) {}

	async get(workflowId: string): Promise<IWorkflowBase> {
		const workflow = await this.workflowRepository.findById(workflowId);

		if (!workflow) {
			throw new UserError(`Failed to find workflow with ID "${workflowId}"`);
		}

		return workflow;
	}
}
