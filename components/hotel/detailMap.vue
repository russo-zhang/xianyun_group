<template>
  <div class="map">
    <el-row :gutter="20">
      <el-col :span="16">
        <div id="container"></div>
      </el-col>
      <el-col :span="8">
        <div class="locationList">
          <div class="tab">
            <el-row>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="风景" name="first"></el-tab-pane>
                <el-tab-pane label="交通" name="second"></el-tab-pane>
              </el-tabs>
            </el-row>
          </div>
          <div class="list">
            <!-- 风景 -->
            <el-table
              :data="hotelDetail.scenic"
              style="width: 100%"
              max-height="300"
              :show-header="false"
              @cell-mouse-enter="locationHover"
              :row-class-name="setRowStyle"
              v-if="showTable==='first'"
              setCurrentRow
            >
              <el-table-column fixed prop="name" label="地址" width="220"></el-table-column>
              <el-table-column prop="province" label="距离"></el-table-column>
            </el-table>

            <!-- 交通 -->
            <el-table
              :data="hotelDetail.scenic"
              style="width: 100%"
              max-height="300"
              :show-header="false"
              @cell-mouse-enter="locationHover"
              :row-class-name="setRowStyle"
              v-if="showTable==='second'"
            >
              <el-table-column fixed prop="name" label="地址" width="220"></el-table-column>
              <el-table-column prop="province" label="距离"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
export default {
  props: {
    hotelDetail: {
      type: Object,
      default: {
        scenic: [],
        location: {}
      }
    }
  },
  data() {
    return {
      activeName: "first",
      showTable: "first",
    };
  },
  methods: {
    handleClick(value) {
      this.showTable = value.name;
    },
    locationHover(row) {
      // 当单元格 hover 进入时会触发该事件
      // console.log(row);
    },
    setRowStyle() {}
  },
  mounted() {
    window.onLoad = ()=>{
      var map = new AMap.Map("container", {
        zoom: 18, //级别
        // center: [113.42815, 23.12949], //中心点坐标
        center: [
          this.hotelDetail.location.longitude,
          this.hotelDetail.location.latitude
        ],
        viewMode: "3D" //使用3D视图
      });

      // 创建一个 Marker 实例：
      var marker1 = new AMap.Marker({
        position: new AMap.LngLat(113.4282, 23.12955), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "深圳"
      });
      var marker2 = new AMap.Marker({
        position: new AMap.LngLat(113.4281, 23.129),
        title: "深圳"
      });
      var marker3 = new AMap.Marker({
        position: new AMap.LngLat(113.42815, 23.12949),
        title: "深圳"
      });
      let markerList = [marker1, marker2, marker3];

      // 将创建的点标记添加到已有的地图实例：
      map.add(markerList);

      // 移除已创建的 marker
      // map.remove(marker);
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=6c1b506dfa88f87ed0e7f0b73baa5f7a&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
 
<style lang='less' scoped>
.map {
  .el-row {
    #container {
      height: 360px;
    }
    .locationList {
      height: 360px;
      /deep/.el-table__row {
        td {
          border-bottom: none !important;
        }
      }
    }
  }
  .el-table__body tr.hover-row > td {
    background-color: white !important;
  }
}
</style>