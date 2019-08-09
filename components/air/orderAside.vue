<template>
  <div>
    <div class="bill">
      <div class="mainText">
        <div class="firstRow clearfix">
          <span class>{{flightInfo.dep_date}}</span>
          <span class="fr">{{flightInfo.org_city_name}} - {{flightInfo.dst_city_name}}</span>
        </div>
        <div class="flightInfo">
          <div class="depart fl">
            <p>{{flightInfo.dep_time}}</p>
            <em>{{flightInfo.org_airport_name}} {{flightInfo.org_airport_quay}}</em>
          </div>
          <div class="right fr">
            <div class="during fl">
              <div>
                <em>--- {{duration}} ---</em>
              </div>
              <em>{{flightInfo.org_airport_name}} {{flightInfo.org_airport_quay}}</em>
            </div>
            <div class="dest fr">
              <p>{{flightInfo.arr_time}}</p>
              <em>{{flightInfo.dst_airport_name}} {{flightInfo.dst_airport_quay}}</em>
            </div>
          </div>
        </div>
      </div>
      <ul class="tableHead clearfix">
        <li>订单总价</li>
        <li>
          <span class="fl">金额</span>
          <i class="fr">数量</i>
        </li>
      </ul>
      <ul class="ticket clearfix">
        <li>成人机票</li>
        <li>
          <span class="fl">¥ {{flightInfo.seat_infos.org_settle_price}}</span>
          <i class="fr">x1</i>
        </li>
      </ul>
      <ul class="extra clearfix">
        <li>机建+燃油</li>
        <li>
          <span class="fl">¥{{flightInfo.airport_tax_audlet}}/人/单程</span>
          <i class="fr">x1</i>
        </li>
      </ul>
      <ul class="total clearfix">
        <li class="priceName">应付总额:</li>
        <li class="fr price">¥{{total}}</li>
      </ul>
    </div>
    <input type="hidden" :value="getDuration" />
    <input type="hidden" :value="getTotal" />
  </div>
</template>
 
<script>
export default {
  props: {
    flightInfo: {
      type: Object,
      default: {
        seat_infos: {}
      }
    },
    insurancesInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      total: 0,
      duration: ""
    };
  },
  methods: {},
  computed: {
    // 计算飞行用时
    getDuration() {
      if (!this.flightInfo.dep_time) return;
      let dep_time_arr = this.flightInfo.dep_time.split(":");
      let arr_time_arr = this.flightInfo.arr_time.split(":");
      if (arr_time_arr[0] * 1 < dep_time_arr[0] * 1) {
        arr_time_arr[0] = arr_time_arr[0] * 1 + 24;
      }
      arr_time_arr[0] * 1 < dep_time_arr[0] * 1
        ? (arr_time_arr[0] = arr_time_arr[0] * 1 + 24)
        : 0;
      let durationMin =
        arr_time_arr[0] * 60 +
        arr_time_arr[1] * 1 -
        (dep_time_arr[0] * 60 + dep_time_arr[1] * 1);
      let hours = Math.floor(durationMin / 60);
      let minutes = durationMin % 60;
      this.duration = hours + "小时" + minutes + "分钟";
    },

    getTotal() {
      let seat_price = this.flightInfo.seat_infos.org_settle_price;
      let tax = this.flightInfo.airport_tax_audlet;
      let insure = this.insurancesInfo.insurancesTotal;
      let person = this.insurancesInfo.insurancesCount;
      this.total = (seat_price + tax + insure) * person;
    }
  },
  mounted() {
   
  }
};
</script>
 
<style lang='less' scoped>
.bill {
  margin-top: 30px;
  border: 1px solid #ccc;
  padding: 15px 0 0;
  .mainText {
    height: 100px;
    padding: 0 15px;
    .flightInfo {
      margin-top: 10px;
      .depart {
        text-align: center;
      }
      .right {
        text-align: center;
        width: 63%;
        .during {
          margin-top: 8px;
        }
      }
    }
    p {
      font-size: 26px;
    }
    em {
      color: #ccc;
      font-size: 12px;
    }
  }
  ul {
    padding: 10px 15px;
    border-top: 1px dashed #ddd;
    :first-child {
      float: left;
    }
    li:last-child {
      width: 60%;
      float: right;
    }
    .priceName {
      line-height: 47px;
    }
    .price {
      text-align: right;
      color: #fea410;
      font: 400 36px microsoft yahei;
    }
  }
}
</style>