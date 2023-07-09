<template>
  <div class="index">
    <div id="container"></div>
    {{ latLng }}
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';

let map, marker;

const props=defineProps({
    latLng:{
        type:Object,
            default:()=>{}
        }
    })

const initPosition=ref(
    { 
        longitude: 0,//经度
        latitude:0,//纬度
        city:''
    }
)

//定位获得当前位置信息
function getMyLocation() {
    var geolocation = new qq.maps.Geolocation("5JZBZ-BKDRG-Y3CQ2-QGSXX-KWRK2-P6BKP", "测试-腾亿");
    geolocation.getLocation(showPosition, showErr);
}

function showPosition(position) {
    console.log(position);
    initPosition.value.latitude = position.lat;
    initPosition.value.longitude = position.lng;
    initPosition.value.city = position.city;
    setMapData();
}

function showErr() {
    console.log("定位失败，请重试！");
    getMyLocation();
}


//位置信息在地图上展示
function setMapData() {
    var myLatlng = new qq.maps.LatLng(initPosition.value.latitude, initPosition.value.longitude);
    var myOptions = { 
        zoom: 16, 
        center: myLatlng, 
        mapTypeId: qq.maps.MapTypeId.ROADMAP  
    }
    //获取dom元素添加地图信息
    map = new qq.maps.Map(document.getElementById("container"), myOptions)

    //给定位的位置添加图片标注
    marker = new qq.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: true //允许鼠标拖动
    })
    mouseClick()
}

function mouseClick () {
    console.log('position:',props.latLng)
    qq.maps.event.addListener(map, 'click', function (event) {
        console.log('map-event:',event,event.latLng.q)
        if(!marker) {
            marker=new qq.maps.Marker({
            position: event.latLng,
            map:map
        })
            return
        }
        marker.setPosition(event.latLng) 
        initPosition.value.latitude = event.latLng.getLat();
        initPosition.value.longitude = event.latLng.getLng();
    })
}

onMounted(()=>{
    getMyLocation();
})
</script>

<style>
#container{
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>