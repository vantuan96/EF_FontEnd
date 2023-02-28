<template>
  <div class="main-content">
    <h2 class="text-center font-bold font28 uppercase">{{__t('Đánh giá nguy cơ ngã ở NB nội trú')}}</h2>
    <br/>
    <br/>
    <!-- <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('IPDFallRiskAssessmentAdult')">
          <router-link :to="{name: 'IPDFallRiskAssessmentAdult', params: { Id: this.$route.params.Id }}">
            {{__t('NB nội trú người lớn')}}<br/>
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('IPDFallRiskAssessmentObstetric')">
          <router-link :to="{name: 'IPDFallRiskAssessmentObstetric', params: { Id: this.$route.params.Id }}">
            {{__t('NB nội trú sản')}}<br/>
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('IPDFallRiskAssessmentChild')">
          <router-link :to="{name: 'IPDFallRiskAssessmentChild', params: { Id: this.$route.params.Id }}">
            {{__t('NB nội trú trẻ em')}}<br/>
          </router-link>
        </li>
      </ul>
    </div> -->
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
export default {
  /**
   * The name of the page.
   */
  name: 'FallRiskAssessment',
  mixins: [],
  data () {
    return {
      data: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    activeClass (link) {
      if (typeof link === 'string') return link === this.$route.name ? 'active' : ''
      return link.includes(this.$route.name) ? 'active' : ''
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
