import React from "react";
import { FormattedMessage } from 'react-intl'
import { Layout, Menu, Icon } from 'antd';
import Link from '../Link'
import {connect} from "react-redux";
import App from "../../../../application";

const { Sider } = Layout;
const styles = `       
    .logo-container {
        position: relative;
        height: 64px;
        background: #002140;
    }
    
    .logo {
        left: 24px;
        top: 10px;
        background: #e40079;
        width: 36px;
        height: 36px;
        display: block;
        position: absolute;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    
    .brand-name {
        font-weight: bold;
        color: #fff;
        font-size: 20px;
        position: absolute;
        left: 70px;
        top: 18px;
        display: block;
    }
`

function isObject(val) {
    if (val === null) { return false;}

    return ( (typeof val === 'function') || (typeof val === 'object') );
}

class Sidebar extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    isAdmin = (user) => {
        if (isObject(user)) {
            return user.permissions.some(permission => permission == 'app');
        }

        return false;
    }

    constructor(props) {
        super(props)

        this.props.fetch();
    }

    render() {
        const { currentUser } = this.props;

        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                className="sidebar"
            >
                <style jsx="true">{styles}</style>
                <style jsx="true">
                    {`
                        .logo::before{
                            width: 20px;
                            height: 20px;
                            display:block;
                            border:5px solid #F7F5F2;
                            content:"";
                            position:absolute;
                            border-radius:14px;
                            top:8px;
                            left:8px;
                        }
                    `}
                </style>
                <style global="true" jsx="true">
                    {`
                        .ant-layout-sider-trigger {
                          transition: color .3s;
                        }

                        .ant-layout-sider-trigger:hover {
                            color: #1890ff;
                        }

                        .ant-dropdown-menu-item .anticon {
                            margin-right: 5px;
                        }
                    `}
                </style>
                <div className="logo-container">
                    <div className="logo"></div>
                    <div className="brand-name">Eventify</div>
                </div>

                { this.isAdmin(currentUser) ? (
                    <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
                      <Menu.Item key="1">
                          <Icon type="layout" />
                          <Link route='dashboard'><span><FormattedMessage id='nav.conferences' defaultMessage='Conferences' /></span></Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                          <Icon type="team" />
                          <Link route='user_list'><span><FormattedMessage id='nav.users' defaultMessage='Users' /></span></Link>
                      </Menu.Item>
                      <Menu.Item key="3">
                          <Icon type="shopping-cart" />
                          <Link route='order_list'><span><FormattedMessage id='nav.orders' defaultMessage='Orders' /></span></Link>
                      </Menu.Item>
                      <Menu.Item key="4">
                          <Icon type="shopping-cart" />
                          <Link route='my_order_list'><span><FormattedMessage id='nav.my_orders' defaultMessage='My Orders' /></span></Link>
                      </Menu.Item>
                    </Menu>
                ) : (
                    <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
                        <Menu.Item key="1">
                            <Icon type="shopping-cart" />
                            <Link route='my_order_list'><span><FormattedMessage id='nav.my_orders' defaultMessage='My Orders' /></span></Link>
                        </Menu.Item>
                    </Menu>
                )}
            </Sider>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)