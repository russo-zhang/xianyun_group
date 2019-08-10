<template>
  <div class="post">
    <div class="title">
      <span>评论</span>
    </div>
    <div class="areaText">
      <el-input
        style="margin-bottom:12px;"
        type="textarea"
        placeholder="请输入内容"
        v-model="content.content"
        maxlength="200"
        resize="none"
        show-word-limit
      ></el-input>
    </div>
    <div class="upload">
      <!--   :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"-->
      <el-upload
        ref="fites"
        :on-success="uploads"
        :on-error="error"
        :on-remove="remove"
        action="http://127.0.0.1:1337/upload"
        list-type="picture-card"
        name="files"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" />
      </el-dialog>
      <el-button style="margin:20px" @click="btn" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      token: "",
      dialogVisible: false,
      dialogImageUrl: "",
      // 发送评论
      content: {
        content: "",
        pics: [],
        post: 0
      },
      list: []
    };
  },
  methods: {
    uploads(response, file, fileList) {
      this.content.pics.push(response[0]);
    },
    remove(file, fileList) {
      this.content.pics.forEach((item, index) => {
        if (item.name === file.response[0].name) {
          this.content.pics.splice(index, 1);
        }
      });
    },
    btn() {
      this.$axios({
        url: "/comments",
        method: "post",
        data: {
          content: this.content.content,
          pics: this.content.pics,
          post: this.$route.query.id
        },
        headers: { Authorization: `Bearer ${this.token}` }
      }).then(res => {
        this.$message.success("评论成功");
        this.content.content = "";
        this.content.pics = [];
        // this.$forceUpdate()
        this.$refs.fites.clearFiles();

        this.$axios({
          url: "/posts/comments",
          params: {
            post: this.$route.query.id,
            _limit: 2,
            _start: 0
          }
        }).then(res => {
          this.list = res.data.data;
          this.total = res.data.total;
          this.$emit("getList", this.list);
        });
      });
    },
    error(err, file, fileList) {
      console.log(err, file, fileList);
    }
  },
  mounted() {
    let obj = JSON.parse(localStorage.store);
    this.token = obj.users.userInfo.token;
  }
};
</script>


<style lang="less" scoped>
.post {
  .title {
    font-size: 18px;
    margin-bottom: 25px;
  }
}
</style>
