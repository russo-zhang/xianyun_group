<template>
    <div class="filter">
        <ul>
            <li>
                <p>价格   <span class="fr">0-{{value1}}</span></p>
                 <el-slider v-model="value1" :max="maxNum" @change="sliderHandle"></el-slider>
            </li>
            <li>
                 <p>住宿等级</p>
                 <el-select v-model="value2" multiple placeholder="不限" size="small" border="false" @change="levelChangeHandle">
                    <el-option
                    collapse-tags
                    v-for="item in options1"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </li>
            <li>
                 <p>住宿类型</p>
                 <el-select v-model="value3" multiple placeholder="不限" size="small"
                 @change="typeChangeHandle">
                    <el-option
                    v-for="item in options2"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </li>
            <li>
                 <p>酒店设施</p>
                 <el-select v-model="value4" multiple placeholder="不限" size="small"
                 @change="assetsChangeHandle">
                    <el-option
                    v-for="item in options3"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </li>
            <li>
                 <p>酒店品牌</p>
                 <el-select v-model="value5" multiple placeholder="不限" size="small">
                    <el-option
                    v-for="item in options4"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Array,
            default:[]
        }
    },
   data() {
       return{
           value1:0,
           value2:'',
           value3:'',
           value4:'',
           value5:'',
           options1:[],
           options2:[],
           options3:[],
           options4:[],
           maxNum:4000
       }
   },
   methods:{
    //    滑块参数改变的时候触发
       sliderHandle(value){
           let arr = []
           if(value === 0){
               arr = this.data
               this.$emit("setNewDataList",arr)
               return
           }
           arr = this.data.filter( v=>{
               return v.price <= value
           })
           this.$emit("setNewDataList",arr)
       },
    //    选择住宿等级的时候触发
       levelChangeHandle(value){
           let arr = []
           if(value.length === 0){
               arr = this.data
               this.$emit("setNewDataList",arr)
               return
           } 
            this.data.forEach( item =>{
                if(item.hotellevel){
                    for(var i=0;i<value.length;i++){
                        if(item.hotellevel.id === value[i]){
                            arr.push(item)
                        }
                    }
                }
            })

           this.$emit("setNewDataList",arr)
       },
    //    选择住宿类型的时候触发
        typeChangeHandle(value){
            let arr = []
           if(value.length === 0){
               arr = this.data
               this.$emit("setNewDataList",arr)
               return
           } 
            this.data.forEach( item =>{
                if(item.hoteltype){
                    for(var i=0;i<value.length;i++){
                        if(item.hoteltype.id === value[i]){
                            arr.push(item)
                        }
                    }
                }
            })

           this.$emit("setNewDataList",arr)
        },
        // 选择酒店设施的时候触发
        assetsChangeHandle(value){
            let arr = []
           if(value.length === 0){
               arr = this.data
               this.$emit("setNewDataList",arr)
               return
           } 
            this.data.forEach( item =>{
                if(item.hotelassets){
                    for(var i=0;i<value.length;i++){
                        if(item.hotelassets.id === value[i]){
                            arr.push(item)
                        }
                    }
                }
            })

           this.$emit("setNewDataList",arr)
        }
   },
   mounted() {
        this.$axios({
            url:'/hotels/options',
        }).then(res=>{
            console.log(res,789)
            this.options1 = res.data.data.levels
            this.options2 = res.data.data.types
            this.options3 = res.data.data.assets
            this.options4 = res.data.data.brands
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
