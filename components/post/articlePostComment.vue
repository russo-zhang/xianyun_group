<template>
  <div class="post">
    <div class="title">
      <span>评论</span>
    </div>
    <div v-if="defaultReply.id !='' ">
      <el-tag
        @close="delReply"
        :key="defaultReply.id"
        closable
        style="margin-bottom:10px"
      >回复: @{{defaultReply.account.nickname}}</el-tag>
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
  props: {
    reply: {
      type: Object,
      default: {
        id: "",
        account: {
          nickname: ""
        }
      }
    }
  },
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
        post: 0,
        follow: null
      },
      list: [],
      //默认回复对象数据
      defaultReply: {
        account: {
          nickname: ""
        },
        id: ""
      }
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
    // 评论
    btn() {
      console.log(this.content);
      this.$axios({
        url: "/comments",
        method: "post",
        data: {
          content: this.content.content,
          pics: this.content.pics,
          post: this.$route.query.id,
          follow: this.content.follow
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
    },
    // 清空回复
    delReply() {
      this.defaultReply.id = "";
      this.content.follow = null;
    }
  },
  mounted() {
    let obj = JSON.parse(localStorage.store);
    this.token = obj.users.userInfo.token;
  },
  watch: {
    // 监听回复对象
    reply() {
      this.defaultReply = this.reply;
      this.content.follow = this.defaultReply.id;
    }
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
