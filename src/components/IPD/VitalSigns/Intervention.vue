<template>
  <div class="intervention-view">
    <div :key="index" v-for="(item, index) in data" class="mb-5">
      <i class="fa fa-check fa-2 green-color" aria-hidden="true"></i> {{item}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Intervention',
  props: ['Intervention', 'view'],
  data () {
    return {
      data: null
    }
  },
  mounted () {
    this.data = this.Intervention
  },
  watch: {
    Intervention () {
      this.data = this.Intervention
    }
  }
}
</script>
