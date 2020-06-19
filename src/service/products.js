import Http from './http';

// 获取 - 全部商品
export const getProductsData = (data = {}) => {
    return Http.post('products/select', data);
}

// 获取 - 商品筛选条件 - 数据
export const getFilterData = () => {
    return Http.get('products/select/filter');
}

