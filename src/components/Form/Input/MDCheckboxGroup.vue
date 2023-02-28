<template>
  <div :id="(id || componentId)">
    <div v-for="(item, index) in value.Items" :key="index">
      <VCheckbox :readonly="readonly" :class="{'mrb10': mrb10}" v-model="item.Value" :label="__label(item)" :id="item.Code"/>
    </div>
  </div>
</template>
<script>
import VCheckbox from '@/components/Form/Input/VCheckbox'
export const MDCheckboxGroup = {
  name: 'MDCheckboxGroup',
  props: {
    value: {
      type: Object,
      required: true
    },
    name: {
      type: String
    },
    id: {
      type: String
    },
    readonly: {
      type: Boolean
    },
    mrb10: {
      type: Boolean
    }
  },
  components: {
    VCheckbox
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
  data () {
    return {
      componentId: 'x'
    }
  },
  methods: {
  }
}
export default MDCheckboxGroup
</script>
