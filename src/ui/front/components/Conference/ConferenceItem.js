import React from 'react';
import {connect} from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Button, Card, notification, Icon } from 'antd';
import moment from "moment";
const { Meta } = Card;
import App from "../../../../application";

const styles = `        
    .card-button {
        margin-top: 20px;   
    }
    .card-content {
        text-align: center;
        margin-top: 50px;
    }
    .card-content h1 {
        font-size: 24px;
    }
    .tickets {
        margin: 0;
        line-height: 40px;
    }
    .event-date {
        text-align: center;
        font-size: 28px;
        width: 95px;
        height: 95px;
        line-height: 70px;
        font-weight: 800;
        background-color: #fff;
        color: #e40079;
        border-radius: 100%;
        display: inline-block;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,.3);
        position: absolute;
        left: 50%;
        top: 0;
        margin-top: -50px;
        margin-left: -50px;
    }
    .event-date span {
        display: block;
        font-size: 16px;
        font-weight: normal;
        line-height: 0;
        margin-top: -10px;
    }
`

const openNotification = () => {
    notification.open({
        message: 'Be patient',
        description: 'The "buy ticket feature" is coming!',
        icon: <Icon type="smile-circle" style={{ color: '#e40079' }} />,
    });
};

class ConferenceItem extends React.Component {
    render() {
        const { conference, currentUser } = this.props;

        return (
            <Card
                cover={<div className="event-date">{moment(conference.startAt).format("D")}<span>{moment(conference.startAt).format("MMM")}</span></div>}
                bordered={false}
                actions={[
                    <p className="tickets">{conference.availableTickets} tickets remaining</p>,
                    currentUser.username ? (
                        <Button type="primary" size="large" className="buy-ticket-button" onClick={openNotification}>
                            <FormattedMessage id='button.get_ticket' defaultMessage='Get a ticket' />
                        </Button>
                    ) : (
                        <Button type="primary" size="large" className="buy-ticket-button" ghost disabled>
                            <FormattedMessage id='button.get_ticket' defaultMessage='Get a ticket' />
                        </Button>
                    )]}
            >
                <style jsx="true">{styles}</style>
                <style  global="true" jsx="true">
                    {`
                        .ant-card-actions > li:not(:last-child) {
                            border-right: none;
                        }
                    `}
                </style>
                <Meta
                    description={
                        <div className="card-content">
                            <h1>{conference.name}</h1>
                            <p><strong>{conference.city}, {conference.country}</strong></p>
                        </div>
                    }
                />
            </Card>
        );
    }
}

const selectors = App.selectors.security.user.authenticated;

const mapStateToProps = (state) => ({
    currentUser: selectors.me(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceItem)