<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="main-content">
        <div class="v-tab v-tab-2" v-if="List.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" :class="activeClass(item.Id)">
              <a @click="setFromID(item.Id)">
                {{item.Label}}
                <div>{{item.CreatedAt}}</div>
              </a>
            </li>
          </ul>
          <div class="tab-content pt-15">
            <Item :formId="formId" :VisitType="_VisitType" :viewOnly="true" v-if="formId" :VisitId="_VisitId" />
            <p class=" pt-15">A01_057_050919_VE</p>
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
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import JointConsultationGroupMinutes from '@/services/JointConsultationGroupMinutes'
import Item from './Item.vue'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDJointConsultationGroupMinutes',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
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
  },
  computed: {
  },
  methods: {
    setFromID (formId) {
      this.formId = formId
    },
    getData () {
      new JointConsultationGroupMinutes({}, this._VisitType).find('List/' + this._VisitId + '?hidemsg=' + true).then(response => {
        let List = response.map((e, i) => {
          return {
            Id: e.Id,
            Label: 'Phiếu ' + (i + 1),
            ViName: 'Phiếu ' + (i + 1),
            EnName: 'Phiếu ' + (i + 1),
            CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY')
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
