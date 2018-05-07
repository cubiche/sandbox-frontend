import { withReduxSagaAndSecurity } from "../../../src/infrastructure/with";
import OrderListPage from '../../../src/ui/back/templates/Order/List'

export default withReduxSagaAndSecurity(OrderListPage)