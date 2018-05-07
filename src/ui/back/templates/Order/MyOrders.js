import React from 'react';
import Page from '../../../common/Page'
import Layout from '../../components/Layout'
import OrderList from '../../components/Order/MyOrders'

export default class OrderListPage extends React.Component {
    render() {
        return (
            <Page title="Orders" description="My order list">
                <Layout>
                    <OrderList></OrderList>
                </Layout>
            </Page>
        );
    }
}

