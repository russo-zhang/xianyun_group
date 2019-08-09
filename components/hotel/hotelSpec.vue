<template>
    <div class="spechotel">
        <div class="single">
            <el-row :gutter="20">
                <el-col :span="8">
                    <img src="https://p0.meituan.net/tdchotel/60c7315f74dbc101b3024e079ec835df239953.png%40700w_700h_0e_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20" alt="南京大吉温泉度假村" >
                </el-col>
                <el-col :span="10">
                    <h3>南京大吉温泉度假村</h3>
                    <p>nan jing da ji wen quan du jia cun 
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        高档型
                    </p>
                    <div class="detail">
                        <el-rate
                            v-model="value1"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                            style="width:140px">
                        </el-rate>
                        <span><i>62</i>条评价</span>
                        <span><i>88</i>篇游记</span>
                    </div>
                    <span class="location"> <i class="el-icon-location"></i>
                    位于: 汤泉镇汤泉出口右转200米 </span>
                </el-col>
                <el-col :span="6">
                    <ul>
                        <li>
                            <span>携程</span>
                            <span class="fr"><em>￥329</em>起  
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                        <li>
                            <span>艺龙</span>
                            <span class="fr"><em>￥329</em>起  
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                        <li>
                            <span>Hotels.com</span>
                            <span class="fr"><em>￥393</em>起  
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>

        <div class="single">
            <el-row :gutter="20">
                <el-col :span="8">
                    <img src="https://p1.meituan.net/tdchotel/f9fb7d02c94358816b5f91818e5cd108379384.png%40700w_700h_0e_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20" alt="南京大吉温泉度假村" >
                </el-col>
                <el-col :span="10">
                    <h3>南京大吉温泉度假村</h3>
                    <p>nan jing da ji wen quan du jia cun 
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        <i class="el-icon-check"></i>
                        高档型
                    </p>
                    <div class="detail">
                        <el-rate
                            v-model="value1"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                            style="width:140px">
                        </el-rate>
                        <span><i>62</i>条评价</span>
                        <span><i>88</i>篇游记</span>
                    </div>
                    <span class="location"> <i class="el-icon-location"></i>
                    位于: 汤泉镇汤泉出口右转200米 </span>
                </el-col>
                <el-col :span="6">
                    <ul>
                        <li>
                            <span>携程</span>
                            <span class="fr"><em>￥329</em>起  
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                        <li>
                            <span>艺龙</span>
                            <span class="fr"><em>￥329</em>起  
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                        <li>
                            <span>Hotels.com</span>
                            <span class="fr"><em>￥393</em>起  
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value1:3.7,
            value:''
        }
    },
    
}
</script>

<style lang="less" scoped>
.spechotel{
    .single{
        margin-top:30px;
        padding-bottom: 30px;
        border-bottom:1px solid #ccc;
        img{
            display: block;
            width: 100%;
        }
        h3{
            font-size: 24px;
            font-weight: normal;
        }
        p{
            font-size: 16px;
            color:#999;
            margin-bottom:10px;
        }
        .detail{
            display: flex;
            margin-bottom:15px;
            span{
                margin-left:20px;
                font-size: 16px;
                i{
                    color:#ff9900;
                }
            }
        }
        .location{
            font-size: 14px;
            color:#666;
        }

        ul{
            margin-top:20px;
            li{
                font-size: 14px;
                padding: 12px 5px;
                color:#606266;
                border-bottom:1px solid #ccc;
                em{
                    color:#f90;
                }
            }
        }
    }
   
}
</style>
