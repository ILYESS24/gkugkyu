import type { PublicInstalledPackage } from 'workflow-automation-workflow';

export interface CommunityPackageMap {
	[name: string]: PublicInstalledPackage;
}
