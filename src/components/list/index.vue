<template>
    <div class="dm_list">
        <div class="dm_list__left">
            <el-avatar size="medium" :src="avatar">{{ !avatar ? uname : '' }}</el-avatar>
        </div>
        <div class="dm_list__right">
            <div class="dm_list__right--top">
                <span>{{ uname }}</span>
                <i>{{ commentTime }}</i>
            </div>
            <div class="dm_list__right--center">{{ content }}</div>
            <div class="dm_list__right--bottom">
                <div class="dm_list__right--bottom__like"  :class="type == 'agree' ? 'active' : '' ">
                    <span @click="handleStatusClick(id, 'agree')">赞</span>
                    <i>{{ likeNum }}</i>
                </div>
                <div class="dm_list__right--bottom__dislike" :class="type == 'disagree' ? 'active' : '' ">
                    <span @click="handleStatusClick(id, 'disagree')">踩</span>
                    <i>{{ dislikeNum }}</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: Number,
        avatar: String,
        uname: {
            type: String,
            default: '-'
        },
        commentTime: {
            type: String,
            default: '-'
        },
        content: {
            type: String,
            default: '-'
        },
        likeNum: {
            type: Number,
            default: 0
        },
        dislikeNum: {
            type: Number,
            default: 0
        },
        statusClick: Function
    },
    data() {
        return {
            type: ''
        }
    },
    methods: {
        // 赞 / 踩
        handleStatusClick(id, type) {
            let likeNum = this.likeNum;
            let dislikeNum = this.dislikeNum;
            let isStop = false;
            let obj = {
                agree: () => {
                    if(this.type != 'agree') {
                        ++likeNum;
                        this.type && dislikeNum && dislikeNum--;
                    }else{
                        isStop = true;
                    }
                },
                disagree: () => {
                    if(this.type != 'disagree') {
                        ++dislikeNum;
                        this.type && likeNum && likeNum--;
                    }else{
                        isStop = true;
                    }          
                }
            };
            obj[type]();
            !isStop && this.statusClick(id, type, likeNum, dislikeNum);
            this.type = type;
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>