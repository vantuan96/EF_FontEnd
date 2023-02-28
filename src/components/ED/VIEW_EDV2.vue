<template>
  <div class="fix-h-50">
    <affix relative-element-selector="#content-wrap" id="ed-box" v-if="ed">
      <div class="ed-info" :class="{'ed-waring': !ed.PID}" :style="pin ? 'margin-bottom: 0px!important;border: 0px!important' : ''">
        <div class="ed-customer-title collapsed">
          PID: <b><pid :PID="ed.PID" :noPidmsg="__t('Chưa đồng bộ PID')" /></b> - <vlink  v-if="!readonlyview" :to="{name: 'EDDETAILGROUP', params: { Id: ed.EDId }}"> {{ed.Fullname}} <VipIcon :data="ed" /></vlink><template v-else> {{ed.Fullname}}</template>
          <div class="box-gender women fw600 inline mrr5" style="margin-left: 5px;" v-if="ed.Gender === 'Nữ' || ed.Gender === 0"><i class="fa fa-female" aria-hidden="true"></i> {{__t('Nữ')}}</div>
          <div class="box-gender man fw600 inline mrr5" style="margin-left: 5px;" v-if="ed.Gender === 'Nam' || ed.Gender === 1"><i class="fa fa-male" aria-hidden="true"></i> {{__t('Nam')}}</div>
          <AllergyLabel :bottom="true" class="box-di-ung" v-if="ed && ed.Allergy && ed.Allergy.IsAllergy" :data="ed.Allergy"/>
          <a class="show-hide-box pull-right collapsed" :class="pin ? 'none' : ''" data-toggle="collapse" data-target="#ed-box-view" aria-expanded="false" aria-controls="ed-box">
            <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
            <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
          </a>
          <a class="show-hide-box pull-right collapsed" :class="pin ? '' : 'none'">
            <span class="link-text"><i class="fa fa-angle-double-up"></i></span>
          </a>
          <!-- <GotoStore :PID="ed.PID" :VisitId="ed.EDId"/> -->
        </div>
        <div class="collapse v-info-box" id="ed-box-view" :class="pin ? 'none' : ''">
          <TopInfo :VisitId="_VisitId" :Info2="Info2" :VisitType="this.$route.params.TypeVisit" :info="ed" :hideCode="true" @change="handleChange"/>
        </div>
      </div>
    </affix>
    <TopInfo2 :VisitId="_VisitId" :Info2="Info2" :VisitType="this.$route.params.TypeVisit" :class="!pin ? 'none' : ''" :info="ed" @change="handleChange"/>
  </div>
</template>

<script>
import CustomersED from '@/services/ED/CustomersED'
import EventBus from '@/lib/eventBus'
import GotoStore from '@/components/OPD/GotoStore.vue'
import constants from '@/constants'
import TopInfo from '@/components/TopInfo.vue'
import TopInfo2 from '@/components/TopInfo2.vue'
import CustomerInfor from '@/services/CustomerInfor'

// import _ from 'lodash'
export default {
  name: 'v-ed',
  props: ['EdId'],
  components: {
    GotoStore, TopInfo, TopInfo2
  },
  data () {
    return {
      handoverdata: {},
      RickGroup: constants.RISKGROUP,
      ed: null,
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
    this.readonlyview = this.$router.currentRoute.name === 'EDRECORD'
    this.getEd()
    EventBus.$on('updateGlobalEd', this.getEd)
    if (this.$route.params.Item) {
      this.$store.dispatch('setCurrentFormId', this.$route.params.Item)
    } else if (this.$route.params.FormId) {
      this.$store.dispatch('setCurrentFormId', this.$route.params.FormId)
    }
  },
  beforeDestroy () {
    EventBus.$off('updateGlobalEd')
    this.$store.dispatch('account/update', {CurrentPatientObj: {}})
  },
  computed: {
    displayLable: function () {
      return this.selected
    }
  },
  methods: {
    getEd () {
      new CustomersED({noLoading: true, readonlyview: this.readonlyview}).find(this.EdId + '/Ext').then(response => {
        if (response.ErrorPopup) {
          this.handoverdata = {...response, isErrorPop: true}
          return false
        }
        response.VisitType = 'ED'
        this.$emit('onChange', response)
        this.ed = response
        // map
        new CustomersED({noLoading: true, readonlyview: this.readonlyview}).find(this.EdId).then(res => {
          EventBus.$emit('pushDataCustomerED', res)
          res.VisitType = 'ED'
          this.ed = res
          this.$store.dispatch('account/update', {CurrentPatient: res.Id})
          this.$store.dispatch('account/update', {CurrentPatientObj: res})
        })
      }).catch(e => {
        var msg = 'Mã hồ sơ không tồn tại'
        if (e && e.status === 404) window.location.href = '/#/404/?plan=private&errmsg=' + msg
      })
      new CustomerInfor().find('ED' + '/' + this.EdId || this._VisitId).then(res => {
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
