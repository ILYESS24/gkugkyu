import type { AllEntities } from 'workflow-automation-workflow';

type NodeMap = {
	item: 'create' | 'deleteItem' | 'get' | 'getAll' | 'update';
};

export type WebflowType = AllEntities<NodeMap>;
