<template>
  <textarea
    :id="code"
    :style="computedStyles"
    v-model="val"
    @focus="resize"
    v-on:blur="trimm"
    rows="1"
    @input="updateInput"
    :disabled="disabled"
  ></textarea>
</template>
<script>
export default {
  name: 'TextareaAutosize',
  props: {
    resized: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    autosize: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: [Number],
      'default': 34
    },
    maxHeight: {
      type: [Number],
      'default': null
    },
    /*
     * Force !important for style properties
     */
    important: {
      type: [Boolean, Array],
      default: false
    },
    code: {
      type: [String],
      default: ''
    },
    defaultLib: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // data property for v-model binding with real textarea tag
      val: null,
      // works when content height becomes more then value of the maxHeight property
      maxHeightScroll: false,
      height: 'auto'
    }
  },
  computed: {
    computedStyles () {
      if (!this.autosize) return {}
      return {
        resize: !this.isResizeImportant ? 'none' : 'none !important',
        height: this.height,
        overflow: this.maxHeightScroll ? 'auto' : (!this.isOverflowImportant ? 'hidden' : 'hidden !important')
      }
    },
    isResizeImportant () {
      const imp = this.important
      return imp === true || (Array.isArray(imp) && imp.includes('resize'))
    },
    isOverflowImportant () {
      const imp = this.important
      return imp === true || (Array.isArray(imp) && imp.includes('overflow'))
    },
    isHeightImportant () {
      const imp = this.important
      return imp === true || (Array.isArray(imp) && imp.includes('height'))
    }
  },
  watch: {
    resized (val) {
      setTimeout(() => {
        this.resize()
      }, 100)
    },
    value (val) {
      this.val = val
    },
    val (val) {
      this.$nextTick(this.resize)
      this.$emit('input', (val))
      this.$emit('onChange', (val))
    },
    minHeight () {
      this.$nextTick(this.resize)
    },
    maxHeight () {
      this.$nextTick(this.resize)
    },
    autosize (val) {
      if (val) this.resize()
    }
  },
  methods: {
    updateInput () {
    },
    copyOPDOENRFU (selectedValue) {
      if (!selectedValue) return
      var input = this.val
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach(e => {
        if (!inputValue.includes(this.trim_(e, '\n'))) input = (input || '') + '\n' + e
      })
      input = this.trim_(input, '\n')
      this.val = input
    },
    trimm () {
      this.val = this.trim_(this.val)
    },
    resize () {
      const important = this.isHeightImportant ? 'important' : ''
      this.height = `auto${important ? ' !important' : ''}`
      this.$nextTick(() => {
        let contentHeight = this.$el.scrollHeight + 1
        if (this.minHeight) {
          contentHeight = contentHeight < this.minHeight ? this.minHeight : contentHeight
        }
        if (this.maxHeight) {
          if (contentHeight > this.maxHeight) {
            contentHeight = this.maxHeight
            this.maxHeightScroll = true
          } else {
            this.maxHeightScroll = false
          }
        }
        const heightVal = contentHeight + 'px'
        this.height = `${heightVal}${important ? ' !important' : ''}`
      })
      return this
    }
  },
  created () {
    this.val = this.value
    this.resize()
  },
  mounted () {
  }
}
</script>
