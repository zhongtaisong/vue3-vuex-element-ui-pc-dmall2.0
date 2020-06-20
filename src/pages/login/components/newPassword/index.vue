<template>
    <div class="dm_login_newPassword">        
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-row>
                <el-col :span='24'>
                    <el-form-item label="密码" prop='oldUpwd'>
                        <el-input v-model="ruleForm.oldUpwd" placeholder="请输入密码" size='small'></el-input>
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
export default {
    props: {
        handleTarget: Function
    },
    data() {
        // 密码 - 校验
        let validOldUpwd = (rule, value, callback) => {
            if( this.ruleForm.newUpwd !== null ) {
                this.$refs.ruleForm.validateField('newUpwd');
            }
            callback();
        };
        // 确认密码 - 校验
        let validNewUpwd = (rule, value, callback) => {
            if( value !== this.ruleForm.oldUpwd ) {
                callback(new Error('两次输入密码不一致!'));
            }else {
                callback();
            }
        };
        return {
            ruleForm: {
                oldUpwd: null,
                newUpwd: null
            },
            rules: {
                oldUpwd: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: validOldUpwd, trigger: ['blur', 'change'] }
                ],
                newUpwd: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validNewUpwd, trigger: ['blur', 'change'] }
                ]
            }
        }
    }, 
    methods: {
        // 验证信息 - 表单校验
        submitForm(refName) {
            this.$refs[refName].validate((valid) => {
                if(valid) {
                    console.log('22222222', this.ruleForm)
                    // this.postValiForgetPwdData({...this.ruleForm});
                } else {
                    return false;
                }
            });
        },
        // 验证信息
        async postValiForgetPwdData(params={}) {
            const res = await this.$service.postValiForgetPwdData({
                ...params,
                isForgetPwd: true
            });
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