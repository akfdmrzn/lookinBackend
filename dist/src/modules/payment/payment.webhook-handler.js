"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhookExecutorWrapper = void 0;
const payment_service_1 = require("./payment.service");
const WEBHOOK_EVENT_FUNC_MAP = {
    'payment_intent.succeeded': [payment_service_1.handlePaymentIntentStatusChangeForTransferring]
};
const stripeWebhookExecutorWrapper = async (request) => {
    var _a, e_1, _b, _c;
    const { body: { type } } = request;
    const executorList = WEBHOOK_EVENT_FUNC_MAP[type];
    if (!executorList)
        return;
    try {
        for (var _d = true, executorList_1 = __asyncValues(executorList), executorList_1_1; executorList_1_1 = await executorList_1.next(), _a = executorList_1_1.done, !_a;) {
            _c = executorList_1_1.value;
            _d = false;
            try {
                const executor = _c;
                executor(request);
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = executorList_1.return)) await _b.call(executorList_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
};
exports.stripeWebhookExecutorWrapper = stripeWebhookExecutorWrapper;
//# sourceMappingURL=payment.webhook-handler.js.map