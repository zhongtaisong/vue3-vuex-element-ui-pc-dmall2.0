<template>
    <el-row class='dm_tableTitle'>
        <h4>{{ title }}</h4>
        <slot></slot>
    </el-row>
</template>

<script>
export default {
    props: {
        title: String
    }
};
</script>

<style lang="less">
    .dm_tableTitle {
        display: flex;
        align-items: center;
        padding: 0px 0 6px 10px;
        h4 {
            margin-bottom: 0;
            font-size: 20px;
            font-weight: bold;
            color: #000;
        }
        div {
            display: flex;
            padding: 10px 0;
            i {
                font-style: normal;
                font-weight: bold;
                padding: 0 4px;
            }
        }
    }
</style>