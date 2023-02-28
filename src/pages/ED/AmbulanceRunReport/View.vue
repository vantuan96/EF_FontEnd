<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="v-tab">
        <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
          <li role="presentation" :class="activeClass('PatientManagement')">
            <a @click="type = 'PatientManagement'">{{__t('Chuyên môn')}}</a>
          </li>
          <li role="presentation" :class="activeClass('TransferPatient')">
            <a @click="type = 'TransferPatient'">{{__t('Vận chuyển người bệnh')}}</a>
          </li>
          <li role="presentation" :class="activeClass('PatientHandover')">
            <a @click="type = 'PatientHandover'">{{__t('Bàn giao bệnh nhân')}}</a>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <component v-if="type in $options.components" v-bind:is="type" :VisitId="VisitId" />
      </div>
    </template>
  </Vcollapse>
</template>
<script>
// import NProgress from 'nprogress'
// import $ from 'jquery'
import PatientManagement from './PatientManagementView.vue'
import TransferPatient from './TransferPatientView.vue'
import PatientHandover from './PatientHandoverView.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'EDAmbulanceRunReport',
  props: ['VisitId', 'Form', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      type: 'PatientManagement'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    PatientManagement,
    TransferPatient,
    PatientHandover
  },
  mounted () {
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
