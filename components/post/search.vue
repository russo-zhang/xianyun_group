<template>
  <div class="search">
    <div class="inputSearch">
      <input v-model="searchContent" placeholder="请输入您想去的城市,比如: 广州" type="text" />
      <el-button class="btn" type="primary" icon="el-icon-search" @click="search"></el-button>
    </div>
    <div class="recCity">
      <ul @click="recCity">
        <li>推荐:</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clickCity: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchContent: "",
      //   储存搜索数据
      searchList: {}
    };
  },
  methods: {
    search() {
      this.$axios({
        url: "/posts",
        params: {
          city: this.searchContent
        }
      }).then(res => {
        this.searchList = res.data;
        this.$emit("getSearchList", this.searchList);
      });
    },
    recCity(e) {
      if (e.target.innerText == "推荐:") {
        this.searchContent = "";
      } else {
        this.searchContent = e.target.innerText;
      }
    }
  },
  watch: {
    searchContent() {
      if (this.searchContent === "") {
        this.$axios({
          url: "/posts"
        }).then(res => {
          this.searchList = res.data;
          this.$emit("getSearchList", this.searchList);
        });
      } else {
        this.$axios({
          url: "/posts",
          params: {
            city: this.searchContent
          }
        }).then(res => {
          this.searchList = res.data;
          this.$emit("getSearchList", this.searchList);
        });
      }
    },
    clickCity() {
       this.$axios({
          url: "/posts",
          params: {
            city: this.clickCity
          }
        }).then(res => {
          this.searchList = res.data;
          this.$emit("getSearchList", this.searchList);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-top: 20px;
  .inputSearch {
    height: 35px;
    border: 3px solid #ffa500;
    input {
      height: 35px;
      width: 90%;
      border: none;
      outline: none;
      text-indent: 2em;
      float: left;
    }
    .btn {
      width: 10%;
      height: 35px;
      font-size: 22px;
      background: #fff;
      border: none;
      font-weight: 700;
      color: #ffa500;
      line-height: 25px;
      padding: 0;
    }
  }
  .recCity {
    margin-top: 10px;
    ul {
      li {
        float: left;
        font-size: 12px;
        color: #666;
        margin-right: 9px;
        cursor: pointer;
        &:hover {
          color: orange;
        }
      }
    }
  }
}
</style>

