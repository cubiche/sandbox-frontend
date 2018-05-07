import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Table } from 'antd';
import App from "../../../../application";

const columns = [{
    title: 'Username',
    dataIndex: 'username',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'Email',
    dataIndex: 'email',
}, {
    title: 'Verified',
    dataIndex: 'verified',
    render: value => { return value ? 'Yes' : 'No'},
}, {
    title: 'Enabled',
    dataIndex: 'enabled',
    render: value => { return value ? 'Yes' : 'No'},
}];

class UserList extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetch();
    }

    render() {
        const { users, isLoading } = this.props;

        return (
            <div>
                <h1><FormattedMessage id='title.user.list' defaultMessage='User list' /></h1>
                <Table rowKey="id" columns={columns} dataSource={users} loading={isLoading} />
            </div>
        );
    }
}

const actions = App.actions.security.user.list;
const selectors = App.selectors.security.user.list;

const mapStateToProps = (state) => ({
    users: selectors.all(state),
    isLoading: selectors.isLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(actions.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList)