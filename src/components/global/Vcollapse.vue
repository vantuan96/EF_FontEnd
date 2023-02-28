<template>
  <div class="box-collapse-2" :class="{'open': isOpen}">
    <div class="v-collapse-title v-collapse-title2" @click="open()">
      <button class="collapse-btn"><i class="fa fa-angle-double-up" aria-hidden="true"></i><i class="fa fa-angle-double-down" aria-hidden="true"></i></button>
      <b><slot name="title"></slot></b> <slot name="info"></slot>
    </div>
    <div class="box-collapse-content" v-if="hasData">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Vcollapse',
  props: ['autoOpen'],
  mixins: [],
  data () {
    return {
      hasData: false,
      isOpen: false
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    collapse () {
      this.isOpen = !this.isOpen
    },
    setHasData () {
      this.hasData = true
      this.collapse()
    },
    open () {
      if (this.hasData) {
        this.collapse()
      } else {
        this.$emit('getData')
      }
    }
  }
}
</script>
