import { race, call, put, take } from 'redux-saga/effects';
import createRemoteObject from "../../core/RemoteObject";
import { mutation } from '../../core/effects';
import gql from './gql';
import Module from "../../core/Module";
import UserLogout from "./UserLogout"

const UserLogin = createRemoteObject({
    namespace: 'user', store: 'login'
}).extend({
    actions: (module) => ({
        login: (username, password) => module.actions.post({ usernameOrEmail: username, password: password })
    }),

    sagas: (module) => ({
        doPost: function *doPost(payload?) {
            const data = yield mutation(gql.mutations.login, payload)

            return data.loginUser;
        },
        watchPost: function *watchPost() {
            // Because sagas are generators, doing `while (true)` doesn't block our program
            // Basically here we say "this saga is always listening for actions"
            while (true) {
                // And we're listening for `LOGIN` actions
                const action = yield take(module.types.POST);

                let winner;
                // A `LOGOUT` action may happen while the `login` effect is going on, which may
                // lead to a race condition. This is unlikely, but just in case, we call `race` which
                // returns the "winner", i.e. the one that finished first
                try {
                    winner = yield race({
                        login: call(module.sagas.doPost, action.payload ),
                        logout: take(UserLogout.types.POST)
                    })

                    if (winner.login) {
                        yield put(Module.createAction(module.types.POST_SUCCESS, { token: winner.login } ))
                    }
                } catch (error) {
                    yield put(Module.createAction(module.types.POST_FAILURE, error));
                }
            }
        },
    })
})

export default UserLogin;