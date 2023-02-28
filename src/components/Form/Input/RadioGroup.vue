<template>
  <div class="group-radio" style="margin-right: 10px;" :id="(id || componentId)">
    <template v-if="!readonly">
      <template v-for="(item, index) in options">
        <span :data="item" :key="index" style="margin-left: 5px">
          <input type="radio" :id="'radio-' + index + (id || componentId)" v-model="model" :value="item.Data">
          <label style="width: 100%; margin-left: 3px" :for="'radio-' + index + (id || componentId)">{{__label(item)}}</label>
        </span>
      </template>
    </template>
    <template v-else>
      <span class="no-wrap">
        <template v-if="value || value === 0">
          <b class="el-radio-view">
            {{getLabel(value)}}
          </b>
        </template>
        <b class="el-radio-view disable" v-else>
          N/A
        </b>
      </span>
    </template>
  </div>
</template>
<script>
export default {
  name: 'RadioGroup',
  props: {
    value: {
      type: String,
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
    options: {
      type: Array
    }
  },
  // ['value', 'name', 'id', 'readonly', 'options']
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
    getLabel (val) {
      let label = ''
      if (this.options && this.options.length) {
        this.options.find(e => {
          if (e.Data === val) {
            label = this.__label(e)
          }
        })
      }
      return label
    }
  }
}
</script>
