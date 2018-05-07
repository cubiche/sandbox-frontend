import { call } from 'redux-saga/effects';
import context from './context';

function* handleRedirect(target) {
    const router = yield context('router');
    yield call(router.redirect, target, router.context);
}

export default function redirectEffect(target) {
    return call(handleRedirect, target);
}
