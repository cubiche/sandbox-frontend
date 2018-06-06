import React from 'react';
import {connect} from "react-redux";
import { FormattedMessage } from 'react-intl'
import { InputNumber, Button, Card, List } from 'antd';
import ErrorAlert from "../../../common/Alert/ErrorAlert"
import SucessAlert from "../../../common/Alert/SucessAlert"
import card from '../../../../../static/card.png'
import App from "../../../../application";

const { Meta } = Card;
const styles = `        
    .quantity-container {
        position: absolute;
        right: 0px;
        top: 54px;
    }
    .total-container .quantity {
        margin-right: 10px; 
    }
    .price {
        font-family: Helvetica,Roboto,Arial,sans-serif;
        font-size: 18px;
        color: #45494E;
    }
    .tickets {
        font-size: 13px;
        font-family: Helvetica,Roboto,Arial,sans-serif;
        color: #fa164b;
        margin-top: 8px;
        margin-bottom: 0;
    }
    .error-container {
      margin-bottom: 20px;
    }
`

class TicketList extends React.Component {
    static defaultProps = {
        successful: false
    }

    constructor(props) {
        super(props);

        this.state = {
            quantity: 0,
            disabled: true
        };
    }

    onChange = (value) => {
        this.setState({
            quantity: value,
            disabled: value == 0
        })
    }

    onClick = () => {
        this.props.createOrder(this.props.conference.id, this.state.quantity)

        this.setState({
            quantity: 0,
            disabled: true
        })
    }

    render() {
        const { conference, isLoading, successful, errors } = this.props;

        const header = (
            successful ?
            <div className="header-success">
                <h1 className="title"><FormattedMessage id='title.congrats' defaultMessage='Great!' /></h1>
            </div>
                :
            <h1><FormattedMessage id='title.tickets' defaultMessage='By a ticket' /></h1>
        );

        const description = (
            <div>
                {conference.city}, {conference.country}
                <div className="price">{conference.price} €</div>
                <p className="tickets">{conference.availableTickets} tickets remaining</p>
            </div>
        );

        const total = (
            <div className="total-container">
                QTY: <span className="quantity">{this.state.quantity}</span>
                Total: <span>{this.state.quantity*conference.price} €</span>
            </div>
        );

        const order_now = (
            <Button type="primary" size="large" className="order-now-button" disabled={this.state.disabled && !isLoading} onClick={this.onClick}>
                <FormattedMessage id='button.order_now' defaultMessage='Order Now' />
            </Button>
        );

        return (
            <List
                dataSource={[conference]}
                locale={{ emptyText: '' }}
                header={header}
                renderItem={conference => (
                    <List.Item>
                        {conference ?
                        <div style={{ width: '100%'}}>
                            <style jsx="true">{styles}</style>
                            <style  global="true" jsx="true">
                                {`
                                    .ant-card-body {
                                        padding: 24px 0;
                                    }
                                    .ant-card-actions {
                                        background: #fff;
                                    }
                                    .ant-card-actions > li {
                                        text-align: left;
                                    }
                                    .ant-card-actions > li:not(:last-child) {
                                        border-right: none;
                                    }
                                    .ant-card-actions > li:not(:first-child) {
                                        text-align: right;
                                    }
                                    .ant-card-actions > li > span {
                                        line-height: 40px;
                                        font-size: 18px;
                                    }
                                    .ant-card-meta-description {
                                        font-size: 16px;
                                    }
                                    .ant-card-meta-title {
                                        font-size: 22px;
                                    }
                                    .header-success {
                                        background: #37BD93;
                                        text-align: center;
                                        padding: 24px 0;
                                    }
                                    .header-success .title {
                                        color: #fff;
                                        margin: 0;
                                    }
                                `}
                            </style>

                            <div className="error-container">
                                <ErrorAlert errors={errors}/>
                                <SucessAlert successful={successful} message="Your payment has been processed successfully and you booking is confirmed. Enjoy the conference ;-)" />
                            </div>

                            {successful ? '' :
                                <Card
                                    style={{width: '100%'}}
                                    bordered={false}
                                    loading={isLoading}
                                    actions={[total, <img src={card} alt="Card Icon" className="cards"/>, order_now]}
                                >
                                    <Meta
                                        title={conference.name}
                                        description={description}
                                    />
                                    <div className="quantity-container">
                                        <InputNumber min={0} max={conference.availableTickets} defaultValue={0} onChange={this.onChange}/>
                                    </div>
                                </Card>
                            }
                        </div>
                            :
                        ''}
                    </List.Item>
                )}
            />
        );
    }
}

const actions = App.actions.reservation.order.create;
const selectors = App.selectors.reservation.order.pay;

const mapStateToProps = (state) => ({
    errors: selectors.errors(state),
    successful: selectors.wasSuccessful(state),
    isLoading: selectors.isLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    createOrder: (conferenceId, quantity) => dispatch(actions.create(conferenceId, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);