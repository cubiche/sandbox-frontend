import React from 'react'
import {redirectIfNotAuthenticated} from "../router/utils";


export default Component => {
    return class WithSecurity extends React.Component {
        static async getInitialProps (context) {
            if (redirectIfNotAuthenticated(context)) {
                return {};
            }

            if (typeof Component.getInitialProps === 'function') {
                return await Component.getInitialProps(context)
            }

            return {}
        }

        render() {
            return (
                <Component {...this.props} />
            )
        }
    }
}