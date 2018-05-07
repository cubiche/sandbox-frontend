import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Form, Icon, Input, Button } from 'antd';
import Link from '../Link'
import ErrorAlert from "../../../common/Alert/ErrorAlert"
import SucessAlert from "../../../common/Alert/SucessAlert"
import App from "../../../../application";

const styles = `    
    .form-header {
      padding: 10px 0;
      text-align: center;
    }
    
    .reset-password-request-form {
      width: 100%;
    }
    
    .form-error-container {
      margin-bottom: 20px;
    }

    .reset-password-request-form-forgot {
      float: right;
    }

    .reset-password-request-form-button {
      width: 100%;
    }
    
    .reset-password-request-form .icon {
        color: rgba(0,0,0,.25)
    }
`

class ResetPasswordRequestForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.resetPasswordRequest(values.email);
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
                    <h1><FormattedMessage id='title.reset_password_request' defaultMessage='Forgot password' /></h1>
                    <p>
                        <FormattedMessage id='text.reset_password_request' defaultMessage="Please enter your email address and we'll send you instructions on how to reset your password" />
                    </p>
                </div>

                <Form onSubmit={this.handleSubmit} className="reset-password-request-form">
                    <div className="form-error-container">
                        <ErrorAlert errors={errors}/>
                        <ErrorAlert errors={Object.entries(validationErrors).map(error => error[0] + ": " + error[1])}/>
                        <SucessAlert successful={successful} message="The email was sent successful" />
                    </div>

                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input prefix={<Icon type="mail" className="icon" />} placeholder="Email" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="reset-password-request-form-button">
                            <FormattedMessage id='button.reset_password' defaultMessage='Reset password' />
                        </Button>
                        <Link route='user_login'>
                            <a href="" style={{float: 'left'}}>
                                <FormattedMessage id='button.log_in' defaultMessage='Login' />
                            </a>
                        </Link>
                        <Link route='user_register'>
                            <a href="" style={{float: 'right'}}>
                                <FormattedMessage id='button.sign_up' defaultMessage='Register now!' />
                            </a>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const actions = App.actions.security.user.resetPasswordRequest;
const selectors = App.selectors.security.user.resetPasswordRequest;

const mapStateToProps = (state) => ({
    errors: selectors.errors(state),
    validationErrors: selectors.validationErrors(state),
    successful: selectors.wasSuccessful(state),
});

const mapDispatchToProps = (dispatch) => ({
    resetPasswordRequest: (email) => dispatch(actions.resetPasswordRequest(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ResetPasswordRequestForm));

