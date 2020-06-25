import Http from './http';

// 发送 - 提交评价 - 数据
export const postAddCommentData = (data = {}) => {
    return Http.post('comment/add', data);
}

