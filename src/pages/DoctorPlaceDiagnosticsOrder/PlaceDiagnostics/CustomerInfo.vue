<template>
  <div class="fix-h-50">
    <affix relative-element-selector="#content-wrap" id="ed-box" v-if="data">
      <div class="ed-info">
        <div class="ed-customer-title">
          PID: <b><pid :PID="data.PID" /></b> - {{data.Fullname}} <vip-icon :data="data"/> <template v-if="Visit">- <b>{{__t('BS')}}:</b> <ad-Info :ad="Visit.DoctorAD" /> - {{Visit.AreaName}}</template>
          <a class="pull-right collapsed" data-toggle="collapse" data-target="#ed-box-view" aria-expanded="false" aria-controls="ed-box">
            <span class="show-down link-text">{{__t('btn.mo_rong')}} <i class="fa fa-angle-double-down"></i></span>
            <span class="hide-up link-text">{{__t('btn.thu_gon')}} <i class="fa fa-angle-double-up"></i></span>
          </a>
        </div>
        <div class="collapse v-info-box" id="ed-box-view">
          <div class="box-ed-content">
            <template v-if="Visit">
              <p class="no-wrap" style="font-size: 16px"><b>{{__t('Lượt khám')}}:</b> {{Visit.VisitTypeName}}</p>
              <p><b>{{__t('Mã tiếp nhận')}}:</b> {{Visit.VisitCode}}</p>
            </template>
            <p><b>{{__t('Số điện thoại')}}:</b> {{data.Phone}}</p>
            <p><b>{{__t('Ngày sinh')}}:</b> {{data.DateOfBirthConverted || data.DateOfBirth}}</p>
            <p><b>{{__t('Chỗ ở hiện tại')}}:</b> {{data.Address}}</p>
            <template v-if="Visit"><b>{{__t('Ngày vào viện')}}:</b> {{Visit.ActualVisitDate}}</template>
          </div>
        </div>
      </div>
    </affix>
    <div class="text-center" v-else><v-loading/></div>
  </div>
</template>

<script>
// import _ from 'lodash'
export default {
  props: ['data', 'Visit'],
  name: 'CustomerInfo',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  beforeDestroy () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
