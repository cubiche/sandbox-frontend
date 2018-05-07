import { withReduxSagaAndSecurity } from "../../../src/infrastructure/with";
import UserListPage from '../../../src/ui/back/templates/User/List'

export default withReduxSagaAndSecurity(UserListPage)