import { StatisticsNames, type WorkflowStatistics } from '@workflow-automation/db';
import { WorkflowStatisticsRepository } from '@workflow-automation/db';
import { Container } from '@workflow-automation/di';
import type { Workflow } from 'workflow-automation-workflow';

export async function createWorkflowStatisticsItem(
	workflowId: Workflow['id'],
	data?: Partial<WorkflowStatistics>,
) {
	const entity = Container.get(WorkflowStatisticsRepository).create({
		count: 0,
		latestEvent: new Date().toISOString(),
		name: StatisticsNames.manualSuccess,
		...(data ?? {}),
		workflowId,
	});

	await Container.get(WorkflowStatisticsRepository).insert(entity);

	return entity;
}
