import { ApplicationError } from '@workflow-automation/errors';

export class TaskCancelledError extends ApplicationError {
	constructor(reason: string) {
		super(`Task cancelled: ${reason}`, { level: 'warning' });
	}
}
