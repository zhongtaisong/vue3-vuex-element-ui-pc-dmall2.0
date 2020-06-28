import Http from './http';

// 获取 - 个人资料 - 数据
export const getUserInfoData = (data = {}) => {
    return Http.get('users/select/uname', data);
}

// 发送 - 修改个人资料 - 数据
export const postUpdateUserInfoData = (data = {}) => {
    return Http.post('users/update', data);
}

// 发送 - 修改登录密码 - 数据
export const postUpdatePwdData = (data = {}) => {
    return Http.post('users/update/upwd', data);
}

// 发送 - 添加/修改收货地址 - 数据
export const postEditAddressData = (data = {}) => {
    return Http.post('address/edit', data);
}

// 发送 - 删除收货地址 - 数据
export const postDeleteAddressData = (data = {}) => {
    return Http.get('address/delete', data);
}

// 获取 - 查询收货地址 - 数据
export const getAllAddressData = (data = {}) => {
    return Http.get('address/select', data);
}


