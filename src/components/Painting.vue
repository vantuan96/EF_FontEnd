<template>
  <div class="painting-content">
    <svg
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown"

      @mouseleave="endPaintEvent"
      @touchleave="endPaintEvent"

      @mouseup="endPaintEvent"
      @touchend="endPaintEvent"

      @mousemove="handleMouseMove"
      @touchmove="handleMouseMove">
      <template v-for="(line, index) in polylines">
        <polyline v-if="line.type === 'polyline'" :key="index" :points="points(line.data)" :style="'fill:none;stroke:' + line.color + ';stroke-width:3'"/>
      </template>
      <!-- <polyline points="1 1,12 16" :style="'fill: none; stroke: red; stroke-width: 2;'"/> -->
    </svg>
    <div class="drawing-tools" v-if="!readonly">
      <ul class="hidden">
        <li :key="index" v-for="(item, index) in colors"  @click="color = item" :class="classActive(item)"></li>
        <!-- <li class="bg-red" @click="color = 'red'" :class="{'selected': color === 'red'}"></li>
        <li class="bg-blue" @click="color = 'blue'" :class="{'selected': color === 'blue'}"></li>
        <li class="bg-yellow" @click="color = 'yellow'" :class="{'selected': color === 'yellow'}"></li>
        <li class="bg-teal" @click="color = 'teal'" :class="{'selected': color === 'teal'}"></li>
        <li class="bg-maroon" @click="color = 'maroon'" :class="{'selected': color === 'maroon'}"></li>
        <li class="bg-purple" @click="color = 'purple'" :class="{'selected': color === 'purple'}"></li> -->
      </ul>
      <button v-if="polylines && polylines.length" class="btn btn-sm btn-warning btn-flat" @click="undo"><i class="fa fa-undo" aria-hidden="true"></i> Undo</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Painting',
  props: ['value', 'readonly'],
  data () {
    return {
      isPainting: false,
      prevPos: {},
      polylines: [],
      color: 'red',
      type: 'polyline',
      colors: ['black', 'red', 'blue', 'yellow', 'teal', 'maroon', 'purple', 'green', 'pink']
    }
  },
  mounted () {
    // points () {
    //   return this.line.join(',')
    // }
    this.polylines = this.JSONParse(this.value) || []
  },
  watch: {
    polylines: function (val) {
      this.$emit('input', this.polylines)
    }
  },
  methods: {
    classActive (color) {
      return ['bg-' + color, {'selected': this.color === color}]
    },
    undo () {
      this.polylines = this.polylines.slice(0, -1)
      if (!this.polylines) this.polylines = []
    },
    getMousePos (mouseEvent) {
      var rect = this.$el.getBoundingClientRect()
      return (mouseEvent.clientX - rect.left) + ' ' + (mouseEvent.clientY - rect.top)
    },
    getTouchPos (touchEvent) {
      var rect = this.$el.getBoundingClientRect()
      return (touchEvent.touches[0].clientX - rect.left) + ' ' + (touchEvent.touches[0].clientY - rect.top)
    },
    points (points) {
      return points.join(',')
    },
    handleMouseDown (e) {
      if (this.readonly) return
      this.isPainting = true
      this.polylines.push({
        data: [e.type === 'touchstart' ? this.getTouchPos(e) : this.getMousePos(e)],
        color: this.color,
        type: this.type
      })
    },
    handleMouseMove (e) {
      if (this.readonly) return
      if (this.isPainting) {
        this.polylines[this.polylines.length - 1].data.push(e.type === 'touchmove' ? this.getTouchPos(e) : this.getMousePos(e))
      }
      e.preventDefault()
    },
    sendPaintData () {
    },
    endPaintEvent () {
      if (this.readonly) return
      if (this.isPainting) {
        this.isPainting = false
        this.sendPaintData()
      }
    }
  }
}
</script>
