import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Table } from 'antd';
import App from "../../../../application";

const columns = [{
    title: 'Conference',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'City',
    dataIndex: 'city'
}, {
    title: 'Country',
    dataIndex: 'country'
}, {
    title: 'Start At',
    dataIndex: 'startAt'
}, {
    title: 'End At',
    dataIndex: 'endAt'
}, {
    title: 'Price',
    dataIndex: 'price',
    render: text => <span>{text} €</span>,
}, {
    title: 'Available tickets',
    dataIndex: 'availableTickets'
}];

class ConferenceList extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetch();
    }

    render() {
        const { conferences, isLoading } = this.props;

        return (
            <div>
                <h1><FormattedMessage id='title.conference.list' defaultMessage='Conference list' /></h1>
                <Table rowKey="id" columns={columns} dataSource={conferences} loading={isLoading} />
            </div>
        );
    }
}

const actions = App.actions.conference.list;
const selectors = App.selectors.conference.list;

const mapStateToProps = (state) => ({
    conferences: selectors.all(state),
    isLoading: selectors.isLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(actions.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceList)