import Http from './http';

// 获取 - 我的订单 - 数据
export const getAllOrderData = (data = {}) => {
    return Http.get('order/select', data);
}

// 发送 - 删除 - 数据
export const postDeleteOrderData = (data = {}) => {
    return Http.get('order/delete', data);
}

