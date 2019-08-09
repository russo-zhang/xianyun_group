<template>
  <div>
    <el-container>
      <el-main>
        <OrderForm @emitflightInfo="emitflightInfo" @emitinsurancesInfo="emitinsurancesInfo"/>
      </el-main>
      <el-aside width="350px">
        <OrderAside :flightInfo="flightInfo" :insurancesInfo="insurancesInfo"/>
      </el-aside>
    </el-container>
  </div>
</template>
 
<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from "@/components/air/orderAside";
export default {
  data() {
    return {
      flightInfo:{seat_infos: {}},
      insurancesInfo:{
        insurancesTotal: 0,
        insurancesCount: 1
      }
    }
  },
  methods: {
    emitflightInfo(data){
      this.flightInfo=data
    },
    emitinsurancesInfo(insurancesInfo){
      this.insurancesInfo=insurancesInfo
    }
  },
  components: {
    OrderForm,
    OrderAside
  }
};
</script>
 
<style lang='less' scoped>
.el-container {
  width: 1000px;
  margin: 0 auto;
}
</style>