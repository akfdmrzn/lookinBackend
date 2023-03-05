export declare const ENV_VARS: {
    NODE_ENV: string;
    TZ: string;
    PORT: string;
    STRIPE_PUBLIC_KEY: string;
    STRIPE_PRIVATE_KEY: string;
    PLATFORM_FEE_PERCENT: string;
    PAYMENT_INFRA_PROVIDER_FEE_PERCENT: string;
    PAYMENT_INFRA_PROVIDER_FEE_CONSTANT: string;
    REFLECT_STRIPE_FEES_TO_SELLERS: string;
    PROJECT_ID: string;
    PRIVATE_KEY: string;
    CLIENT_EMAIL: string;
    WEBHOOK_SIGNING_SECRET: string;
};
export declare const getValue: (key: string) => string;
export declare const getFirebaseCredentials: () => import("firebase-admin/app").Credential;
export declare const getNumberValue: (key: any) => number;
export declare const validateIntegrityOfEnvVars: () => void;
