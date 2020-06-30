<template>
    <div class="dm_login_logins">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" @keyup.enter.native="submitForm('ruleForm')">
            <el-row>
                <el-col :span='24'>
                    <el-form-item prop='uname'>
                        <el-input v-model="ruleForm.uname" placeholder="请输入用户名" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item prop='upwd'>
                        <el-input v-model="ruleForm.upwd" placeholder="请输入密码" type="password" size='small'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class='dm_login_logins__pwd'>
                <el-col :span='12'>
                    <el-form-item prop='isRemember'>
                        <el-checkbox v-model="ruleForm.isRemember">记住密码</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span='12' :style="{ textAlign: 'right' }">
                    <el-form-item>
                        <a @click="handleTarget('ForgetPassword')">忘记密码？</a>
                    </el-form-item>            
                </el-col>
            </el-row>
            <el-row class='dm_login_logins__btn'>
                <el-col :span='24'>
                    <el-form-item>
                        <el-button type="primary" :style="{ width: '100%' }" size='small' @click="submitForm('ruleForm')">登 录</el-button>
                    </el-form-item>            
                </el-col>
                <el-col :span='24'>
                    <el-form-item>
                        <router-link to='/register'>新用户注册</router-link>
                    </el-form-item>            
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        handleTarget: Function,
        fromPath: String
    },
    data() {
        return {
            ruleForm: {
                uname: localStorage.getItem('uname'),
                upwd: null,
                isRemember: false
            },
            rules: {
                uname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                upwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    }, 
    methods: {
        // 登录 - 表单校验
        submitForm(refName) {
            let { uname, upwd, isRemember } = this.ruleForm || {};
            this.$refs[refName].validate((valid) => {
                if(valid) {                    
                    this.postLogData({
                        uname, 
                        upwd: this.$md5(upwd + this.$pwd_key),
                        // 0表示不记住密码， 1表示记住密码
                        isRemember: isRemember * 1
                    });
                } else {
                    return false;
                }
            });
        },
        // 登录
        async postLogData(params={}) {
            const res = await this.$service.postLogData(params);
            try{
                if( res.data.code === 200 ){
                    const { uname, token } = res.data.data || {};
                    sessionStorage.setItem('uname', uname);
                    sessionStorage.setItem('token', token);
                    localStorage.setItem('uname', uname);
                    this.$store.dispatch('getUname', uname);
                    this.$store.dispatch('getToken', token);

                    setTimeout(() => {
                        if( !this.fromPath ) {
                            this.$router.push('/');
                        }else{
                            this.$router.go(-1);
                        }
                    }, 1000)
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