import { UserError } from 'workflow-automation-workflow';

export class DataTableValidationError extends UserError {
	constructor(msg: string) {
		super(`Validation error with data table request: ${msg}`, {
			level: 'warning',
		});
	}
}
