<template>
  <div class="fix-h-50">
    <affix relative-element-selector="#content-wrap" id="ed-box" v-if="opd">
      <div class="ed-info" :class="{'ed-waring': !opd.PID}" v-if="opd && !recordV2" :style="pin ? 'margin-bottom: 0px!important;border: 0px!important' : ''">
        <div class="ed-customer-title" :style="pin ? 'border-radius: 5px 5px 0 0;' : ''">
          PID: <b><pid :PID="opd.PID" :noPidmsg="'Chưa đồng bộ PID'" /></b> / <i v-if="opd.VisitCode">({{opd.VisitCode}})</i> - <vlink v-if="!readonlyview" :to="{name: 'OPDDETAILGROUP', params: { Id: opd.OPDId }}"> {{opd.Fullname}} <VipIcon :data="opd" /></vlink><template v-else> {{opd.Fullname}} <VipIcon :data="opd" /></template>
          <vlink v-if="!readonlyview" :to="{name: 'OPDComplexOutpatientCaseSummary', params: { Id: opd.OPDId }}"><span v-if="opd.IsChronic" class="label label-danger">{{__t('Đây là ca bệnh ngoại trú phức tạp')}}</span></vlink><template v-else><span v-if="opd.IsChronic" class="label label-danger">{{__t('Đây là ca bệnh ngoại trú phức tạp')}}</span></template>
          <router-link v-if="opd.IsTelehealth" :to="{name: 'OPDInitialAssessmentTelehealth', params: { Id: opd.OPDId }}">
            (<i class="fa fa-check v-green" aria-hidden="true"></i> Telehealth)
          </router-link>
          <div class="inline" v-if="opd.IsLocked && !IsOPDOutpatientExaminationNote && !readonlyview">
            - <b style="color: black;padding: 5px;margin: 0px;font-weight: normal;background: #f8c736; border-radius: 3px"><i aria-hidden="true" class="fa fa-warning"></i>{{__t('Hồ sơ đã khóa 24h')}}</b>
          </div>
          <context-menu style="margin-right: -5px!important;" :IsAnesthesia="IsAnesthesia " :Customer="opd" :MenuPositon="'v-bottom'" v-if="!readonlyview" :items="opd.Link" :EdId="OpdId" :Type="'OPD'"/>
          <div class="box-gender women fw600 inline mrr5" v-if="opd.Gender === 'Nữ' || opd.Gender === 0"><i class="fa fa-female" aria-hidden="true"></i> {{__t('Nữ')}}</div>
          <div class="box-gender man fw600 inline mrr5" v-if="opd.Gender === 'Nam' || opd.Gender === 1"><i class="fa fa-male" aria-hidden="true"></i> {{__t('Nam')}}</div>
          <AllergyLabel :bottom="true" class="box-di-ung" v-if="opd && opd.Allergy && opd.Allergy.IsAllergy" :data="opd.Allergy"/>
          <vlink v-if="!readonlyview" :to="{name: 'CustomerOPDInfo', params: { Id: opd.OPDId }}"><span class="glyphicon glyphicon-pencil"></span></vlink>
          <div class="box-xem-lich-su">
            <GotoStore :noneFloat="true" :PID="opd.PID" :VisitId="opd.OPDId" v-if="this.$router.currentRoute.name === 'OutpatientExaminationNote' || this.$router.currentRoute.name === 'PreAnesthesiaConsultation' || this.$router.currentRoute.name === 'OPDTomTatThongTinNguoiBenh' || this.$router.currentRoute.name === 'OPDDETAILGROUP'"/>
          </div>
          <a class="show-hide-box collapsed" :class="pin ? 'none' : ''" data-toggle="collapse" data-target="#ed-box-view" aria-expanded="false" aria-controls="ed-box">
            <span class="show-down link-text">{{__t('btn.mo_rong')}} <i class="fa fa-angle-double-down"></i></span>
            <span class="hide-up link-text">{{__t('btn.thu_gon')}} <i class="fa fa-angle-double-up"></i></span>
          </a>
          <a class="show-hide-box collapsed" :class="pin ? '' : 'none'">
            <span class="link-text">{{__t('btn.thu_gon')}} <i class="fa fa-angle-double-up"></i></span>
          </a>
        </div>
        <div class="collapse v-info-box" id="ed-box-view" :class="pin ? 'none' : ''">
          <TopInfo :VisitId="OpdId || _VisitId" :Info2="Info2" :VisitType="this.$route.params.TypeVisit || _VisitType" :hideCode="true" :info="opd" @change="handleChange"/>
        </div>
      </div>
      <!-- Menu ở tổng hợp hồ sơ bệnh án -->
      <div class="ed-info" :class="{'ed-waring': !opd.PID}" v-else-if="opd && recordV2" :style="pin ? 'margin-bottom: 0px!important;border: 0px!important' : ''">
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
    <TopInfo2 :VisitId="OpdId || _VisitId" :Info2="Info2" :VisitType="this.$route.params.TypeVisit || _VisitType" :class="!pin ? 'none' : ''" :info="opd" @change="handleChange"/>
    <confirm-handover-popup
      :CurrentGroup="'OPD'"
      :pId="handoverdata.Id"
      :message="handoverdata.ViMessage"
      v-if="handoverdata.ErrorPopup"
      :VisitTypeGroupCode="handoverdata.VisitTypeGroupCode"
      :VisitId="handoverdata.VisitId"
      :IsUseHandOverCheckList = handoverdata.IsUseHandOverCheckList
    />
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
  props: ['OpdId', 'VisitType', 'recordV2'],
  components: {
    ContextMenu, GotoStore, TopInfo, TopInfo2
  },
  data () {
    return {
      opd: null,
      readonlyview: false,
      handoverdata: {},
      pin: false,
      IsAnesthesia: false,
      IsOPDOutpatientExaminationNote: false,
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
    this.IsOPDOutpatientExaminationNote = this.$router.currentRoute.name === 'OutpatientExaminationNote'
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
        this.IsAnesthesia = response.IsAnesthesia
        if (response.ErrorPopup) {
          this.handoverdata = {...response, isErrorPop: true}
          console.log(this.handoverdata)
          return false
        }
        response.VisitType = 'OPD'
        this.$emit('onChange', response)
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
      new CustomerInfor().find('OPD' + '/' + this.OpdId || this._VisitId).then(res => {
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
