import { chatModelsRequestSchema } from '@workflow-automation/api-types';
import { Z } from 'zod-class';

export class ChatModelsRequestDto extends Z.class(chatModelsRequestSchema.shape) {}
