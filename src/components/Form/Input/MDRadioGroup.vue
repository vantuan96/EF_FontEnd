<template>
  <RadioGroup :readonly="readonly" v-model="model.Value" :name="value.Code" :id="value.Code" :options="value.Items"/>
</template>
<script>
import RadioGroup from '@/components/Form/Input/RadioGroup'
export const MDRadioGroup = {
  name: 'MDRadioGroup',
  props: {
    value: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean || String || Number
    }
  },
  components: {
    RadioGroup
  },
  created () {
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
        this.$emit('input', val)
      }
    }
  },
  methods: {
  }
}
export default MDRadioGroup
</script>
