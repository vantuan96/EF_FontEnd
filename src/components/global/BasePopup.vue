<template>
  <modal :name="name" transition="pop-out" :width="width" height="auto" :clickToClose="clickToClose">
      <div class="box v-model-content-popup">

        <!-- header -->
        <div class="box-header popup-title"
          :class="{'move': move, 'popup-title--fixed': fixed}"
          @mousedown="handleMouseDown"
          @touchstart="handleMouseDown"

          @mouseleave="endPaintEvent"
          @touchleave="endPaintEvent"

          @mousemove="handleMouseMove"
          @touchmove="handleMouseMove"

          @mouseup="endPaintEvent"
          @touchend="endPaintEvent"
          slot="title"
        >
          <slot name="title" />
        </div>

        <!-- content -->
        <div class="form-confirm popup-body">
          <slot />
          <!-- footer -->
          <div v-if="!isShowFooter" class="footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </modal>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Basepopup',
  props: {
    name: {
      required: true,
      type: String
    },
    width: {
      required: false,
      type: String,
      default: '300px'
    },
    isShowFooter: {
      type: Boolean,
      default: false,
      required: false
    },
    clickToClose: {
      type: Boolean,
      required: true,
      default: false
    },
    move: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      Moving: false,
      left: 0,
      top: 0
    }
  },
  methods: {
    handleMouseDown (e) {
      this.Moving = true
      this.left = e.layerX
      this.top = e.layerY
    },
    endPaintEvent (e) {
      this.Moving = false
    },
    handleMouseMove (e) {
      if (this.Moving && this.move) {
        $('.v--modal-box').css('left', e.clientX - this.left)
        $('.v--modal-box').css('top', e.clientY - this.top)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .popup-title--fixed  {
    position: fixed;
    height: 45px;
    width: 1100px;
    z-index: 9999;
  }
  .popup-title {
    color: white;
  }
  .popup-body {
    padding: 10px 20px;
  }
  .move {
    cursor: grab;
  }
</style>
