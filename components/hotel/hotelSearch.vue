<template>
    <div class="hotelSearch">
        <!-- 远程搜索部分 -->
        <el-autocomplete
            v-model="value"
            :fetch-suggestions="querySearchAsync"
            placeholder="目的地"
            @select="handleSelect"
            style="marginRight:10px"
        ></el-autocomplete>

        <!-- 日期选择 -->
         <el-date-picker
            v-model="value2"
            type="daterange"
            range-separator="-"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
            style="width:350px;marginRight:10px">
        </el-date-picker>

        <!-- 选择人数 -->
        <el-input 
            v-model="value3" 
            placeholder="人数未定" 
            suffix-icon="el-icon-info" 
            style="width:210px;marginRight:10px"
            readonly="readonly"
            @focus="showPeople=true" 
            >
        </el-input>  
        <!-- 隐藏按钮 -->
        <div class="personNum" v-show="showPeople">
            <span style="margin: 0px 20px">每间</span>
            <el-select v-model="value4" clearable placeholder="成人" @change="adultHandle" style="width:95px;marginRight:10px">
                <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value5" clearable placeholder="儿童" style="width:95px">
                <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <div class="buttonBox">
                <el-button type="primary" class="fr" style="marginTop:20px" @click="confirmPeople">确定</el-button>
            </div>
        </div>

        <!-- 查看价格 -->
        <el-button type="primary" style="width:100px">查看价格</el-button>


    </div>
</template>

<script>
export default {
    data() {
        return {
            options:[],
            loading:false,
            value:'',
            value2:'',
            value3:'',
            value4:'',
            value5:'',
            option1:[
                {
                value: '1 成人',
                label: '1 成人'
                }, {
                value: '2 成人',
                label: '2 成人'
                }, {
                value: '3 成人',
                label: '3 成人'
                }, {
                value: '4 成人',
                label: '4 成人'
                }, {
                value: '5 成人',
                label: '5 成人'
                }, {
                value: '6 成人',
                label: '6 成人'
                }, {
                value: '7 成人',
                label: '7 成人'
                }
            ],
            option2:[
                {
                value: '1 成人',
                label: '1 儿童'
                }, {
                value: '2 成人',
                label: '2 儿童'
                }, {
                value: '3 成人',
                label: '3 儿童'
                }, {
                value: '4 成人',
                label: '4 儿童'
                }, {
                value: '5 成人',
                label: '5 儿童'
                }, {
                value: '6 成人',
                label: '6 儿童'
                }, {
                value: '7 成人',
                label: '7 儿童'
                }
            ],
            showPeople:false,
            cityId:0       //选择的城市ID
            
        }
    },
    methods:{
        // 输入值发生变化时调用
        async querySearchAsync(queryString,callback){
            if(!queryString) 
            {
                callback([])
                return;
            }
            let res = await this.$axios({
                url:'/cities',
                params:{name:queryString}
            })
            // console.log(res)
            if(res.data.data.length === 0){
                return this.$message.warning("查不到这个城市");
            }
            let arr = res.data.data.map((item,index) =>{
                item.value = item.name;
                return item;
            })
            callback(arr)
        },
        // 选择某项时调用
        handleSelect(value){
            // console.log(value)
            // this.cityId = value.id
            // this.$emit('passSelectId',this.cityId)
        },
        adultHandle(value){
            console.log(value)
            this.value4 = value
        },
        confirmPeople(){
            this.value3 = this.value4 + " " + this.value5;
            this.showPeople = false
        }

    }
}
</script>

<style scoped lang="less">
.hotelSearch{
    position: relative;
    .personNum{
        width: 326px;
        height: 123px;
        background-color:white;
        padding:10px 5px;
        // border:1px solid #333;
        box-shadow: 0 0 4px #ccc;
        border-radius: 5px;
        position: absolute;
        top:50px;
        right:120px;
        z-index:20;
        .buttonBox{
            margin-top:20px;
            border-top:1px solid #ccc;
        }
    }
}

</style>
