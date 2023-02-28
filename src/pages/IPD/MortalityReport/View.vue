<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
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
        <component v-if="type in $options.components" v-bind:is="type" :VisitId="VisitId" :VisitType="visitType" :viewOnly="true"/>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
import Page1 from './View/Page1.vue'
import Page2 from './View/Page2.vue'

export default {
  name: 'IPDMortalityReport',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      type: 'Page1',
      visitType: 'IPD'
    }
  },
  components: {
    Page1,
    Page2
  },
  mounted () {
    this.visitType = this._VisitType
  },
  computed: {
  },
  methods: {
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
