const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes
    .add('home', '/', 'index')
    .add('user_login', '/login', 'login')
    .add('user_register', '/register', 'register')
    .add('user_reset_password_request', '/reset-password-request', 'resetPasswordRequest')
    .add('user_reset_password', '/reset-password/:token', 'resetPassword')
    .add('dashboard', '/admin', 'admin/index')
    .add('conference_create', '/admin/conference/create', 'admin/conference/create')
    .add('user_list', '/admin/users', 'admin/user/index')
    .add('order_list', '/admin/orders', 'admin/order/index')
    .add('my_order_list', '/admin/my-orders', 'admin/order/myorders')
;
