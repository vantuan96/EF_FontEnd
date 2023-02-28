<template>
  <div id="PatientProgressNotesView" v-if="hasDatas">
    <div class="ed-info box-collapse" :class="{'open': open}">
      <div class="ed-customer-title">
        <b>{{__t('Bảng theo dõi diễn biến người bệnh')}}</b>
      </div>
      <div class="box-collapse-content no-padding">
        <div class="min-height-200">
          <patient-progress-notes @hasData="hasData" :Readonly="true" :VisitId="this.$route.params.Id"/>
        </div>
      </div>
      <div class="box-action" @click="collapse()">
        <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
        <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
      </div>
    </div>
  </div>
</template>
<script>
import PatientProgressNotes from '@/components/OPD/PatientProgressNotes.vue'
export default {
  props: ['VisitId'],
  data () {
    return {
      collapseId: '',
      open: false,
      hasDatas: true
    }
  },
  components: {
    PatientProgressNotes
  },
  methods: {
    hasData (t) {
      this.hasDatas = t
    },
    collapse () {
      this.open = !this.open
    }
  }
}
</script>
