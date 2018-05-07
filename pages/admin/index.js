import { withReduxSagaAndSecurity } from "../../src/infrastructure/with";
import HomePage from '../../src/ui/back/templates/Home'

export default withReduxSagaAndSecurity(HomePage)