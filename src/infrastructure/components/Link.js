import { Link } from '../../../app/config/routing'
import React from 'react'

export default ({ children, ...props }) => {
    return <Link {...props}>{ children }</Link>
}