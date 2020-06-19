import Http from './http';

// 获取 - 商品详情
export const getDetailsData = (data = {}) => {
    return Http.get('details/select', data);
}

// 获取 - 详情图片 - 数据
export const getIntroimgsData = () => {
    return Http.get('details/introimgs');
}

// 获取 - 当前商品评价 - 数据
export const getCurrentCommentData = () => {
    return Http.get('comment/select/pid');
}

// 发送 -  喜欢/不喜欢 - 数据
export const postUpdateCommentData = (data = {}) => {
    return Http.post('comment/update/agree', data);
}

// 发送 -  加入购物车 - 数据
export const postAddCartData = (data = {}) => {
    return Http.post('cart/add', data);
}

