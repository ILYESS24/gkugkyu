import type { IDataObject } from 'workflow-automation-workflow';

export interface IDataset {
	label?: string;
	data: string | IDataObject;
	backgroundColor?: string;
	borderColor?: string;
	color?: string;
	type?: string;
	fill?: boolean;
	pointStyle?: string;
}
