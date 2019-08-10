<template>
  <div class="header">
    <div class="psp">
      <span>发表新攻略</span>
      <i>
        <p>草稿箱 ( 0 )</p>
      </i>
      <h6>分享你的个人游记 , 让更多人看到哦 !</h6>
      <el-input v-model="input" placeholder="请输入标题"></el-input>
    </div>
    <section class="container">
      <div
        class="quill-editor"
        :content="content"
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
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入游玩城市"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
    </div>
    <el-row>
      <el-button type="text" @click="open">发布</el-button>
      <span>或者</span>
      <el-link type="warning">保存到草稿</el-link>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      restaurants: [],
      state: "",
      timeout: null,
      content: "<p>I am Example</p>",
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{header:1},{header:2}],
            ["image","video"]
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

    // this.$axios({
    //   url: "/post/create"
    // }).then(res => {
    //   if (res.stauts != 200) return;
    //   this.discount = res.data.data;
    //   this.discount[0].cover = this.discount[1].cover;
    // });
  },
  methods: {
    querySearchAsync() {},
    open() {
      this.$alert("这是一段内容", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    handleSelect() {},
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      console.log("editor change!", editor, html, text);
      this.content = html;
    }
  }
};
</script>

<style scoped lang="less">
.header {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  height: 1000px;
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
