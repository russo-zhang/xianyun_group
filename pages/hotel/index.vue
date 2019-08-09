<template>
  <div class="main">
    <p>酒店</p>
    <HotelsList v-for="(item,index) in hotelsList" :key="index" :data="item" />
  </div>
</template>

<script>
import HotelsList from "@/components/hotel/hotelsList";
export default {
  data() {
    return {
      hotelsList: [],
    };
  },
  methods: {
    async getHotelsList() {
      let res = await this.$axios({ url: "/hotels?&city=74", });
      this.hotelsList = res.data.data;
      // console.log(this.hotelsList);
    },

  },
  components: {
    HotelsList
  },

  mounted() {
    this.getHotelsList();

  }
};
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;
}
</style>