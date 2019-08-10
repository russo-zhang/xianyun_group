<template>
    <div class="map">
        <div id="container"></div> 
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
    data(){
        return{
            signalArr:[],
            map:{},
            transArr:[]
        }
    },
    mounted() {
        window.onLoad = ()=>{
            var map = new AMap.Map("container", {
                zoom: 9, //级别
                center: [118.8718107, 31.32846821], //中心点坐标
                // center: [
                // this.hotelDetail.location.longitude,
                // this.hotelDetail.location.latitude
                // ],
                viewMode: "3D" //使用3D视图
            });

            // 创建一个 Marker 实例：
            var marker1 = new AMap.Marker({
                position: new AMap.LngLat(this.data[0].longitude, this.data[0].latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: "南京1"
            });
            var marker2 = new AMap.Marker({
                position: new AMap.LngLat(this.data[1].longitude, this.data[1].latitude),
                title: "南京2"
            });
            var marker3 = new AMap.Marker({
                position: new AMap.LngLat(this.data[2].longitude, this.data[2].latitude),
                title: "南京3"
            });
            var marker4 = new AMap.Marker({
                position: new AMap.LngLat(this.data[3].longitude, this.data[3].latitude),
                title: "南京4"
            });
            let markerList = [marker1, marker2, marker3,marker4];

            // 将创建的点标记添加到已有的地图实例：
            map.add(markerList);
        };
        var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=c9aad5147e98df4b8974d9103d58d6d0&callback=onLoad";
        var jsapi = document.createElement("script");
        jsapi.charset = "utf-8";
        jsapi.src = url;
        document.head.appendChild(jsapi);
    },  
    methods:{   
    }

}
</script>

<style lang="less" scoped>
#container {
    width:100%;
    height:260px; 
}  
</style>
