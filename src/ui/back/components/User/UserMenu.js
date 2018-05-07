import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Menu, Icon, Spin, Dropdown, Avatar} from 'antd';
import {Router} from "../../../../../app/config/routing";
import App from "../../../../application";

class UserMenu extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetch();
    }

    handleMenu = ({ item, key }) => {
        switch(key) {
            case "home":
                Router.pushRoute('home')
                return;
            case "settings":
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
                <Menu.Item key="home"><Icon type="home" /><FormattedMessage id='nav.home' defaultMessage='Website' /></Menu.Item>
                <Menu.Item key="settings"><Icon type="setting" /><FormattedMessage id='nav.user.settings' defaultMessage='Settings' /></Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout"><Icon type="logout" /><FormattedMessage id='nav.user.logout' defaultMessage='Logout' /></Menu.Item>
            </Menu>
        );

        const { currentUser } = this.props;

        return (
            <div style={this.props.style}>
                {currentUser.username ? (
                    <Dropdown overlay={menu} placement="bottomRight">
                        <span className={`action account`}>
                            <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large">
                                {currentUser.username}
                            </Avatar>
                        </span>
                    </Dropdown>
                ) : <Spin size="small" style={{ marginLeft: 8 }} />}
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