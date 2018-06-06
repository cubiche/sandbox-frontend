import Module from "../../core/Module";
import OrderCreate from "./OrderCreate";
import OrderPay from "./OrderPay";
import MyOrderList from "./MyOrderList";

const Order = new Module({
    namespace: 'reservation', store: 'order',
    modules: [
        OrderCreate,
        OrderPay,
        MyOrderList,
    ],
    initialState: {}
})

export default Order;