# **XRPhone SDK for Node.js**
<img src="https://img.shields.io/badge/XRPhone%20SDK-UNRELEASED-important" />
<a href="https://npmjs.org/package/xrphone-sdk-nodejs"><img src="https://img.shields.io/npm/v/xrphone.svg?style=flat-square" alt="NPM version"></a>

> **NOTICE:** Currently SDK is **UNRELEASED**. Contact XRPhone directly to obtain early access.

# Overview
XRPhone apps are created on the XRPhone developer portal. When XRPhone apps are called using their associated POST method webhook callback url, the request includes the header `X-XRPhone-Topic`. The **"topic"** is the type of webhook event that the current XRPhone request is awaiting a response for. 

**NOTE:** This SDK includes TypeScript support.

# Installing SDK with `require`
```javascript
const { XrphoneSdk } = require('xrphone-sdk');
```

# Installing SDK with `import`
```javascript
import { XrphoneSdk } from 'xrphone-sdk';
```
# XRPhone Developer App Credentials
To utilize this SDK you need to provide your XRPhone app API Key & API Secret. These values are generated when you create an app via the XRPhone Developer Portal. 

The XRPhone Developer Portal can be found here: https://developer.xrphone.app. **NOTE** The Developer Portal is currently unavailable until official release of XRPhone platform.

The SDK can obtain your API Key & API Secret in two different methods.

## Method #1) `.env` environment file
---
Include the env variables `XRPHONE_API_KEY` and `XRPHONE_API_SECRET` with your XRPhone app API Key & Api Secret values. The SDK will automatically use these values when you instantiate the SDK class. If you choose this method you **DO NOT NEED TO PROVIDE ANY ARGUMENTS WHEN INSTANTIATING CLASS**. Make sure to remove the `<` `>` brackets. They are only shown in the example to demonstrate where you need to replace with your actual credentials.

```shell
# Example .env file
XRPHONE_API_KEY=<YOUR_XRPHONE_API_KEY>
XRPHONE_API_SECRET=<YOUR_XRPHONE_API_SECRET>
```
```javascript
// Keep constructor arguments empty since your using .env file
const xrphone = new XrphoneSdk()
```
## Method #2) Provide arguments at class instantiation
---
```javascript
const apiKey = "YOUR_XRPHONE_API_KEY";
const apiSecret = "YOUR_XRPHONE_API_SECRET";

// Provide constructor with (apiKey, apiSecret) arguments
const xrphone = new XrphoneSdk(apiKey, apiSecret)
```
# XRPhone Webhook Topics

When XRPhone calls your application with the webhook topic POST request, XRPhone will wait upto 3 seconds for a response before timing out. 

The response payload object must contain the correct object format to complete roundtrip request/response cycle.

The SDK public methods below create objects that are formatted for the associated webhook topics. The generated object contains your API Key & API Secret. These are used to authorize your webhook response for the associated call request.

## Webhook Topic: `INVOICE_LOOKUP`
---
`createInvoiceLookupResponsePayload(amountDue, currencyCode)`
> Creates invoice lookup response payload object used for webhook topic **INVOICE_LOOKUP** payload response.

## Webhook Topic: `INVOICE_PAYMENT`
---
`createInvoicePaymentResponsePayload(paymentResult)`
> Creates invoice lookup response payload object used for webhook topic **INVOICE_PAYMENT** payload response.

# TypeScript Type Declarations

The `/dist` folder distributable includes index.d.ts declaration file. This should automatically be picked up by most IDE editors. However, if you need to manually get access to specific type definitions you can can import the types directly into your codebase.

```javascript
import { XrphoneTypes } from 'xrphone-sdk'
```
# Need help?

Please visit https://docs.xrphone.app

# Learn more
- https://xrphone.app
- https://twitter.com/XRPhoneOfficial
