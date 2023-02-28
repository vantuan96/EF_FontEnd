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
        <div class="v-tab v-tab-2" v-if="Lists.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in Lists" :class="activeClass(item.Id)">
              <a @click="setFormID(item.Id, item.Version)">
                <div>
                {{__t(item.Label)}}
                {{item.Index}}
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
            <Item v-if="formId && formVersion === '1'" :formId="formId" :VisitType="_VisitType" :viewOnly="true" :VisitId="_VisitId"/>
            <ItemV2 v-if="formId && formVersion === '2'" :formId="formId" :VisitType="_VisitType" :viewOnly="true" :VisitId="_VisitId"/>
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
import TrickSummary from '@/services/TrickSummary'
import Item from './Item.vue'
import ItemV2 from './ItemV2.vue'
import moment from 'moment'

export default {
  /**
   * The name of the page.
   */
  name: 'OPDTrickSummary',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  data () {
    return {
      Id: this.$route.params.Id,
      Lists: null,
      HasNewForm: false,
      ItemViewName: '',
      hasData: false,
      formId: null,
      formVersion: null,
      updateBy: null,
      updateAt: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Item, ItemV2
  },
  updated () {
  },
  mounted () {
  },
  // watch: {
  //   formId: {
  //     handler () {
  //       this.getData()
  //     }
  //   }
  // },
  computed: {
  },
  methods: {
    setFormID (formId, formVersion) {
      this.formId = formId
      this.formVersion = formVersion
    },
    getData () {
      new TrickSummary({}, this._VisitType).find('GetListItemsByVisitId/' + this._VisitId + '?hidemsg=' + true).then(response => {
        console.log(response, 'response i receive')
        let List = response.ListItems.map((e, i) => {
          return {
            Id: e.Id,
            Index: i + 1,
            Label: this.$t('Phiếu'),
            Version: e.Version,
            // Label: this.__t('Phiếu') + ' ' + (i + 1),
            // ViName: this.__t('Phiếu') + ' ' + (i + 1),
            // EnName: this.__t('Phiếu') + ' ' + (i + 1),
            CreatedAt: moment(e.CreateAt).format('HH:mm DD/MM/YYYY'),
            CreatedBy: e.CreateBy
          }
        })
        this.Lists = List
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
        this.formId = List[List.length - 1].Id
        this.formVersion = List[List.length - 1].Version
      })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
