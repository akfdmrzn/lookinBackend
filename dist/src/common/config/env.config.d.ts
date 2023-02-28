export declare const ENV_VARS: {
    NODE_ENV: string;
    TZ: string;
    PORT: string;
    STRIPE_PUBLIC_KEY: string;
    STRIPE_PRIVATE_KEY: string;
    PLATFORM_FEE_PERCENT: string;
};
export declare const getValue: (key: string) => string;
export declare const getNumberValue: (key: any) => number;
export declare const validateIntegrityOfEnvVars: () => void;
