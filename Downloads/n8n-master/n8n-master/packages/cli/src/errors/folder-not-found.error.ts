import { OperationalError } from 'workflow-automation-workflow';

export class FolderNotFoundError extends OperationalError {
	constructor(folderId: string) {
		super(`Could not find the folder: ${folderId}`, {
			level: 'warning',
		});
	}
}
