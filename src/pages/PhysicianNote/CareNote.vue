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
import CareNote from '@/pages/TakeCareNote/View.vue'
export default {
  name: 'IPDMedicalRecord',
  props: ['Forms'],
  data () {
    return {
    }
  },
  components: {
    CareNote
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
