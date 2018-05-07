import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Table } from 'antd';

const columns = [{
    title: 'Conference',
    dataIndex: 'conference',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'User',
    dataIndex: 'username',
}, {
    title: 'Number of seats',
    dataIndex: 'numberOfSeats'
}, {
    title: 'State',
    dataIndex: 'state'
}];

class OrderList extends React.Component {
    render() {
        return (
            <div>
                <h1><FormattedMessage id='title.order.my_list' defaultMessage='My order list' /></h1>
                <Table rowKey="id" columns={columns} dataSource={[]} />
            </div>
        );
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)