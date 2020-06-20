import Http from './http';

// 发送 - 登录 - 数据
export const postLogData = (data = {}) => {
    return Http.post('users/log', data);
}

// 发送 - 验证信息 - 数据
export const postValiForgetPwdData = (data = {}) => {
    return Http.post('users/vali/forgetPwd', data);
}

// 发送 - 提交新密码 - 数据
export const postUpdateUpwdData = (data = {}) => {
    return Http.post('users/update/upwd', data);
}

