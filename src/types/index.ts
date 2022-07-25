/*
    Type definitions for xrphone-sdk-nodejs 0.0.1
    Project: https://xrphone.app
    Definitions by: Jremi <https://github.com/jremi>
    Definitions: https://github.com/xrphone/xrphone-sdk-nodejs
*/

export type FiatCurrencyCodes = 'USD'

export type XrplCurrencyCodes = 'XRP'

export type InvoicePaymentResult = 'success' | 'failure'

export type PayloadBodyMetadata = XrphoneSdkInfo & XrphoneSdkCredentialsAsHex

export interface XrphoneSdkCredentials {
    apiKey: string
    apiSecret: string
}

export interface XrphoneSdkInfo {
    name: string,
    version: string
}

export interface XrphoneSdkCredentialsAsHex {
    credentials: string
}

export interface WebhookTopicInvoiceLookupRequestBody {
    /** Invoice number of invoice awaiting lookup */
    invoiceNumber: string;
}

export interface WebhookTopicInvoicePaymentRequestBody {
    /** Invoice number of invoice awaiting payment */
    invoiceNumber: string;
    /** Utc timestamp when transaction was initiated */
    date: string;
    /** Fiat denominated amount being applied as invoice payment */
    amount: number;
    /** Fiat currency type associated with the amount */
    fiatCurrency: FiatCurrencyCodes;
    /** XRPL digital asset currency type used to make invoice payment */
    currency: XrplCurrencyCodes;
    /** XRPL transaction id associated with the received XRPL currency payment */
    xrplTransactionId: string;
    /** XRPhone customer number associated with the invoice payment */
    customerPhoneNumber: string;
    /** XRPL transaction memo containing note with transaction details */
    memo: string;
    /** The amount applied in XRP based on the converted fiat currency value at time of transaction */
    xrpAmount: string;
}

export interface WebhookTopicInvoiceLookupResponse {
    metadata: PayloadBodyMetadata
    amountDue: number
    currencyCode: FiatCurrencyCodes
}

export interface WebhookTopicInvoicePaymentResponse {
    metadata: PayloadBodyMetadata
    paymentResult: InvoicePaymentResult
}
