<template>
    <el-upload
        action="#"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :http-request='httpRequest'
        :with-credentials="true"
    >
        <el-avatar :size='100' :src="avatar" title='点击上传头像'></el-avatar>
    </el-upload>
</template>

<script>
export default {
    props: {
        avatar: String,
        getImageUrl: Function
    },
    data() {
        return {}
    },
    methods: {
        // 自定义上传
        httpRequest(param = {}) {
            let fileObj = param.file || {};
            let _URL = (window.URL || window.webkitURL) || {};
            _URL.createObjectURL && this.getImageUrl(_URL.createObjectURL(fileObj), fileObj);
        },
        // 上传前图片格式、大小等校验
        beforeAvatarUpload(file) {
            // 图片格式
            const imgFormat = ['image/jpeg', 'image/png'];
            const isJPG = imgFormat.includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片仅限是 JPG、PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
};
</script>

<style lang="less"></style>