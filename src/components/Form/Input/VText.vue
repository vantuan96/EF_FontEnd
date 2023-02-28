<template>
  <div class="VText">
    <p v-if="readonly" class="fake-input disable full-width" :class="viewmrb ? 'mrb10' : ''" style="margin: 0">{{model || 'N/A'}}</p>
    <div class="full-width" v-else>
      <input v-if="type === 'text'" class="form-control" :rows="rows ? rows : 3" :placeholder="placeholder" v-model="model"/>
      <VNumberInput v-else-if="type === 'number'" :maxlength="maxlength" :decimal="decimal" :placeholder="placeholder" v-model="model"/>
      <textarea-autosize v-else :disabled="disabled" class="form-control" :rows="rows ? rows : 3" :placeholder="placeholder" v-model="model"/>
    </div>
  </div>
</template>
<script>
export const VText = {
  name: 'VText',
  props: {
    readonly: {
      type: Boolean || String || Number
    },
    rows: {
      type: String || Number
    },
    placeholder: {
      type: String
    },
    value: {
      type: String || Number
    },
    disabled: {
      type: Boolean
    },
    viewmrb: {
      type: Boolean
    },
    decimal: {
      type: Boolean
    },
    type: {
      type: String
    },
    maxlength: {
      type: [String, Number]
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
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
export default VText
</script>
