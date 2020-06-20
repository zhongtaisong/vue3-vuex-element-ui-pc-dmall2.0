<template>
    <div class="dm_login_forgetPassword">        
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-row>
                <el-col :span='24'>
                    <el-form-item label="邮箱" prop='email'>
                        <el-input v-model="ruleForm.email" placeholder="请输入邮箱" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="用户名" prop='uname'>
                        <el-input v-model="ruleForm.uname" placeholder="请输入用户名" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="手机号码" prop='phone'>
                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" size='small'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class='dm_login_forgetPassword__btn'>
                <el-col :span='24'>
                    <el-form-item>
                        <el-button type="primary" :style="{ width: '100%' }" size='small' @click="submitForm('ruleForm')">验证信息</el-button>
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
export default {
    props: {
        handleTarget: Function
    },
    data() {
        // 手机号码 - 校验
        let validatePhone = (rule, value, callback) => {
            let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
            if ( !reg.test(value) ) {
                callback('请输入正确的手机号码');
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                email: null,
                uname: null,
                phone: null
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                uname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: validatePhone, trigger: ['blur', 'change'] }
                ]
            }
        }
    }, 
    methods: {
        // 验证信息 - 表单校验
        submitForm(refName) {
            this.$refs[refName].validate((valid) => {
                if(valid) {
                    this.postValiForgetPwdData({...this.ruleForm});
                } else {
                    return false;
                }
            });
        },
        // 验证信息
        async postValiForgetPwdData(params={}) {
            const res = await this.$service.postValiForgetPwdData(params);
            try{
                if( res.data.code === 200 ){
                    // const { data={} } = res.data || {};
                    // if(data) {
                    //     this.setUpwdObj(data);
                    // }
                    // message.success(res.data.msg);
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