<template>
  <div class="recArticle">
    <div class="title">
      <el-row type="flex" justify="space-between">
        <h3>推荐攻略</h3>
        <el-button class="btn" type="primary" icon="el-icon-edit" @click="toCreate">写游记</el-button>
      </el-row>
    </div>
    <nuxt-link v-for="(item,index) in listData" :key="index" :to="`/post/article?id=${item.id}`">
      <div class="content">
        <el-row v-if="item.images.length<=1" type="flex">
          <el-col class="content-left" :span="8">
            <img :src="`${item.images[0]}`" alt />
          </el-col>
          <el-col :span="16">
            <div class="content-title">
              <h3>{{item.title}}</h3>
            </div>
            <p class="article">{{item.summary}}</p>

            <p class="author">
              <i class="el-icon-location-outline"></i>
              <span>{{item.cityName}}&nbsp;&nbsp;by&nbsp;&nbsp;</span>
              <img :src="item.account.defaultAvatar" alt srcset />
              <span style="color:orange">{{item.account.nickname}}</span>
              <i class="el-icon-view"></i>
              <span>{{item.watch}}</span>
            </p>
            <p class="like">{{item.like || 0}}&nbsp;赞</p>
          </el-col>
        </el-row>
        <!-- 当图片大于3张得时候显示 -->
        <div v-else type="flex">
          <div class="content-title">
            <h3>{{item.title}}</h3>
          </div>
          <p class="article">{{item.summary}}</p>
          <div class="content-left-img">
            <img :src="`${item.images[0]}`" alt />
            <img :src="`${item.images[1]}`" alt />
            <img :src="`${item.images[2]}`" alt />
          </div>
          <div style="padding:20px 0">
            <p class="author">
              <i class="el-icon-location-outline"></i>
              <span>{{item.cityName}}&nbsp;&nbsp;by&nbsp;&nbsp;</span>
              <img :src="item.account.defaultAvatar" alt srcset />
              <span style="color:orange">{{item.account.nickname}}</span>
              <i class="el-icon-view"></i>
              <span>{{item.watch}}</span>
            </p>
            <p class="like">{{item.like || 0}}&nbsp;赞</p>
          </div>
        </div>
      </div>
    </nuxt-link>
    <!-- @size-change="handleSizeChange"
    @current-change="handleCurrentChange"-->
    <!-- :current-page="currentPage4" -->
    <el-pagination
      style="margin:15px 0;"
      :current-page="currentPage"
      layout=" prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 储存文章列表
      listData: [],
      //   总文章数量
      total: 0,
      currentPage: 1,
      start: 0
    };
  },
  methods: {
    toCreate() {
      this.$router.push({ path: "/post/create" });
    },
    handleCurrentChange(v) {
      this.start = (v - 1) * 3;
      this.init();
    },
    init() {
      this.$axios({
        url: `http://157.122.54.189:9095/posts?_start=${this.start}&_limit=3`
        // params: {
        //   _start: this._start,
        //   _limit: this._limit
        // }
      }).then(res => {
        this.listData = res.data.data;
        const { total } = res.data;
        this.total = total;
      });
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    searchList() {
      this.listData = this.searchList.data;
      this.total = this.searchList.total;
    }
  }
};
</script>

<style lang="less" scoped>
.recArticle {
  margin-top: 40px;
  .title {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    h3 {
      font-weight: 400;
      color: #ffa500;

      &::after {
        display: block;
        content: "";
        width: 72px;
        height: 2px;
        background: orange;
        position: absolute;
        bottom: -11px;
        left: 0;
      }
    }
  }
  .content {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;

    .content-left-img {
      //   box-sizing: border-box;
      overflow: hidden;
      margin-top: 10px;
      height: 150px;
      img {
        width: 30%;
        height: 150px;
        margin-right: 20px;
      }
    }
    .content-left {
      padding-right: 8px;
      img {
        width: 100%;
        height: 150px;
      }
    }
    .content-title {
      height: 25px;
      overflow: hidden;
      margin-bottom: 20px;
      h3 {
        font-weight: 400;
        &:hover {
          color: orange;
        }
      }
    }
    .article {
      font-size: 14px;
      color: #666;
      height: 60px;
      overflow: hidden;
      //   text-overflow: ;
      margin-bottom: 5px;
    }
    .author {
      float: left;
      span,
      i {
        font-size: 12px;
        color: #ccc;
      }
    }
    .like {
      float: right;
      color: orange;
      font-size: 16px;
    }
  }
}
</style>

