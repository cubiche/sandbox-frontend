import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Divider, Form, Icon, Input, Button } from 'antd';
import Link from '../Link'
import ErrorAlert from "../../../common/Alert/ErrorAlert"
import SucessAlert from "../../../common/Alert/SucessAlert"
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
    
    .register-form {
      width: 100%;
    }
    
    .form-error-container {
      margin-bottom: 20px;
    }
    
    .register-form-button {
      width: 100%;
    }
    
    .login-form-button {
      width: 100%;
      background: #e40079;
      border-color: #e40079;
    }
    
    .login-form-button:hover,
    .login-form-button:focus,
    .login-form-button:active,
    .login-form-button.active {
        background: #cb006b;
        border-color: #cb006b;
    }

    .register-form .icon {
        color: rgba(0,0,0,.25)
    }
`

class RegisterForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.createUser(values.username, values.email, values.password, this.props.customerId);
            }
        });
    }

    render() {
        const { errors, validationErrors, successful } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <style jsx="true">{styles}</style>
                <div className="form-header">
                    <h1><FormattedMessage id='title.register' defaultMessage='Sign up' /></h1>
                    <img src={person} alt="User Icon" className="user-icon"/>
                    <p>
                        <FormattedMessage id='text.register' defaultMessage="It's free and takes less than 30 seconds" />
                    </p>
                </div>
                <Form onSubmit={this.handleSubmit} className="register-form">
                    <div className="form-error-container">
                        <ErrorAlert errors={errors}/>
                        <ErrorAlert errors={Object.entries(validationErrors).map(error => error[0] + ": " + error[1])}/>
                        <SucessAlert successful={successful} message="You've seen! It took you just a few seconds. Now you can make login with your credentials" />
                    </div>
                    {successful ? (
                        <Form.Item>
                            <Link route='user_login'>
                                <Button type="primary" className="login-form-button">
                                    <FormattedMessage id='button.log_in' defaultMessage='Login' />
                                </Button>
                            </Link>
                        </Form.Item>
                    ) : (
                        <div>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" className="icon" />} placeholder="Username" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please input your email!' }],
                                })(
                                    <Input prefix={<Icon type="mail" className="icon" />} type="text" placeholder="Email" />
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
                                <Button type="primary" htmlType="submit" className="register-form-button">
                                    <FormattedMessage id='button.sign_up' defaultMessage='Register now!' />
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <Form.Item>
                                <Link route='user_login'>
                                    <Button type="primary" className="login-form-button">
                                        <FormattedMessage id='button.log_in' defaultMessage='Login' />
                                    </Button>
                                </Link>
                            </Form.Item>
                        </div>
                    )}
                </Form>
            </div>
        );
    }
}

const actions = App.actions.security.user.create;
const selectors = App.selectors.security.user.create;
const roleSelectors = App.selectors.security.role.list;

const mapStateToProps = (state) => ({
    customerId: roleSelectors.customer(state).id,
    errors: selectors.errors(state),
    validationErrors: selectors.validationErrors(state),
    successful: selectors.wasSuccessful(state),
});

const mapDispatchToProps = (dispatch) => ({
    createUser: (username, email, password, roleId) => dispatch(actions.create(username, email, password, [roleId], false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegisterForm));

