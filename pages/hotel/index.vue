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
            <HotelMap/>
         </div>
      </div>  

      <!-- 酒店过滤部分 -->
      <div class="hotelFilter">
         <HotelFilter/>
      </div>

      <!-- 酒店部分 -->
      <div class="specHotel">
         <HotelSpec/>
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
import HotelSpec from '@/components/hotel/hotelSpec'
export default {
   data() {
      return{
         pageNum:1,   //当前页面
         pageSize:4,    //页面容量
         totalPage:0,      //总页面
         selectCityId:74      //城市id,默认是南京
      }
   },
   components:{
      HotelSearch,
      HotelArea,
      HotelFilter,
      HotelMap,
      HotelSpec
   },
   methods:{
      // 页面容量改变时触发
      handleSizeChange(value){

      },
      // 当前页面改变时触发
      handleCurrentChange(value){

      }
      //用来传递备选中的城市id
      // passSelectId(id){
      //    this.selectCityId = id
      // }

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
}
</style>