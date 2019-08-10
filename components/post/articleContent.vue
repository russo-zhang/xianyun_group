<template>
  <div class="articleContent">
    <div class="title">
      <h1 style="font-size:33px">{{content.title}}</h1>
    </div>
    <div class="strategy">
      攻略: {{date}}
      &nbsp;&nbsp;&nbsp;&nbsp;
      阅读:{{content.watch}}
    </div>
    <div v-html="content.content" class="content"></div>
    <el-row class="like" type="flex" justify="center">
      <el-col :span="3">
        <i class="el-icon-edit"></i>
        <p>评论({{comments.length}})</p>
      </el-col>
      <el-col @click.native="collect" :span="3">
        <i class="el-icon-star-off"></i>
        <p>收藏</p>
      </el-col>
      <el-col :span="3">
        <i class="el-icon-s-help"></i>
        <p>分享</p>
      </el-col>
      <el-col @click.native="thumbUpSlasher" :span="3">
        <i class="el-icon-thumb"></i>
        <p>点赞({{content.like || 0}})</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  data() {
    return {
      // 储存文章信息
      content: [{ content: "" }],
      //   发布时间
      date: "",
      //   提取评论
      comments: []
    };
  },
  methods: {
    // 收藏文章
    collect() {
      const token = this.$store.state.users.userInfo.token;

      if (!token) {
        this.$message.error("请先登录");
        this.$router.push("/login");
      } else {
        this.$axios({
          url: "/posts/star",
          params: {
            id: this.$route.query.id
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {});
      }
    },
    thumbUpSlasher() {
      const token = this.$store.state.users.userInfo.token;

      if (!token) {
        this.$message.error("请先登录");
        this.$router.push("/login");
      } else {
        this.$axios({
          url: "/posts/like",
          params: {
            id: this.$route.query.id
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          this.content.like++;
        });
      }
    }
  },
  mounted() {
    this.$axios({
      url: "/posts",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.content = res.data.data[0];
      this.comments = res.data.data[0].comments;
      this.date = Moment(this.content.created_at).format("YYYY-MM-DD  HH:mm");
    });
  }
};
</script>

<style lang="less" scoped>
.articleContent {
  .title {
    h1 {
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
    }
  }
  .strategy {
    text-align: right;
    color: #999;
    font-size: 16px;
    margin: 20px;
  }
  /deep/ .content {
    span {
      img {
        width: 100%;
        margin-top: 10px;
      }
    }

    h3,
    p {
      margin-top: 10px;
      img {
        max-width: 650px;
      }
    }
  }
  .like {
    margin: 30px 0;
    text-align: center;
    cursor: pointer;
    i {
      font-size: 30px;
      color: orange;
    }
    p {
      color: #999;
      margin-top: 5px;
    }
  }
}
</style>

