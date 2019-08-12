<template>
  <div class="index">
    <div class="main">
      <el-row type="flex">
        <el-col :span="6">
          <Hot @setClickCity="setClickCity" />
        </el-col>
        <el-col :offset="1" :span="17">
          <Search :clickCity="clickCity" @getSearchList="getSearchList" />
          <RecArticle :searchList="searchList" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Hot from "@/components/post/hot.vue";
import Search from "@/components/post/search.vue";
import RecArticle from "@/components/post/recArticle.vue";

export default {
  components: {
    Hot,
    Search,
    RecArticle
  },
  data() {
    return {
      searchList: {},
      // 接收点击城市
      clickCity: ""
    };
  },
  methods: {
    // 接收搜索数据列表
    getSearchList(value) {
      // console.log(value.total);
      this.searchList = value;
    },
    // 接收点击城市
    setClickCity(value) {
      this.clickCity = value;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;
}
</style>