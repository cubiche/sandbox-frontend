import React from 'react';
import Page from '../../../common/Page'
import Layout from '../../components/Layout'
import OrderList from '../../components/Order/OrderList'

export default class OrderListPage extends React.Component {
    render() {
        return (
            <Page title="Orders" description="System order list">
                <Layout>
                    <OrderList></OrderList>
                </Layout>
            </Page>
        );
    }
}

