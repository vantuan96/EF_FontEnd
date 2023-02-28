<template>
  <Vcollapse @getData="getData" ref="Vcollapse">
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
                <div class="box-info-item">
                  <div><ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" /></div>
                  <div>{{item.CreatedAt | formatDateTime}}</div>
                  <div>{{__t('Phiếu')}} {{index + 1}}</div>
                </div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <Item v-if="formId" :formId="formId" :VisitType="_VisitType" :viewOnly="true" :VisitId="VisitId"/>
          </div>
        </div>
        <div class="text-center" v-else>
          <!-- <h4>{{__t('Chưa có phiếu giáo dục sức khỏe cho người bệnh và thân nhân')}}</h4> -->
        </div>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
import Item from './Index.vue'
import ExternalTransportationAssessment from '@/services/IPD/ExternalTransportationAssessment'

export default {
  name: 'EDExternalTransportationAssessment',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      formId: null,
      Lists: []
    }
  },
  components: {
    Item
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getData () {
      new ExternalTransportationAssessment({}, this._VisitType).find('List/' + this._VisitId).then(response => {
        let List = response.EIOExternalTransportationAssessments.map((e, i) => {
          return {
            Id: e.Id,
            Label: 'Phiếu ' + (i + 1),
            ViName: 'Phiếu ' + (i + 1),
            EnName: 'Phiếu ' + (i + 1),
            CreatedAt: e.CreatedAt,
            CreatedBy: e.CreatedBy
          }
        })
        this.Lists = List
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
        this.formId = List[0].Id
      }).catch(() => {
      })
    },
    setFormID (formId) {
      this.formId = formId
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
<style lang="stylus" scoped>
li {
  a {
    height: 85px;
    .box-info-item {
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column-reverse;
      justify-content: space-around;
    }
  }
}
</style>
