<template>
  <div class="main-content" id="etr-page">
    <AssessmentForm />
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

// import MaskedInput from 'vue-v-masked-input'
import AssessmentForm from './AssessmentForm.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'AssessmentForRetailServicePatient',
  data () {
    return {
    }
  },
  mixins: [],
  /**
   * The components that the page can use.
   */
  components: {
    AssessmentForm
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
}
</script>
