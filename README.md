# n8n-nodes-addtowallet

This is an n8n community node. It lets you use **Add To Wallet** in your n8n workflows .

**Add To Wallet** is a platform for creating and distributing digital wallet passes such as **loyalty cards, coupons, gift cards, and event tickets** for Apple Wallet and Google Wallet.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)  

---

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Or install directly in your n8n root directory:

```bash
npm i n8n-nodes-addtowallet


Operations

Currently, the Add To Wallet node supports:

Create Pass – generate a new wallet pass (loyalty card, coupon, gift card, or event ticket).

Credentials

To use this node, you need an Add To Wallet API Key.

Sign up at Add To Wallet
.

Navigate to your Developer Dashboard and copy your API Key.
In n8n, create new credentials for Add To Wallet API:
Base URL – default: https://app.addtowallet.co
API Key – paste your API key

Compatibility

Minimum n8n version: 1.0.0

Tested against: 1.0.0 – latest

No known compatibility issues.

Usage
After creating your Add To Wallet API credentials, you can:
Add the Add To Wallet node to your workflow.
Select the Create Pass operation.
Fill in the required fields like title, description, text modules, and images.
Run the workflow to generate your wallet pass.

Resources
n8n community nodes documentation
Add To Wallet API Documentation
Add To Wallet Website
Version history
1.0.0 – Initial release with Create Pass operation.