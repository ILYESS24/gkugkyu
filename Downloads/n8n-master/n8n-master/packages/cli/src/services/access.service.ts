import type { User } from '@workflow-automation/db';
import { UserRepository } from '@workflow-automation/db';
import { Service } from '@workflow-automation/di';
import type { Workflow } from 'workflow-automation-workflow';

import { WorkflowFinderService } from '@/workflows/workflow-finder.service';

/**
 * Responsible for checking whether a user has access to a resource.
 */
@Service()
export class AccessService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly workflowFinderService: WorkflowFinderService,
	) {}

	/** Whether a user has read access to a workflow based on their project and scope. */
	async hasReadAccess(userId: User['id'], workflowId: Workflow['id']) {
		const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['role'] });

		if (!user) return false;

		const workflow = await this.workflowFinderService.findWorkflowForUser(workflowId, user, [
			'workflow:read',
		]);

		return workflow !== null;
	}
}
