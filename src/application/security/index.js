import Module from "../core/Module";
import Role from './role'
import User from './user'

const Security = new Module({
    namespace: 'app', store: 'security',
    modules: [
        Role,
        User
    ],
    initialState: {}
});

export default Security;