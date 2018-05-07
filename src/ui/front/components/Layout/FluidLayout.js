import React from "react";
import { Layout } from 'antd';
import Header from '../Header'
import Footer from '../Footer'

const { Content } = Layout;
const styles = `    
    .content {
        background: #fff;
        min-height: 280px
    }
`

export default class FluidLayout extends React.Component {
    render() {
        const { children, ...props } = this.props

        return (
            <Layout>
                <style jsx="true">{styles}</style>
                <Header {...props} />

                <Content className="content">
                    {children}
                </Content>

                <Footer />
            </Layout>
        );
    }
}