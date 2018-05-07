import React from 'react';
import { Row, Col } from 'antd';
import Page from '../../../common/Page'
import {FluidLayout} from '../../components/Layout'
import LoginForm from '../../components/User/LoginForm'
import { redirectIfAuthenticated } from "../../../../infrastructure/router/utils";

const styles = `    
    .overlay-color {
      background: -webkit-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -moz-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -ms-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: -o-linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
      background: linear-gradient(left, rgba(228, 0, 121, 0.75) 10%, rgba(0, 145, 234, 0.75) 90%);
    }
    .login-container {
        margin: 80px;
        -webkit-border-radius: 10px 10px 10px 10px;
        border-radius: 10px 10px 10px 10px;
        background: #fff;
        padding: 30px;
        -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);    
    }
`

export default class LoginPage extends React.Component {
    static async getInitialProps(context) {
        if (redirectIfAuthenticated(context)) {
            return {};
        }
    }

    render() {
        return (
            <Page title="Login" description="Dashboard description">
                <style jsx="true">{styles}</style>
                <FluidLayout showUserItem={false}>
                    <Row className="overlay-color">
                        <Col span={8} offset={8}>
                            <div className="login-container">
                                <LoginForm />
                            </div>
                        </Col>
                    </Row>
                </FluidLayout>
            </Page>
        );
    }
}

