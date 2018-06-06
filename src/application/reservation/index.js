import Module from "../core/Module";
import Order from './order'
import {all, fork, put, take} from "redux-saga/effects";

const Reservation = new Module({
    namespace: 'app', store: 'reservation',
    initialState: {}
}).extend({
    modules: [
        Order
    ],
    sagas: (module, parentModule) => ({
        rootSaga: function* rootSaga() {
            yield all([
                fork(parentModule.rootSaga),
                fork(module.sagas.watchCreate)
            ]);
        },
        watchCreate: function *watchCreate() {
            let action;
            do {
                action = yield take(Reservation.types.order.create.POST_SUCCESS);

                yield put(Module.createAction(Reservation.types.order.pay.POST, { orderId: action.payload.id }));
            } while (action);
        }
    })
});

export default Reservation;