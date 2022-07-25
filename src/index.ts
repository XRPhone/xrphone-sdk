import * as dotenv from 'dotenv'
import * as types from './types'

const { name, version } = require('../package.json');

export class XrphoneSdk {
    private sdkCredentials: types.XrphoneSdkCredentials

    constructor(apiKey?: string, apiSecret?: string) {
        this.sdkCredentials = {
            apiKey: apiKey || this.__getEnv('XRPHONE_API_KEY'),
            apiSecret: apiSecret || this.__getEnv('XRPHONE_API_SECRET'),
        }

        if (this.sdkCredentials.apiKey === '') {
            throw new Error('apiKey is required!')
        }

        if (this.sdkCredentials.apiSecret === '') {
            throw new Error('apiSecret is required!')
        }

        return this
    }

    /** Get environment variable from .env file. */
    private __getEnv(arg: string): string {
        let value = ''

        try {
            dotenv.config()
            value = process.env[arg] || ''
        } catch (_e) {
            // Couldn't load .env
        }

        return value
    }

    /** Information about the sdk */
    private get __sdkInfo(): types.XrphoneSdkInfo {
        return {
            name,
            version
        }
    }

    /** Encode SDK credentials into single hexidecimal string. */
    private get __sdkCredentialsAsHex(): types.XrphoneSdkCredentialsAsHex {
        return {
            credentials: Buffer.from(
                `${this.sdkCredentials.apiKey}:${this.sdkCredentials.apiSecret}`,
                'utf8'
            ).toString('hex'),
        }
    }

    /** Provides additional sdk metadata in the payload responses. */
    private get __payloadBodyMetadata(): types.PayloadBodyMetadata {
        return {
            ...this.__sdkInfo,
            ...this.__sdkCredentialsAsHex,
        }
    }

    /** Create invoice lookup response payload object used for webhook topic "INVOICE_LOOKUP" payload response. */
    public createInvoiceLookupResponsePayload(
        amountDue: number,
        currencyCode: types.FiatCurrencyCodes
    ): types.WebhookTopicInvoiceLookupResponse {
        return {
            metadata: this.__payloadBodyMetadata,
            amountDue,
            currencyCode,
        }
    }

    /** Create invoice lookup response payload object used for webhook topic "INVOICE_PAYMENT" payload response. */
    public createInvoicePaymentResponsePayload(
        paymentResult: types.InvoicePaymentResult
    ): types.WebhookTopicInvoicePaymentResponse {
        return {
            metadata: this.__payloadBodyMetadata,
            paymentResult,
        }
    }
}

export type {
    types as XrphoneTypes
}