import {
	randomCredentialPayload,
	randomEmail,
	randomName,
	uniqueId,
} from '@n8n/backend-test-utils';
import { CredentialsEntity, Project, User } from '@workflow-automation/db';
import { randomInt } from 'workflow-automation-workflow';

export const mockCredential = (): CredentialsEntity =>
	Object.assign(new CredentialsEntity(), randomCredentialPayload());

export const mockUser = (): User =>
	Object.assign(new User(), {
		id: randomInt(1000),
		email: randomEmail(),
		firstName: randomName(),
		lastName: randomName(),
	});

export const mockProject = (): Project =>
	Object.assign(new Project(), {
		id: uniqueId(),
		type: 'personal',
		name: 'Nathan Fillion <nathan.fillion@n8n.io>',
	});
