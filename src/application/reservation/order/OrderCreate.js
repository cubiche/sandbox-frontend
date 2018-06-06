import createRemoteObject from "../../core/RemoteObject";
import { mutation } from '../../core/effects';
import gql from './gql';

const OrderCreate = createRemoteObject({
    namespace: 'order', store: 'create'
}).extend({
    selectors: (module) => ({
        wasSuccessful: (state) => module.select(state, (localState) => localState.data.id !== undefined)
    }),

    actions: (module) => ({
        create: (conferenceId, numberOfTickets) => module.actions.post({
            conferenceId,
            numberOfTickets
        })
    }),
    sagas: () => ({
        doPost: function *doPost(payload?) {
            const data = yield mutation(gql.mutations.create, payload)

            return data.createOrder;
        }
    })
})

export default OrderCreate;
