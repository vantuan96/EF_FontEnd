<template>
  <Vcollapse @getData="getData" ref="Vcollapse">
    <template slot='title'>
      {{__label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}}: {{Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <h2 class="text-center cap mrb30 fw600">{{__t('Phiếu khám lâm sàng vú')}}</h2>
      <div class="main-content">
        <div class="v-tab v-tab-2" v-if="Lists.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in Lists" :class="activeClass(item.Id)">
              <a @click="setFormID(item.Id)" class="text-center">
                {{item.Label}}
                <div>{{item.CreatedAt }}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
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
        <p>A03_116_200520_V</p>
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
import Item from './Item.vue'
// import ClinicalBreastExamNote from '@/services/OPD/ClinicalBreastExamNote'

export default {
  /**
   * The name of the page.
   */
  name: 'ExFormsView',
  props: ['VisitId', 'Form', 'VisitType'],
  data () {
    return {
      Id: this._VisitId,
      Lists: null,
      HasNewForm: false,
      hasData: false,
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
  mounted () {
  },
  computed: {
  },
  methods: {
    setFormID (formId) {
      this.formId = formId
    },
    getData () {
      // new ClinicalBreastExamNote().find('OPD/' + this._VisitId + '?hidemsg=' + true).then(response => {
      //   let List = response.Datas.map((e, i) => {
      //     return {
      //       Id: e.Id,
      //       Label: 'Phiếu ' + (i + 1),
      //       ViName: 'Phiếu ' + (i + 1),
      //       EnName: 'Phiếu ' + (i + 1),
      //       CreatedAt: e.CreatedAt,
      //       CreatedBy: e.CreatedBy
      //     }
      //   })
      //   this.Lists = List
      //   this.hasData = true
      //   if (this.$refs.Vcollapse) {
      //     this.$refs.Vcollapse.setHasData()
      //   }
      //   this.formId = List[List.length - 1].Id
      // }).catch(() => {
      // })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
<style scoped>
.flex-containerx {
  margin-right: 0px!important;
}
</style>
