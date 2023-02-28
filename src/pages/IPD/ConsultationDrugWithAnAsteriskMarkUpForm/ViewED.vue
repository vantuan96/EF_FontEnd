<template>
 <Vcollapse @getData="getData" ref="Vcollapse">
  <template slot="title">
   {{FormV2 ? FormV2.title : __label(Form)}}
  </template>
  <template slot="info">
    <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt :  Form.UpdatedAt}}</span>
  </template>
  <template slot="content" v-if="hasData">
   <div class="main-content">
    <div class="v-tab v-tab-2" v-if="Lists.length">
     <ul class="nav nav-tabs" role="tablist">
      <li
       :data="item"
       :key="index"
       v-for="(item, index) in Lists"
       :class="activeClass(item.Id)"
      >
       <a @click="setFormID(item.Id);">
        {{ item.Label }}
        <div>{{ item.CreatedAt | formatDateHourMinutesDDMMYYY }}</div>
        <div>
         <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
         <br v-else-if="item.CreatedBy === ''" />
        </div>
       </a>
      </li>
     </ul>
     <div class="tab-content">
      <Item
       v-if="formId"
       :formId="formId"
       :VisitType="_VisitType"
       :viewOnly="true"
       :VisitId="_VisitId"
      />
     </div>
    </div>
    <div class="text-center" v-else>
     <!--
      <h4>{{__t('Chưa có phiếu giáo dục sức khỏe cho người bệnh và thân nhân')}}</h4>
     -->
    </div>
   </div>
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
// import CoronaryInterventionService from '@/services/IPD/CoronaryIntervention/CoronaryInterventionService'
// import ConsultationDrugWithAnAsteriskService from '@/services/IPD/CoronaryIntervention/ConsultationDrugWithAnAsteriskService'
import ConsultationDrugWithAnAsteriskServiceED from '@/services/IPD/CoronaryIntervention/ConsultationDrugWithAnAsteriskServiceED'
import Item from './Item.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'EDConsultationDrugWithAnAsteriskMark',
  props: ['VisitId', 'Form', 'VisitType', 'ViewItem', 'FormV2'],
  data () {
    return {
      Id: this.$route.params.Id,
      Lists: null,
      HasNewForm: false,
      ItemViewName: '',
      hasData: false,
      timeTM: '11/05/2022',
      formId: null,
      updateBy: null,
      updateAt: null
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
  computed: {
  },
  methods: {
    setFormID (formId) {
      this.formId = formId
    },
    getType (type) {
      console.log('type', type)
    },
    getData () {
      this.VisitType = 'ED'
      const id = this.VisitId ? this.VisitId : this.$route.params.Id
      console.log('type', this.VisitType)
      new ConsultationDrugWithAnAsteriskServiceED().find('/All/' + id + '?hidemsg=' + true).then(response => {
        let List = response.Datas.map((e, i) => {
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
        this.formId = List[List.length - 1].Id
      }).catch(() => {
      })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
