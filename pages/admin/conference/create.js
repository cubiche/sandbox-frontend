import { withReduxSagaAndSecurity } from "../../../src/infrastructure/with";
import ConferenceCreatePage from '../../../src/ui/back/templates/Conference/Create'

export default withReduxSagaAndSecurity(ConferenceCreatePage)