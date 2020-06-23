import Http from './http';

// 获取 - 字典表 - 数据
export const getDicData = () => {
    return Http.get('dic/selectDic');
}

// 发送 - 加入购物车 - 数据
export const postAddCartData = (data = {}) => {
    return Http.post('cart/add', data);
}

// 获取 - 购物车商品数量 - 数据
export const getCartNumData = (data = {}) => {
    return Http.get('cart/select/num', data);
}

