<template>
  <span><template :data="item" v-for="item in datas">{{item.Value}}</template></span>
</template>
<script>
export default {
  name: 'ValueOfInput',
  props: ['datas'],
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
