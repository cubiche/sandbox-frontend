import createRemoteObject from "../../core/RemoteObject";
import { query } from '../../core/effects';
import gql from './gql';

const UserList = createRemoteObject({
    namespace: 'user', store: 'list'
}).extend({
    selectors: (module) => ({
        all: (state) => module.selectors.data(state)
    }),
    sagas: () => ({
        doFetch: function *doFetch() {
            const data = yield query(gql.queries.users)

            return data.users;
        }
    })
})

export default UserList;
