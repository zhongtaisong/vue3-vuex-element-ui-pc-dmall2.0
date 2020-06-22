import Http from './http';

// 获取 - 购物车 - 数据
export const getSelectCartData = (data = {}) => {
    return Http.get('cart/select', data);
}

// 发送 - 删除购物车 - 数据
export const postDeleteCartData = (data = {}) => {
    return Http.post('cart/delete', data);
}

// 发送 - 加入收藏 - 数据
export const postAddCollectionData = (data = {}) => {
    return Http.post('collection/add', data);
}

// 发送 - 更新商品数量 - 数据
export const postUpdateCartNumData = (data = {}) => {
    return Http.post('cart/update/num', data);
}

