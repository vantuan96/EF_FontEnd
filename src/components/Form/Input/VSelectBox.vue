<template>
  <!-- <div v-if="readonly">{{value}}</div> -->
  <v-select v-model="model" :readonly="readonly" :multi="multi" :clearable="true" :searchable="true" :items="options" :reduce="(option) => option.Code"/>
</template>
<script>
import VSelect from '@/components/VSelect.vue'
export const VSelectBox = {
  name: 'VSelectBox',
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array
    },
    readonly: {
      type: Boolean
    },
    multi: {
      type: Boolean
    }
  },
  components: {
    VSelect
  },
  created () {
    this.init()
  },
  data () {
    return {
      componentId: 'x'
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val.code)
      }
    }
  },
  methods: {
  }
}
export default VSelectBox
</script>
