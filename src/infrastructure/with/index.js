import withRedux from 'next-redux-wrapper'
import nextReduxSaga from "next-redux-saga";
import { initStore } from '../store'
import withData from "./withData";
import withIntl from "./withIntl";
import withSecurity from "./withSecurity";
import 'antd/dist/antd.css'

export function withReduxSaga(Component) {
    return withRedux(initStore)(nextReduxSaga(withIntl(withData(Component))))
}

export function withReduxSagaAndSecurity(Component) {
    return withRedux(initStore)(nextReduxSaga(withIntl(withData(withSecurity(Component)))))
}