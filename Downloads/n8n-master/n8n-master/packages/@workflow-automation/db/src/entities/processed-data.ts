import { Entity, PrimaryColumn } from '@n8n/typeorm';
import type { IProcessedDataEntries, IProcessedDataLatest } from 'workflow-automation-workflow';

import { JsonColumn, WithTimestamps } from './abstract-entity';
import { objectRetriever } from '../utils/transformers';

@Entity()
export class ProcessedData extends WithTimestamps {
	@PrimaryColumn('varchar')
	context: string;

	@PrimaryColumn()
	workflowId: string;

	@JsonColumn({
		nullable: true,
		transformer: objectRetriever,
	})
	value: IProcessedDataEntries | IProcessedDataLatest;
}
