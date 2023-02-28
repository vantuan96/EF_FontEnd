<template>
  <div class="fix-h-50">
    <affix relative-element-selector="#content-wrap" id="ed-box" v-if="data">
      <div class="ed-info" :class="{'ed-waring': !data.PID}" v-if="data" :style="pin ? 'margin-bottom: 0px!important;border: 0px!important' : ''">
        <div class="ed-customer-title collapsed">
          PID: <b><pid :PID="data.PID" :noPidmsg="'Chưa đồng bộ PID'" /></b> - <vlink v-if="!readonlyview" :to="{name: 'EOCDETAILGROUP', params: { Id: data.VisitId }}"> {{data.Fullname}} <VipIcon :data="data" /></vlink><template v-else> {{data.Fullname}} <VipIcon :data="data" /></template>
          <div class="box-gender women fw600 inline mrr5" style="margin-left: 5px;" v-if="data.Gender === 'Nữ' || data.Gender === 0"><i class="fa fa-female" aria-hidden="true"></i> {{__t('Nữ')}}</div>
          <div class="box-gender man fw600 inline mrr5" style="margin-left: 5px;" v-if="data.Gender === 'Nam' || data.Gender === 1"><i class="fa fa-male" aria-hidden="true"></i> {{__t('Nam')}}</div>
          <AllergyLabel :bottom="true" class="box-di-ung" v-if="data && data.Allergy && data.Allergy.IsAllergy" :data="data.Allergy"/>
          <a class="pull-right collapsed" :class="pin ? 'none' : ''" data-toggle="collapse" data-target="#ed-box-view" aria-expanded="false" aria-controls="ed-box">
            <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
            <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
          </a>
          <a class="pull-right collapsed" :class="pin ? '' : 'none'">
            <span class="link-text"><i class="fa fa-angle-double-up"></i></span>
          </a>
        </div>
        <div class="collapse v-info-box" id="ed-box-view" :class="pin ? 'none' : ''">
          <TopInfo :VisitId="_VisitId" :Info2="Info2" :VisitType="this.$route.params.TypeVisit" :info="data" :hideCode="true" @change="handleChange"/>
        </div>
      </div>
    </affix>
    <TopInfo2 :VisitId="_VisitId" :Info2="Info2" :VisitType="this.$route.params.TypeVisit" :class="!pin ? 'none' : ''" :info="data" @change="handleChange"/>
  </div>
</template>

<script>
import Customer from '@/services/EOC/Customer'
import ContextMenu from '@/components/EOC/ContextMenu.vue'
import GotoStore from '@/components/OPD/GotoStore.vue'
import EventBus from '@/lib/eventBus'
import TopInfo from '@/components/TopInfo.vue'
import TopInfo2 from '@/components/TopInfo2.vue'
import CustomerInfor from '@/services/CustomerInfor'
export default {
  name: 'InfoBarV2',
  props: ['VisitId'],
  components: {
    ContextMenu, GotoStore, TopInfo, TopInfo2
  },
  data () {
    return {
      data: null,
      readonlyview: false,
      pin: false,
      Info2: null
    }
  },
  watch: {
    value: function (val) {
      this.selected = val || []
    }
  },
  created () {
    this.getData()
    EventBus.$on('updateGlobalOpd', this.getData)
    this.readonlyview = this.$router.currentRoute.name === 'OPDRECORD'
    if (this.$route.params.Item) {
      this.$store.dispatch('setCurrentFormId', this.$route.params.Item)
    } else if (this.$route.params.FormId) {
      this.$store.dispatch('setCurrentFormId', this.$route.params.FormId)
    }
  },
  beforeDestroy () {
    EventBus.$off('updateGlobalOpd')
  },
  computed: {
    displayLable: function () {
      return this.selected
    }
  },
  methods: {
    getData () {
      new Customer({noLoading: true}).find(this.VisitId + '/Ext').then(response => {
        this.$emit('onChange', response)
        this.data = response
        // map
        new Customer({noLoading: true}).find(this.VisitId).then(res => {
          this.data = res
          this.$store.dispatch('account/update', {CurrentPatient: res.Id})
          this.$store.dispatch('account/update', {CurrentPatientObj: res})
        })
      }).catch(e => {
        var msg = 'Mã hồ sơ không tồn tại'
        if (e && e.status === 404) window.location.href = '/#/404/?plan=private&errmsg=' + msg
      })
      new CustomerInfor().find('EOC' + '/' + this._VisitId).then(res => {
        this.Info2 = res
      })
    },
    handleChange (check) {
      this.pin = check
    }
  }
}
</script>
<style scoped>
.box-di-ung {
  color: #fff;
  font-weight: 700;
  background: #DD4B39;
  border-radius: 4px;
  line-height: 16px;
  font-size: 14px;
  padding: 5px;
  display: inline-block;
}
</style>
