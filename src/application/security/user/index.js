import Module from "../../core/Module";
import UserLogin from './UserLogin'
import UserLogout from './UserLogout'
import UserAuthenticated from "./UserAuthenticated";
import UserList from "./UserList";
import UserResetPasswordRequest from "./UserResetPasswordRequest";
import UserResetPassword from "./UserResetPassword";
import UserByPasswordResetToken from "./UserByPasswordResetToken";
import UserCreate from "./UserCreate";

const User = new Module({
    namespace: 'security', store: 'user',
    modules: [
        UserLogin,
        UserLogout,
        UserCreate,
        UserResetPasswordRequest,
        UserResetPassword,
        UserAuthenticated,
        UserByPasswordResetToken,
        UserList
    ],
    initialState: {}
})

export default User;