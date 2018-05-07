import Module from "../../core/Module";
import RoleList from './RoleList'

const Role = new Module({
    namespace: 'security', store: 'role',
    modules: [
        RoleList
    ],
    initialState: {},
})

export default Role;