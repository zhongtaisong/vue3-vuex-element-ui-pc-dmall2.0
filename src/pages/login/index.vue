<template>
    <div class="dm_login">
        <div class='common_width logo'>
            <router-link to='/' title='首页'>
                <img src='@img/logo2.png' alt='logo' />
            </router-link>
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
        }
    }
};
</script>

<style lang="less">
    @import "./index.less";
</style>