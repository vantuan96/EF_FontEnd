<template>
  <div class="fix-h-50">
    <affix relative-element-selector="#content-wrap" id="ed-box" v-if="opd">
      <div class="ed-info" :class="{'ed-waring': !opd.PID}" v-if="opd" :style="pin ? 'margin-bottom: 0px!important;border: 0px!important' : ''">
        <div class="ed-customer-title collapsed">
          PID: <b><pid :PID="opd.PID" :noPidmsg="'Chưa đồng bộ PID'" /></b> - <vlink v-if="!readonlyview" :to="{name: 'OPDDETAILGROUP', params: { Id: opd.OPDId }}"> {{opd.Fullname}} <VipIcon :data="opd" /></vlink><template v-else> {{opd.Fullname}} <VipIcon :data="opd" /></template>
          <div class="box-gender women fw600 inline mrr5" style="margin-left: 5px;" v-if="opd.Gender === 'Nữ' || opd.Gender === 0"><i class="fa fa-female" aria-hidden="true"></i> {{__t('Nữ')}}</div>
          <div class="box-gender man fw600 inline mrr5" style="margin-left: 5px;" v-if="opd.Gender === 'Nam' || opd.Gender === 1"><i class="fa fa-male" aria-hidden="true"></i> {{__t('Nam')}}</div>
          <AllergyLabel :bottom="true" class="box-di-ung" v-if="opd && opd.Allergy && opd.Allergy.IsAllergy" :data="opd.Allergy"/>
          <a :class="pin ? 'none' : ''" class="show-hide-box collapsed" data-toggle="collapse" data-target="#ed-box-view" aria-expanded="false" aria-controls="ed-box">
            <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
            <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
          </a>
          <a :class="pin ? '' : 'none'" class="show-hide-box collapsed">
            <span class="link-text"><i class="fa fa-angle-double-up"></i></span>
          </a>
          <!-- <GotoStore :PID="opd.PID" :VisitId="opd.OPDId" v-if="this.$router.currentRoute.name === 'OutpatientExaminationNote'"/> -->
        </div>
        <div class="collapse v-info-box" id="ed-box-view" :class="pin ? 'none' : ''">
          <TopInfo :VisitId="_VisitId" :Info2="Info2" :VisitType="this.$route.params.TypeVisit" :info="opd" :hideCode="true" @change="handleChange"/>
        </div>
      </div>
    </affix>
    <TopInfo2 :VisitId="_VisitId" :Info2="Info2" :VisitType="this.$route.params.TypeVisit" :class="!pin ? 'none' : ''" :info="opd" @change="handleChange"/>
  </div>
</template>

<script>
import CustomerOPD from '@/services/OPD/Customer'
import ContextMenu from './ContextMenu.vue'
import GotoStore from '@/components/OPD/GotoStore.vue'
import EventBus from '@/lib/eventBus'
import TopInfo from '@/components/TopInfo.vue'
import TopInfo2 from '@/components/TopInfo2.vue'
import CustomerInfor from '@/services/CustomerInfor'
export default {
  name: 'v-opd',
  props: ['OpdId'],
  components: {
    ContextMenu, GotoStore, TopInfo, TopInfo2
  },
  data () {
    return {
      opd: null,
      readonlyview: false,
      handoverdata: {},
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
    this.readonlyview = this.$router.currentRoute.name === 'OPDRECORD'
    this.getOpd()
    EventBus.$on('updateGlobalOpd', this.getOpd)
    if (this.$route.params.Item) {
      this.$store.dispatch('setCurrentFormId', this.$route.params.Item)
    } else if (this.$route.params.FormId) {
      this.$store.dispatch('setCurrentFormId', this.$route.params.FormId)
    }
  },
  beforeDestroy () {
    EventBus.$off('updateGlobalOpd')
    this.$store.dispatch('account/update', {CurrentPatientObj: {}})
  },
  computed: {
    displayLable: function () {
      return this.selected
    }
  },
  methods: {
    getOpd () {
      new CustomerOPD({noLoading: true, readonlyview: this.readonlyview}).find(this.OpdId + '/Ext').then(response => {
        if (response.ErrorPopup) {
          this.handoverdata = {...response, isErrorPop: true}
          console.log(this.handoverdata)
          return false
        }
        this.$emit('onChange', response)
        response.VisitType = 'OPD'
        this.opd = response
        // map
        new CustomerOPD({noLoading: true, readonlyview: this.readonlyview}).find(this.OpdId).then(res => {
          res.VisitType = 'OPD'
          this.opd = res
          this.$store.dispatch('account/update', {CurrentPatient: res.Id})
          this.$store.dispatch('account/update', {CurrentPatientObj: res})
        })
      }).catch(e => {
        var msg = 'Mã hồ sơ không tồn tại'
        if (e && e.status === 404) window.location.href = '/#/404/?plan=private&errmsg=' + msg
      })
      new CustomerInfor().find('OPD' + '/' + this._VisitId).then(res => {
        this.Info2 = res
      })
    },
    handleChange (check) {
      this.pin = check
    }
  }
}
</script>
<style lang="stylus" scoped>
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
.ed-customer-title {
  position relative;
  padding-right: 58px!important;
  .box-xem-lich-su {
    position: absolute;
    top: 7px;
    right: 62px;
  }
  .show-hide-box {
    position absolute;
    top: 8px;
    right: 8px;
  }
}
@media (max-width: 1146px) {
  .box-xem-lich-su {
    margin-left: 0px!important;
  }
}
</style>
