import createRemoteObject from "../../core/RemoteObject";
import {put} from "redux-saga/effects";
import { query } from '../../core/effects';
import gql from './gql';

const RoleList = createRemoteObject({
    namespace: 'role', store: 'list'
}).extend({
    selectors: (module) => ({
        all: (state) => module.selectors.data(state),
        customer: (state) => module.select(state, (localState) => localState.data.find(role => role.name === 'CUSTOMER'))
    }),

    sagas: (module) => ({
        doFetch: function *doFetch() {
            const data = yield query(gql.queries.roles)

            return data.roles;
        },
        startUpSaga: function* startUpSaga() {
            // fetch role list
            yield put(module.actions.fetch());
        }
    })
})

export default RoleList;
