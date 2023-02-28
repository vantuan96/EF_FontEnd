<template>
  <Vcollapse @getData="getVision" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="main-content" style="padding: 0 150px;" v-if="!version">
        <PageContent :viewOnly="true" :VisitId="_VisitId" :VisitType="_VisitType"/>
      </div>
      <div class="main-content" style="padding: 0 150px;" v-else>
        <div class="v-tab v-tab-2" v-if="Lists.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in Lists" :class="activeClass(item.Id)">
              <a @click="setFormID(item.Id)">
                <div>Phiếu {{index + 1}}</div>
                <div>{{item.CreatedAt | formatDateWithoutSecon}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
                </div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <item v-if="formId" :versionCheck="versionCheck" :formId="formId" :VisitType="_VisitType" :viewOnly="true" :VisitId="_VisitId"/>
          </div>
        </div>
        <div class="text-center" v-else>
          <!-- <h4>{{__t('Chưa có phiếu giáo dục sức khỏe cho người bệnh và thân nhân')}}</h4> -->
        </div>
      </div>
      <p style="padding: 0 160px;">A01_151_050919_VE</p>
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
import GetSurgeryCertificate from '@/services/IPD/SurgeryCertificate/GetSurgeryCertificate'
// import GetListAllSumOf15DayTreatments from '@/services/IPD/SummaryOf15DayTreatment/GetListAllSumOf15DayTreatments'
import item from './item'
import PageContent from './PageContent.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'IPDSurgeryCertificate',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  data () {
    return {
      Id: this._VisitId,
      Lists: null,
      HasNewForm: false,
      ItemViewName: '',
      hasData: false,
      formId: null,
      updateBy: null,
      updateAt: null,
      version: false,
      versionCheck: '',
      id: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    item,
    PageContent
  },
  updated () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    setFormID (formId) {
      this.formId = formId
      let checkVersion = this.Lists.filter(element => element.Id === formId)
      this.versionCheck = checkVersion[0].Version
    },
    getVision () {
      new GetSurgeryCertificate().find(this._VisitId + '?hidemsg=' + true).then(res => {
        if (res.Version === '2') {
          this.version = true
          this.getListData()
        } else {
          this.version = false
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
        }
      }).catch(e => {
        this.version = true
      })
    },
    getListData () {
      new GetSurgeryCertificate().find('All/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.Lists = response.forms_result
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
        if (response.forms_result && response.forms_result.length) {
          this.formId = response.forms_result[response.forms_result.length - 1].Id
        }
      })
    },
    // getData () {
    //   new GetListAllSumOf15DayTreatments().find(this._VisitId + '?hidemsg=' + true).then(response => {
    //     let List = response.Datas.map((e, i) => {
    //       return {
    //         Id: e.Id,
    //         Label: 'Phiếu ' + (i + 1),
    //         ViName: 'Phiếu ' + (i + 1),
    //         EnName: 'Phiếu ' + (i + 1),
    //         CreatedAt: e.CreatedAt,
    //         CreatedBy: e.CreatedBy
    //       }
    //     })
    //     this.Lists = List
    //     this.hasData = true
    //     if (this.$refs.Vcollapse) {
    //       this.$refs.Vcollapse.setHasData()
    //     }
    //     this.formId = List[List.length - 1].Id
    //   }).catch(() => {
    //   })
    // }
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
