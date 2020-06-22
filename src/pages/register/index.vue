<template>
    <div class="dm_register">
        <div class='common_width logo'>
            <router-link to='/' title='首页'>
                <img src='@img/logo2.png' alt='logo' />
            </router-link>
        </div>
        <div class='content' :style="{
            background: `url(${require('@img/register/bg.png')}) no-repeat`,
            backgroundSize: 'cover'
        }">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                <el-row>
                    <el-col :span='24'>
                        <el-form-item label='用户名' prop='uname'>
                            <el-input v-model="ruleForm.uname" placeholder="请输入用户名" size='small'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label='密码' prop='upwd'>
                            <el-input v-model="ruleForm.upwd" placeholder="请输入密码" type="password" size='small'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label='确认密码' prop='confirm'>
                            <el-input v-model="ruleForm.confirm" placeholder="请再次输入密码" type="password" size='small'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label='手机号码' prop='phone'>
                            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" size='small'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label='邮箱' prop='email'>
                            <el-input v-model="ruleForm.email" placeholder="请输入邮箱" size='small'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class='dm_register__btn'>
                    <el-col :span='24'>
                        <el-form-item>
                            <el-button type="primary" :style="{ width: '100%' }" size='small' @click="submitForm('ruleForm')">提交注册信息</el-button>
                        </el-form-item>            
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item>
                            <router-link to='/login'>已有账号，直接登录</router-link>
                        </el-form-item>            
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        // 用户名 - 校验
        let validUname = (rule, value, callback) => {
            let reg = /^(\w)+$/g;
            if ( !reg.test( value ) ) {
                callback('用户名只能由英文、数字、"_"组成!');
            } else {
                callback();
            }
        };
        // 密码 - 校验
        let validUpwd = (rule, value, callback) => {
            if( this.ruleForm.confirm !== null ) {
                this.$refs.ruleForm.validateField('confirm');
            }
            callback();
        };
        // 确认密码 - 校验
        let validConfirm = (rule, value, callback) => {
            if( value !== this.ruleForm.upwd ) {
                callback(new Error('两次输入密码不一致!'));
            }else {
                callback();
            }
        };
        return {
            ruleForm: {
                uname: null,
                upwd: null,
                confirm: null,
                phone: null,
                email: null
            },
            rules: {
                uname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: validUname, trigger: ['blur', 'change'] }
                ],
                upwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validUpwd, trigger: ['blur', 'change'] }
                ],
                confirm: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validConfirm, trigger: ['blur', 'change'] }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: this.$utils.validatePhoneForm, trigger: ['blur', 'change'] }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {
        // 注册 - 表单校验
        submitForm(refName) {
            let { upwd, confirm } = this.ruleForm || {};
            this.$refs[refName].validate((valid) => {
                if(valid) {
                    this.postRegData({
                        ...this.ruleForm, 
                        upwd: this.$md5( upwd + this.$pwd_key ), 
                        confirm: this.$md5( confirm + this.$pwd_key )
                    });
                } else {
                    return false;
                }
            });
        },
        // 注册
        async postRegData(params={}) {
            const res = await this.$service.postRegData(params);
            try{
                if( res.data.code === 200 ){
                    res.data.data && localStorage.setItem('uname', res.data.data);
                    this.$router.push('/login');
                }
            }catch(err) {
                console.log(err);
            }
        }
    }
};
</script>

<style lang="less">
    @import "./index.less";
</style>