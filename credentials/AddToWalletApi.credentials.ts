import {
  Icon,
  IconFile,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class AddToWalletApi implements ICredentialType {
  name = 'addToWalletApi';
  displayName = 'AddToWallet API';
  documentationUrl = 'https://app.addtowallet.co/api-docs';
  icon: Icon = { light: 'file:logo.svg', dark: 'file:logo.svg' };
  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://app.addtowallet.co',
      description: 'Base URL for the AddToWallet API',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
      description: 'Your AddToWallet API key',
    },
  ];
}