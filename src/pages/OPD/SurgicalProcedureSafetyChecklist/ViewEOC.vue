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
          <li role="presentation" :class="activeClass('SignIn')">
            <a @click="type = 'SignIn'">
              {{__t('Trước khi gây mê/ gây tê')}}<br/>
              <small>{{__t('(Điều dưỡng gây mê/ phụ trách tham gia)')}}</small>
            </a>
          </li>
          <li role="presentation" :class="activeClass('TimeOut')">
            <a @click="type = 'TimeOut'">
              {{__t('Trước khi rạch da')}}<br/>
              <small>{{__t('(Kíp phẫu thuật/ thủ thuật tham gia)')}}</small>
            </a>
          </li>
          <li role="presentation" :class="activeClass('SignOut')">
            <a @click="type = 'SignOut'">
              {{__t('Trước khi NB rời phòng phẫu thuật/thủ thuật')}}<br/>
              <small>{{__t('(Điều dưỡng, bác sĩ gây mê, bác sĩ phẫu thuật tham gia)')}}</small>
            </a>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <component v-if="type in $options.components" v-bind:is="type" :VisitType="_VisitType" :VisitId="_VisitId" :FormId="data[type]"/>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
// import NProgress from 'nprogress'
// import $ from 'jquery'
import SignIn from './SignInView.vue'
import TimeOut from './TimeOutView.vue'
import SignOut from './SignOutView.vue'
import SurgicalProcedureSafetyChecklist from '@/services/SurgicalProcedureSafetyChecklist'
export default {
  /**
   * The name of the page.
   */
  name: 'EOCSurgicalProcedureSafetyChecklist',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      type: 'SignIn',
      data: {}
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    SignIn,
    TimeOut,
    SignOut
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    getData () {
      this.loaded = false
      new SurgicalProcedureSafetyChecklist({}, this._VisitType).find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
        this.data = response
      })
    },
    activeClass (link) {
      return link === this.type ? 'active' : ''
    }
  }
}
</script>
