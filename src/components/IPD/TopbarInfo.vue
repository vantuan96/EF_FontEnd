<template>
  <div class="fix-h-50">
    <affix relative-element-selector="#content-wrap" id="ed-box">
      <div class="ed-info" :class="{'ed-waring': !opd.PID}" v-if="opd && !recordV2" :style="pin ? 'margin-bottom: 0px!important;border: 0px!important' : ''">
        <div class="ed-customer-title" :style="pin ? 'border-radius: 5px 5px 0 0;' : ''">
          PID: <b><pid :PID="opd.PID" :noPidmsg="'Chưa đồng bộ PID'" /></b> / <i>({{opd.VisitCode || __t('Chưa đồng bộ VisitCode')}})</i> - <vlink v-if="!readonlyview" :to="{name: 'IPDAllDetail', params: { Id: opd.IPDId }}"> {{opd.Fullname}} <VipIcon :data="opd" /> <DraftIcon :data="opd"/></vlink><template v-else> {{opd.Fullname}} <VipIcon :data="opd" /></template> - <b style="color: black;padding: 5px;margin: 0px;font-weight: normal;background: #f8c736; border-radius: 3px" v-if="opd.IsLocked"><i aria-hidden="true" class="fa fa-warning"></i>{{__t('Hồ sơ đã khóa 24h')}}</b>
          <vlink v-if="!readonlyview" :to="{name: 'OPDComplexOutpatientCaseSummary', params: { Id: opd.IPDId }}"><span v-if="opd.IsChronic" class="label label-danger">{{__t('Đây là ca bệnh ngoại trú phức tạp')}}</span></vlink><template v-else><span v-if="opd.IsChronic" class="label label-danger">Đây là ca bệnh ngoại trú phức tạp</span></template>
          <router-link v-if="opd.IsTelehealth" :to="{name: 'OPDInitialAssessmentTelehealth', params: { Id: opd.IPDId }}">
            (<i class="fa fa-check v-green" aria-hidden="true"></i> Telehealth)
          </router-link>
          <context-menu style="margin-right: -5px!important;" :Customer="opd" :MenuPositon="'v-bottom'" v-if="!readonlyview" :items="opd.Link" :VisitId="VisitId" :Type="'OPD'"/>
          <div class="box-gender women fw600 inline mrr5" v-if="opd.Gender === 'Nữ' || opd.Gender === 0"><i class="fa fa-female" aria-hidden="true"></i> {{__t('Nữ')}}</div>
          <div class="box-gender man fw600 inline mrr5" v-if="opd.Gender === 'Nam' || opd.Gender === 1"><i class="fa fa-male" aria-hidden="true"></i> {{__t('Nam')}}</div>
          <AllergyLabel :bottom="true" class="mrb10 box-di-ung" v-if="opd && opd.Allergy && opd.Allergy.IsAllergy" :data="opd.Allergy"/>
          <!-- <vlink v-if="!readonlyview" :to="{name: 'IPDMedicalRecordPart1', params: { Id: opd.IPDId }}">{{__t('btn.sua')}} <span class="glyphicon glyphicon-pencil"></span></vlink> -->
          <div class="box-xem-lich-su">
            <GotoStore :noneFloat="true" :PID="opd.PID" :VisitId="opd.IPDId"/>
          </div>
          <a :class="pin ? 'none' : ''" class="show-hide-box collapsed" data-toggle="collapse" data-target="#ed-box-view" aria-expanded="false" aria-controls="ed-box">
            <span class="show-down link-text">{{__t('btn.mo_rong')}} <i class="fa fa-angle-double-down"></i></span>
            <span class="hide-up link-text">{{__t('btn.thu_gon')}} <i class="fa fa-angle-double-up"></i></span>
          </a>
          <a :class="pin ? '' : 'none'" class="show-hide-box collapsed">
            <span class="link-text">{{__t('btn.thu_gon')}} <i class="fa fa-angle-double-up"></i></span>
          </a>
        </div>
        <div class="collapse v-info-box" id="ed-box-view" :class="pin ? 'none' : ''">
          <TopInfo :VisitId="VisitId" :Info2="Info2" :VisitType="'IPD'" :info="opd" @change="handleChange"/>
        </div>
        <div class="mini-scroll-menu" v-if="menuItems && menuItems.length && !pin">
          <ul>
            <li :key="index" v-for="(item, index) in menuItems"><a :href="item.blockId">{{item.index || (index + 1)}}. {{__t(item.label)}}</a></li>
          </ul>
        </div>
      </div>
      <!-- Menu ở tổng hợp hồ sơ bệnh án -->
      <div class="ed-info" :class="{'ed-waring': !opd.PID}" v-else-if="opd && recordV2" :style="pin ? 'margin-bottom: 0px!important;border: 0px!important' : ''">
        <div class="ed-customer-title collapsed" :style="pin ? 'bo1rder-radius: 5px 5px 0 0;' : ''">
          PID: <b><pid :PID="opd.PID" :noPidmsg="'Chưa đồng bộ PID'" /></b> - <vlink v-if="!readonlyview" :to="{name: 'IPDAllDetail', params: { Id: opd.IPDId }}"> {{opd.Fullname }} <VipIcon :data="opd" /> <DraftIcon :data="opd"/></vlink><template v-else> {{opd.Fullname }} <VipIcon :data="opd" /></template>
          <div class="box-gender women fw600 inline mrr5" style="margin-left: 5px;" v-if="opd.Gender === 'Nữ' || opd.Gender === 0"><i class="fa fa-female" aria-hidden="true"></i> {{__t('Nữ')}}</div>
          <div class="box-gender man fw600 inline mrr5" style="margin-left: 5px;" v-if="opd.Gender === 'Nam' || opd.Gender === 1"><i class="fa fa-male" aria-hidden="true"></i> {{__t('Nam')}}</div>
          <AllergyLabel :bottom="true" class="mrb10 box-di-ung" v-if="opd && opd.Allergy2 && opd.Allergy2.IsAllergy" :data="opd.Allergy2"/>
          <a :class="pin ? 'none' : ''" class="pull-right collapsed" data-toggle="collapse" data-target="#ed-box-view" aria-expanded="false" aria-controls="ed-box">
            <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
            <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
          </a>
          <a :class="pin ? '' : 'none'" class="pull-right collapsed">
            <span class="link-text"><i class="fa fa-angle-double-up"></i></span>
          </a>
          <!-- <GotoStore :PID="opd.PID" :VisitId="opd.IPDId"/> -->
        </div>
        <div class="collapse v-info-box" id="ed-box-view" :class="pin ? 'none' : ''">
          <TopInfo :VisitId="_VisitId" :VisitType="this.$route.params.TypeVisit" :info="opd" :hideCode="true" @change="handleChange"/>
        </div>
        <div class="mini-scroll-menu" v-if="menuItems && menuItems.length && !pin">
          <ul>
            <li :key="index" v-for="(item, index) in menuItems"><a :href="item.blockId">{{item.index || (index + 1)}}. {{__t(item.label)}}</a></li>
          </ul>
        </div>
      </div>
    </affix>
    <TopInfo2 :isShowFooter="true" :Info2="Info2" :VisitId="VisitId" :class="!pin ? 'none' : ''" :VisitType="'IPD'" :info="opd" @change="handleChange">
      <div slot="footer" class="mini-scroll-menu" style="padding-top: 5px;" v-if="menuItems && menuItems.length">
        <ul>
          <li :key="index" v-for="(item, index) in menuItems"><a :href="item.blockId">{{item.index || (index + 1)}}. {{__t(item.label)}}</a></li>
        </ul>
      </div>
    </TopInfo2>
    <confirm-handover-popup
      :CurrentGroup="'IPD'"
      :pId="handoverdata.Id"
      :message="handoverdata.ViMessage"
      v-if="handoverdata.isErrorPop"
      :VisitTypeGroupCode="handoverdata.VisitTypeGroupCode"
      :VisitId="handoverdata.VisitId"
      :IsUseHandOverCheckList = handoverdata.IsUseHandOverCheckList
    />
  </div>
</template>

<script>
import Customer from '@/services/IPD/Customer'
import ContextMenu from './ContextMenu.vue'
import EventBus from '@/lib/eventBus'
import constants from '@/constants'
import ActiveMenuLink from 'active-menu-link'
import GotoStore from '@/components/OPD/GotoStore.vue'
import TopInfo from '@/components/TopInfo.vue'
import TopInfo2 from '@/components/TopInfo2.vue'
import CustomerInfor from '@/services/CustomerInfor'
let GENDER = constants.GENDER
export default {
  name: 'v-ipd',
  props: ['VisitId', 'recordV2'],
  components: {
    ContextMenu,
    GotoStore,
    TopInfo,
    TopInfo2
  },
  data () {
    return {
      opd: null,
      readonlyview: false,
      GENDER: GENDER,
      menuItems: [],
      msgText: '',
      handoverdata: {},
      pin: false,
      Info2: null
    }
  },
  watch: {
    value: function (val) {
      this.selected = val || []
    },
    $route (to, from) {
      this.menuItems = []
    }
  },
  created () {
    this.readonlyview = this.$router.currentRoute.name === 'IPDVIEWDETAIL'
    this.getOpd()
    EventBus.$on('updateGlobalIpdTopbaInfo', this.getOpd)
    EventBus.$on('setMsgGlobalIpdTopbaInfo', this.setMsg)
    if (this.$route.params.Item) {
      this.$store.dispatch('setCurrentFormId', this.$route.params.Item)
    } else if (this.$route.params.FormId) {
      this.$store.dispatch('setCurrentFormId', this.$route.params.FormId)
    }
  },
  beforeDestroy () {
    EventBus.$off('updateGlobalIpdTopbaInfo')
    EventBus.$off('setMsgGlobalIpdTopbaInfo')
    this.$store.dispatch('account/update', {CurrentPatientObj: {}})
  },
  computed: {
    displayLable: function () {
      return this.selected
    }
  },
  methods: {
    getIcdInfo () {
      var opd = this.opd
      var icd = this.getICD10s(opd.DiagnosisAndICD.ICD, opd.DiagnosisAndICD.ICDOption, true)
      return [opd.DiagnosisAndICD.Diagnosis, opd.DiagnosisAndICD.DiagnosisOption].filter(e => e).join(', ') + ' ' + icd
    },
    setMsg (text) {
      this.msgText = text
    },
    getOpd (menu) {
      if (menu) {
        this.menuItems = menu
        setTimeout(() => {
          var activeMenuLink = new ActiveMenuLink('.mini-scroll-menu', {showHash: false})
          console.log('activeMenuLink: ', activeMenuLink)
        }, 100)
      } else {
        new Customer({noLoading: true, readonlyview: this.readonlyview}).find(this.VisitId + '/Ext').then(response => {
          if (response.ErrorPopup) {
            this.handoverdata = {...response, isErrorPop: true}
            return false
          }
          response.VisitType = 'IPD'
          this.$emit('onChange', response)
          this.opd = response
          // map
          new Customer({noLoading: true, readonlyview: this.readonlyview}).find(this.VisitId).then(res => {
            res.VisitType = 'IPD'
            this.opd = res
            this.setAddressCustomer(res)
            this.$store.dispatch('setIsLockedSigns', res.IsLocked)
            this.$store.dispatch('account/update', {CurrentPatientObj: res})
            this.$store.dispatch('account/update', {CurrentPatient: res.Id})
            // update IPD store
            this.$store.dispatch('setListShowTabs', res.Danhgiabandau)
            if (res.Status) {
              this.$store.dispatch('setStatusCustomer', res.Status)
            }
            this.$store.dispatch('setIsLocked', res.IsLocked)
          })
        }).catch(e => {
          var msg = 'Mã hồ sơ không tồn tại'
          if (e && e.status === 404) window.location.href = '/#/404/?plan=private&errmsg=' + msg
        })
      }
      new CustomerInfor().find('IPD' + '/' + this.VisitId).then(res => {
        this.Info2 = res
      })
    },
    setAddressCustomer (data) {
      let Address = ''
      if (data.MOHAddress) {
        Address += this.trim(data.MOHAddress)
      }
      if (data.MOHDistrict) {
        Address += ' - ' + this.trim(data.MOHDistrict)
      }
      if (data.MOHProvince) {
        Address += '- ' + this.trim(data.MOHProvince)
      }
      this.$store.dispatch('setAddress', Address)
    },
    handleChange (check) {
      this.pin = check
    }
  }
}
</script>
<style lang="stylus" scoped>
  .box-info-user {
    .name-user {
      color: #3c8dbc;
      cursor: pointer;
    }
    .box-gender {
      border: 1px solid;
      padding: 4px;
      color: #fff;
      font-size: 12px;
      padding: 1px 3px;
      border-radius: 3px;
      display: inline-block;
    }
    .women {
      background: #ff00ff;
      border-color: #ff00ff;
    }
    .man {
      background: #5d5dea;
      border-color: #5d5dea;
    }
    .box-infomation {
      position: relative;
      width: 100%;
      background: #fff;
      border: 1px solid #dadce0;
      border-radius: 4px;
      .avatar {
        padding: 10px;
      }
      .box-info1, .box-info2 {
        padding: 10px 13px;
      }
      .avatar, .box-info1 {
        border-right: 1px solid #dadce0;
      }
      .avatar {
        width: 169px;
      }
      .icon-pin {
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
  }
  .box-infomation {
    position: relative;
    width: 100%;
    background: #fff;
    border: 1px solid #dadce0;
    border-radius: 4px;
    .avatar {
      padding: 10px;
    }
    .box-info1, .box-info2 {
      padding: 10px 13px;
    }
    .avatar, .box-info1 {
      border-right: 1px solid #dadce0;
    }
    .avatar {
      width: 169px;
    }
    .icon-pin {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
  .box-info-user:before {
    content: "";
    border-top: 15px solid #ffc107;
    border-right: 15px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
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
      float: right;
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
