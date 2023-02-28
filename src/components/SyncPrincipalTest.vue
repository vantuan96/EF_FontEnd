<template>
  <div v-if="data">
    <div class="pb-15 text-right">
      <button class="btn btn-sync-data" @click="getData(true)">{{__t('Lấy kết quả mới nhất')}}</button>
    </div>
    <diorpt :dataJson="data" @copy="copyToForm" :Results="Results" :copyAllData="copyAllData" />
    <p class="note-text text-right"><template v-if="syncOPDOENPT0At"><label class="label label-warning"><i aria-hidden="true" class="fa fa-check v-green"></i> {{__t('Đồng bộ lần cuối lúc')}}: {{syncOPDOENPT0At | formatDateTime('HH:mm:ss DD/MM/YYYY')}}</label></template><template v-else><label class="label label-warning"><i aria-hidden="true" class="fa fa-spin fa-loading v-green"></i>{{__t('Đang tải...')}}</label></template></p>
  </div>
  <div class="text-center" v-else>
    <div v-if="hasError">{{__t('Không lấy được kết quả')}}</div>
    <v-loading v-else/>
  </div>
</template>
<script>
import SyncLabAndXrayResults from '@/services/SyncLabAndXrayResults'
import Diorpt from '@/components/OPD/DI0RPT.vue'
import labFakeData from '@/common/lab.js'
export default {
  name: 'UsersAd',
  props: ['VisitId', 'VisitType', 'Results', 'copyAllData'],
  data () {
    return {
      data: null,
      syncOPDOENPT0At: null,
      hasError: false
    }
  },
  components: {
    Diorpt
  },
  created () {
    this.getData()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    copyToForm (str, type) {
      this.toastedInfo('Đã copy')
      this.$emit('copy', str, type)
    },
    getData (loading) {
      this.data = null
      this.hasError = false
      new SyncLabAndXrayResults({hidemsg: true, noLoading: !loading, notRedirect: true}, this.VisitType).find(this.VisitId).then(response => {
        this.syncOPDOENPT0At = new Date()
        var val = response
        if (val) {
          this.data = this.isLocahost() ? JSON.stringify(labFakeData) : JSON.stringify(val)
        }
      }).catch(e => {
        this.hasError = true
      })
    }
  }
}
</script>
