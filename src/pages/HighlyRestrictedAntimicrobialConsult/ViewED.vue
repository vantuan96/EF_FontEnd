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
                {{item.Label}}
                <div>{{item.CreatedAt}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
                </div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <ViewOnly :ViewOnly="true" :formId="formId" :VisitType="_VisitType" :VisitId="_VisitId"/>
          </div>
        </div>
      </div>
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
import HighlyRestrictedAntimicrobialConsult from '@/services/HighlyRestrictedAntimicrobialConsult'
import ViewOnly from './Item'
import moment from 'moment'

export default {
  name: 'EDHighlyRestrictedAntimicrobialConsult',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      Id: this._VisitId,
      Lists: null,
      formId: null,
      FormCode: 'A01_060_120421_VE'
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
      new HighlyRestrictedAntimicrobialConsult({hidemsg: true}, this._VisitType).find(this.FormCode + '/' + this._VisitId).then(response => {
        let List = response.Datas.map((e, i) => {
          return {
            Id: e.Id,
            Label: this.__t('Phiếu') + ' ' + (i + 1),
            ViName: this.__t('Phiếu') + ' ' + (i + 1),
            EnName: this.__t('Phiếu') + ' ' + (i + 1),
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
