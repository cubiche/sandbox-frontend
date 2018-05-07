import { call } from 'redux-saga/effects';
import context from './context';

function* handleGet() {
    const cookie = yield context('cookie');
    const response = yield call(cookie.get, 'jwt');

    return yield response;
}

function* handleSet(value) {
    const cookie = yield context('cookie');
    yield call(cookie.set, 'jwt', value);
}

function* handleRemove() {
    const cookie = yield context('cookie');
    yield call(cookie.remove, 'jwt');
}

export function takeJWT() {
    return call(handleGet);
}

export function putJWT(value) {
    return call(handleSet, value);
}

export function resetJWT() {
    return call(handleRemove);
}