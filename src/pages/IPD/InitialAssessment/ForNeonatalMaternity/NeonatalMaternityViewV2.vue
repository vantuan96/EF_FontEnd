<template>
  <Vcollapse @getData="getTypeOfSpecial()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData && checkSpecial === 'A01_035_050919_V'">
      <div class="main-content">
        <div class="v-tab v-tab-2" v-if="List.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" :class="activeClass(item.Id)">
              <a @click="setFromID(item.Id)">
                {{item.Label}} {{item.NewbornName ? ' - ' + item.NewbornName : ''}}
                <!-- <div>{{item.CreatedAt}}</div> -->
              </a>
            </li>
          </ul>
          <div class="tab-content pt-15">
            <Item :formId="formId" :VisitType="_VisitType" :viewOnly="true" :VisitId="_VisitId" />
            <!-- <p class=" pt-15">A01_250_061022_VE</p> -->
          </div>
        </div>
        <div class="text-center" v-else>
          <!-- <h4>{{__t('Chưa có phiếu giáo dục sức khỏe cho người bệnh và thân nhân')}}</h4> -->
        </div>
      </div>
    </template>
    <template slot='content' v-if="hasData && checkSpecial === 'A01_038_050919_V'">
      <Item :VisitType="_VisitType" :viewOnly="true" :VisitId="_VisitId" />
    </template>
  </Vcollapse>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import InitialAssessment from '@/services/IPD/InitialAssessment'
import Item from './ForNeonatalMaternityItemV2.vue'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDForNeonatalMaternity_Obstetrics',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  data () {
    return {
      Id: this.$route.params.Id,
      List: [],
      HasNewForm: false,
      ItemViewName: '',
      hasData: false,
      formId: null,
      NewbornCustomerId: null,
      NewbornName: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Item
  },
  updated () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    setFromID (formId) {
      this.formId = formId
    },
    getTypeOfSpecial () {
      new InitialAssessment().find('ForNeonatalMaternityV2/InforVersion/' + this._VisitId).then(response => {
        this.checkSpecial = response.MedicalRecordCode
        // this.checkSpecial = 'A01_038_050919_V'
        if (this.checkSpecial === 'A01_035_050919_V') {
          this.getDataWomen()
        } else if (this.checkSpecial === 'A01_038_050919_V') {
          this.getDataNewBorn()
        }
        // this.getDataNewBorn()
      }).catch(err => {
        console.log(err)
      })
    },
    getDataNewBorn () {
      new InitialAssessment().find('ForNeonatalMaternityV2/A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity').then(response => {
        this.dataNewBorn = response
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
      }).catch(err => {
        console.log(err)
        this.dataNewBorn = null
      })
    },
    getDataWomen () {
      new InitialAssessment().find('ForNeonatalMaternityV2/GetList/' + this._VisitId).then(response => {
        let List = response.Forms.map((e, i) => {
          return {
            Id: e.Id,
            Label: 'Sơ sinh ' + (i + 1),
            ViName: 'Sơ sinh ' + (i + 1),
            EnName: 'Sơ sinh ' + (i + 1),
            NewbornCustomerId: response.Forms[response.Forms.length - 1].NewbornCustomer.Id,
            CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
            NewbornName: response.Forms[i].NewbornCustomer.FullName
          }
        })
        this.NewbornCustomerId = response.Forms[response.Forms.length - 1].NewbornCustomer.Id
        this.List = List
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
        this.formId = List[List.length - 1].Id
      }).catch(err => {
        console.log(err)
        this.List = []
      })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
