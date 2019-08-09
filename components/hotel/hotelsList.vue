<template>
  <div class="hotelsList">
    <el-row class="hotelItem">
      <el-col :span="8">
        <img :src="data.photos" alt />
      </el-col>
      <el-col :span="11">
        <div class="list">
          <nuxt-link :to="'hotel/detail?id='+data.id">{{data.name}}</nuxt-link>
          <i class="iconfont icon-crown" v-for="(item,index) in level" :key="index"></i>
          <p>{{data.alias}}</p>
          <div class="rate">
            <el-col :span="12">
              <el-rate
                v-model="data.stars"
                disabled
                :show-score="true"
                :show-text="true"
                text-color="#ff9900"
                :allow-half="true"
                :score-template="data.stars+'分'"
              ></el-rate>
            </el-col>
            <el-col :span="6">
              <i>
                <nuxt-link to="/empty">{{data.all_remarks}}</nuxt-link>
              </i> 条评价
            </el-col>
            <el-col :span="6">
              <i>
                <nuxt-link to="/empty">{{data.common_remarks}}</nuxt-link>
              </i> 篇游记
            </el-col>
          </div>
          <div class="address">
            <i class="el-icon-location-outline"></i>
            位于: {{data.address}}
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <el-table
          :data="data.products"
          style="width: 100%"
          max-height="300"
          :show-header="false"
          @row-click="handleRowClick"
        >
          <el-table-column fixed prop="name" label="名称" ></el-table-column>
          <el-table-column label="价格">
            <template slot-scope="scope">
              <span v-html="`<em>¥ ${scope.row.price}</em>起 >`"></span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        products: [],
        hotellevel: { level: 0 }
      }
    }
  },
  data() {
    return {
      level: [],
      value: 3
    };
  },
  methods: {
    init() {
      if (!this.data.hotellevel) {
          this.level=[0]
      } else {
        for (var i = 0; i < this.data.hotellevel.level; i++) {
          this.level.push(0);
        }
      }
      // console.log(this.level)
    },
    handleRowClick(value) {
      console.log(value);
    }
  },

  mounted() {
    this.init();
  }
};
</script>
 
<style lang='less' scoped>
.hotelsList {
  height: 320;
  .hotelItem {
    padding: 25px 5px;
    border-bottom: 1px solid #ccc;
    .el-col {
      img {
        width: 320px;
        height: 210px;
      }
      .list {
        margin-left: 10px;
        a {
          font-size: 22px;
          font-weight: 400;
        }
        i {
          color: #fe980e;
        }
        p {
          color: #acb3c9;
        }
        .rate {
          margin: 15px 0;
          overflow: hidden;
          /deep/.el-rate {
            margin-top: 2px;
          }
          i {
            color: #fe980e;
            width: 100%;
            
          }
          /deep/.el-icon-star-on:before{
              height:18px !important;
            }
        }
        .address {
          font-size: 12px;
          color: #666;
        }
      }
      /deep/.el-table {
        cursor: pointer;
        em {
          color: #fe980e;
        }
      }
    }
  }
}
</style>