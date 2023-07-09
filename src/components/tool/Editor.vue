<template>
  <div>
    <section id="toolControl" >
        <div class="toolItem" id="marker" title="点标记"></div>
        <div class="toolItem" id="polyline" title="折线"></div>
        <div class="toolItem" id="polygon" title="多边形"></div>
        <div class="toolItem" id="rectangle" title="矩形"></div>
        <div class="color-tool">
            <el-color-picker
              show-alpha
              popper-class="colorpicker-popper"
              width="30"
              @change="changeColor"
          ></el-color-picker>
        </div>
        <!-- 设置高度工具 -->
        <div style="min-width: 200px; margin-left: 20px">
            <el-slider
            :max="200"
            tooltip-class="height-tooltip"
            height="200px">
          </el-slider>
        </div>
    </section>
  </div>
</template>

<script setup>
import {useMapStore} from '../../store/modules/map'

const mapStore=useMapStore()
const emit=defineEmits(['updateColor'])

 function changeColor(data){
  mapStore.setColor(data)
  emit('updateColor', data)
 }
</script>


<style scoped lang="scss">
    #toolControl {
        position: absolute;
        display: flex;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10%;
        z-index: 9999;
    }

    .toolItem {
        width: 30px;
        height: 30px;
        float: left;
        margin: 1px;
        padding: 4px;
        border-radius: 3px;
        background-size: 30px 30px;
        background-position: 4px 4px;
        background-repeat: no-repeat;
        box-shadow: 0 1px 2px 0 #e4e7ef;
        background-color: #ffffff;
        border: 1px solid #ffffff;
    }

    .toolItem:hover {
        border-color: #789cff;
    }

    .active {
        border-color: #d5dff2;
        background-color: #d5dff2;
    }

    #marker {
        background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker_editor.png');
    }

    #polyline {
        background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/polyline.png');
    }

    #polygon {
        background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/polygon.png');
    }

    #circle {
        background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/circle.png');
    }

    #rectangle {
        background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/rectangle.png');
    }

    #ellipse {
        background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/ellipse.png');
    }

    :deep(.color-tool) {
      display: flex;
      align-items: center;


      .el-color-picker__trigger {
        width: 100% !important;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 #e4e7ef;
        border: 1px solid #ffffff;
      }
      .el-color-picker {
        width: 40px;
      }
    }
</style>

<style lang="scss">
.el-tooltip__popper.height-tooltip {
      z-index: 999999999 !important;
    }

.colorpicker-popper {
  z-index: 9999999999 !important;
}
</style>