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
                                <el-upload
                                    class="avatar-uploader"
                                    action="#"
                                    :show-file-list="false"
                                    :before-upload="beforeAvatarUpload"
                                    :http-request='httpRequest'
                                >
                                    <img :src="personInfo.avatar" class="avatar">
                                    <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                                    <span class="el-upload-list__item-actions">
                                        <span
                                            @click="handlePictureCardPreview(file)"
                                            style='padding: 10px'
                                        >
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span
                                            @click="handleDownload(file)"
                                            style='padding: 10px'
                                        >
                                            <i class="el-icon-download"></i>
                                        </span>
                                        <span
                                            @click="handleRemove(file)"
                                            style='padding: 10px'
                                        >
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </el-upload>
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
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
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
                    { type: 'string', required: true, message: '请上传头像', trigger: 'change' }
                ]
            },
            imageUrl: ''
        }
    },
    mounted() {
        this.getUserInfoData();
    },
    methods: {
        httpRequest(param = {}) {
            let fileObj = param.file;
            let _URL = window.URL || window.webkitURL;
            this.personInfo['avatar'] = _URL.createObjectURL && _URL.createObjectURL(fileObj);
            // let fd = new FormData()// FormData 对象
            // fd.append('file', fileObj)// 文件对象
            // fd.append('platNum', this.importList.platNum)
            // fd.append('taskName', this.importList.taskName)
            
            // let url = process.env.CMS1_BASE_API + 'cdnDel/uploadExcel'
            // let config = {
            //     headers: {
            //     'Content-Type': 'multipart/form-data'
            //     }
            // }
            // axios.post(url, fd, config).then(res=>{
            //     if(res.code===0){
            //         this.submitForm();//提交表单
            //     }
            // })
        },
        beforeAvatarUpload(file) {
            // 图片格式
            const imgFormat = ['image/jpeg', 'image/png'];
            // const imgFormat = ['image/jpeg'];
            // const isJPG = file.type === 'image/jpeg';
            const isJPG = imgFormat.includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片仅限是 JPG、PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleRemove(file) {
            console.log('1111111111', file);
        },
        handlePictureCardPreview(file) {
            console.log('222222222222', file);
            // this.dialogImageUrl = file.url;
            // this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log('3333333333333', file);
            console.log(file);
        },
        // 重置
        resetForm() {
            this.getUserInfoData();
        },
        // 个人资料 - 表单校验
        submitForm(refName) {
            let formData = new FormData();
            this.$refs[refName].validate((valid) => {
                if(valid) {
                    console.log('11111111111', this.personInfo)
                    // 表单
                    // formData.append('userInfo', JSON.stringify(this.personInfo));
                    // // 存储被删图片
                    // formData.append('delList', JSON.stringify(delList));
                    // formData.append('uname', sessionStorage.getItem('uname'));
                    // this.postRegData({
                    //     ...this.personInfo, 
                    //     upwd: this.$md5( upwd + this.$pwd_key ), 
                    //     confirm: this.$md5( confirm + this.$pwd_key )
                    // });
                } else {
                    return false;
                }
            });
        },
        // 查询 - 个人资料
        async getUserInfoData() {
            const res = await this.$service.getUserInfoData({
                uname: sessionStorage.getItem('uname')
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
        async postUpdateUserInfoData() {
            const res = await this.$service.postUpdateUserInfoData({
                uname: sessionStorage.getItem('uname')
            });
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
    }
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>