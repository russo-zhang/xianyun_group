<template>
  <div>
    <!-- 乘机人 -->
    <div class="title">乘机人</div>
    <div class="passenger">
      <div class="passengerForm" v-for="(item,index) in passInfo.users" :key="index">
        <p>乘机人类型</p>
        <el-input placeholder="姓名" v-model="item.username" class="input-with-select">
          <el-select slot="prepend" placeholder="成人" value="1">
            <el-option label="成人" value="1"></el-option>
            <el-option label="未成年人" value="2"></el-option>
          </el-select>
        </el-input>
        <div>
          <span class="idType">证件类型</span>
          <i @click="deletePassenger(index)">-</i>
        </div>
        <el-input placeholder="证件号码" v-model="item.id" class="input-with-select">
          <el-select slot="prepend" placeholder="身份证" value="1">
            <el-option label="身份证" value="1"></el-option>
            <el-option label="护照" value="2"></el-option>
          </el-select>
        </el-input>
      </div>
    </div>

    <!-- 添加乘机人 -->
    <div class="addPassenger">
      <el-button type="success" @click="addPassenger">添加乘机人</el-button>
    </div>

    <!-- 保险 -->
    <div class="insure">
      <div class="title">保险</div>
      <el-row class="checkbox" v-for="(item,index) in insurancesArr" :key="index">
        <el-checkbox
          v-model="passInfo.insurances"
          :label="item.id"
          border
          @change="changInsurances($event,item.price)"
        >{{`${item.type}：¥ ${item.price}/份×${insurancesInfo.insurancesCount} 最高赔付${item.compensation}`}}</el-checkbox>
      </el-row>
    </div>

    <!-- 联系人 -->
    <div class="contact">
      <div class="title">联系人</div>
      <el-form ref="form" :model="passInfo" label-width="55px">
        <el-form-item label="姓名">
          <el-input v-model="passInfo.contactName"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input placeholder="请输入号码" v-model="passInfo.contactPhone" class="input-with-select">
            <el-button slot="append" @click="sendCaptcha">{{countDown||"发送验证码"}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="passInfo.captcha"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="submitOrder" class="submit">提交订单</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      passInfo: {
        users: [{ username: "tom", id: "123" }],
        insurances: [],
        contactName: "tom",
        contactPhone: "135000000",
        captcha: "000000",
        invoice: false,
        seat_xid: "",
        air: ""
      },
      flightInfo: {},
      insurancesArr: [],
      countDown: 0,
      insurancesInfo: {
        insurancesCount: 1,
        insurancesTotal: 0
      }
    };
  },
  methods: {
    // 添加乘机人
    addPassenger() {
      this.passInfo.users.push({ username: "", id: "" });
      this.insurancesInfo.insurancesCount = this.passInfo.users.length;
      this.$emit("emit");
    },
    // 删除乘机人
    deletePassenger(index) {
      this.passInfo.users.splice(index, 1);
      this.insurancesInfo.insurancesCount = this.passInfo.users.length;
    },

    //保险复选框
    changInsurances(value, price) {
      if (value) {
        this.insurancesInfo.insurancesTotal += price;
      } else {
        this.insurancesInfo.insurancesTotal -= price;
      }
    },

    // 发送验证码
    async sendCaptcha() {
      let i = 10;
      let timer = setInterval(() => {
        i--;
        this.countDown = i + "秒后可再次发送";
        if (i === 0) {
          clearInterval(timer);
          this.countDown = 0;
        }
      }, 200);
      let res = await this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.passInfo.contactPhone }
      });
      if (res.status !== 200)
        return this.$message.error("发送验证码失败,请稍后重试");
      this.$message.success("验证码为" + res.data.code);
    },

    // 提交订单
    async submitOrder() {
      let res = await this.$axios({
        url: "/airorders",
        headers: {
          Authorization: "Bearer " + this.$store.state.users.userInfo.token
        },
        method: "POST",
        data: this.passInfo
      });
      if (res.status != 200)
        return this.$message.error("订单提交失败,请稍后重试");
      // console.log(res);
      this.$message.success("订单提交成功");
      const { id } = res.data.data;
      this.$router.push({
        path: "/air/pay?id=" + id
      });
    }
  },
  watch: {
    insurancesInfo: {
      deep: true,
      handler() {
        return this.$emit("emitinsurancesInfo", this.insurancesInfo);
      }
    }
  },
  mounted() {
    // 获取座位信息
    let { air, seat_xid } = this.$route.query;
    this.passInfo.seat_xid = seat_xid;
    this.passInfo.air = air;
    this.$axios({
      url: `/airs/${air}`,
      params: { seat_xid }
    }).then(res => {
      this.insurancesArr = res.data.insurances;
      this.flightInfo = res.data;
      this.$emit("emitflightInfo", res.data);
    });
  }
};
</script>
 
<style lang='less' scoped>
.title {
  font: 600 26px simsun;
  margin-bottom: 30px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  margin-left: 60px;
}

.el-main {
  color: #333;
  .passenger {
    .passengerForm {
      position: relative;
      padding-bottom: 20px;
      p {
        margin: 10px 0;
        padding-top: 10px;
        border-top: 1px dashed#ededed;
      }
      .idType {
        display: inline-block;
        margin: 10px 0;
      }
      i {
        position: absolute;
        right: -20px;
        top: 82px;
        width: 14px;
        height: 14px;
        text-align: center;
        line-height: 14px;
        border-radius: 50%;
        color: white;
        background: #ccc;
        cursor: pointer;
      }

      /deep/.el-select .el-input {
        width: 130px;
      }
      /deep/.input-with-select .el-input-group__prepend {
        background-color: #fff;
      }
    }
    :first-child {
      p {
        border-top: none;
      }
      i {
        display: none;
      }
    }
  }

  .addPassenger {
    margin: 20px 0;
    padding: 20px 0;
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
  }
  .insure {
    .checkbox {
      margin-bottom: 20px;
    }
  }
  .contact {
    margin: 30px 0;
    padding: 20px 0;
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    /deep/.el-input {
      width: 265px;
    }
    .submit {
      margin-top: 30px;
      margin-left: 120px;
      width: 250px;
      height: 50px;
      text-align: center;
    }
  }
}
</style>