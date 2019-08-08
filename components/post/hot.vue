<template>
  <div class="hot">
    <div class="hotList">
      <ul @mouseout="mouseout " class="list">
        <li @mouseover="hover(index)" v-for="(item,index) in cityList" :key="index">
          {{item.type}}
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
      <ul
        @mouseover="hover(index)"
        @mouseout="mouseout"
        class="hotChild"
        v-show="index == key"
        v-for="(item,index) in cityList"
        :key="index"
      >
        <li @click="setHotCity(value.city)" v-for="(value,index2) in item.children" :key="index2">
          <span>{{index2 +1}}</span>
          <span>
            {{value.city}}
            <span style="color:#a6a6a6;">{{value.desc}}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="recommendCity">
      <div class="title">
        <h4>推荐城市</h4>
      </div>
      <div class="content">
        <nuxt-link to="/">
          <img src="../../assets/img/pic_sea.jpeg" alt />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [],
      //  悬停在第几个元素
      key: -1,
      // 储存当前点击的城市
      city: ""
    };
  },
  methods: {
    hover(index) {
      this.key = index;
    },

    mouseout() {
      this.key = -1;
    },
    setHotCity(city) {
      this.city = city;
      this.$emit("setClickCity",this.city);
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      this.cityList = [...res.data.data];
    });
  }
};
</script>

<style lang="less" scoped>
.hot {
  margin: 20px 0;
  height: 1000px;
  .hotList {
    border: 1px solid #ccc;
    box-sizing: border-box;
    position: relative;
    border-right: none;
    margin-bottom: 20px;
    .hotChild {
      position: absolute;
      background: #fff;
      top: -1px;
      left: 248px;
      width: 400px;
      border: 1px solid #ccc;
      border-left: none;
      z-index: 1;
      li {
        padding-left: 10px;
        height: 41px;
        line-height: 40px;
        font-size: 16px;
        color: #ffa500;
        // border-left: 1px solid #ccc;
        cursor: pointer;
        &:hover {
          border-left: none;
        }
        &:last-child {
          border-left: 1px solid #ccc;
        }
      }
    }
    .list {
      li {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        text-indent: 20px;

        &:hover {
          color: #ffa500;
          border-right: none;
        }
        &:last-child {
          border-bottom: none;
        }
        i {
          float: right;
          font-size: 18px;
          margin-right: 10px;
          line-height: 40px;
        }
      }
    }
  }
  .recommendCity {
    .title {
      border-bottom: 1px solid #ccc;
      h4 {
        font-weight: 500;
        margin-bottom: 8px;
      }
    }
    .content {
      margin-top: 10px;
      a {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

