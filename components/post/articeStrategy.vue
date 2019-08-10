<template>
  <div class="articeStrategy">
    <div class="title">
      <h3>相关攻略</h3>
    </div>
    <!-- @click="routerPush(item.id)" -->
    <nuxt-link :to="'/post/article?id='+`${item.id}`" v-for="(item,index) in list" :key="index">
      <el-row class="content" type="flex" justify="space-between">
        <el-col :span="4" class="content_left">
          <img v-if="item.images.length>0" :src="item.images[0]" alt />
          <p v-else>没有封面</p>
        </el-col>
        <el-col :span="20" class="content_rigth">
          <p>{{item.title}}</p>
          <p>{{item.updated_at}} 阅读 {{item.watch}}</p>
        </el-col>
      </el-row>
    </nuxt-link>
  </div>
</template>

<script>
import Moment from "moment";

export default {
  data() {
    return {
      // 推荐文章列表
      list: []
    };
  },
  methods: {
    routerPush(id) {
      this.$router.push({ path: "/post/article", query: { id } });
    }
  },
  mounted() {
    // 获取推荐文章

    this.$axios({
      url: "/posts/recommend"
    }).then(res => {
      this.list = res.data.data;
      this.list.forEach(item => {
        item.updated_at = Moment(item.updated_at).format("YYYY-MM-DD  HH:mm");
      });
    });
  },
  watch: {
    $route() {
      this.$router.go(0);
    }
  }
};
</script>


<style lang="less" scoped>
.articeStrategy {
  margin-top: 20px;
  .title {
    h3 {
      font-weight: 400;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
  }
  .content {
    padding: 15px 0;
    height: 110px;
    border-bottom: 1px solid #ccc;
    .content_left {
      height: 80px;
      width: 100px;
      background: #666;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content_rigth {
      margin-left: 8px;
      p {
        &:nth-child(1) {
          font-size: 14px;
          height: 50px;
          word-wrap: break-word;
        }
        &:nth-child(2) {
          font-size: 12px;
          color: #ccc;
          padding-top: 10px;
        }
      }
    }
  }
}
</style>

