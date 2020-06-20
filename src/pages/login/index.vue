<template>
    <div class="dm_login">
        <div class='common_width logo'>
            <a title='首页'>
                <img src='@img/logo2.png' alt='logo' />
            </a>
        </div>
        <div class='content' :style="{
            background: `url(${require('@img/register/bg.png')}) no-repeat`,
            backgroundSize: 'cover'
        }">
            <component :is='componentName' :handleTarget='handleTarget'></component>
        </div>
    </div>
</template>

<script>
// 登录
import Logins from './components/logins';
// 忘记密码
import ForgetPassword from './components/forgetPassword';
// 新密码
import NewPassword from './components/newPassword';

export default {
    components: {
        Logins, ForgetPassword, NewPassword
    },
    data() {
        return {
            componentName: 'Logins'
        }
    },
    methods: {
        // 切换组件
        handleTarget(that) {
            this.componentName = that;
            // if( that === 'forget' ){
            //     this.setState({
            //         code: 1
            //     });
            // }else if( that === 'newPwd' ){
            //     this.props.form.validateFields(async (err, values) => {
            //         if (!err) {
            //             values.uname = values.uName;
            //             delete values.uName;
            //             const code = await state.forgetPwdData( values );
            //             if( code === 200 ){
            //                 this.setState({
            //                     code: 2
            //                 });
            //             }
            //         }
            //     });
            // }else if( that === 'submit' ){
            //     this.props.form.validateFields(async (err, values) => {
            //         if (!err) {
            //             const { uPwd, confirm } = values || {};
            //             if( uPwd != confirm ) {                        
            //                 message.error('新密码和确认密码不一致！');
            //             }else{
            //                 let newUpwd = this.$md5( values.confirm + PWD_KEY );
            //                 const code = await state.newPwdData({ newUpwd });
            //                 if( code === 200 ){
            //                     this.setState({
            //                         code: 0
            //                     });
            //                 }
            //             }
            //         }
            //     });
            // }else{
            //     this.setState({
            //         code: 0
            //     });
            // }
        }

    }
};
</script>

<style lang="less">
    @import "./index.less";
</style>