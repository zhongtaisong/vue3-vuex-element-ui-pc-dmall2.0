<template>
    <div class="common_width dm_message">
        <div class="dm_message__textarea">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                <el-form-item prop='content'>
                    <el-input
                        type="textarea"
                        placeholder="请输入留言内容"
                        maxlength="300"
                        minlength='1'
                        show-word-limit
                        :autosize="{ minRows: 4, maxRows: 4}"
                        v-model="ruleForm.content"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="dm_message__btn">
            <span :style="{color: 'red', 'padding-right': '20px'}">尚未登录，无法进行发表留言、赞、踩操作！</span>
            <el-button type="primary" :disabled='isDisabled' @click="submitForm('ruleForm')">发表留言</el-button>
        </div>
        <div class="dm_message__list">            
            <List v-for='c in messageList' :key='c.id'
                :id='c.id'
                :avatar="c.avatar ? `${$url}${c.avatar}` : ''" 
                :uname='c.uname'
                :commentTime='c.submitTime'
                :content='c.content'
                :likeNum='c.agree'
                :dislikeNum='c.disagree'
                :statusClick='statusClick'
            />
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            messageList: [],
            ruleForm: {
                content: ''
            },
            rules: {
                content: [
                    { required: true, message: '请输入留言内容', trigger: 'blur' }
                ]
            },
            isDisabled: false
        }
    },
    mounted() {
        this.getAllMessageData();
        if( !sessionStorage.getItem('uname') || !sessionStorage.getItem('token') ) {
            this.isDisabled = true;
        }
    },
    methods: {
        // 赞 /踩 - 操作
        statusClick(id, type, agreeNum, disagreeNum) {
            if(this.isDisabled) return;
            this.postUpdateMessageData({
                id, type, agreeNum, disagreeNum
            });
        },
        // 发表留言 - 表单校验
        submitForm(refName) {
            if(this.isDisabled) return;

            this.$refs[refName].validate((valid) => {
                if(valid) {
                    this.postAddMessageData({ ...this.ruleForm })
                } else {
                    return false;
                }
            });
        },
        // 查询留言列表
        async getAllMessageData() {
            const res = await this.$service.getAllMessageData();
            try {
                if (res.data.code === 200) {
                    const { data=[] } = res.data || {};
                    this.messageList = data;
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 赞/踩
        async postUpdateMessageData(params = {}) {

            const res = await this.$service.postUpdateMessageData(params);
            try {
                if (res.data.code === 200) {
                    this.getAllMessageData();
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 发表留言
        async postAddMessageData(params = {}) {

            const res = await this.$service.postAddMessageData({
                uname: sessionStorage.getItem('uname'),
                ...params
            });
            try {
                if (res.data.code === 200) {
                    this.getAllMessageData();
                    this.ruleForm['content'] = '';
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style lang="less">
    @import './index.less';
</style>