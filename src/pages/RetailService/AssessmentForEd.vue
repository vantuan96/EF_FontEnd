<template>
  <div class="main-content" id="etr-page">
    <!-- <h1 v-if="DataSubmit.Customer">Bệnh nhân: {{DataSubmit.Customer.Fullname}} - {{DataSubmit.Customer.PID}} <a href="#" class="pull-right">Xem chi tiết</a></h1> -->
    <!-- <ed :EdId="this.$route.params.Id"/> -->
    <div class="v-tab">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation">
          <router-link :to="{name: 'ED-etr', params: { Id: $route.params.Id }, query: {tab: 'tab1'}}">
            {{__t('ETR.phan_loai_cap_cuu_benh_nhan')}}
          </router-link>
        </li>
        <li role="presentation">
          <router-link v-if="DataSubmit && DataSubmit.IsVisitLastUpdate" :to="{name: 'EDInitialAssessmentFallRiskScreening', params: { Id: $route.params.Id }}">
            {{__t('ETR.sang_loc_nga')}}
          </router-link>
          <router-link v-else :to="{name: 'ED-etr', params: { Id: $route.params.Id }, query: {tab: 'tab2'}}">
            {{__t('ETR.sang_loc_nga')}}
          </router-link>
        </li>
        <li role="presentation">
          <router-link :to="{name: 'ED-etr', params: { Id: $route.params.Id }, query: {tab: 'tab3'}}">
            {{__t('Y lệnh miệng')}}
          </router-link>
        </li>
        <li role="presentation" class="active">
          <router-link :to="{name: 'ED-AssessmentForRetailServicePatient', params: { Id: $route.params.Id }}">
            {{__t('Đánh giá NB dịch vụ lẻ')}}
          </router-link>
        </li>
      </ul>
      <!-- Tab panes -->
      <div role="tabpanel" class="tab-pane active" id="tab1">
        <AssessmentForm />
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

// import MaskedInput from 'vue-v-masked-input'
import AssessmentForm from './AssessmentForm.vue'
import EmergencyTriageRecords from '@/services/ED/EmergencyTriageRecords'
export default {
  /**
   * The name of the page.
   */
  name: 'AssessmentForRetailServicePatient',
  data () {
    return {
      DataSubmit: {}
    }
  },
  mixins: [],
  /**
   * The components that the page can use.
   */
  components: {
    AssessmentForm
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getData () {
      new EmergencyTriageRecords().find(this.$route.params.Id).then(response => {
        this.DataSubmit = response
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
      })
    }
  }
}
</script>
