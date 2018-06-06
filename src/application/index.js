import Module from './core/Module'
import Conference from './conference'
import Reservation from './reservation'
import Locale from './system/locale'
import Security from './security'
import {all, fork, put, take} from "redux-saga/effects";
import { putJWT, redirect, resetJWT, resetCache } from "./core/effects";

const App = new Module({
    namespace: 'brm', store: 'app',
    types: ['RESET'],
    reducer: (state, action, { types, statuses, initialState }) => {
        switch(action.type) {
            case types.RESET:
                return initialState
            default:
                return state
        }
    },
    initialState: {}
}).extend({
    modules: [
        Conference,
        Reservation,
        Locale,
        Security
    ],
    sagas: (module, parentModule) => ({
        rootSaga: function* rootSaga() {
            yield all([
                fork(parentModule.rootSaga),
                fork(module.sagas.watchLogin),
                fork(module.sagas.watchLogout)
            ]);
        },
        watchLogin: function *watchLogin() {
            let action;
            do {
                action = yield take(Security.types.user.login.POST_SUCCESS);

                yield putJWT(action.payload.token);
                yield redirect('/');
            } while (action);
        },
        watchLogout: function *watchLogout() {
            let action;
            do {
                yield take(Security.types.user.logout.POST_SUCCESS);
                yield put(Module.createAction(module.types.RESET, {}));

                yield resetCache();
                yield resetJWT();
                yield redirect('/');
            } while (action);
        }
    })
});

export default App;
