import Http from './http';

// 获取 - 收货地址、商品详情 - 数据
export const postSettlementData = (data = {}) => {
    return Http.post('order/select/settlement', data);
}

// 发送 - 提交订单 - 数据
export const postAddOrderData = (data = {}) => {
    return Http.post('order/add', data);
}

