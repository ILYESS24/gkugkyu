import type { ICredentialType, INodeProperties } from 'workflow-automation-workflow';

export class AffinityApi implements ICredentialType {
	name = 'affinityApi';

	displayName = 'Affinity API';

	documentationUrl = 'affinity';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
