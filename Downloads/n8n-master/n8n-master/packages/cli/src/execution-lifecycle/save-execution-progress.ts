import { Logger } from '@workflow-automation/backend-common';
import { ExecutionRepository } from '@workflow-automation/db';
import { Container } from '@workflow-automation/di';
import { ErrorReporter } from 'workflow-automation-core';
import { createRunExecutionData, type IRunExecutionData, type ITaskData } from 'workflow-automation-workflow';

export async function saveExecutionProgress(
	workflowId: string,
	executionId: string,
	nodeName: string,
	data: ITaskData,
	executionData: IRunExecutionData,
) {
	const logger = Container.get(Logger);
	const executionRepository = Container.get(ExecutionRepository);
	const errorReporter = Container.get(ErrorReporter);

	try {
		logger.debug(`Save execution progress to database for execution ID ${executionId} `, {
			executionId,
			nodeName,
		});

		const fullExecutionData = await executionRepository.findSingleExecution(executionId, {
			includeData: true,
			unflattenData: true,
		});

		if (!fullExecutionData) {
			// Something went badly wrong if this happens.
			// This check is here mostly to make typescript happy.
			return;
		}

		if (fullExecutionData.finished) {
			// We already received Â´workflowExecuteAfterÂ´ webhook, so this is just an async call
			// that was left behind. We skip saving because the other call should have saved everything
			// so this one is safe to ignore
			return;
		}

		fullExecutionData.data ??= createRunExecutionData();

		const { runData } = fullExecutionData.data.resultData;
		(runData[nodeName] ??= []).push(data);

		fullExecutionData.data.executionData = executionData.executionData;

		// Set last executed node so that it may resume on failure
		fullExecutionData.data.resultData.lastNodeExecuted = nodeName;

		// If the execution was canceled, we do not change the status
		// to running, because it is already canceled.
		if (fullExecutionData.status !== 'canceled') {
			fullExecutionData.status = 'running';
		}

		await executionRepository.updateExistingExecution(executionId, fullExecutionData);
	} catch (e) {
		const error = e instanceof Error ? e : new Error(`${e}`);

		errorReporter.error(error);
		// TODO: Improve in the future!
		// Errors here might happen because of database access
		// For busy machines, we may get "Database is locked" errors.

		// We do this to prevent crashes and executions ending in `unknown` state.
		logger.error(
			`Failed saving execution progress to database for execution ID ${executionId} (hookFunctionsSaveProgress, nodeExecuteAfter)`,
			{ error, executionId, workflowId },
		);
	}
}
