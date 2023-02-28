<template>
  <VSelectBox v-model="value.Value" :multi="multi" :readonly="readonly" :options="value.Items"/>
</template>
<script>
import VSelectBox from '@/components/Form/Input/VSelectBox'
export const MDSelectBox = {
  name: 'MDSelectBox',
  props: {
    value: {
      type: Object,
      required: true
    },
    readonly: {
      type: Object
    },
    multi: {
      type: Boolean
    }
  },
  components: {
    VSelectBox
  },
  created () {
    this.value.Items = this.value.Items.map(e => {
      return {
        ...e,
        label: e.Code + ' - ' + e.ViName,
        code: e.Code,
        Items: e.Items,
        name: e.ViName
      }
    })
  },
  data () {
    return {
      componentId: 'x'
    }
  },
  computed: {
  },
  methods: {
  }
}
export default MDSelectBox
</script>
