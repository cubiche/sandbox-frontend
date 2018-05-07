import React from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import Page from '../../../common/Page'
import { FluidLayout } from '../../components/Layout'
import ResetPasswordForm from '../../components/User/ResetPasswordForm'
import { redirectIfAuthenticated } from "../../../../infrastructure/router/utils";
import App from "../../../application";

const styles = `    
    .overlay-color {
      background: -webkit-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -moz-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -ms-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -o-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
    }
    .reset-container {
        margin: 80px;
        -webkit-border-radius: 10px 10px 10px 10px;
        border-radius: 10px 10px 10px 10px;
        background: #fff;
        padding: 30px;
        -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);     
    }
`

class ResetPasswordPage extends React.Component {
    static async getInitialProps(context) {
        if (redirectIfAuthenticated(context)) {
            return {};
        }

        context.store.dispatch(actions.findUser(context.query.token))
    }

    constructor(props) {
        super(props)

        this.props.findUser(props.url.query.token);
    }

    render() {
        const { userId } = this.props

        return (
            <Page title="Reset password" description="Reset password description">
                <style jsx="true">{styles}</style>
                <FluidLayout>
                    <Row className="overlay-color">
                        <Col span={8} offset={8}>
                            <div className="reset-container">
                                <ResetPasswordForm userId={userId} token={this.props.url.query.token} />
                            </div>
                        </Col>
                    </Row>
                </FluidLayout>
            </Page>
        );
    }
}

const actions = App.actions.security.user.byPasswordResetToken;
const selectors = App.selectors.security.user.byPasswordResetToken;

const mapStateToProps = (state) => ({
    userId: selectors.userId(state),
});

const mapDispatchToProps = (dispatch) => ({
    findUser: (token) => dispatch(actions.findUser(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);