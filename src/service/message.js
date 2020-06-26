import Http from './http';

// 获取 - 留言 - 数据
export const getAllMessageData = () => {
    return Http.get('message/select');
}

// 发送 - 赞/踩 - 数据
export const postUpdateMessageData = (data = {}) => {
    return Http.post('message/update/agree', data);
}

// 发送 - 发表留言 - 数据
export const postAddMessageData = (data = {}) => {
    return Http.post('message/add', data);
}

