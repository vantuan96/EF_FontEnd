
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
              <a @click="setFormID(item.Id)">
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
            <Item :formId="formId" :VisitType="_VisitType" :viewOnly="true" :VisitId="_VisitId" :Version="Version" :FormCode="FormCode" />
          </div>
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

import Item from './Item.vue'
import FormApi from '@/services/FormAPI.js'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDIPD_A01_159_050919_VE',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  data () {
    return {
      Id: this.$route.params.Id,
      Lists: [],
      HasNewForm: false,
      ItemViewName: '',
      hasData: false,
      formId: null,
      formVersion: null,
      updateBy: null,
      updateAt: null,
      FormCode: 'A01_159_050919_VE',
      Version: 1
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
    this.APIService = new FormApi({
      VisitType: 'IPD',
      VisitId: this._VisitId,
      FormCode: 'A01_159_050919_VE'
    })
  },
  computed: {
  },
  methods: {
    setFormID (formId) {
      this.formId = formId
    },
    async getData () {
      this.APIService.GetList().then(res => {
        this.IsLocked = res.IsLock24h
        this.Version = res.Version
        if (res.Version >= 12) {
          this.FormCode = 'A01_159_110123_VE'
        }
        if (res.FORM_NOT_FOUND && res.FORM_NOT_FOUND.ViMessage === 'Form không tồn tại') {
        } else {
          this.DataSubmit = res
          let List = res.Datas.map((e, i) => {
            return {
              Id: e.Id,
              Index: i + 1,
              Label: this.$t('Phiếu'),
              CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
              Version: e.Version,
              CreatedBy: e.CreatedBy
            }
          })

          this.Lists = List
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.formId = List[List.length - 1].Id
          this.formVersion = List[List.length - 1].Version
        }

        this.loaded = true
      }).catch((e) => {
        this.IsLocked = e.data.IsLock24h
        this.loaded = true
        if (this.IsLocked) {
          this.NeedNew = false
        }
      })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
