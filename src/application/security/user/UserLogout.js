import createRemoteObject from "../../core/RemoteObject";
import { mutation } from '../../core/effects';
import gql from './gql';

const UserLogout = createRemoteObject({
    namespace: 'user', store: 'logout'
}).extend({
    actions: (module) => ({
        logout: (userId) => module.actions.post({ userId: userId })
    }),

    sagas: () => ({
        doPost: function *doPost(payload?) {
            const data = yield mutation(gql.mutations.logout, payload)

            return data.logoutUser;
        }
    })
})

export default UserLogout;