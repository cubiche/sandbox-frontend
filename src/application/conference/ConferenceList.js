import createRemoteObject from "../core/RemoteObject";
import { query } from '../core/effects';
import gql from './gql';

const ConferenceList = createRemoteObject({
    namespace: 'conference', store: 'list'
}).extend({
    selectors: (module) => ({
        all: (state) => module.selectors.data(state),
        getById: (state, id) => module.select(state, (localState) => localState.data.find(conference => conference.id === id))
    }),
    sagas: () => ({
        doFetch: function *doFetch() {
            const data = yield query(gql.queries.conferences)

            return data.conferences;
        }
    })
})

export default ConferenceList;
