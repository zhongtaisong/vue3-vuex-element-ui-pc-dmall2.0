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
            <!-- {
                code === 0 ? (
                    <Logins 
                        form={ this.props.form } 
                        handleTarget={ this.handleTarget }  
                        loginSubmit={ this.loginSubmit }
                    />
                ) : code === 1 ? (
                    <ForgetPassword 
                        form={ this.props.form } 
                        handleTarget={ this.handleTarget }  
                    />
                ) : code === 2 ? (
                    <NewPassword 
                        form={ this.props.form } 
                        handleTarget={ this.handleTarget } 
                    />
                ) : ''
            } -->
            <component :is='componentName'></component>
        </div>
    </div>
</template>

<script>
// 登录
import Logins from './components/logins';
// 忘记密码
// import ForgetPassword from './components/ForgetPassword';
// // 新密码
// import NewPassword from './components/NewPassword';

export default {
    components: {
        Logins
    },
    data() {
        return {
            componentName: 'logins'
        }
    }
};
</script>

<style lang="less">
    @import "./index.less";
</style>