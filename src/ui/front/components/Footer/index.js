import React from "react";
import { Layout } from 'antd';

const { Footer } = Layout;
const styles = `   
    .footer {
        text-align: center;
        background: #252321;
        color: #fff;
    }
`

export default class AppFooter extends React.Component {
    render() {
        return (
            <Footer className="footer">
                <style jsx="true">{styles}</style>
                Sandbox Frontend ©2018
            </Footer>
        );
    }
}