import React from "react";
import { Layout } from 'antd';
import LocaleSwitcher from '../Locale/LocaleSwitcher'
import UserMenu from '../User/UserMenu'

const { Header } = Layout;

export default class AppHeader extends React.Component {

    render() {
        return (
            <Header style={{ background: '#fff' }}>
                <style jsx="true">
                    {`
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
                    `}
                </style>
                <UserMenu style={{ float: 'right' }}/>
                <LocaleSwitcher style={{ float: 'right' }} />
            </Header>
        );
    }
}