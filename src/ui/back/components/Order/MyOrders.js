import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Table } from 'antd';
import App from "../../../../application";

const columns = [{
    title: 'Conference',
    dataIndex: 'conference',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'Number of tickets',
    dataIndex: 'numberOfTickets'
}, {
    title: 'State',
    dataIndex: 'state'
}];

class OrderList extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetch();
    }

    render() {
        const { orders, isLoading } = this.props;

        return (
            <div>
                <h1><FormattedMessage id='title.order.my_list' defaultMessage='My order list' /></h1>
                <Table rowKey="id" columns={columns} dataSource={orders} loading={isLoading} />
            </div>
        );
    }
}

const actions = App.actions.reservation.order.my_list;
const selectors = App.selectors.reservation.order.my_list;

const mapStateToProps = (state) => ({
    orders: selectors.all(state),
    isLoading: selectors.isLoading(state),
});
const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(actions.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)