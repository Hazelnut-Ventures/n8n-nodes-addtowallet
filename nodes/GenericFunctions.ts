import {
    IExecuteFunctions,
    IHttpRequestMethods,
    IHttpRequestOptions,
    IDataObject,
    NodeApiError,
} from 'n8n-workflow';

export async function addToWalletApiRequest(
    this: IExecuteFunctions,
    method: IHttpRequestMethods,
    endpoint: string,
    body: IDataObject = {},
): Promise<any> {
    const credentials = await this.getCredentials('addToWalletApi');

    const options: IHttpRequestOptions = {
        method,
        url: `${credentials.baseUrl}${endpoint}`,
        json: true,
        headers: {
            apikey: credentials.apiKey, 
        },
        body,
    };

    // Remove empty body for GET requests
    if (method === 'GET' || Object.keys(body).length === 0) {
        delete options.body;
    }

    try {
        return await this.helpers.request(options);
    } catch (error) {
        const apiError = error as any;
        if (apiError.response?.body) {
            const errorBody = apiError.response.body;
            let errorMessage = 'Unknown API error';
            if (typeof errorBody === 'string') {
                errorMessage = errorBody;
            } else if (errorBody.message) {
                errorMessage = errorBody.message;
            } else if (errorBody.error) {
                errorMessage = errorBody.error;
            }

            throw new NodeApiError(this.getNode(), {
                message: errorMessage,
                description: `Add To Wallet API returned ${apiError.response.statusCode}`,
                httpCode: apiError.response.statusCode.toString(),
            });
        }
        throw error;
    }
}
