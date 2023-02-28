<template>
<div class="flex align-center">
  <div v-if="!hideLabel" class="mrr10" :class="boldLb ? 'fw600' : null" style="min-width: 100px;" :style="widthLabel">{{__label(data)}}</div>
  <user-auto-suggest
    :position="'ALL'"
    :readonly="readonly"
    :data-code="data.Code"
    :id="data.Code"
    :data="data"
    :placeholder="(readonly && !value2) ? 'N/A' : __t('Gõ để tìm kiếm')"
    :getTitle="getTitle"
    @pushTitle="handleGetTitle"
    v-model="value2"
    class="mrr20"
    style="width: 100%;"
  />
  <div style="width: 300px;" v-if="!hideCd">Chức danh: {{title}}</div>
</div>
</template>
<script>
export default {
  name: 'VNameCD',
  props: ['value', 'hideLabel', 'label', 'readonly', 'boldLb', 'data', 'widthLabel', 'getTitle', 'hideCd'],
  components: {
  },
  watch: {
    value (val) {
      this.value2 = val
    },
    value2 (val) {
      this.$emit('input', (val))
    }
  },
  data () {
    return {
      value2: '',
      title: 'N/A'
    }
  },
  created () {
    this.value2 = this.value
  },
  computed: {
  },
  methods: {
    handleGetTitle (e) {
      console.log('e: ', e)
      if (e) {
        this.title = e
      } else {
        this.title = 'N/A'
      }
    }
  }
}
</script>
