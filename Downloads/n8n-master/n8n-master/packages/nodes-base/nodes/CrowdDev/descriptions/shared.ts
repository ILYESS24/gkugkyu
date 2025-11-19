import type { INodeProperties } from 'workflow-automation-workflow';

export const emailsField: INodeProperties = {
	displayName: 'Emails',
	name: 'emails',
	description: 'Email addresses of the member',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	options: [
		{
			displayName: 'Item Choice',
			name: 'itemChoice',
			values: [
				{
					displayName: 'Email',
					name: 'email',
					type: 'string',
					placeholder: 'name@email.com',
					default: '',
				},
			],
		},
	],
};
