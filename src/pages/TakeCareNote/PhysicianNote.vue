<template>
  <div>
    <div :key="index" v-for="(form, index) in Forms" class="mb-10">
      <div v-if="form.Datas">
        <component v-if="form.Type in $options.components" :Form="form" v-bind:is="form.Type"  :VisitId="$route.params.Id"/>
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import MedicalRecord from '@/services/MedicalRecord.js'
import PhysicianNote from '@/pages/PhysicianNote/View.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDMedicalRecord',
  data () {
    return {
      Forms: []
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    PhysicianNote
  },
  mounted () {
    new MedicalRecord().find('ED/' + this.$route.params.Id).then(response => {
      this.Forms = response
    })
  },
  computed: {
  },
  methods: {
    activeClass (link) {
      if (typeof link === 'string') return link === this.$route.name ? 'active' : ''
      return link.includes(this.$route.name) ? 'active' : ''
    }
  }
}
</script>
