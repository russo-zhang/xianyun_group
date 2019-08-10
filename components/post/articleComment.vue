<template>
  <div class="comment">
    <div class="commentList">
      <div style="padding-bottom:5px">
        <p>
          <span style="font-size:14px">{{list[0].account.nickname || 0}}</span>
          <span style="color:#ccc;font-size:14px">{{list[0].created_at}}</span>
          <span style="float:right">{{list[0].level}}</span>
        </p>
      </div>
      <p>{{list[0].content}}</p>
      <div v-if="list[0].pics.length >0">
        <img
          style="width:20%;margin:10px 10px 0 0"
          v-for="(item,index) in list[0].pics"
          :key="index"
          :src="'http://127.0.0.1:1337'+item.url"
          alt
        />
      </div>
      <el-button @click="reply(list[0])" style="margin-left:80%;padding:0" type="text">回复</el-button>
    </div>
    <div class="sets" v-if="list[0].hasOwnProperty('parent')">
      <sets
        style="background:#eee;"
        v-for="(item,index) in list"
        :key="index"
        :list="[item.parent]"
      />
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  name: "sets",
  props: {
    list: {
      type: Array,
      default: []
    }
    // 回复对象信息
  },
  data() {
    return {};
  },
  methods: {
    reply(data) {
      this.$emit("getReply", data);
    }
  },
  mounted() {
    this.list[0].created_at = Moment(this.list[0].created_at).format(
      "YYYY-MM-DD  HH:mm"
    );
  },
  watch: {
    list() {
      this.list[0].created_at = Moment(this.list[0].created_at).format(
        "YYYY-MM-DD  HH:mm"
      );
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.sets {
  margin-top: 10px;
}
</style>


