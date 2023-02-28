<template>
  <div class="main-content">
    <h2 class="text-center">{{__t('Bệnh án cấp cứu ngoại viện')}}</h2>
    <div class="v-tab">
      <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('AmbulanceRunReportPatientManagement')">
          <router-link :to="{name: 'AmbulanceRunReportPatientManagement', params: { Id: this.$route.params.Id }}">
            {{__t('Chuyên môn')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('AmbulanceRunReportTransferPatient')">
          <router-link :to="{name: 'AmbulanceRunReportTransferPatient', params: { Id: this.$route.params.Id }}">
            {{__t('Vận chuyển người bệnh')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('AmbulanceRunReportPatientHandover')">
          <router-link :to="{name: 'AmbulanceRunReportPatientHandover', params: { Id: this.$route.params.Id }}">
            {{__t('Bàn giao bệnh nhân')}}
          </router-link>
        </li>
      </ul>
      <div class="tab-content">
        <transition name="page" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AmbulanceRunReport',
  methods: {
    activeClass (link) {
      return link === this.$route.name ? 'active' : ''
    }
  }
}
</script>
