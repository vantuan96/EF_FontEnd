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
        <div class="v-tab v-tab-2" v-if="List.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" :class="activeClass(item.Id)">
              <a @click="setDataProp(item)">
                <div>
                  {{__t(item.Label)}}
                  {{index + 1}}
                  {{item.FullNameNewborn ? `- ${item.FullNameNewborn}` : ''}}
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
            <ViewOnly v-if="formId" :viewOnly="true" :dataItem="dataItem" :formId="formId" :VisitType="_VisitType" :VisitId="_VisitId"/>
          </div>
        </div>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
import ContraintNewbornAndPregnantWoman from '@/services/ContraintNewbornAndPregnantWoman'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import ViewOnly from './Item.vue'

export default {
  name: 'IPDForUterineLife2Hours_Obstetrics',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      List: null,
      formId: null,
      ListNewBorn: [],
      dataItem: null
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
    setDataProp (item) {
      this.formId = item.Id
      this.dataItem = item
    },
    getData () {
      this.loaded = false
      new InitialAssessment()
        .find('ForUterineLife2HoursV2/' + 'GetList/' + this._VisitId)
        .then(async response => {
          this.List = await response.Forms.map(e => {
            return {
              Id: e.Id,
              Label: this.$t('Sơ sinh'),
              NewbornCustomerId: e.NewbornCustomer.Id,
              FullNameNewborn: null
            }
          })
          // getListSoSinh
          await new ContraintNewbornAndPregnantWoman().find('GetList/' + this._VisitId + '/IPD/ForUterineLife2Hours_Obstetrics').then(response => {
            this.ListNewBorn = response
          }).catch(e => {
            console.log('e: ', e)
          })
          for (let i = 0; i < this.List.length; i++) {
            for (let j = 0; j < this.ListNewBorn.length; j++) {
              if (this.List[i].NewbornCustomerId === this.ListNewBorn[j].Id) {
                const FullNameNewborn = this.ListNewBorn[j].FullNameNewborn ? this.ListNewBorn[j].FullNameNewborn : ''
                const Gender = this.ListNewBorn[j].Gender
                const DateOfBirth = this.ListNewBorn[j].DateOfBirth ? this.ListNewBorn[j].DateOfBirth : ''
                const AgeFormated = this.ListNewBorn[j].AgeFormated ? this.ListNewBorn[j].AgeFormated : ''
                const PID = this.ListNewBorn[j].PID ? this.ListNewBorn[j].PID : ''
                this.List[i] = { ...this.List[i], FullNameNewborn, Gender, DateOfBirth, AgeFormated, PID }
              }
            }
          }
          if (!this.dataItem) {
            this.List.map((item, index) => {
              if (index === this.List.length - 1) this.dataItem = item
            })
          }
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.formId = this.List[this.List.length - 1].Id
        })
        .catch(e => {
          this.loaded = true
        })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
