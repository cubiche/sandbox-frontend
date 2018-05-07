import React from 'react';
import Page from '../../../common/Page'
import Layout from '../../components/Layout'
import UserList from '../../components/User/UserList'

export default class UserListPage extends React.Component {
    render() {
        return (
            <Page title="Users" description="System user list">
                <Layout>
                    <UserList></UserList>
                </Layout>
            </Page>
        );
    }
}

