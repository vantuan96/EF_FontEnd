<template>
  <div v-if="readonly" class="flex align-center">
    <i v-if="model" class="value-checkbox checked" aria-hidden="true"></i><i v-else class="value-checkbox" aria-hidden="true"></i>
    <div v-if="label" class="displaytbl"><span>{{__t(label)}}</span></div>
  </div>
  <div class="d-flex" :id="(id || componentId)" v-else>
    <div class="v-checkbox">
      <input type="checkbox" :id="'checkbox' + (id || componentId)" v-model="model">
      <label :for="'checkbox' + (id || componentId)"></label>
    </div>
    <span v-if="label" class="displaytbl"><span>{{__t(label)}}</span></span>
  </div>
</template>
<script>
export const VCheckbox = {
  name: 'VCheckbox',
  props: {
    value: {
      type: Boolean
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    id: {
      type: String
    },
    readonly: {
      type: Boolean
    }
  },
  computed: {
    model: {
      get () {
        return (this.value && (this.value === 'true' || this.value === true))
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
export default VCheckbox
</script>
