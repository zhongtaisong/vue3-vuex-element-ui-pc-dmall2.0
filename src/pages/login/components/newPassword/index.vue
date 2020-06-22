<template>
    <div class="dm_login_newPassword">        
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-row>
                <el-col :span='24'>
                    <el-form-item label="密码" prop='pwd'>
                        <el-input v-model="ruleForm.pwd" placeholder="请输入密码" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="确认密码" prop='newUpwd'>
                        <el-input v-model="ruleForm.newUpwd" placeholder="请再次输入密码" size='small'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class='dm_login_newPassword__btn'>
                <el-col :span='24'>
                    <el-form-item>
                        <el-button type="primary" :style="{ width: '100%' }" size='small' @click="submitForm('ruleForm')">提交新密码</el-button>
                    </el-form-item>            
                </el-col>
                <el-col :span='24'>
                    <el-form-item>
                        <a @click="handleTarget('Logins')">直接登录</a>
                    </el-form-item>            
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        handleTarget: Function
    },
    data() {
        // 密码 - 校验
        let validPwd = (rule, value, callback) => {
            if( this.ruleForm.newUpwd !== null ) {
                this.$refs.ruleForm.validateField('newUpwd');
            }
            callback();
        };
        // 确认密码 - 校验
        let validNewUpwd = (rule, value, callback) => {
            if( value !== this.ruleForm.pwd ) {
                callback(new Error('两次输入密码不一致!'));
            }else {
                callback();
            }
        };
        return {
            ruleForm: {
                pwd: null,
                newUpwd: null
            },
            rules: {
                pwd: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: validPwd, trigger: ['blur', 'change'] }
                ],
                newUpwd: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validNewUpwd, trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {
        // 提交新密码 - 表单校验
        submitForm(refName) {
            this.$refs[refName].validate((valid) => {
                if(valid) {
                    this.postUpdateUpwdData({
                        uname: this.uname,
                        oldUpwd: this.oldUpwd,
                        newUpwd: this.$md5(this.ruleForm.newUpwd + this.$pwd_key)
                    });
                } else {
                    return false;
                }
            });
        },
        // 提交新密码
        async postUpdateUpwdData(params={}) {
            const res = await this.$service.postUpdateUpwdData({
                ...params,
                isForgetPwd: true
            });
            try{
                if( res.data.code === 200 ){
                    res.data.data && localStorage.setItem('uname', res.data.data);
                    this.handleTarget('Logins');
                }
            }catch(err) {
                console.log(err);
            }
        }
    },
    computed: {
        ...mapState({
            uname: state => state.login.uname,
            oldUpwd: state => state.login.oldUpwd,
        })
    }
};
</script>

<style lang="less">
    @import "./index.less";
</style>