import { UserError } from 'workflow-automation-workflow';

export class InvalidSamlMetadataError extends UserError {
	constructor(detail: string = '') {
		super(`Invalid SAML metadata${detail ? ': ' + detail : ''}`);
	}
}
