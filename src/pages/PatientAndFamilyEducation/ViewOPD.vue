<template>
  <div v-if="!FormV2 && !Form">
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
          <Item :formId="formId" :VisitId="_VisitId" :VisitType="_VisitType" :viewOnly="true" v-if="formId" />
        </div>
      </div>
      <div class="text-center" v-else>
        <div v-if="IsLocked" style="color: red;" class="italic">
            <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
          </div>
          <div v-else><h4>{{__t('Chưa có phiếu giáo dục sức khỏe cho người bệnh và thân nhân')}}</h4></div>
        <!-- <h4>{{__t('Chưa có phiếu giáo dục sức khỏe cho người bệnh và thân nhân')}}</h4> -->
      </div>
    </div>
  </div>
  <Vcollapse @getData="getData()" ref="Vcollapse" v-else>
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span v-if="FormV2" class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : ''" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : ''}}</span>
      <span v-else-if="Form" class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form ? Form.UpdatedBy : ''" /> {{__t('lúc')}} {{Form ? Form.UpdateAt :  ''}}</span>
    </template>
    <template slot='content' v-if="hasData">
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
            <Item :formId="formId" :IsLocked="IsLocked" :VisitId="_VisitId" :VisitType="_VisitType" :viewOnly="true" v-if="formId" />
          </div>
        </div>
        <div class="text-center" v-else>
          <div v-if="IsLocked" style="color: red;" class="italic">
            <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
          </div>
          <div v-else><h4>{{__t('Chưa có phiếu giáo dục sức khỏe cho người bệnh và thân nhân')}}</h4></div>
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
import PatientAndFamilyEducation from '@/services/PatientAndFamilyEducation'
import Item from './ItemView.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDPFEF',
  props: ['VisitId', 'VisitType', 'Form', 'Label', 'FormV2', 'IsLocked'],
  data () {
    return {
      Id: this.$route.params.Id,
      List: [],
      HasNewForm: false,
      ItemViewName: '',
      hasData: false,
      formId: null
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
    this.ItemViewName = this._VisitType + 'PatientAndFamilyEducationView'
    if (!this.FormV2 && !this.Form) {
      this.getData()
    }
  },
  computed: {
  },
  methods: {
    getData () {
      new PatientAndFamilyEducation({VisitType: this._VisitType})
        .find('A03_045_290422_VE/' + this._VisitId)
        .then(response => {
          let List = response.map((e, i) => {
            return {
              Id: e.Id,
              Label: 'Lần ' + (i + 1),
              ViName: e.ViName,
              EnName: e.EnName
            }
          })
          this.List = List
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.formId = List[List.length - 1].Id
        })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
