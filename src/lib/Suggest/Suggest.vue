<template>
  <div :name="name">
    <input type="text" v-model.trim="text" :placeholder="placeholder" :disabled="disabled" ref="input"
      @keyup="processKey"
      @keydown="processControl"
      @blur="close"
      @focus="firstOpen" >
    <div class="sg-clear"
      @click="clear"
      v-show="text"
      v-if="!disabled">
      <span>×</span>
    </div>
    <v-drop-down ref="drop" :re-open="true" :animated="true" @show-change="showChange">
      <ul class="sg-results" :style="{width: width+'px'}" ref="list" >
        <li v-for="(row,index) in list" :key="index"
          :class="{'sg-results__row':true, 'sg-over':highlight === index}"
          @mouseenter="highlight = index"
          @mouseleave="highlight = -1"
          @click="selectItem(row)"
          v-html="getRow(row)"
          ></li>
      </ul>
    </v-drop-down>
  </div>
</template>

<script>
import drop from 'v-dropdown'
export default {
  name: 'v-suggest',
  components: { 'v-drop-down': drop },
  props: {
    data: Array,
    value: String,
    name: String,
    keyField: {
      type: String,
      default: 'id'
    },
    showField: {
      type: [String, Function],
      default: 'name'
    },
    placeholder: String,
    delay: {
      type: Number,
      default: 0.2
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      text: typeof (this.value) === 'undefined' ? '' : this.value,
      list: [],
      highlight: -1,
      width: 0,
      dropShow: false,
      last: null,
      lastInputTime: -1
    }
  },
  methods: {
    open () {
      if (this.disabled) return
      this.populate()
      if (!this.dropShow && this.list.length) this.$refs.drop.$emit('show', this.$refs.input)
      this.adjust()
    },
    firstOpen () {
      this.$refs.drop.$emit('show', this.$refs.input)
    },
    close () {
      if (this.dropShow) this.$refs.drop.$emit('show')
      this.highlight = -1
      // this.list = this.data
    },
    clear () {
      this.text = ''
      this.populate()
      this.inputFocus()
    },
    inputFocus () {
      this.$refs.input.focus()
    },
    getRow (row) {
      if (typeof this.showField === 'string') return row[this.showField]
      else if (typeof this.showField === 'function') return this.showField(row)
    },
    showChange (val) {
      this.dropShow = val
      if (!val) this.highlight = -1
    },
    processKey (e) {
      if ([38, 40, 27, 13, 9].includes(e.keyCode)) return
      this.lastInputTime = e.timeStamp
      setTimeout(() => {
        if ((e.timeStamp - this.lastInputTime) === 0) {
          this.populate()
          this.checkOpen()
        }
      }, this.delay * 1000)
    },
    processControl (e) {
      if ([38, 40, 27, 13, 9].includes(e.keyCode)) {
        switch (e.keyCode) {
          case 38:// up
            this.previous()
            break
          case 40:// down
            this.next()
            break
          case 9: // tab
          case 13:// return
            if (this.highlight !== -1) this.selectItem(this.list[this.highlight])
            break
          case 27:// escape
            this.close()
            break
        }
      }
    },
    selectItem (row) {
      this.text = this.getRow(row)
      // console.log(this.text)
      this.$emit('values', this.text)
      setTimeout(() => {
        this.close()
      }, 300)
    },
    next () {
      if (!this.dropShow) this.open()
      if (this.highlight < (this.list.length - 1)) {
        this.highlight++
        this.$nextTick(() => {
          var cur = this.$refs.list.querySelectorAll('.sg-over')[0]
          var curPos = cur.getBoundingClientRect()
          var listPos = this.$refs.list.getBoundingClientRect()
          var dist = (this.$refs.list.scrollTop + curPos.bottom) - listPos.bottom
          if (dist) this.$refs.list.scrollTop = dist
        })
      }
    },
    previous () {
      if (this.highlight === 0) return
      if (!this.dropShow) this.open()
      this.highlight = this.highlight === -1 ? this.list.length - 1 : --this.highlight
      this.$nextTick(() => {
        var cur = this.$refs.list.querySelectorAll('.sg-over')[0]
        var curPos = cur.getBoundingClientRect()
        var listPos = this.$refs.list.getBoundingClientRect()
        var dist = curPos.top - listPos.top
        if (dist < 0) this.$refs.list.scrollTop += dist
      })
    },
    checkOpen () {
      this.list.length ? this.open() : this.close()
    },
    adjust () {
      let inputWidth = this.$refs.input.getBoundingClientRect().width
      if (this.width === 198) {
        if (inputWidth > 198) this.width = inputWidth
      } else {
        if ((inputWidth - 2) !== this.width) this.width = (inputWidth > 200 ? inputWidth : 200) - 2
      }
    },
    populate () {
      if (Array.isArray(this.data) && this.data.length) {
        if (this.text !== this.last) {
          this.list = this.text ? this.data.concat().filter(value => {
            let result = this.getRow(value).toLowerCase()
            return String(result).includes(this.text.toLowerCase())
          }) : this.list = this.data
        }
        this.last = this.text
      }
    }
  },
  watch: {
    value (val) {
      this.text = val
    },
    text (val) {
      this.$emit('input', val)
    }
  },
  mounted () {
    let tmpClass = this.$el.className
    this.$el.className = 'v-suggest'
    this.$refs.input.className = tmpClass
    this.list = this.data
    this.adjust()
  }
}
</script>
