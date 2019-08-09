<template>
    <div class="filter">
        <ul>
            <li>
                <p>价格   <span class="fr">0-{{value1}}</span></p>
                 <el-slider v-model="value1" :max="maxNum"></el-slider>
            </li>
            <li>
                 <p>住宿等级</p>
                 <el-select v-model="value2" multiple placeholder="不限" size="small" border="false">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                 <p>住宿类型</p>
                 <el-select v-model="value2" multiple placeholder="不限" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                 <p>酒店设施</p>
                 <el-select v-model="value2" multiple placeholder="不限" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                 <p>酒店品牌</p>
                 <el-select v-model="value2" multiple placeholder="不限" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
   data() {
       return{
           value1:0,
           value2:'',
           options:[],
           maxNum:4000
       }
   },
   mounted() {
        this.$axios({
            url:'/hotels/options',
        }).then(res=>{
            console.log(res,789)
        })
    }
}
</script>

<style lang="less" scoped>
.filter{
    height: 100%;
    ul{
        box-sizing: border-box;
        height: 100%;
        padding:2px 0;
        display: flex;
        border:1px solid #ccc;
        li{
            flex:1;
            padding:5px 15px;
            border-right:1px solid #ccc;
            &:nth-child(5){
                border-right:none;
            }
            p{
                margin-top:5px;
                margin-bottom:3px;
            }
            /deep/el-select{
                border:none;
            }
        }
        
    }
}
</style>
