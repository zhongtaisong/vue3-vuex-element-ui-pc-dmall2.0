// // icon
// export { default as IconFont } from './iconFont';
// // 双向绑定
// export { default as formUtils } from './formUtils';
// // 跳转路由页面滚动至顶部
// export { default as ScrollToTop } from './scrollToTop';
// // base64转文件
// export { default as base64ToFile } from './base64ToFile';
// // session
// export { default as session } from './session';
// // 手机号码 - 校验
// export { default as validatePhone } from './validatePhone';

export default {
    // 手机号码 - 表单校验
    validatePhoneForm(rule, value, callback) {
        let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
        if ( !reg.test( value ) ) {
            callback('请输入合法的手机号码！');
        } else {
            callback();
        }
    }
}