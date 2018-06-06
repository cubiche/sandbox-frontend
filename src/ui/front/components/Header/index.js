import React from "react";
import { Layout } from 'antd';
import LocaleSwitcher from '../Locale/LocaleSwitcher'
import UserMenu from '../User/UserMenu'
import Link from '../Link'

const { Header } = Layout;
const styles = `   
    .wrapper {
        max-width: 1200px;
        margin: 0 auto;
    }     
    .menu :global(.anticon) {
        margin-right: 8px;
    }
    .menu :global(.ant-dropdown-menu-item) {
        width: 160px;
    }
    .action.account {
        cursor: pointer;
        padding: 0 12px;
        display: inline-block;
        transition: all .3s;
        height: 100%;
    }
    .locale-switcher {
        float:right;
        margin-right: 20px;
    }
    .user-menu {
        float:right;
    }
    .logo-container {
        position: relative;
        height: 64px;
        float: left;
    }    
    .logo {
        cursor: pointer;
        left: 10px;
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
        cursor: pointer;
        font-weight: bold;
        color: #fff;
        font-size: 22px;
        position: absolute;
        left: 52px;
        display: block;
    }  
`

export default class AppHeader extends React.Component {
    static defaultProps = {
        showUserItem: true
    }

    render() {
        const { showUserItem } = this.props;

        return (
            <Header>
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
                <div className="wrapper">
                    <Link route='home'>
                        <div className="logo-container">
                            <div className="logo"></div>
                            <div className="brand-name">Eventify</div>
                        </div>
                    </Link>
                    {showUserItem && <div className="user-menu"><UserMenu/></div>}
                    <div className="locale-switcher"><LocaleSwitcher /></div>
                </div>
            </Header>
        );
    }
}