<template>
  <div class="row" :style="`width: ${width}!important;`">
    <div class="col-md-12">
      <div class="form-group">
        <div v-if="readonly">
          <p class="fake-input disable" style="margin: 0">{{Value || 'N/A'}}</p>
        </div>
        <input v-else type="text" class="form-control" :placeholder="placeholder" v-model="Value"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MDTextInput',
  props: ['value', 'width', 'placeholder', 'readonly'],
  watch: {
    value (val) {
      this.Value = val
    },
    Value (val) {
      this.$emit('input', (val))
    }
  },
  data () {
    return {
      Value: ''
    }
  },
  created () {
    this.Value = this.value
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.form-group {
  margin-bottom: 0px!important;
}
</style>
