<template>
    <div class="dm_userCenter__content--common">
        <el-row>
            <el-col :span='16'>
                <el-form :model="loginPwd" status-icon :rules="rules" ref="loginPwd" label-width="80px" size='small'>
                    <el-row>
                        <el-col :span='24'>
                            <el-form-item label='旧密码' prop='oldUpwd'>
                                <el-input v-model="loginPwd.oldUpwd" placeholder="请输入旧密码" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label="密码" prop='newUpwd'>
                                <el-input v-model="loginPwd.newUpwd" placeholder="请输入密码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label="确认密码" prop='confirmNewUpwd'>
                                <el-input v-model="loginPwd.confirmNewUpwd" placeholder="请再次输入密码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="dm_userCenter__content--common__btn">
                        <el-button style='width: 20%' size="small" @click="resetForm('loginPwd')">清 空</el-button>
                        <el-button type="primary" style='width: 20%' size="small" @click="submitForm('loginPwd')">保 存</el-button>
                    </div>
                </el-form>
            </el-col>
            <el-col :span='8'>
                <el-form disabled label-width="82px" size='small'>
                    <el-row>
                        <el-col :span='24'>
                            <el-form-item label='旧密码：' prop='oldUpwd'>
                                <el-input :value="loginPwd.oldUpwd || '-'" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label="密码：" prop='newUpwd'>
                                <el-input :value="loginPwd.newUpwd || '-'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label="确认密码：" prop='confirmNewUpwd'>
                                <el-input :value="loginPwd.confirmNewUpwd || '-'"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        // 新密码 - 校验
        let validNewUpwd = (rule, value, callback) => {
            if( this.loginPwd.confirmNewUpwd !== null ) {
                this.$refs.loginPwd.validateField('confirmNewUpwd');
            }
            callback();
        };
        // 确认密码 - 校验
        let validConfirmNewUpwd = (rule, value, callback) => {
            if( value !== this.loginPwd.newUpwd ) {
                callback(new Error('两次输入密码不一致!'));
            }else {
                callback();
            }
        };
        return {
            loginPwd: {
                oldUpwd: null,
                newUpwd: null,
                confirmNewUpwd: null
            },
            rules: {
                oldUpwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                newUpwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validNewUpwd, trigger: ['blur', 'change'] }
                ],
                confirmNewUpwd: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validConfirmNewUpwd, trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {
        // 清空
        resetForm(refName) {
            this.$refs[refName].resetFields();
        },
        // 登录密码 - 表单校验
        submitForm(refName) {
            let { upwd, confirm } = this.loginPwd || {};
            this.$refs[refName].validate((valid) => {
                if(valid) {
                    this.postUpdatePwdData({
                        oldUpwd: this.$md5(this.loginPwd.oldUpwd + this.$pwd_key), 
                        newUpwd: this.$md5(this.loginPwd.newUpwd + this.$pwd_key)
                    });
                } else {
                    return false;
                }
            });
        },
        // 修改 - 登录密码
        async postUpdatePwdData(params = {}) {
            const res = await this.$service.postUpdatePwdData({
                uname: sessionStorage.getItem('uname'),
                ...params
            });
            try{
                if( res.data.code === 200 ){
                    this.resetForm('loginPwd');
                    this.$store.dispatch('postLogoutData');
                }
            }catch(err) {
                console.log(err);
            }
        }
    }
};
</script>

<style lang="less"></style>