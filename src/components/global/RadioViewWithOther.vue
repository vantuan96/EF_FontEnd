<template>
  <span>
    <template :data="item"  v-for="(item, index) in data">
      <span :key="index" v-if="checkString(item.DataType, 'Select')">
      </span>
      <span :key="index" v-if="checkString(item.DataType, 'Text')">
        {{__label(item)}}: {{item.Value || 'N/A'}}
      </span>
    </template>
  </span>
</template>
<script>
export default {
  name: 'MdView',
  props: ['data'],
  mixins: [],
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>
