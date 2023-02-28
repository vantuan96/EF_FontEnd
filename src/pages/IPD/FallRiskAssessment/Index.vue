<template>
  <div class="main-content">
    <h2 class="text-center font-bold font28 uppercase">{{__t('Đánh giá nguy cơ ngã ở NB nội trú')}}</h2>
    <br/>
    <br/>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('IPDFallRiskAssessmentAdult')">
          <router-link :to="{name: 'IPDFallRiskAssessmentAdult', params: { Id: this.$route.params.Id }}">
            {{__t('NB nội trú người lớn')}}<br/>
          </router-link>
        </li>
        <li role="presentation" v-show="this.checkObstetric" :class="activeClass('IPDFallRiskAssessmentObstetric')">
          <router-link :to="{name: 'IPDFallRiskAssessmentObstetric', params: { Id: this.$route.params.Id }}">
            {{__t('NB nội trú sản')}}<br/>
          </router-link>
        </li>
        <li role="presentation" v-if="this.checkPediatric" :class="activeClass('IPDFallRiskAssessmentChild')">
          <router-link :to="{name: 'IPDFallRiskAssessmentChild', params: { Id: this.$route.params.Id }}">
            {{__t('NB nội trú trẻ em')}}<br/>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="tab-content" v-if="data">
      <transition name="page" mode="out-in" >
        <router-view :readonly="data.IsLocked"/>
      </transition>
    </div>
  </div>
</template>
<script>
// import NProgress from 'nprogress'
// import $ from 'jquery'
import FallRiskAssessment from '@/services/IPD/FallRiskAssessment'
import CustomersIPD from '@/services/IPD/Customer'
export default {
  /**
   * The name of the page.
   */
  name: 'FallRiskAssessment',
  mixins: [],
  data () {
    return {
      checkObstetric: false,
      checkPediatric: false,
      data: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    this.getDataSetup()
    this.getData()
  },
  computed: {
  },
  methods: {
    activeClass (link) {
      if (typeof link === 'string') return link === this.$route.name ? 'active' : ''
      return link.includes(this.$route.name) ? 'active' : ''
    },
    getDataSetup () {
      new CustomersIPD().find(this.$route.params.Id).then(response => {
        this.checkObstetric = response.MedicalRecordType.filter(i => i.FormCode === 'A01_035_050919_V').length > 0
        if (response.Version >= 12) {
          this.checkPediatric = response.Danhgiabandau.filter(i => i.Form === 'A02_047_301220_VE').length > 0
        } else {
          this.checkPediatric = response.MedicalRecordType.filter(i => i.FormCode === 'A01_037_050919_V' || i.FormCode === 'A01_195_050919_V').length > 0
        }
      }).then(er => {
      })
    },
    getData () {
      new FallRiskAssessment().find('info/' + this.$route.params.Id).then(response => {
        this.data = response
      }).catch(e => {
        // this._401ResponseError(e)
      })
    }
  }
}
</script>
