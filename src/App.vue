<template>
  <div class="app">
    <!-- <TestMap ref="mapRef" :latLng="currentLatLng"></TestMap> -->
    <Map ref="mapRef" @save-draw="saveDraw"></Map>
    <div class="list">
      <div class="nav">
        <div class="left" @click="showForm=false">查看网格</div>
        <div class="right" @click="showForm=true">添加网格</div>
      </div>
      <el-form
      class="form"
       v-if="showForm"
        label-width="100px"
        style="max-width: 460px"
        size="mini"
        label-position="top"
      >
        <el-form-item label="选择">
          <el-select  style="width: 100%;" v-model="type" class="m-2" placeholder="选择" size="small">
          <el-option
            label="城市"
            value="1"
          />
          <el-option
            label="农村"
            value="2"
          />
        </el-select>
        </el-form-item>
        <el-form-item label="网格名称">
          <el-input v-model="name" placeholder="请输入网格名称" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button class="button" size="small" type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-tree v-else class="tree" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    <Editor @update-color="updateColor"></Editor>
  </div>
</template>

<script setup>
// import TestMap from './components/TestMap.vue'
import Map from './components/Map.vue'
// import List from './components/list/index.vue'
import { ref,computed } from 'vue';
import Editor from './components/tool/Editor.vue';
import { useMapStore } from './store/modules/map';

let polygon,map

const mapStore=useMapStore()
const type=ref('城市')
const name=ref('')

const data = [
        {
          label: '文澜街道',
          children: [
            {
              label: '天马社区',
              latLng:{lat: 25.015578757666333, lng: 102.75014877319336},
              children: [
                {
                  label: '天马北片区',
                  children:[
                    {
                      label: '金星小区',
                      children:[
                        {
                          label:'金星小区1栋网格'
                        },
                        {
                          label:'金星小区2栋网格'
                        }
                      ]
                    },
                    {
                      label: '紫苑小区',
                      children:[
                      {
                        label: '紫苑小区1栋网格'
                      },
                      {
                        label: '紫苑小区2栋网格'
                      },
                      ]
                    },
                    {
                      label: '三义二社',
                      children:[
                        {
                          label:'测试网格1'
                        }
                      ]
                    }
                  ]
                },
              ],
            },
          ],
        },
        {
          label: '观澜街道',
          children: [
            {
              label: '红竺园社区',
              children: [
                {
                  label: '朝阳路片区',
                },
              ],
            },
          ],
        },
        {
          label: '文萃街道',
          children: [
            {
              label: '春光社区',
              children: [
                {
                  label: '文萃路片区',
                  children:[
                    {
                      label:'春熙苑小区',
                      children:[
                        {
                          label:'春熙苑小区1栋'
                        },
                        {
                          label:'春熙苑2号网格'
                        }
                      ]
                    }
                  ]
                },
              ],
            },
            {
              label: '艺海社区',
              children: [
                {
                  label: '观澜路片区',
                  children:[
                    {
                      label:'星河兰苑小区',
                      children:[
                        {
                          label:'星河兰苑1号网格'
                        }
                      ]
                    }
                  ]
                },
              ],
            },
          ],
        },
]
const currentLatLng=ref({})
const mapRef=ref()
const showForm=ref(false)

console.log(mapStore.color)

const color=computed(()=>mapStore.color)

function handleNodeClick(data){
  currentLatLng.value=data.latLng
  const markerLayer=mapRef.value.getMarkerLayer()
  map=mapRef.value.getMap()
  let id=markerLayer.geometries.length
    id++
   if(data.latLng){
    markerLayer.add([{
      id:`${id}`,
      styleId:'myStyle',
      position:new TMap.LatLng(data.latLng.lat, data.latLng.lng),
      properties: {
        title: "marker2"
      }
    }])
    map.setCenter(new TMap.LatLng(data.latLng.lat, data.latLng.lng))
   }

   //初始化折线，指定折线绘制到id为map的地图上
var polylineLayer = new TMap.MultiPolyline({
    map: map, 
        styles: {
            'style_blue': new TMap.PolylineStyle({
            color: '#dc143c', //线填充色
            width: 6, //折线宽度
        }),
            'style_red': new TMap.PolylineStyle({
            color: '#CC0000', 
            width: 6, 
        })
    },
    geometries: [{ 
        paths: [new TMap.LatLng(data.latLng.lat, data.latLng.lng), new TMap.LatLng(data.latLng.lat+0.0003, data.latLng.lng+0.0003), new TMap.LatLng(data.latLng.lat+0.0005, data.latLng.lng+0.00055),new TMap.LatLng(data.latLng.lat+0.0015, data.latLng.lng+0.00155)],
        styleId:'style_blue'

    }]
});

 polygon = new TMap.MultiPolygon({
    map: map, 
    styles: {
            'style_red': new TMap.PolygonStyle({
            color: color.value, 
            width: 6, 
        })
    },
    geometries: [{ 
        paths: [new TMap.LatLng(data.latLng.lat, data.latLng.lng),  new TMap.LatLng(data.latLng.lat+1, data.latLng.lng+1),  new TMap.LatLng(data.latLng.lat+0.5552, data.latLng.lng+1),  new TMap.LatLng(data.latLng.lat+0.455, data.latLng.lng+2)],
        styleId:'style_red'
    }]
});
console.log(mapStore.position)
console.log('polygon',polygon)
}

function updateColor(data){
  polygon.setStyles({
    'style_red': new TMap.PolygonStyle({
            color: data, 
            width: 6, 
        })
  })
}

function saveDraw(position){
  console.log('path',position)
  polygon = new TMap.MultiPolygon({
    map: map, 
    styles: {
            'style_red': new TMap.PolygonStyle({
            color: color.value, 
            width: 6, 
        })
    },
    geometries: [{
        paths: position,
        styleId:'style_red'
    }]
});
}
</script>

<style lang="scss" scoped>
.list{
  width: 20%;
  height: 80%;
  background-color: rgba(0,0,0,.5);
  position: absolute;
  top: 10%;
  left: 0;
  padding:10px;
  z-index: 1100;
}

.tree{
  background-color: rgba(0,0,0,.4);
  color:#fff;
  --el-tree-node-hover-bg-color: #a4a1a1;
  :deep(.el-tree-node__content:hover) {
    background-color: rgba(0,0,0,.5);
  }
}

.nav{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  color:#fff;
  font-size: 14px;

  div{
    padding: 10px;

    &:hover{
      background-color: #ccc;
      cursor: pointer;
    }
  }
}

.form{
  :deep(.el-form-item__label){
    color: #fff
  }
}
.button{
  width: 100%;
}
</style>