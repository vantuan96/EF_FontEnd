<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <template v-if="DataSubmit.Version === 1">
        <div class="v-tab">
          <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
            <li role="presentation" :class="activeClass('CardiacArrestRecordForm')">
              <a @click="type = 'CardiacArrestRecordForm'">{{__t('Thông tin hồi sinh tim phổi')}}</a>
            </li>
            <li role="presentation" :class="activeClass('CardiacArrestRecordTable')">
              <a @click="type = 'CardiacArrestRecordTable'">{{__t('Bảng hồi sinh tim phổi')}}</a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <component v-if="type in $options.components" v-bind:is="type" :VisitType="_VisitType" :VisitId="_VisitId" :viewOnly="true"/>
        </div>
      </template>
      <template v-if="DataSubmit.Version === 2">
        <FormV2 :formdata="DataSubmit" v-if="DataSubmit" :VisitType="_VisitType" :VisitId="_VisitId" :readonly="true"/>
      </template>
    </template>
  </Vcollapse>
</template>
<script>
// import NProgress from 'nprogress'
// import $ from 'jquery'
import CardiacArrestRecordForm from './FormView.vue'
import FormV2 from './FormV2.vue'
import CardiacArrestRecordTable from './Table.vue'
import CardiacArrestRecord from '@/services/CardiacArrestRecord'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDCardiacArrestRecord',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      type: 'CardiacArrestRecordForm',
      DataSubmit: {}
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    CardiacArrestRecordForm,
    CardiacArrestRecordTable,
    FormV2
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    getData () {
      new CardiacArrestRecord(this._VisitType).find('Info/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
      })
    },
    activeClass (link) {
      return link === this.type ? 'active' : ''
    }
  }
}
</script>
