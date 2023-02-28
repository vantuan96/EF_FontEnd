<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="main-content">
        <div class="v-tab v-tab-2" v-if="Lists.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in Lists" :class="activeClass(item.Id)">
              <a @click="setFormID(item.Id)">
                <div>
                  {{__t(item.Label)}}
                  {{index + 1}}
                </div>
                <div>{{item.CreatedAt}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
                </div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <ViewOnly v-if="formId" :viewOnly="true" :formId="formId" :VisitType="_VisitType" :VisitId="_VisitId"/>
          </div>
        </div>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
import ViewOnly from './Item.vue'
import JointConsultationForApprovalOfSurgery from '@/services/JointConsultationForApprovalOfSurgery'
import moment from 'moment'

export default {
  name: 'EDJointConsultationForApprovalOfSurgery',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      Lists: null,
      formId: null
    }
  },
  components: {
    ViewOnly
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    setFormID (formId) {
      this.formId = formId
    },
    getData () {
      new JointConsultationForApprovalOfSurgery({}, this._VisitType).find('A01_059_050919_VE' + '/' + this._VisitId).then(response => {
        let List = response.Datas.map(e => {
          return {
            Id: e.Id,
            Label: this.$t('Phiếu'),
            CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
            Version: e.Version,
            CreatedBy: e.CreatedBy
          }
        })
        this.Lists = List
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
        this.formId = List[List.length - 1].Id
      }).catch((e) => {
        console.log(e)
      })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
