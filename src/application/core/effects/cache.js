import { call } from 'redux-saga/effects';
import context from './context';

function* handleCache() {
    const client = yield context('client');
    yield call(client.resetStore);
}

export default function resetCache() {
    return call(handleCache);
}