<template>
  <div class="article">
    <div class="main">
      <el-row type="flex" justify="space-between">
        <el-col :span="16">
          <ArticleCrumbs />
          <ArticleContent />
          <ArticlePostComment @getList="getList" />
          <!-- <ArticleComment v-for="(item,index) in list" :key="index" :list="item" /> -->
          <div v-if="isRouter" class="div">
            <ArticleComment
              style="padding:20px;"
              v-for="(item,index) in list"
              :key="index"
              :list="[item]"
            />
          </div>

          <!-- 分页 -->

          <el-pagination
            style="margin-bottom:20px"
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
      isRouter: true
    };
  },
  methods: {
    handleSizeChange(v) {
      this.pageSize = v;
      this.$axios({
        url: "/posts/comments",
        params: {
          post:  this.$route.query.id,
          _limit: v, //显示的条数
          _start: this.pageNum //哪里开始
        }
      }).then(res => {
        console.log(res.data.data);
        this.list = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(v) {
      this.pageNum = v;
      this.$axios({
        url: "/posts/comments",
        params: {
          post:  this.$route.query.id,
          _limit: this.pageSize,
          _start: (v - 1) * this.pageSize
        }
      }).then(res => {
        this.list = res.data.data;
        this.total = res.data.total;
      });
    },
    getList(value) {
      console.log(value);
      this.list = value;
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
      // console.log(JSON.stringify(this.list));
      // this.list = JSON.parse(JSON.stringify(this.list));
      console.log(this.list);
      this.total = res.data.total;
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
