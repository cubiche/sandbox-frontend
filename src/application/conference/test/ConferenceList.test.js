import remoteObjectTest from '../../core/test/RemoteObject.test';
import ConferenceList from '../ConferenceList';

describe('Conference list', () => {
    remoteObjectTest(ConferenceList, [{ id: 1, name: 'DDD conference', availableTickets: 32 }, { id: 2, name: 'ReactJS conference', availableTickets: 250 }]);
});
