"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIntegrityOfEnvVars = exports.getNumberValue = exports.getValue = exports.ENV_VARS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ENV_VARS = {
    NODE_ENV: 'NODE_ENV',
    TZ: 'TZ',
    PORT: 'PORT',
    STRIPE_PUBLIC_KEY: 'STRIPE_PUBLIC_KEY',
    STRIPE_PRIVATE_KEY: 'STRIPE_PRIVATE_KEY',
    PLATFORM_FEE_PERCENT: 'PLATFORM_FEE_PERCENT',
};
const getValue = (key) => process.env[key];
exports.getValue = getValue;
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