import React from 'react';
import Page from '../../../common/Page'
import Layout from '../../components/Layout'
import ConferenceList from '../../components/Conference/ConferenceList'

export default class HomePage extends React.Component {
    render() {
        return (
            <Page title="Dashboard" description="Dashboard description">
                <Layout>
                    <ConferenceList></ConferenceList>
                </Layout>
            </Page>
        );
    }
}

