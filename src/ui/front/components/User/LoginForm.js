import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Link from '../Link'
import ErrorAlert from "../../../common/Alert/ErrorAlert"
import App from "../../../../application";
import person from '../../../../../static/person.svg'

const styles = `
    .form-header {
      padding: 10px 0;
      text-align: center;
    }
    
    .form-header img {
      width: 70%;
    }
    
    .login-form {
      width: 100%;
    }

    .form-error-container {
      margin-bottom: 20px;
    }

    .login-form-forgot {
      float: right;
    }

    .login-form-button {
      width: 100%;
    }
    
    .login-form .icon {
        color: rgba(0,0,0,.25)
    }    
`

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.loginUser(values.username, values.password);
            }
        });
    }

    render() {
        const { errors, validationErrors } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <style jsx="true">{styles}</style>
                <div className="form-header">
                    <h1><FormattedMessage id='title.login' defaultMessage='Welcome back' /></h1>
                    <img src={person} alt="User Icon" className="user-icon"/>
                    <p>
                        <FormattedMessage id='text.login' defaultMessage="To log in, enter your email address below:" />
                    </p>
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <div className="form-error-container">
                        <ErrorAlert errors={errors}/>
                        <ErrorAlert errors={Object.entries(validationErrors).map(error => error[0] + ": " + error[1])}/>
                    </div>

                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" className="icon" />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" className="icon" />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox><FormattedMessage id='label.remember_me' defaultMessage='Remember me' /></Checkbox>
                        )}
                        <Link route='user_reset_password_request'>
                            <a className="login-form-forgot" href="">
                                <FormattedMessage id='label.forgot_password' defaultMessage='Forgot password' />
                            </a>
                        </Link>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            <FormattedMessage id='button.log_in' defaultMessage='Login' />
                        </Button>
                        <Link route='user_register'>
                            <a href="">
                                <FormattedMessage id='button.register_now' defaultMessage='Register now!' />
                            </a>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const actions = App.actions.security.user.login;
const selectors = App.selectors.security.user.login;

const mapStateToProps = (state) => ({
    errors: selectors.errors(state),
    validationErrors: selectors.validationErrors(state)
});

const mapDispatchToProps = (dispatch) => ({
    loginUser: (username, password) => dispatch(actions.login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm));

