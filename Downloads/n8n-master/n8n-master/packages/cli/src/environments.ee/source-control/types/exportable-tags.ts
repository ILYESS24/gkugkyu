import type { TagEntity, WorkflowTagMapping } from '@workflow-automation/db';

export type ExportableTags = { tags: TagEntity[]; mappings: WorkflowTagMapping[] };
