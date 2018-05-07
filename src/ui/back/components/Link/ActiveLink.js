import React, { Children } from 'react'
import { withRouter } from "next/router";
import routes from '../../../../infrastructure/router'
import Link from '../../../../../src/infrastructure/components/Link'

const ActiveLink = ({ router, route, params, to, children, ...props }) => {
    const child = Children.only(children)

    const nameOrUrl = route || to
    const { as } = routes.findAndGetUrls(nameOrUrl, params).urls

    let className = child.props.className || ''
    if (router.pathname === as && props.activeClassName) {
        className = `${className} ${props.activeClassName}`.trim()
    }

    delete props.activeClassName
    const newProps = {
        ...props,
        route, params, to
    }

    return <Link { ...newProps}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)