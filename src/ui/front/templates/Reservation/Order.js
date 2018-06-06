import React from 'react';
import { Row, Col } from 'antd';
import Page from '../../../common/Page'
import {FluidLayout} from '../../components/Layout'
import TicketList from '../../components/Ticket/TicketList'
import {connect} from "react-redux";
import App from "../../../../application";

const styles = `    
    .overlay-color {
      background: -webkit-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -moz-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -ms-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -o-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
    }
    .ticket-container {
        margin: 80px;
        -webkit-border-radius: 10px 10px 10px 10px;
        border-radius: 10px 10px 10px 10px;
        background: #fff;
        padding: 30px;
        -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);    
    }
`

class TicketPage extends React.Component {
    static async getInitialProps(context) {
        context.store.dispatch(actions.fetch())
    }

    constructor(props) {
        super(props)

        this.props.fetch();
    }

    render() {
        const { conferenceById } = this.props
        const conference = conferenceById(this.props.url.query.id);

        return (
            <Page title="Ticket" description="Ticket description">
                <style jsx="true">{styles}</style>
                <FluidLayout>
                    <Row className="overlay-color">
                        <Col span={8} offset={8}>
                            <div className="ticket-container">
                                <TicketList conference={conference} />
                            </div>
                        </Col>
                    </Row>
                </FluidLayout>
            </Page>
        );
    }
}

const actions = App.actions.conference.list;
const selectors = App.selectors.conference.list;

const mapStateToProps = (state) => ({
    conferenceById: (id) => selectors.getById(state, id),
});

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(actions.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketPage);

