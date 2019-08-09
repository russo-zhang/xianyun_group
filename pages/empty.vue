<template>
  <div class="main">
    <div class="text">
      <p @click="back">你来到了一片荒无人烟的地方...</p>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>
 
<style lang='less' scoped>
.main {
  width: 100%;
  height: 1080px;
  background: url("http://img1.imgtn.bdimg.com/it/u=2910063554,1040593223&fm=26&gp=0.jpg");
  background-size: 100% 100%;
  background-repeat: repeat;
  .text {
    p {
      font-size: 100px;
      color: #333;
      margin: 0;
      cursor: pointer;
    }
  }
}
</style>