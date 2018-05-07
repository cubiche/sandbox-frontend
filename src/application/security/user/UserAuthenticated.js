import createRemoteObject from "../../core/RemoteObject";
import { query } from '../../core/effects';
import gql from './gql';
import { put } from "redux-saga/effects";

const UserAuthenticated = createRemoteObject({
    namespace: 'user', store: 'authenticated'
}).extend({
    selectors: (module) => ({
        me: (state) => module.selectors.data(state)
    }),
    sagas: (module) => ({
        doFetch: function *doFetch() {
            const data = yield query(gql.queries.me)

            return data.me;
        },
        startUpSaga: function* startUpSaga() {
            // fetch authenticated user
            yield put(module.actions.fetch());
        }
    })
})

export default UserAuthenticated;