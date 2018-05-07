import React from 'react';
import { FormattedMessage } from 'react-intl'
import { Button, BackTop, Anchor } from 'antd';
import Page from '../../../common/Page'
import { FluidLayout } from '../../components/Layout'
import ConferenceList from '../../components/Conference/ConferenceList'
import { isAuthenticated } from "../../../../infrastructure/router/utils";

const { Link } = Anchor;
const styles = `
    h1 {
        font-size: 36px;
        line-height: 1.3;
        font-weight: 300;
    }
    .wrapper {
        max-width: 1200px;
        margin: 0 auto;
    }    
    .ant-anchor-wrapper {
        background: transparent !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .ant-anchor-ink::before {
        background-color: transparent !important;
    }
    .ant-anchor-link-title {
        color: #fff !important;
        font-size: 16px; 
    }
    .ant-anchor-link {
        padding: 0 !important;
        color: #fff;
    }
    .home-s1.home-s1, .home-s2, .home-s3, .home-s4  {
        padding-left: 40px;
        padding-right: 40px;
    }
    .home-s2 {
        background-color: #eff3f6;
    }
    .home-s2, .home-s3, .home-s4 {
        padding-top: 96px;
        padding-bottom: 96px;
    }    
    .heading {
        padding: 172.5px 0;
        position: relative;
        text-align: center;
    }
    .heading h1 {
        text-transform: uppercase;
        color: #FFFFFF;
        text-align: center;
        margin-bottom: 50px;
    }
    h1 b {
        font-family: Oswald, sans-serif;
        font-weight: 900;
        letter-spacing: -1.2px;
    }
    .overlay-color {
      background: -webkit-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -moz-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -ms-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -o-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
    }
    .buy-ticket-button-lg {
        padding: 0 50px;
    }
    .buy-ticket-button,
    .buy-ticket-button-lg {
        background: #e40079;
        border-color: #e40079;
        border-width: 2px;
        border-radius: 50px 50px 50px 50px !important;        
    }
    .buy-ticket-button:hover,
    .buy-ticket-button:focus,
    .buy-ticket-button:active,
    .buy-ticket-button.active, 
    .buy-ticket-button-lg:hover,
    .buy-ticket-button-lg:focus,
    .buy-ticket-button-lg:active,
    .buy-ticket-button-lg.active {
        background: #cb006b;
        border-color: #cb006b;
    }
    .home-s2 h2, .home-s3 h2, .home-s4 h2 {
        text-align: center;
        font-size: 32px;
        color: #314659;
        margin-top: 0;
        margin-bottom: 96px;
    }
    .card-button {
        text-align: center;
    }
`

export default class HomePage extends React.Component {
    static getInitialProps (context) {
        if (isAuthenticated(context)) {
            return { dashboard: true };
        }

        return { dashboard: false }
    }

    render() {
        return (
            <Page title="Homepage" description="Homepage description">
                <style jsx="true">{styles}</style>
                <FluidLayout>
                    <BackTop />
                    <div className="home-s1 overlay-color">
                        <div className="wrapper">
                            <div className="heading">
                                <h1>
                                    <b><FormattedMessage id='title.intro' defaultMessage='Join the worlds largest events community' /></b>
                                    <br/> Eventify 2018
                                </h1>
                                <Button type="primary" size="large" className="buy-ticket-button-lg">
                                    <Anchor affix={false}>
                                        <Link href="#Conferences" title={<FormattedMessage id='button.get_ticket' defaultMessage='Get a ticket' />} />
                                    </Anchor>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="home-s2">
                        <div className="wrapper">
                            <ConferenceList></ConferenceList>
                        </div>
                    </div>
                </FluidLayout>
            </Page>
        );
    }
}

