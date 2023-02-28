<template>
  <span v-if="filtere && filtere.length">
    <span class="tag-label" :key="index" v-if="item" :value="item.value" v-for="(item, index) in filtere">{{item.label}}</span>
  </span>
  <span v-else>
    NA
  </span>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'v-select-display',
  props: ['value', 'items', 'placeholder', 'multi', 'sty', 'search'],
  data () {
    return {
      selected: [],
      searchQuery: '',
      options: []
    }
  },
  watch: {
    items () {
    }
  },
  created () {
  },
  computed: {
    filtere: function () {
      return [_.find(this.items, {value: this.value})]
    }
  },
  methods: {
  }
}
</script>
