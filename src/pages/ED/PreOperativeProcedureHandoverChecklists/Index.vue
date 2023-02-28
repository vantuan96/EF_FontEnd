<template>
  <div id="PreOperativeProcedureHandoverChecklists-Page" class="main-content disable_ccp">
    <div v-if="loaded" class="content-body">
      <Form v-if="DataSubmit.Version < 9"/>
      <FormV2 v-else :VisitType="VisitType"/>
    </div>
  </div>
</template>
<script>
import EIOService from '@/services/IPD/EIOService'
import Form from './Item.vue'
import FormV2 from './ItemV2'

export default {
  name: 'PreOperativeProcedureHandoverChecklists',
  props: ['viewOnly', 'VisitId', 'VisitType'],
  mixins: [],
  components: {
    Form,
    FormV2
  },
  data () {
    return {
      loaded: false,
      DataSubmit: {}
    }
  },
  computed: {
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        this.DataSubmit = response.Version
        this.loaded = true
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>
