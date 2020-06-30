<template>
    <div class="dm_userCenter__content--common">
        <el-row>
            <el-col :span='16'>
                <el-form :model="personInfo" status-icon :rules="rules" ref="personInfo" label-width="80px" size='small'>
                    <el-row>
                        <el-col :span='24'>
                            <el-form-item label='用户名' prop='uname'>
                                <el-input v-model="personInfo.uname" placeholder="请输入用户名" disabled ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='昵称' prop='nickName'>
                                <el-input v-model="personInfo.nickName" placeholder="请输入昵称" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='手机号码' prop='phone'>
                                <el-input v-model="personInfo.phone" placeholder="请输入手机号码" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='性别' prop='gender'>
                                <el-radio-group v-model="personInfo.gender">
                                    <el-radio label="0">男</el-radio>
                                    <el-radio label="1">女</el-radio>
                                    <el-radio label="2">保密</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='生日' prop='birthday'>
                                <el-date-picker type="date" placeholder="选择日期" v-model="personInfo.birthday" style="width: 100%;"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='上传头像' prop='avatar'>
                                <Upload :avatar='personInfo.avatar' :getImageUrl='getImageUrl' :uname='uname' />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="dm_userCenter__content--common__btn">
                        <el-button style='width: 20%' size="small" @click="resetForm">重 置</el-button>
                        <el-button type="primary" style='width: 20%' size="small" @click="submitForm('personInfo')">保 存</el-button>
                    </div>
                </el-form>
            </el-col>
            <el-col :span='8'>
                <el-form disabled label-width="82px" size='small'>
                    <el-row>
                        <el-col :span='24'>
                            <el-form-item label='用户名：' prop='uname'>
                                <el-input :value="personInfo.uname || '-'" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='昵称：' prop='nickName'>
                                <el-input :value="personInfo.nickName || '-'" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='手机号码：' prop='phone'>
                                <el-input :value="personInfo.phone || '-'" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='性别：' prop='gender'>
                                <el-input :value="personInfo.gender | genderFilters" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='生日：' prop='birthday'>
                                <el-input :value="personInfo.birthday || '-'" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='头像：' prop='avatar'>
                                <el-avatar :size='100' :src="personInfo.avatar">{{ !personInfo.avatar ? uname : '' }}</el-avatar>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            personInfo: {
                uname: null,
                nickName: null,
                phone: null,
                gender: null,
                birthday: null,
                avatar: null
            },
            rules: {
                uname: [],
                nickName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: this.$utils.validatePhoneForm, trigger: ['blur', 'change'] }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birthday: [
                    { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                ],
                avatar: [
                    { required: true, message: '请上传头像', trigger: 'change' }
                ]
            },
            imageUrl: null,
            delList: []
        }
    },
    mounted() {
        this.getUserInfoData();
    },
    methods: {
        // 获取上传的图片
        getImageUrl(url, file={}) {
            let avatar = this.personInfo['avatar'];
            if( avatar != url && !this.delList.length ) {
                this.delList = avatar && avatar.includes('api/') ? [ avatar.slice(avatar.indexOf('api/') + 4) ] : [];
            }
            this.personInfo['avatar'] = url;
            this.imageUrl = file;
        },
        // 重置
        resetForm() {
            this.getUserInfoData();
        },
        // 个人资料 - 表单校验
        submitForm(refName) {
            this.$refs[refName].validate((valid) => {
                if(valid) {
                    let formData = new FormData();
                    let personInfo = this.personInfo;
                    let delList = this.delList;
                    let imageUrl = this.imageUrl;

                    delete personInfo.avatar;
                    // 表单
                    formData.append('userInfo', JSON.stringify(this.personInfo));
                    // // 存储被删图片
                    formData.append('delList', JSON.stringify(delList));
                    formData.append('uname', this.uname);

                    if(typeof imageUrl == 'object' ){
                        formData.append('avatar', imageUrl);
                    }else {
                        let url = imageUrl ? imageUrl.slice(imageUrl.indexOf('api/') + 4) : '';
                        formData.append('avatar', url);
                    }
                    this.postUpdateUserInfoData(formData);
                } else {
                    return false;
                }
            });
        },
        // 查询 - 个人资料
        async getUserInfoData() {
            const res = await this.$service.getUserInfoData({
                uname: this.uname
            });
            try{
                if( res.data.code === 200 ){
                    const { data={} } = res.data || {};
                    data['avatar'] = data['avatar'] ? this.$url + data['avatar'] : null;
                    this.personInfo = data;
                }
            }catch(err) {
                console.log(err);
            }
        },
        // 修改 - 个人资料
        async postUpdateUserInfoData(params = {}) {
            await this.$service.postUpdateUserInfoData(params);
        }
    },
    filters: {
        genderFilters(val) {
            let obj = {
                '0'() {
                    return '男';
                },
                '1'() {
                    return '女';
                },
                '2'() {
                    return '保密';
                }
            };
            return (val && obj[val]()) || '-';
        }
    },
    computed: {
        ...mapState({
            uname: state => state.uname,
            token: state => state.token
        })
    }
};
</script>

<style lang="less"></style>