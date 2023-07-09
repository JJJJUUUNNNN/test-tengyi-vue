<template>
  <div class="index">
    <div id="container">
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {useMapStore} from '../store/modules/map'

let map, markerLayer,editor;

const mapStore = useMapStore()

const emit=defineEmits(['saveDraw'])

const position=ref([
      { 
        longitude: 0,//经度
        latitude:0,//纬度
        city:''
      }
    ] )

function initMap() {
      console.log('init')
      //定义地图中心点坐标
      var center = new TMap.LatLng(39.984120, 116.307484)
      //定义map变量，调用 TMap.Map() 构造函数创建地图
       map = new TMap.Map(document.getElementById('container'), {
          center: center,//设置地图中心点坐标
          zoom: 17.2,   //设置地图缩放级别
          pitch: 43.5,  //设置俯仰角
          rotation: 45,    //设置地图旋转角度
          viewMode:'3D',
      });

       markerLayer = new TMap.MultiMarker({
          map: map,  //指定地图容器
          styles: {
            //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
            myStyle: new TMap.MarkerStyle({ 
              width: 25,  // 点标记样式宽度（像素）
              height: 35, // 点标记样式高度（像素）
              anchor: { x: 16, y: 32 }  
            }) 
          },
            //点标记数据数组
            geometries: [{
              id: "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
              styleId: 'myStyle',  //指定样式id
              position: new TMap.LatLng(39.954104, 116.357503),  //点标记坐标位置
              properties: {//自定义属性
              title: "marker1"
            }
          }, {//第二个点标记
              id: "2",
              styleId: 'marker',
              position: new TMap.LatLng(39.994104, 116.307503),
              properties: {
                title: "marker2"
              }
          }
        ]
      });

      // 初始化几何图形及编辑器
      editor = new TMap.tools.GeometryEditor({
          map, 
          overlayList: [ 
              {
                  id: 'polygon133',
                  overlay: new TMap.MultiPolygon({
                      map
                  }),
              }
          ],
          actionMode: TMap.tools.constants.EDITOR_ACTION.DRAW, //编辑器的工作模式
          snappable: true // 开启邻近吸附
      });

      // 监听绘制结束事件，获取绘制几何图形
      editor.on('draw_complete', (geometry) => {
        mapStore.addPosition(geometry.paths)
        console.log('几何坐标:',geometry.paths,mapStore.position);
        emit('saveDraw',geometry.paths)
      });

      handleClick()
}

function handleClick(){
  map.addListener('click', function (event) {
    let id=markerLayer.geometries.length
    id++
    markerLayer.add([{
      id:`${id}`,
      styleId:'myStyle',
      position:new TMap.LatLng(event.latLng.lat, event.latLng.lng),
      properties: {
        title: "marker2"
      }
    }])
  })
}

onMounted(() => {
  initMap()
})

defineExpose({
  getMarkerLayer(){
    return markerLayer
  },
  getMap(){
    return map
  }
})
</script>

<style>
#container{
    width: 100%;
    height: 100%;
    position: absolute;
}


</style>