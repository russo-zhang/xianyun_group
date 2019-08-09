<template>
    <div id="container"></div> 
</template>

<script>
export default {
    data(){
        return{
            locaArr:[]
        }
    },
    mounted() {
        window.onLoad  = function(){
            var map = new AMap.Map('container',{
                zoom:11,//级别
                center: [ 118.8718107, 31.32846821],//中心点坐标
                viewMode:'3D'//使用3D视图
            });
            // 创建一个 Marker 实例：
            var marker = new AMap.Marker({
                position: new AMap.LngLat( 118.8718107, 31.32846821),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '北京'
            });

            // 将创建的点标记添加到已有的地图实例：
            map.add(marker);
        }
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=c9aad5147e98df4b8974d9103d58d6d0&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
        this.showMap()
    },
    methods:{
        showMap(){
            this.$axios({
            url:'hotels?city=' + this.data
            }).then(res=>{
                console.log(res,456)
                let temp = res.data.data;
                temp.forEach(item=>{
                        this.locaArr.push(item.location)
                    })
            })
            console.log(this.locaArr,112233)

        }
        
    }

}
</script>

<style lang="less" scoped>
#container {
    width:100%;
    height:260px; 
}  
</style>
