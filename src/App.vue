<template>
    <div id="app">
        <HeaderBar v-if='isShowHeader'></HeaderBar>
        <router-view></router-view>
        <FooterBar v-if='isShowHeader'></FooterBar>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            noHeader: ['/login']
        }
    },
    mounted() {
        this.getDicData();
    },
    methods: {
        // 获取字典表
        async getDicData() {
            const res = await this.$service.getDicData();
            try {
                if (res.data.code === 200) {
                    let { data } = res.data || {};
                    if( data ){
                        data['GENDER'] = {
                            0: '男',
                            1: '女',
                            2: '保密'
                        };
                        sessionStorage.setItem('tableDic', JSON.stringify(data));
                        
                        let newData = data;
                        for(let k in newData){
                            let arr = [];
                            for(let [key, value] of Object.entries(newData[k])){
                                arr.push({
                                    code: key,
                                    name: value
                                });
                            }
                            newData[k] = arr;
                        }
                        sessionStorage.setItem('selectDic', JSON.stringify(newData));
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
    computed: {
        isShowHeader() {
            return !this.noHeader.includes(this.$route.path);
        }
    }
};
</script>

<style lang='less'>
    @import "./index.less";
</style>
