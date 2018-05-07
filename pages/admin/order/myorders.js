import { withReduxSagaAndSecurity } from "../../../src/infrastructure/with";
import OrderListPage from '../../../src/ui/back/templates/Order/MyOrders'

export default withReduxSagaAndSecurity(OrderListPage)