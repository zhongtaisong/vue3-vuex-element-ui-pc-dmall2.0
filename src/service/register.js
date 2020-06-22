import Http from './http';

// 发送 - 注册 - 数据
export const postRegData = (data = {}) => {
    return Http.post('users/reg', data);
}

