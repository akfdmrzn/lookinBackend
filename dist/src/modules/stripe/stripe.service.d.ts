import { Request } from 'express';
import { Stripe } from 'stripe';
export declare const stripe: Stripe;
export declare const validateWebhookSign: (webhookRequest: Request) => void;
