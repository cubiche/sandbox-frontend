import myOrders from './query/FindAllMyOrders';
import create from './mutation/CreateOrder';
import pay from './mutation/PayOrder';

export default {
    queries: {
        myOrders
    },
    mutations: {
        create,
        pay
    },
};
