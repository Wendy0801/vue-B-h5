const _import = require('./_import_' + process.env.NODE_ENV);


let config = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title:'登录',
        },
        component:_import('login')
    },
    {
        path: '/password-reset',
        name: 'password-reset',
        meta: {
            title:'修改密码',
        },
        component: _import('password-reset')
    },
    {
        path: '/',
        meta: {
            title:'商家中心',
        },
        component: _import('shop-center')
    },
    {
        name: 'shop-center',
        path: '/shop-center',
        meta: {
            title:'商家中心',
        },
        component: _import('shop-center')
    },
    {
        name: 'check-sell-ticket',
        path: '/check-sell-ticket',
        meta: {
            title:'核销券码',
        },
        component: _import('check-sell-ticket')
    },
    {
        name: 'check-sell-history',
        path: '/check-sell-history',
        meta: {
            title:'核销历史',
        },
        component: _import('check-sell-history')
    },
    {
        name: 'order-detail',
        path: '/order-detail/:orderId',
        meta: {
            title:'订单详情',
        },
        component: _import('order-detail')
    },
    {
        name: 'graphic-details',
        path: '/graphic-details/:productId',
        meta: {
            title:'图文详情',
        },
        component: _import('graphic-details')
    },
    
]

export default config