<template>
  <div v-if="Forms && Forms.length">
    <div :key="index" v-for="(form, index) in Forms" class="mb-10">
      <div v-if="form.Datas">
        <component v-if="form.Type in $options.components" :ViewOnly="true" :Form="form" v-bind:is="form.Type" :VisitId="$route.params.Id"/>
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
import CareNote from '@/pages/IPD/PhysicianNote/ViewOnlyCareNote.vue'
import MedicalRecord from '@/services/MedicalRecord.js'
export default {
  /**
   * The name of the page.
   */
  name: 'ViewTakeCareNote',
  props: ['VisitId'],
  data () {
    return {
      Forms: []
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    CareNote
  },
  mounted () {
    new MedicalRecord().find('IPD/' + this._VisitId).then(response => {
      this.Forms = response
    })
  },
  computed: {
  },
  methods: {
  }
}
</script>
