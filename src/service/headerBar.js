import Http from './http';

// 获取 - 搜索 - 数据
export const getKwData = (data = {}) => {
    return Http.get('index/kw', data);
}

// 发送 - 退出登录 - 数据
export const postLogoutData = () => {
    return Http.post('users/logout');
}

