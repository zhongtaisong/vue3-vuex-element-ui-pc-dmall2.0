import Http from './http';

// 获取 - 字典表
export const getDicData = () => {
    return Http.get('dic/selectDic');
}

