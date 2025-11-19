import { UnexpectedError } from 'workflow-automation-workflow';

export class UncacheableValueError extends UnexpectedError {
	constructor(key: string) {
		super('Value cannot be cached in Redis', {
			extra: { key, hint: 'Does the value contain circular references?' },
		});
	}
}
