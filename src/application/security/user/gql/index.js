import me from './query/FindAuthenticatedUser';
import users from './query/FindAllUsers';
import userByPasswordResetToken from './query/FindOneUserByPasswordResetToken';
import login from './mutation/LoginUser';
import logout from './mutation/LogoutUser';
import resetPasswordRequest from './mutation/ResetUserPasswordRequest';
import resetPassword from './mutation/ResetUserPassword';
import create from './mutation/CreateUser';

export default {
    queries: {
        me,
        users,
        userByPasswordResetToken
    },
    mutations: {
        login,
        logout,
        create,
        resetPasswordRequest,
        resetPassword
    },
};
