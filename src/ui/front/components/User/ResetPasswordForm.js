import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Form, Icon, Input, Button } from 'antd';
import ErrorAlert from "../../../common/Alert/ErrorAlert"
import SucessAlert from "../../../common/Alert/SucessAlert"
import App from "../../../../application";

const styles = `
    .form-header {
      padding: 10px 0;
      text-align: center;
    }
    
    .reset-password-form {
      width: 100%;
    }

    .form-error-container {
      margin-bottom: 20px;
    }
    
    .reset-password-form-forgot {
      float: right;
    }

    .reset-password-form-button {
      width: 100%;
    }
    
    .reset-password-form .icon {
        color: rgba(0,0,0,.25)
    }
`

class ResetPasswordForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.resetPassword(this.props.userId, values.password, values.confirm);
            }
        });
    }

    render() {
        const { userId, token, errors, validationErrors, successful } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            userId !== undefined ?
                <div>
                    <style jsx="true">{styles}</style>
                    <div className="form-header">
                        <h1><FormattedMessage id='title.reset_password' defaultMessage='Reset your password' /></h1>
                        <p>
                            <FormattedMessage id='text.reset_password' defaultMessage="Please enter your password 2x below to reset" />
                        </p>
                    </div>

                    <Form onSubmit={this.handleSubmit} className="reset-password-form">
                        <style jsx="true">{styles}</style>

                        <div className="form-error-container">
                            <ErrorAlert errors={errors}/>
                            <ErrorAlert errors={Object.entries(validationErrors).map(error => error[0] + ": " + error[1])}/>
                            <SucessAlert successful={successful} message="The password was reseted successful" />
                        </div>

                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" className="icon" />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('confirm', {
                                rules: [{ required: true, message: 'Please confirm your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" className="icon" />} type="password" placeholder="Confirm password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="reset-password-form-button">
                                <FormattedMessage id='button.reset_password' defaultMessage='Reset password' />
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                :
            <ErrorAlert errors={[`There is no user with passwordResetToken: ${token}`]}/>
        );
    }
}

const actions = App.actions.security.user.resetPassword;
const selectors = App.selectors.security.user.resetPassword;

const mapStateToProps = (state) => ({
    errors: selectors.errors(state),
    validationErrors: selectors.validationErrors(state),
    successful: selectors.wasSuccessful(state),
});

const mapDispatchToProps = (dispatch) => ({
    resetPassword: (userId, password, confirm) => dispatch(actions.resetPassword(userId, password, confirm))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ResetPasswordForm));

