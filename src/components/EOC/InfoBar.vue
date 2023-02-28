<template>
  <div class="fix-h-50">
    <affix relative-element-selector="#content-wrap" id="ed-box" v-if="data">
      <div class="ed-info" :class="{'ed-waring': !data.PID}" v-if="data && !recordV2" :style="pin ? 'margin-bottom: 0px!important;border: 0px!important' : ''">
        <div class="ed-customer-title" :style="pin ? 'border-radius: 5px 5px 0 0;' : ''">
          PID: <b><pid :PID="data.PID" :noPidmsg="'Chưa đồng bộ PID'" /></b> / <i v-if="data.VisitCode">({{data.VisitCode}})</i> - <vlink v-if="!readonlyview" :to="{name: 'EOCDETAILGROUP', params: { Id: data.VisitId }}"> {{data.Fullname}} <VipIcon :data="data" /></vlink><template v-else> {{data.Fullname}} <VipIcon :data="data" /></template>
          <vlink v-if="!readonlyview" :to="{name: 'EOCComplexOutpatientCaseSummary', params: { Id: data.VisitId }}"><span v-if="data.IsChronic" class="label label-danger">{{__t('Đây là ca bệnh ngoại trú phức tạp')}}</span></vlink><template v-else><span v-if="data.IsChronic" class="label label-danger">{{__t('Đây là ca bệnh ngoại trú phức tạp')}}</span></template>
          <context-menu style="margin-right: -5px!important;" :Customer="data" :MenuPositon="'v-bottom'" v-if="!readonlyview" :items="data.Link" :VisitId="VisitId" :Type="'EOC'"/>
          <div class="box-gender women fw600 inline mrr5" v-if="data.Gender === 'Nữ' || data.Gender === 0"><i class="fa fa-female" aria-hidden="true"></i> {{__t('Nữ')}}</div>
          <div class="box-gender man fw600 inline mrr5" v-if="data.Gender === 'Nam' || data.Gender === 1"><i class="fa fa-male" aria-hidden="true"></i> {{__t('Nam')}}</div>
          <AllergyLabel :bottom="true" class="box-di-ung" v-if="data.Allergy && data.Allergy.IsAllergy" :data="data.Allergy"/>
          <vlink v-if="!readonlyview" :to="{name: 'EOCCustomerInfo', params: { Id: data.VisitId }}">{{__t('btn.sua')}} <span class="glyphicon glyphicon-pencil"></span></vlink>
          <div class="box-xem-lich-su">
            <GotoStore :noneFloat="true" :PID="data.PID" :VisitId="data.VisitId"/>
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
          <TopInfo :VisitId="_VisitId" :Info2="Info2" :VisitType="_VisitType" :info="data" @change="handleChange"/>
        </div>
      </div>
      <!-- Tổng hợp hồ sơ bệnh án -->
      <div class="ed-info" :class="{'ed-waring': !data.PID}" v-if="data && recordV2" :style="pin ? 'margin-bottom: 0px!important;border: 0px!important' : ''">
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
          <TopInfo :VisitId="_VisitId" :VisitType="this.$route.params.TypeVisit" :info="data" :hideCode="true" @change="handleChange"/>
        </div>
      </div>
    </affix>
    <TopInfo2 :VisitId="_VisitId" :Info2="Info2" :VisitType="_VisitType" :class="!pin ? 'none' : ''" :info="data" @change="handleChange"/>
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
  name: 'InfoBar',
  props: ['VisitId', 'VisitType', 'recordV2'],
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
