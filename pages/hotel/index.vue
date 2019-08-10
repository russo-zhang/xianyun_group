<template>
   <div class="hotel clearfix">
      <!-- 面包屑部分 -->
      <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
         <el-breadcrumb-item>南京酒店预订</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 入住信息 -->
      <div class="hotel-search">
         <HotelSearch/>
      </div>

      <!-- 地图攻略区域 -->
      <div class="totalArea">
      <!-- 区域攻略均价部分 -->
         <div class="area">
            <HotelArea :data="selectCityId"/>
         </div>

         <!-- 地图部分 -->
         <div class="gaodeMap">
            <HotelMap  :data="locaArr"/>
         </div>
      </div>  

      <!-- 酒店过滤部分 -->
      <div class="hotelFilter">
         <HotelFilter :data="cacheHotelList"
          @setNewDataList="setNewDataList"/>
      </div>

      <!-- 酒店部分 -->
      <div class="specHotel">
         <HotelsList v-for="(item,index) in dataList" :key="index" :data="item" />
      </div>

      <!-- 分页功能 -->
      <div class="paginationBox fr">
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage">
         </el-pagination>
      </div>
   </div>
</template>
 
<script>
import HotelSearch from '@/components/hotel/hotelSearch'
import HotelArea from '@/components/hotel/hotelArea'
import HotelFilter from '@/components/hotel/hotelFilter'
import HotelMap from '@/components/hotel/hotelMap'
import HotelsList from "@/components/hotel/hotelsList"
export default {
   data() {
      return{
         pageNum:1,   //当前页面
         pageSize:4,    //页面容量
         totalPage:0,      //总页面
         selectCityId:74,      //城市id,默认是南京
         hotelsList: [],
         cacheHotelList:[],      //用于缓存
         dataList:[]  ,       //用于分页

         locaArr:[]     //用于向地图传递参数
      }
   },
   components:{
      HotelSearch,
      HotelArea,
      HotelFilter,
      HotelMap,
      HotelsList
   },
   methods:{
      // 页面容量改变时触发
      handleSizeChange(value){
         this.pageSize = value
         this.showDataList()
      },
      // 当前页面改变时触发
      handleCurrentChange(value){
         this.pageNum = value
         this.showDataList()
      },
      showDataList(){
         this.dataList = this.hotelsList.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)
      },

      setNewDataList(arr){
         if(arr){
               this.pageNum = 1;
               this.hotelsList = arr
               this.totalPage = arr.length
         }
         this.showDataList()
      },
      showMap(){
            this.$axios({
            url:'hotels?city=74'
                }).then(res=>{
                    console.log(res,456)
                    let temp = res.data.data;
                    temp.forEach(item=>{
                        this.locaArr.push(item.location)
                    })
                })
                console.log(this.locaArr,112233)
        },

      async getHotelsList() {
      let res = await this.$axios({ url: "/hotels?&city=74", });
      this.hotelsList = res.data.data;
      this.dataList = [...this.hotelsList];
      this.cacheHotelList = [...res.data.data];
      this.totalPage = this.hotelsList.length
      // console.log(this.hotelsList);
    },
   },
   mounted() {
   this.getHotelsList();
   this.showDataList();
   this.showMap()
  }
}
</script>
 
<style lang='less' scoped>
.hotel{
   width:1000px;
   margin:20px auto;
   .hotel-search{
      margin:20px 0;
   }
   .totalArea{
      display: flex;
      width: 100%;
      .area{
         margin-top:20px;
         width: 580px;
      }
      .gaodeMap{
         flex:1;
         height:260px;
      }
   }   
   .hotelFilter{
      margin-top:15px;
      height:80px;
   }
   .specHotel{
      margin-top:20px;
   }
   .paginationBox{
      margin-top:20px;
   } 
};
</style>