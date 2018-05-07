import createRemoteObject from "../../core/RemoteObject";
import { mutation } from '../../core/effects';
import gql from './gql';

const UserResetPassword = createRemoteObject({
    namespace: 'user', store: 'resetPassword'
}).extend({
    selectors: (module) => ({
        wasSuccessful: (state) => module.select(state, (localState) => localState.data === true),
    }),

    actions: (module) => ({
        resetPassword: (userId, password, confirm) => module.actions.post({ userId: userId, password: password, confirm: confirm })
    }),
    sagas: () => ({
        doPost: function *doPost(payload?) {
            const { password, confirm } = payload
            if (password !== confirm) {
                throw new Error(JSON.stringify({"password": "Password does not match the confirm password"}))
            } else {
                const data = yield mutation(gql.mutations.resetPassword, payload)

                return data.resetUserPassword;
            }
        }
    })
})

export default UserResetPassword;
