import { Request } from 'express';
import { PaymentIntentDao, PaymentIntentDto, PaymentAccountDto, PaymentAccountDao, PaymentAccountLinkCreateDto, PaymentAccountLinkDao } from '../../common/io/payment-module';
export declare const createPaymentIntentWithoutPaymentMethod: (dto: PaymentIntentDto) => Promise<PaymentIntentDao>;
export declare const createPaymentAccount: (dto: PaymentAccountDto) => Promise<PaymentAccountDao>;
export declare const createPaymentAccountLink: (dto: PaymentAccountLinkCreateDto) => Promise<PaymentAccountLinkDao>;
export declare const handlePaymentIntentStatusChangeForTransferring: (webhookRequest: Request) => Promise<void>;
