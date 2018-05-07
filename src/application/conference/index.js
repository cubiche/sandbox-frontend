import Module from "../core/Module";
import ConferenceList from './ConferenceList'

const Conference = new Module({
    namespace: 'app', store: 'conference',
    modules: [
        ConferenceList
    ],
    initialState: {},
})

export default Conference;