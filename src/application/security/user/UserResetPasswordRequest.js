import createRemoteObject from "../../core/RemoteObject";
import { mutation } from '../../core/effects';
import gql from './gql';

const UserResetPasswordRequest = createRemoteObject({
    namespace: 'user', store: 'resetPasswordRequest'
}).extend({
    selectors: (module) => ({
        wasSuccessful: (state) => module.select(state, (localState) => localState.data === true),
    }),

    actions: (module) => ({
        resetPasswordRequest: (email) => module.actions.post({ email: email })
    }),
    sagas: () => ({
        doPost: function *doPost(payload?) {
            const data = yield mutation(gql.mutations.resetPasswordRequest, payload)

            return data.resetUserPasswordRequest;
        }
    })
})

export default UserResetPasswordRequest;
