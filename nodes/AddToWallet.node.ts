import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IDataObject,
    NodeConnectionType,
} from 'n8n-workflow';

import { addToWalletApiRequest } from './GenericFunctions';

export class AddToWallet implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Add To Wallet',
        name: 'addToWallet',
        icon: { light: 'file:logo.svg', dark: 'file:logo.svg' },
        group: ['transform'],
        version: 1,
        description: 'Create digital wallet passes',
        defaults: { name: 'Add To Wallet' },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [{ name: 'addToWalletApi', required: true }],
        properties: [
            { displayName: 'Card Title', name: 'cardTitle', type: 'string', required: true, default: '', placeholder: 'Your Business Name' },
            { displayName: 'Header', name: 'header', type: 'string', required: true, default: '', placeholder: 'John Doe' },
            { displayName: 'Logo URL', name: 'logoUrl', type: 'string', default: '', placeholder: 'https://example.com/logo.png' },
            { displayName: 'Rectangle Logo', name: 'rectangleLogo', type: 'string', default: '', placeholder: 'https://example.com/rectangle.png' },
            { displayName: 'Hero Image', name: 'heroImage', type: 'string', default: '', placeholder: 'https://example.com/hero.png' },
            { displayName: 'Google Hero Image', name: 'googleHeroImage', type: 'string', default: '', placeholder: 'https://example.com/google.png' },
            { displayName: 'Apple Hero Image', name: 'appleHeroImage', type: 'string', default: '', placeholder: 'https://example.com/apple.png' },
            { displayName: 'Background Color', name: 'hexBackgroundColor', type: 'string', default: '#141f31' },
            { displayName: 'Apple Font Color', name: 'appleFontColor', type: 'string', default: '#FFFFFF' },
            { displayName: 'Barcode Value', name: 'barcodeValue', type: 'string', default: '' },
            { displayName: 'Barcode Alt Text', name: 'barcodeAltText', type: 'string', default: '' },
            { displayName: 'Barcode Type', name: 'barcodeType', type: 'options', options: [
                { name: 'QR Code', value: 'QR_CODE' },
                { name: 'PDF417', value: 'PDF_417' },
                { name: 'Aztec', value: 'AZTEC' },
                { name: 'Code 128', value: 'CODE_128' },
            ], default: 'QR_CODE' },
			{ displayName: 'Text Module 1 Label', name: 'textModule1Label', type: 'string', default: '', placeholder: 'Customer Name' },
			{ displayName: 'Text Module 1 Value', name: 'textModule1Value', type: 'string', default: '', placeholder: 'John Doe' },
			{ displayName: 'Text Module 2 Label', name: 'textModule2Label', type: 'string', default: '', placeholder: 'Membership Level' },
			{ displayName: 'Text Module 2 Value', name: 'textModule2Value', type: 'string', default: '', placeholder: 'Gold Member' },

            
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            try {
                const cardTitle = this.getNodeParameter('cardTitle', i) as string;
                const header = this.getNodeParameter('header', i) as string;
                const logoUrl = this.getNodeParameter('logoUrl', i) as string;
                const rectangleLogo = this.getNodeParameter('rectangleLogo', i) as string;
                const heroImage = this.getNodeParameter('heroImage', i) as string;
                const googleHeroImage = this.getNodeParameter('googleHeroImage', i) as string;
                const appleHeroImage = this.getNodeParameter('appleHeroImage', i) as string;
                const hexBackgroundColor = this.getNodeParameter('hexBackgroundColor', i) as string;
                const appleFontColor = this.getNodeParameter('appleFontColor', i) as string;
                const barcodeValue = this.getNodeParameter('barcodeValue', i) as string;
                const barcodeAltText=this.getNodeParameter('barcodeAltText', i) as string;
                const barcodeType = this.getNodeParameter('barcodeType', i) as string;
                const textModule1Label = this.getNodeParameter('textModule1Label', i) as string;
				const textModule1Value = this.getNodeParameter('textModule1Value', i) as string;
				const textModule2Label = this.getNodeParameter('textModule2Label', i) as string;
				const textModule2Value = this.getNodeParameter('textModule2Value', i) as string;


                const body: IDataObject = {
                    cardTitle,
                    header,
                    logoUrl,
                    rectangleLogo,
                    heroImage,
                    googleHeroImage,
                    appleHeroImage,
                    hexBackgroundColor,
                    appleFontColor,
                    barcodeType: barcodeType,
                    barcodeValue: barcodeValue || '',
                    barcodeAltText: barcodeAltText || '',
                   textModulesData:  [{
                    "id": "r1start",
                    "header": textModule1Label,
                    "body": textModule1Value
                },
                {
                    "id": "r1end",
                    "header": textModule2Label,
                    "body": textModule2Value}],
                linksModuleData: [], // Optional: extend with dynamic links
                };
                const responseData = await addToWalletApiRequest.call(this, 'POST', '/api/card/create', body);

                const shareableUrl = `https://app.addtowallet.co/card/${responseData.cardId}`;
                returnData.push({ json: { cardId: responseData.cardId, message: responseData.msg, shareableUrl, success: true }, pairedItem: { item: i } });

            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: (error as Error).message, success: false }, pairedItem: { item: i } });
                    continue;
                }
                throw error;
            }
        }

        return [returnData];
    }
}
