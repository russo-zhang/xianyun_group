<template>
<div>
   <p>酒店</p>
   <el-button @click="toDetail">点击查看详情</el-button>
</div>
</template>

<script>
export default {
 methods: {
    toDetail(){
       this.$router.push("/hotel/detail");
    }
 },
}
</script>

<style lang="less" scoped>
</style>