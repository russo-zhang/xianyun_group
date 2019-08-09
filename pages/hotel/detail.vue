<template>
  <div class="hotelDetail">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/hotel' }"
        v-for="(item,index) in breadcrumbList"
        :key="index"
      >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 标题部分 -->
    <div class="title">
      <div class="text">
        <em>{{hotelDetail.name}}</em>
        <i class="iconfont icon-crown" v-for="(item,index) in hotellevel" :key="index"></i>
      </div>
      <p>{{hotelDetail.alias}}</p>
      <p>
        <i class="el-icon-location-outline"></i>
        {{hotelDetail.address}}
      </p>
    </div>

    <!-- 图片展示 -->
    <div class="showImg">
      <el-row>
        <el-col :span="16">
          <div class="left">
            <img :src="hotelBigImg" alt />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right fl">
            <img
              :src="item"
              v-for="(item,index) in hotelImg"
              :key="index"
              @click="showBigImg(item)"
            />
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 价格展示 -->
    <div class="showPrice">
      <div class="header">
        <el-row>
          <el-col :span="10">价格来源</el-col>
          <el-col :span="10">低价房型</el-col>
          <el-col :span="4">最低价格/每晚</el-col>
        </el-row>
      </div>
      <div class="content">
        <a href="#" v-for="(item,index) in hotelDetail.products" :key="index">
          <el-row>
            <el-col :span="10">{{item.name}}</el-col>
            <el-col :span="10">{{item.bestType}}</el-col>
            <el-col :span="4">
              <em>¥ {{item.price}}</em> 元起
              <em>></em>
            </el-col>
          </el-row>
        </a>
      </div>
    </div>

    <!-- 地图模块 -->
    <DetailMap :hotelDetail="hotelDetail" />

    <!-- 酒店信息 -->
    <div class="hotelInfo">
      <el-row>
        <el-col :span="4">基本信息</el-col>
        <el-col :span="20">
          <el-col :span="6">
            <em>入住时间: {{hotelDetail.enterTime||"-"}}</em>
          </el-col>
          <el-col :span="6">
            <em>离店时间: {{hotelDetail.leftTime||"-"}}</em>
          </el-col>
          <el-col :span="6">
            <em>{{hotelDetail.creation_time||"-"}} / {{hotelDetail.renovat_time||"-"}}</em>
          </el-col>
          <el-col :span="6">
            <em>酒店规模: {{hotelDetail.roomCount||"-"}}间客房</em>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">主要设施</el-col>
        <el-col :span="18">
          <el-tag
            type="info"
            v-for="(item,index) in hotelDetail.hotelassets"
            :key="index"
          >{{item.name}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">停车服务</el-col>
        <el-col :span="18">
          <span>
            <em>{{hotelDetail.parking||"-"}}</em>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="18">
          <span>
            <em>{{hotelDetail.hotelbrand.name ||"-"}}</em>
          </span>
        </el-col>
      </el-row>
    </div>

    <!-- 评论 -->
    <div class="comment">
      <p>0条真实用户评论</p>
      <el-row>
        <el-col :span="4">
          <el-row>总评数 : {{hotelDetail.all_remarks}}</el-row>
          <el-row>好评数 : {{hotelDetail.very_good_remarks}}</el-row>
          <el-row>差评数 : {{hotelDetail.very_bad_remarks}}</el-row>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="8">
              <el-row class="recommendation">
                <el-rate
                  v-model="hotelDetail.stars"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <div class="seal">推荐</div>
              </el-row>
            </el-col>
            <el-col :span="16">
              <el-row type="flex" align="middle" class="service">
                <el-col>
                  <el-progress
                    type="circle"
                    :percentage="hotelDetail.scores.pc_environment"
                    :text-inside="true"
                    :width="74"
                    :stroke-width="2"
                    color="#fea241"
                  ></el-progress>
                  <div class="text">
                    <em>环境</em>
                    <br />
                    <em>{{hotelDetail.scores.environment||0}}</em>
                  </div>
                </el-col>
                <el-col>
                  <el-progress
                    type="circle"
                    :percentage="hotelDetail.scores.pc_product"
                    :text-inside="true"
                    :width="74"
                    :stroke-width="2"
                    color="#fea241"
                  ></el-progress>
                  <div class="text">
                    <em>产品</em>
                    <br />
                    <em>{{hotelDetail.scores.product||0}}</em>
                  </div>
                </el-col>
                <el-col>
                  <el-progress
                    type="circle"
                    :percentage="hotelDetail.scores.pc_service"
                    :text-inside="true"
                    :width="74"
                    :stroke-width="2"
                    color="#fea241"
                  ></el-progress>
                  <div class="text">
                    <em>服务</em>
                    <br />
                    <em>{{hotelDetail.scores.service||0}}</em>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
 
<script>
import DetailMap from "@/components/hotel/detailMap";
export default {
  data() {
    return {
      breadcrumbList: [],
      hotelDetail: {
        hotelbrand: {},
        scores: {
          pc_environment: 0,
          pc_product: 0,
          pc_service: 0
        }
      },
      hotellevel: [],
      hotelImg: [
        "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/2.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/3.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/4.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/5.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
      ],
      hotelBigImg: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
    };
  },
  components: {
    DetailMap
  },
  methods: {
    async init() {
      let res = await this.$axios({
        url: "http://127.0.0.1:1337/hotels?id=" + this.$route.query.id
      });
      this.breadcrumbList = res.data.data[0].breadcrumb.split(">");
      this.hotelDetail = res.data.data[0];
      this.hotellevel.length = this.hotelDetail.hotellevel.level;

      //获取酒店平分百分比
      this.hotelDetail.scores.pc_environment =
        this.hotelDetail.scores.environment * 10;
      this.hotelDetail.scores.pc_product = this.hotelDetail.scores.product * 10;
      this.hotelDetail.scores.pc_service = this.hotelDetail.scores.service * 10;

      // 图片数组
      this.hotelDetail.pics;
      // console.log(res);

      // 对品牌信息进行判断
      if (!this.hotelDetail.hotelbrand) this.hotelDetail.hotelbrand = {};
    },
    showBigImg(item) {
      this.hotelBigImg = item;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
 
<style lang='less' scoped>
.hotelDetail {
  width: 1000px;
  margin: 20px auto;
  .title {
    margin: 25px 0 40px;
    .text {
      em {
        font-size: 24px;
      }
      i {
        color: #fe980e;
      }
    }
    p {
      line-height: 20px;
      color: #656565;
    }
  }
  .showImg {
    .left {
      img {
        width: 640px;
        height: 360px;
      }
    }
    .right {
      height: 120px;
      &:nth-child(2) {
        margin: 4px 0;
      }
      img {
        width: 160px;
        margin-right: 8px;
        margin-bottom: 8px;
        cursor: pointer;
        &:nth-child(even) {
          margin-right: 0;
        }
      }
    }
  }
  .showPrice {
    margin: 50px 0;
    border-bottom: 1px solid #eaedf4;
    overflow: hidden;
    .header {
      .el-row {
        padding: 0 10px;
        color: #929cab;
        font: 600 14px Microsoft YaHei;
        div {
          height: 49px;
          line-height: 49px;
        }
      }
      border-bottom: 1px solid #eaedf4;
    }
    .content {
      height: 49px;
      line-height: 49px;
      color: #65686e;
      .el-row {
        padding: 0 10px;
        border-bottom: 1px solid #eaedf4;
      }
      em {
        color: #fe980e;
        font-size: 16px;
      }
    }
  }
  .hotelInfo {
    margin-top: 40px;
    font-size: 14px;
    .el-row {
      line-height: 60px;
      border-bottom: 1px solid #ededed;
      padding: 0 15px;
      em {
        color: #666;
      }
      .el-tag{
        margin: 0 5px;
      }
    }
  }
  .comment {
    margin: 20px 0;
    overflow: hidden;
    p {
      font: 600 16px simsun;
      margin-bottom: 20px;
    }
    .recommendation,
    .service {
      position: relative;
      height: 74px;
      em {
        color: #fea241;
      }
      .seal {
        position: absolute;
        top: 0;
        transform: rotate(315deg);
        width: 70px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 30px;
        color: #fee5c3;
        border: 2px solid #fee5c3;
        border-radius: 50%;
      }
      /deep/.el-rate {
        position: absolute;
        z-index: 2;
        height: 70px;
        line-height: 70px;
        i {
          font-size: 24px;
        }
      }
      div {
        position: relative;
        .text {
          position: absolute;
          top: 15px;
          left: 20px;
          text-align: center;
          color: #fea241;
          em {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>