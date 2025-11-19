import type { CreateDataTableColumnDto } from '@workflow-automation/api-types';
import { randomName } from '@n8n/backend-test-utils';
import type { Project } from '@workflow-automation/db';
import { Container } from '@workflow-automation/di';
import type { DataTableRows } from 'workflow-automation-workflow';

import { DataTableColumnRepository } from '@/modules/data-table/data-table-column.repository';
import { DataTableRowsRepository } from '@/modules/data-table/data-table-rows.repository';
import { DataTableRepository } from '@/modules/data-table/data-table.repository';

export const createDataTable = async (
	project: Project,
	options: {
		name?: string;
		columns?: CreateDataTableColumnDto[];
		data?: DataTableRows;
		updatedAt?: Date;
	} = {},
) => {
	const dataTableRepository = Container.get(DataTableRepository);
	const dataTable = await dataTableRepository.createDataTable(
		project.id,
		options.name ?? randomName(),
		options.columns ?? [],
	);

	if (options.updatedAt) {
		await dataTableRepository.update(dataTable.id, {
			updatedAt: options.updatedAt,
		});
		dataTable.updatedAt = options.updatedAt;
	}

	if (options.data) {
		const dataTableColumnRepository = Container.get(DataTableColumnRepository);
		const columns = await dataTableColumnRepository.getColumns(dataTable.id);

		const dataTableRowsRepository = Container.get(DataTableRowsRepository);
		await dataTableRowsRepository.insertRows(dataTable.id, options.data, columns, 'count');
	}

	return dataTable;
};
