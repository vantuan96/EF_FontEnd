<template>
  <div class="btn-group btn-group-none-style" v-if="Items && Items.length">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="glyphicon glyphicon-option-vertical"></span>
    </button>
    <ul class="dropdown-menu v-dropdown-menu v-context-menu v-top">
      <li :data="link" :key="i" v-for="(link ,i) in Items"><a href="">{{__label(link)}}</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'FloatingMenu',
  props: ['Items'],
  data () {
    return {
    }
  },
  components: {
  },
  created () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
