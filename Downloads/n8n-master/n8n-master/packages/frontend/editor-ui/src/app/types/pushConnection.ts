import type { PushMessage } from '@workflow-automation/api-types';

export type PushMessageQueueItem = {
	message: PushMessage;
	retriesLeft: number;
};
