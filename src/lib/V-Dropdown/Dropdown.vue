<template>
  <transition :name="animate">
  <div :class="[dropdownClass,{'v-dropdown-embed': embed}]" :style="[styleSheet]" v-show="show">
    <slot></slot>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'v-dropdown',
  props: {
    align: {
      type: String,
      default: 'left'
    },
    embed: {
      type: Boolean,
      default: false
    },
    rightClick: {
      type: Boolean,
      default: false
    },
    /**
     * when the drop-down container is already open, whether to open the drop-down container
     * again after clicking the caller
     */
    reOpen: {
      type: Boolean,
      default: false
    },
    animated: {
      type: [String, Boolean],
      default: true
    },
    /**
     * the width of drop down menu
     * min-width: 80
     */
    width: Number,
    x: Number,
    y: Number
  },
  data () {
    return {
      show: false,
      styleSheet: {
        top: '',
        left: ''
      },
      dropdownClass: 'v-dropdown-container',
      dropUp: false,
      lastCaller: null
    }
  },
  computed: {
    animate () {
      let cls = ''
      if (!this.embed && this.animated) cls = this.dropUp ? 'animate-up' : 'animate-down'
      if (typeof this.animated === 'string') cls = this.animated
      return cls
    }
  },
  methods: {
    visible (caller) {
      this.$nextTick(() => {
        if (!this.show && !this.embed && caller) this.adjust(caller)
        setTimeout(() => {
          this.show = !this.show
          this.lastCaller = caller
          this.$emit('show-change', this.show)
        }, 1)
      })
    },
    adjust (caller) {
      const pos = caller.getBoundingClientRect()
      let menu = null
      if (this.show) menu = this.$el.getBoundingClientRect()
      else {
        this.$el.style.visibility = 'hidden'
        this.$el.style.display = 'inline-block'
        menu = this.$el.getBoundingClientRect()
        this.$el.style.visibility = 'visible'
        this.$el.style.display = 'none'
      }
      this.adjustTop(pos, menu)
      this.adjustLeft(pos, menu)
    },
    adjustTop (pos, menu) {
      const gap = 5
      const scrollTop = window.pageYOffset
      const viewHeight = document.documentElement.clientHeight
      const srcTop = this.rightClick ? this.y : pos.top + scrollTop
      let t = 0
      let u = false

      t = this.rightClick ? this.y : pos.top + pos.height + gap + scrollTop
      let overDown = false
      let overUp = false
      if ((t + menu.height) > (scrollTop + viewHeight)) overDown = true
      if ((srcTop - gap - menu.height) < 0) overUp = true

      if (!overUp && overDown) {
        t = srcTop - gap - menu.height
        u = true
      }
      this.dropUp = u
      this.styleSheet.top = `${t}px`
    },
    adjustLeft (pos, menu) {
      const scrollLeft = window.pageXOffset
      const viewWid = document.documentElement.clientWidth
      let l = 0
      let wid = this.rightClick ? 0 : pos.width
      let left = this.rightClick ? this.x : pos.left + scrollLeft
      let center = (left + (wid / 2)) - (menu.width / 2)
      let right = (left + wid) - menu.width
      switch (this.align) {
        case 'left':
          l = (left + menu.width) > (scrollLeft + viewWid) ? right : left
          break
        case 'center':
          if ((center + menu.width) > (scrollLeft + viewWid)) l = right
          else if (right < scrollLeft) l = left
          else l = center
          break
        case 'right':
          l = (right < scrollLeft) ? left : right
          break
      }
      this.styleSheet.left = `${l}px`
    },
    whole (e) {
      if (this.show) {
        let callerClick = false
        let idx = e.path.findIndex(val => val.className &&
          typeof val.className === 'string' &&
          val.className.includes(this.dropdownClass))
        if (!this.reOpen && e.path.find(val => val === this.lastCaller) && !this.rightClick) callerClick = true
        if (idx === -1 && !callerClick) this.visible()
      }
    },
    MouseEventPolyfill () {
      if (!('path' in Event.prototype)) {
        Object.defineProperty(Event.prototype, 'path', {
          get () {
            const path = []
            let currentElem = this.target
            while (currentElem) {
              path.push(currentElem)
              currentElem = currentElem.parentElement
            }
            if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document)
            if (path.indexOf(window) === -1) path.push(window)
            return path
          }
        })
      }
    }
  },
  created () {
    this.MouseEventPolyfill()
  },
  mounted () {
    if (this.width) this.styleSheet.width = this.width + 'px'
    if (this.embed) this.visible()
    else {
      document.body.appendChild(this.$el)
      this.$on('show', this.visible)
      this.$on('adjust', this.adjust)
      document.body.addEventListener('mousedown', this.whole)
    }
  },
  destroyed () {
    if (!this.embed) {
      document.body.removeEventListener('mousedown', this.whole)
      this.$off('show', this.visible)
      this.$off('adjust', this.adjust)
      this.$el.remove()
    }
  }
}
</script>
