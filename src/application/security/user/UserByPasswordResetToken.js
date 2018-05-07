import createRemoteObject from "../../core/RemoteObject";
import { query } from '../../core/effects';
import gql from './gql';

const UserByPasswordResetToken = createRemoteObject({
    namespace: 'user', store: 'byPasswordResetToken'
}).extend({
    selectors: (module) => ({
        userId: (state) => {
            const data = module.selectors.data(state);

            return data.id;
        },
    }),

    actions: (module) => ({
        findUser: (token) => module.actions.fetch({ passwordResetToken: token })
    }),

    sagas: () => ({
        doFetch: function *doFetch(payload?) {
            const data = yield query(gql.queries.userByPasswordResetToken, payload)

            return data.userByPasswordResetToken;
        }
    })
})

export default UserByPasswordResetToken;