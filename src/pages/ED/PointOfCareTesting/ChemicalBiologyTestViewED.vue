<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <!-- <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{Form.UpdatedAt}}</span> -->
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt :  Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData && Version !== 2">
      <div class="main-content">
        <div class="v-tab v-tab-2" v-if="List.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" :class="activeClass(item.Id)">
              <a @click="formId = item.Id">
                {{item.Label}}<template v-if="item.ViName"> - {{__label(item)}}</template>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <ChemicalBiologyTest :formId="formId" :VisitId="_VisitId" :VisitType="VisitType" :viewOnly="true" v-if="formId" />
          </div>
        </div>
        <div class="text-center" v-else>
          <h4>{{__t('Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+')}}</h4>
        </div>
      </div>
    </template>
    <template slot='content' v-if="hasData && Version === 2">
      <div class="main-content">
        <!-- Version-2 -->
        <div class="v-tab v-tab-2" v-if="List.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" :class="activeClass(item.Id)">
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
            <ChemicalBiologyTestV2 :formId="formId" :VisitId="_VisitId" :VisitType="VisitType" :viewOnly="true" v-if="formId" />
          </div>
        </div>
        <div class="text-center" v-else>
          <h4>{{__t('Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+')}}</h4>
        </div>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
/*

 * The home index page.
 */
import EDPointOfCareTesting from '@/services/ED/EDPointOfCareTesting'
import MixinForm from '@/mixins/form.js'
import ChemicalBiologyTest from './ChemicalBiologyTest.vue'
import ChemicalBiologyTestV2 from './ChemicalBiologyTestV2.vue'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'EDChemicalBiologyTest',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  mixins: [MixinForm],
  data () {
    return {
      List: true,
      hasData: false,
      formId: null,
      Version: null,
      FormCode: 'A03_039_080322_V'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    ChemicalBiologyTest,
    ChemicalBiologyTestV2
  },
  mounted () {
  },
  methods: {
    setFormID (formId) {
      this.formId = formId
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    },
    getData () {
      new EDPointOfCareTesting({VisitType: this._VisitType, hidemsg: true}).find('ChemicalBiologyTest/' + `${this.FormCode}/` + this._VisitId).then(async response => {
        if (response.Datas.length) {
          this.Version = await response.Datas[0].Version
        } else {
          this.Version = await 2
        }
        if (this.Version !== 2) {
          let List = response.Datas.map((e, i) => {
            return {
              Id: e.Id,
              Label: 'Lần ' + (i + 1)
            }
          })
          this.List = List
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.formId = List[List.length - 1].Id
        } else {
          let List = response.Datas.map((e, i) => {
            return {
              Id: e.Id,
              Label: this.__t('Lần') + ' ' + (i + 1),
              ViName: this.__t('Lần') + ' ' + (i + 1),
              EnName: this.__t('Lần') + ' ' + (i + 1),
              CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
              CreatedBy: e.CreatedBy
            }
          })
          this.List = List
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.formId = List[List.length - 1].Id
        }
      })
    }
  }
}
</script>
