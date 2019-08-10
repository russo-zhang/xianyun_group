<template>
  <div class="header">
    <el-container>
      <el-main>
        <div class="psp">
          <span>发表新攻略</span>
          <i v-if="false">
            <p>草稿箱 {{( draftNum )||""}}</p>
          </i>
          <h6>分享你的个人游记 , 让更多人看到哦 !</h6>
          <el-input v-model="article.title" placeholder="请输入标题"></el-input>
        </div>
        <section class="container">
          <div
            class="quill-editor"
            :content="article.content"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
        </section>
        <div class="select-city">
          <div>
            <span>选择城市</span>
            <el-autocomplete
              v-model="cityName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入游玩城市"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
        </div>
        <el-row>
          <el-button type="text" @click="publish">发布</el-button>
          <span>或者</span>
          <el-link type="warning" @click="saveToDraft">保存到草稿</el-link>
        </el-row>
      </el-main>

      <el-aside width="200px">
        <div class="draft">
          <p>
            草稿箱
            <span>({{draftNum}})</span>
          </p>
          <div
            class="content"
            v-for="(item,index) in draftList"
            :key="index"
            @click="showDraft(item)"
            @dblclick="delDraft(index)"
            @dblclick.stop="showDraft"
          >
            {{item.title}}
            <i class="el-icon-edit" v-if="item.title"></i>
            <br />
            <em>{{item.time}}</em>
          </div>
        </div>
      </el-aside>
    </el-container>
    <input type="hidden" :value="getDraftList" />
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      article: {
        title: "",
        content: "",
        city: "",
      },
      cityName:"",
      draftList: [
        {
          title: "",
          content: "",
          city: "",
          time: "",
          cityName: ""
        }
      ],
      draftNum: 0,
      timer: "",
      timeout: null,
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: 1 }, { header: 2 }],
            ["image", "video"]
          ]
        }
      }
    };
  },
  mounted() {
    // console.log("app init, my quill insrance object is:", this.myQuillEditor);
    setTimeout(() => {
      this.content = "";
    }, 3000);
  },
  computed: {
    getDraftList() {
      // this.draftList = [...this.$store.state.post.draftList];
      this.draftList = JSON.parse(
        JSON.stringify(this.$store.state.post.draftList)
      );
      this.draftNum = this.draftList.length;
    }
  },
  methods: {
    // 查找城市
    async querySearchAsync(queryString, callback) {
      if (!queryString) return;
      let res = await this.$axios({
        url: "/airs/city",
        params: { name: queryString }
      });
      // console.log(res)
      if (res.data.data.length === 0)
        return this.$message.warning("查找不到这个城市");
      let arr = res.data.data.map((item, index) => {
        // item.value = item.name.replace("市", "");
        item.value = item.name;
        return item;
      });
      // this.city = res.data.data[0].name;
      // this.article.city=res.data.data[0].id
      // callback(res.data.data);
      callback(arr);
    },

    // 发布文章
    async publish() {
      for (var key in this.article) {
       if( this.article[key] == "") {
         
         return this.$message.error(key+" can not be empty");
       }
      }
      console.log(this.article)
      let res = await this.$axios({
        url: "/posts",
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.$store.state.users.userInfo.token
        },
        data: this.article
      });
      // console.log(res);
      if (res.data.status != 0)
        return this.$message.error("文章新增失败,请稍后重试");
      this.$message.success(res.data.message);
      // 清空文章内容
      for (var key in this.article) {
        this.article[key] = "";
      }
      this.city = "";
    },

    //保存到草稿
    saveToDraft() {
      for (var key in this.article) {
       if( this.article[key] == "") return this.$message.error(key+"不能为空");;
      }
      let article = JSON.parse(JSON.stringify(this.article));
      let time = moment().format("YYYY-MM-DD");
      article.time = time;
      this.draftList.push(article);
      this.draftNum = this.draftList.length;
      let draftList = JSON.parse(JSON.stringify(this.draftList));
      this.$store.commit("post/setDraftList", draftList);
      for (var key in this.article) {
        this.article[key] = "";
      }
    },

    //显示草稿
    showDraft(draft) {
      this.article = draft;
    },
    //删除草稿
    delDraft(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.draftList.splice(index, 1);
          this.$store.commit("post/setDraftList", this.draftList);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelect(value) {
      this.article.city = value.id;
    },
    onEditorBlur(editor) {
      // console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      // console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      // console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      // console.log("editor change!", editor, html, text);
      this.article.content = html;
    }
  }
};
</script>

<style scoped lang="less">
.header {
  width: 1000px;
  margin: 20px auto;
  // padding: 20px 0;
  // height: 1000px;
}
.el-aside {
  .draft {
    padding: 15px;
    border: 1px solid #ccc;
    p {
      font-size: 16px;
    }
    .content {
      margin: 10px 0;
      cursor: pointer;
      em {
        font-size: 12px;
        color: #b5a8a0;
      }
    }
  }
}
.psp span {
  font-size: 22px;
}
.psp i {
  float: right;
  border: solid 1px gray;
  width: 200px;
  height: 50px;
}
.psp i p {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 16px;
  color: gray;
}
.psp h6 {
  font-weight: 300;
  color: gray;
  margin-top: 10px;
  font-size: 12px;
}
.el-input {
  margin-bottom: 20px;
  width: 735px;
  padding-top: 10px;
}
.select-city {
  height: 40px;
  width: 300px;
  margin-top: 20px;
  p {
    float: left;
    span {
      color: gray;
    }
    .el-autocomplete {
      width: 200px;
      margin-left: 10px;
    }
  }
}
.container {
  width: 734px;

  .quill-editor {
    min-height: 440px;
    max-height: 400px;
    overflow-y: auto;
  }
}
.el-row {
  .el-button {
    width: 55px;
    height: 40px;
    background-color: #03f4e8;
    color: aliceblue;
    margin-top: 20px;
  }
  span {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
