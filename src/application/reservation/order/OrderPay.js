import createRemoteObject from "../../core/RemoteObject";
import { mutation } from '../../core/effects';
import gql from './gql';

const OrderPay = createRemoteObject({
    namespace: 'order', store: 'pay'
}).extend({
    selectors: (module) => ({
        wasSuccessful: (state) => module.select(state, (localState) => localState.data.id !== undefined)
    }),

    actions: (module) => ({
        pay: (orderId) => module.actions.post({ orderId })
    }),
    sagas: () => ({
        doPost: function *doPost(payload?) {
            const data = yield mutation(gql.mutations.pay, payload)

            return data.payOrder;
        }
    })
})

export default OrderPay;
