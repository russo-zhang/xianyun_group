<template>
    <div class="areaStraPr">
        <!-- 区域 -->
        <div class="Area">
            <el-row :gutter="10">
                <el-col :span="3"><span>区域：</span></el-col>
                <el-col :span="20">
                    <div class="speciArea" :class="{active:hideFlg==true}">
                        <nuxt-link to="#">全部</nuxt-link>
                        <nuxt-link to="#" v-for="(item,index) in scenics" :key='index'>{{item.name}}</nuxt-link>
                    </div>
                    <span @click="showAllPalce" class="showAllPalce">
                        <i class="el-icon-d-arrow-left"></i>
                        等43个区域
                    </span>
                </el-col>
            </el-row>
        </div>

        <!-- 攻略 -->
        <div class="strategy">
            <el-row :gutter="10">
                <el-col :span="3"><span>攻略：</span></el-col>
                <el-col :span="20">
                    <p>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</p>
                </el-col>
            </el-row>
        </div>

        <!-- 均价 -->
        <div class="avePrice">
            <el-row :gutter="10">
                <el-col :span="4"><span style="marginRight:17px" >均价</span>
                    <span>：</span>
                    <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算的出，节假日会有上浮"         placement="top-start">
                        <span class="question">?</span>
                    </el-tooltip>
                </el-col>
                <el-col :span="6">
                    <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算的出，节假日会有上浮"         placement="top-start">
                        <span>
                            <i class="el-icon-check"></i>
                            <i class="el-icon-check"></i>
                            <i class="el-icon-check"></i>
                            <i>￥332</i>
                        </span>
                    </el-tooltip>
                </el-col>
                <el-col :span="6">
                    <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算的出，节假日会有上浮"         placement="top-start">
                    <span>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i>￥521</i>
                    </span>
                    </el-tooltip>
                </el-col>
                <el-col :span="6">
                    <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算的出，节假日会有上浮"         placement="top-start">
                    <span>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i>￥762</i>
                    </span>
                    </el-tooltip>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Number,
            default:74
        }
    },
    data() {
        return {
            hideFlg:false,
            cityName:"南京",
            scenics:[],      //风景区
            hotelLocation:[]
        }
    },
    methods:{
        showAllPalce(){
            this.hideFlg = !this.hideFlg
        }
    },
    mounted() {
        this.$axios({
            url:'/cities?name=' + this.cityName
        }).then(res=>{
            console.log(res,123)
            this.scenics = res.data.data[0].scenics
            // console.log(this.scenics)
        })

       
    }

}
</script>

<style lang="less" scoped>
.Area{
    height: auto;
    .speciArea{
        height: 40px;
        font-size: 14px;
        overflow: hidden;
        color:#666;
        a{
            margin-right:10px;
            &:hover{
                border-bottom:1px solid blue;
                color:blue;
            }
        }
    }
    .active{
        height:auto;
    }
    .showAllPalce{
        color:#666;
        cursor: pointer;
    }
    i{
        transform:rotateZ(90deg);
        color:orange;
    }
}
.strategy{
    margin-top:20px;
    p{
        font-size: 14px;
        color:#666;
        height: auto;
    }
}
.avePrice{
    margin-top:20px;
    position: relative;
    .question{
        display: block;
        position: absolute;
        top:0px;
        left:35px;
        width:15px;
        height: 15px;
        text-align: center;
        background-color: #ccc;
        color:white;
        border-radius: 7.5px;
    }
}
</style>
