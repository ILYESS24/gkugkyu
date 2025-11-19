import type { IHttpRequestOptions, IRequestOptions } from 'workflow-automation-workflow';

export const getUrl = (options: IHttpRequestOptions | IRequestOptions) => {
	// FIXME: HTTP node uses old IRequestOptions interface
	return options.url ?? (options as IRequestOptions).uri;
};
