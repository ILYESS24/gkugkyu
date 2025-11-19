import { Service } from '@workflow-automation/di';
import { DataSource, Repository } from '@n8n/typeorm';

import { ExecutionMetadata } from '../entities';

@Service()
export class ExecutionMetadataRepository extends Repository<ExecutionMetadata> {
	constructor(dataSource: DataSource) {
		super(ExecutionMetadata, dataSource.manager);
	}
}
