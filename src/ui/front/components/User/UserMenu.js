import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Button, Menu, Icon, Dropdown, Avatar} from 'antd';
import Link from '../Link'
import {Router} from "../../../../../app/config/routing";
import App from "../../../../application";

class UserMenu extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetch();
    }

    handleMenu = ({ item, key }) => {
        switch(key) {
            case "orders":
                Router.pushRoute('my_order_list')
                return;
            case "settings":
                Router.pushRoute('dashboard')
                return;
            case "logout":
                this.props.logoutUser(this.props.currentUser.id);
                return;
            default:
                return;
        }
    }

    render() {
        const menu = (
            <Menu className="menu" selectedKeys={[]} onClick={this.handleMenu}>
                <Menu.Item key="orders">
                    <Icon type="shopping-cart" /><FormattedMessage id='nav.my_orders' defaultMessage='My orders' />
                </Menu.Item>
                <Menu.Item key="settings">
                    <Icon type="setting" /><FormattedMessage id='nav.user.settings' defaultMessage='Settings' />
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout"><Icon type="logout" /><FormattedMessage id='nav.user.logout' defaultMessage='Logout' /></Menu.Item>
            </Menu>
        );

        const { currentUser } = this.props;

        return (
            <div style={this.props.style}>
                <style  global="true" jsx="true">
                    {`
                        .ant-dropdown-menu-item .anticon {
                            margin-right: 5px;
                        }
                    `}
                </style>
                {currentUser.username ? (
                    <Dropdown overlay={menu} placement="bottomRight">
                        <span className={`action account`}>
                            <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large">
                                {currentUser.username}
                            </Avatar>
                        </span>
                    </Dropdown>
                ) : <Link route='user_login'><Button type="primary" htmlType="submit" className="button"><FormattedMessage id='button.log_in' defaultMessage='Login' /></Button></Link>}
            </div>
        );
    }
}

const actions = App.actions.security.user.authenticated;
const selectors = App.selectors.security.user.authenticated;

const mapStateToProps = (state) => ({
    currentUser: selectors.me(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(actions.fetch()),
    logoutUser: (userId) => dispatch(App.actions.security.user.logout.logout(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)