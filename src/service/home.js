import Http from './http';

// 获取 - banner图片
export const getBannerData = () => {
    return Http.get('index/banner');
}

// 获取 - 单品推广 - 数据
export const getOnepushData = () => {
    return Http.get('index/onepush');
}

// 获取- 本周热门商品 - 数据
export const getHotData = () => {
    return Http.get('index/hot');
}

