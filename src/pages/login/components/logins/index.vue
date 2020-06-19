<template>
    <div class="dm_login_logins" :model="ruleForm" :rules="rules" ref="ruleForm">        
        <el-form class='login'>
            <el-row>
                <el-col :span='24'>
                    <el-form-item props='uname'>
                        <el-input v-model="ruleForm.uname" placeholder="请输入用户名"></el-input>
                        <!-- {
                            getFieldDecorator('uname', {
                                rules: [{ 
                                    required: true, 
                                    message: '必填', 
                                    whitespace: true 
                                }],
                                initialValue: localStorage.getItem('uname')
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                />
                            )
                        } -->
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item props='upwd'>
                        <el-input v-model="ruleForm.upwd" placeholder="请输入密码"></el-input>
                        <!-- {
                            getFieldDecorator('upwd', {
                                rules: [{ 
                                    required: true, 
                                    message: '必填', 
                                    whitespace: true 
                                }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            )
                        } -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class='password-operation'>
                <el-col :span='12'>
                    <el-form-item  props='isRemember'>
                        <el-checkbox>记住密码</el-checkbox>
                        <!-- {
                            getFieldDecorator('isRemember', {
                                rules: [{ 
                                    required: false, 
                                    message: '非必填'
                                }]
                            })(
                                <Checkbox.Group>
                                    <Checkbox class='isRemember' value='1'>记住密码</Checkbox>
                                </Checkbox.Group>
                            )
                        } -->
                    </el-form-item>            
                </el-col>
                <el-col :span='12' :style="{ textAlign: 'right' }">
                    <el-form-item>
                        <a>忘记密码？</a>
                    </el-form-item>            
                </el-col>
            </el-row>
            <el-row class='password-operation'>
                <el-col :span='24'>
                    <el-form-item>
                        <el-button type="primary" :style="{ width: '100%' }">登录</el-button>
                    </el-form-item>            
                </el-col>
                <el-col :span='24'>
                    <el-form-item>
                        <a>新用户注册</a>
                    </el-form-item>            
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                uname: localStorage.getItem('uname'),
                upwd: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                // uname: [
                //     { required: true, message: '请输入活动名称', trigger: 'blur' },
                //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                // ],
                // upwd: [
                //     { required: true, message: '请选择活动区域', trigger: 'change' }
                // ],
                // date1: [
                //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                // ],
                // date2: [
                //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                // ],
                // type: [
                //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                // ],
                // resource: [
                //     { required: true, message: '请选择活动资源', trigger: 'change' }
                // ],
                // desc: [
                //     { required: true, message: '请填写活动形式', trigger: 'blur' }
                // ]
            }
        }
    }, 
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="less">
    // @import "./index.less";
</style>