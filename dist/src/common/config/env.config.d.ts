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
    FIREBASE_AUTH_NAME: string;
    FIREBASE_AUTH_API_KEY: string;
    FIREBASE_AUTH_PROJECT_ID: string;
};
export declare const getValue: (key: string) => string;
export declare const getNumberValue: (key: any) => number;
export declare const validateIntegrityOfEnvVars: () => void;
