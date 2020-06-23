import Http from './http';

// 获取 - 宝贝收藏 - 数据
export const getAllCollectionData = (data = {}) => {
    return Http.get('cart/select', data);
}

// 发送 - 删除 - 数据
export const postDeleteCollectionData = (data = {}) => {
    return Http.post('cart/delete', data);
}

