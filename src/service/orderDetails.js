import Http from './http';

// 获取 - 订单详情 - 数据
export const getOrderDetailData = (data = {}) => {
    return Http.get('order/detail', data);
}

