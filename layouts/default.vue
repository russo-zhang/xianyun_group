<template>
  <div class="container">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>
 
<script>
import Header from "@/components/header"
import Footer from "@/components/footer"

export default {
  components:{
    Header,
    Footer
  }
};
</script>
 
<style>
*{
  margin: 0;
  padding: 0;
  font-size:14px;
}
ul,ol{
  list-style: none;
}
a{
  color: inherit;
  text-decoration: none;
}
em,i{
  font-style: normal;
}
.fl{
  float: left;
}
.fr{
  float:right;
}
.clearfix::after{
  content:".";
  display:block;
  clear:both;
  visibility: hidden;
  height: 0;
  line-height: 0;
}
.clearfix{
  *zoom:1;
}
</style>