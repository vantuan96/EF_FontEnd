<template>
  <component :is="component" :site="site" :data="data" v-if="component" />
</template>
<script>
export default {
  name: 'DynamicComponent',
  props: ['data', 'name', 'site', ''],
  data () {
    return {
      component: null
    }
  },
  computed: {
    loader () {
      if (!this.name) {
        return null
      }
      return () => import(`@/components/templates/${this.name}`)
    }
  },
  mounted () {
    this.loader()
      .then(() => {
        this.component = () => this.loader()
      })
      .catch(() => {
        this.component = () => import('@/components/templates/Default.vue')
      })
  }
}
</script>
