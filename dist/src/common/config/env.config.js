"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIntegrityOfEnvVars = exports.getNumberValue = exports.getFirebaseCredentials = exports.getValue = exports.ENV_VARS = void 0;
const dotenv_1 = require("dotenv");
const firebase_admin_1 = require("firebase-admin");
(0, dotenv_1.config)();
exports.ENV_VARS = {
    NODE_ENV: 'NODE_ENV',
    TZ: 'TZ',
    PORT: 'PORT',
    STRIPE_PUBLIC_KEY: 'STRIPE_PUBLIC_KEY',
    STRIPE_PRIVATE_KEY: 'STRIPE_PRIVATE_KEY',
    PLATFORM_FEE_PERCENT: 'PLATFORM_FEE_PERCENT',
    PAYMENT_INFRA_PROVIDER_FEE_PERCENT: 'PAYMENT_INFRA_PROVIDER_FEE_PERCENT',
    PAYMENT_INFRA_PROVIDER_FEE_CONSTANT: 'PAYMENT_INFRA_PROVIDER_FEE_CONSTANT',
    REFLECT_STRIPE_FEES_TO_SELLERS: 'REFLECT_STRIPE_FEES_TO_SELLERS',
    PROJECT_ID: 'PROJECT_ID',
    PRIVATE_KEY: 'PRIVATE_KEY',
    CLIENT_EMAIL: 'CLIENT_EMAIL',
    WEBHOOK_SIGNING_SECRET: 'WEBHOOK_SIGNING_SECRET'
};
const getValue = (key) => process.env[key];
exports.getValue = getValue;
const getFirebaseCredentials = () => firebase_admin_1.credential.cert({
    projectId: (0, exports.getValue)(exports.ENV_VARS.PROJECT_ID),
    privateKey: (0, exports.getValue)(exports.ENV_VARS.PRIVATE_KEY),
    clientEmail: (0, exports.getValue)(exports.ENV_VARS.CLIENT_EMAIL),
});
exports.getFirebaseCredentials = getFirebaseCredentials;
const getNumberValue = (key) => Number(process.env[key]);
exports.getNumberValue = getNumberValue;
const validateIntegrityOfEnvVars = () => {
    const collectedMissingEnvVars = [];
    for (const key in exports.ENV_VARS) {
        const definedEnvVar = (0, exports.getValue)(key);
        if (!definedEnvVar) {
            collectedMissingEnvVars.push(key);
        }
    }
    if (collectedMissingEnvVars.length > 0) {
        console.log(`Following ENV variables are missing:\n${collectedMissingEnvVars.map((missingEnvVar) => `${missingEnvVar}\n`)}`.red);
        process.exit(1);
    }
};
exports.validateIntegrityOfEnvVars = validateIntegrityOfEnvVars;
//# sourceMappingURL=env.config.js.map