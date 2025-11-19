import { Command } from '@workflow-automation/decorators';
import { z } from 'zod';
import { Container } from '@workflow-automation/di';

import { BaseCommand } from '../base-command';
import { ImportService } from '../../services/import.service';
import { safeJoinPath } from '@workflow-automation/backend-common';

const flagsSchema = z.object({
	inputDir: z
		.string()
		.describe('Input directory that holds output files for import')
		.default('./outputs'),
	truncateTables: z.coerce.boolean().describe('Truncate tables before import').default(false),
	keyFile: z
		.string()
		.describe('Optional path to a file containing a custom encryption key')
		.optional(),
});

@Command({
	name: 'import:entities',
	description: 'Import database entities from JSON files',
	examples: [
		'',
		'--inputDir=./exports',
		'--inputDir=/path/to/backup',
		'--truncateTables',
		'--inputDir=./exports --truncateTables',
		'--keyFile=/path/to/key.txt',
		'--inputDir=./exports --keyFile=/path/to/key.txt',
	],
	flagsSchema,
})
export class ImportEntitiesCommand extends BaseCommand<z.infer<typeof flagsSchema>> {
	async run() {
		const inputDir = this.flags.inputDir;
		const truncateTables = this.flags.truncateTables;
		const keyFilePath = this.flags.keyFile ? safeJoinPath(this.flags.keyFile) : undefined;

		this.logger.info('\nâš ï¸âš ï¸ This feature is currently under development. âš ï¸âš ï¸');
		this.logger.info('\nðŸš€ Starting entity import...');
		this.logger.info(`ðŸ“ Input directory: ${inputDir}`);
		this.logger.info(`ðŸ—‘ï¸  Truncate tables: ${truncateTables}`);

		await Container.get(ImportService).importEntities(inputDir, truncateTables, keyFilePath);
	}

	catch(error: Error) {
		this.logger.error('âŒ Error importing entities. See log messages for details. \n');
		this.logger.error('Error details:');
		this.logger.error('\n====================================\n');
		this.logger.error(`${error.message} \n`);
	}
}
