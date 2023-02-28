<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template v-if="hasData">
      <template v-if="loaded">
        <template slot='content' v-if="Version >= 11">
          <h2 class="text-center fw600 fs30">{{__t('MortalityReport.label1')}}</h2>
          <div class="v-tab">
            <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
              <li role="presentation" :class="activeClass('Page1')">
                <a @click="type = 'Page1'">Kiểm thảo tử vong</a>
              </li>
              <li role="presentation" :class="activeClass('Page2')">
                <a @click="type = 'Page2'">Trích biên bản</a>
              </li>
            </ul>
          </div>
          <div class="tab-content">
            <component v-if="type in $options.components" v-bind:is="type" :VisitId="VisitId" :VisitType="_VisitType" :viewOnly="true"/>
          </div>
        </template>
        <template slot='content' v-else>
          <MortalityReportForm :viewOnly="true" :VisitId="_VisitId" :VisitType="_VisitType"/>
        </template>
      </template>
      <div v-else class="loading-text"><v-loading/></div>
    </template>
  </Vcollapse>
</template>
<script>
/*
api/ED/ExternalTransportationAssessment/{id}
api/ED/ExternalTransportationAssessment/Create/{id}
api/ED/ExternalTransportationAssessment/{id}
api/ED/ExternalTransportationAssessment/Confirm/{id}
GENTDBM : thang điểm
EIOAEFET: form
*/
import MortalityReportForm from './Index.vue'
import MortalityReport from '@/services/ED/MortalityReport'
import Page1 from './View/Page1.vue'
import Page2 from './View/Page2.vue'

export default {
  name: 'EDMortalityReport',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      Version: 1,
      type: 'Page1',
      loaded: false
    }
  },
  components: {
    MortalityReportForm, Page1, Page2
  },
  mounted () {
    this.checkVersion()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    checkVersion () {
      new MortalityReport().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.Version = response.Version
        this.loaded = true
      }).catch(e => {
        this.loaded = true
      })
    },
    getData () {
      this.hasData = true
      if (this.$refs.Vcollapse) {
        this.$refs.Vcollapse.setHasData()
      }
    },
    activeClass (link) {
      return link === this.type ? 'active' : ''
    }
  }
}
</script>
