// url前缀
export const PUBLIC_URL = 'http://127.0.0.1:8000/api/';
// 加密key
export const PWD_KEY = 'fjreqjklnvmsn9u9084931jj雨色轻风意柔情怜花殇12612132212';
// 路由白名单
export const WHITE_LIST_PATH = [
    // 首页
    '/',
    // 杂货铺
    '/products',
    // 商品详情
    '/products/detail',
    // 登录
    '/login',
    // 注册
    '/register',
    // 搜索结果
    '/searchResults',
    // 留言
    '/message',
    // 400, 401
    '/notFound'
];
// 路由黑名单
export const BLACK_LIST_PATH = [
    // 结算页
    '/settlementPage',
    // 订单详情
    '/orderDetails',
    // 我的评价
    '/myComment'
];