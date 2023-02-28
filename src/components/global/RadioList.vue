<template>
  <div class="group-radio" style="flex-grow: 1">
    <template v-if="readonly">
      <b class="el-radio-view" v-if="localValue == item.value" :data="item" :key="index" v-for="(item, index) in options">
        {{__t(item.label)}}
      </b>
    </template>
    <template v-else v-for="(item, index) in options">
      <input :data="item" :key="index" :name="id" type="radio" :id="'radio-' + index + '-' + id" v-model="localValue" :value="item.value">
      <label :data="item" :key="index + 'label'" :for="'radio-' + index + '-' + id">{{__t2(item.label)}}</label>
    </template>
  </div>
</template>
<script>
export default {
  name: 'RadioList',
  props: ['value', 'options', 'readonly'],
  watch: {
    value: function (val) {
      this.$emit('input', this.value)
    }
  },
  data () {
    return {
      id: this.makeid()
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', event.target.value)
      }
    }
  },
  created () {
  },
  methods: {
    updateDate () {
    }
  }
}
</script>
