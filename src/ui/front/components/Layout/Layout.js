import React from "react";
import { Layout } from 'antd';
import Header from '../Header'
import Footer from '../Footer'

const { Content } = Layout;
const styles = `    
    .wrapper {
        max-width: 1200px;
        margin: 0 auto;
    }
    .content {
        background: #fff;
        min-height: 280px
    }
`

export default class WrapperLayout extends React.Component {
    render() {
        const { children, ...props } = this.props

        return (
            <Layout className="basicLayout">
                <style jsx="true">{styles}</style>
                <Header {...props} />

                <Content className="content">
                    <div className="wrapper">
                        {children}
                    </div>
                </Content>

                <Footer />
            </Layout>
        );
    }
}