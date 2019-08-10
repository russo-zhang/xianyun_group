<template>
  <div class="article">
    <div class="main">
      <el-row type="flex" justify="space-between">
        <el-col :span="16">
          <ArticleCrumbs />
          <ArticleContent />
          <ArticlePostComment @getList="getList" :reply="reply" />
          <!-- <ArticleComment v-for="(item,index) in list" :key="index" :list="item" /> -->
          <div v-if="list.length != 0">
            <ArticleComment
              @getReply="getReply"
              style="padding:20px;"
              v-for="(item,index) in list"
              :key="index"
              :list="[item]"
            />
          </div>
          <p style="padding:20px 0;text-align:center;border:1px solid #ccc" v-else>暂时没有评论</p>

          <!-- 分页 -->

          <el-pagination
            style="margin:20px 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
        <el-col :span="7">
          <ArticeStrategy />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ArticleCrumbs from "@/components/post/articleCrumbs.vue";
import ArticleContent from "@/components/post/articleContent.vue";
import ArticlePostComment from "@/components/post/articlePostComment.vue";
import ArticleComment from "@/components/post/articleComment.vue";
import ArticeStrategy from "@/components/post/articeStrategy.vue";

export default {
  components: {
    ArticleCrumbs,
    ArticleContent,
    ArticlePostComment,
    ArticleComment,
    ArticeStrategy
  },
  data() {
    return {
      list: [],
      total: 0,
      pageNum: 0,
      pageSize: 2,
      start: 0,
      //回复对象信息
      reply: {}
    };
  },
  methods: {
    handleSizeChange(v) {
      this.pageSize = v;
      console.log(v);
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _limit: v, //显示的条数
          _start: (this.pageNum - 1) * v //哪里开始
        }
      }).then(res => {
        this.list = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(v) {
      this.pageNum = v;
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _limit: this.pageSize,
          _start: (v - 1) * this.pageSize
        }
      }).then(res => {
        this.list = res.data.data;
        this.total = res.data.total;
      });
    },
    getList(value) {
      this.list = value;
    },
    getReply(data) {
      this.reply = data;
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/comments",
      params: {
        post: this.$route.query.id,
        _limit: 2,
        _start: 0
      }
    }).then(res => {
      this.list = res.data.data;
      this.total = res.data.total;
      console.log(this.list);
    });
  }
};
</script>

<style lang="less" scoped>
.article {
  .main {
    margin: 0 auto;
    width: 1000px;
  }
}
</style>
