import Http from './http';

// 获取 - 搜索 - 数据
export const getKwData = (data = {}) => {
    return Http.get('index/kw', data);
}

// 获取 - 购物车商品数量 - 数据
export const getCartNumData = () => {
    return Http.get('cart/select/num');
}

