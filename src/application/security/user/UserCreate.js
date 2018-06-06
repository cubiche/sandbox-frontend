import createRemoteObject from "../../core/RemoteObject";
import { mutation } from '../../core/effects';
import gql from './gql';

const UserCreate = createRemoteObject({
    namespace: 'user', store: 'create'
}).extend({
    selectors: (module) => ({
        wasSuccessful: (state) => module.select(state, (localState) => localState.data.id !== undefined)
    }),

    actions: (module) => ({
        create: (username, email, password, roles, verificationByEmail) => module.actions.post({
            username,
            email,
            password,
            roles,
            verificationByEmail
        })
    }),
    sagas: () => ({
        doPost: function *doPost(payload?) {
            const data = yield mutation(gql.mutations.create, payload)

            return data.createUser;
        }
    })
})

export default UserCreate;
