<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="text-center flex-box flex-center brsac-form">
        {{__t('Số')}}: <span class="fake-input disable">{{data.Number || 'N/A'}}</span>
        <div class="group-radio">
          <span class="el-radio-view">{{data.IsFrequently ? __t("Thường quy") : __t('Cấp cứu ')}}</span>
        </div>
      </div>
      <div class="v-tab">
        <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
          <li role="presentation" :class="activeClass('PurchaseRequest')">
            <a @click="type = 'PurchaseRequest'">{{__t('Dự trù máu và chế phẩm máu')}}</a>
          </li>
          <li role="presentation" :class="activeClass('Supply')">
            <a @click="type = 'Supply'">{{__t('Cung cấp máu và chế phẩm máu')}}</a>
          </li>
          <li role="presentation" :class="activeClass('TransfusionConfirmation')">
            <a @click="type = 'TransfusionConfirmation'">{{__t('Xác nhận thực hiện truyền máu và chế phẩm máu')}}</a>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <component v-if="type in $options.components" v-bind:is="type" :viewOnly="true" :VisitId="_VisitId" :VisitType="_VisitType"/>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
// import NProgress from 'nprogress'
// import $ from 'jquery'
import PurchaseRequest from './PurchaseRequest.vue'
import Supply from './Supply.vue'
import TransfusionConfirmation from './TransfusionConfirmation.vue'
import BloodRequestSupplyAndConfirmation from '@/services/ED/BloodRequestSupplyAndConfirmation'
export default {
  /**
   * The name of the page.
   */
  name: 'EDBloodRequestSupplyAndConfirmation',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      type: 'PurchaseRequest',
      data: {}
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    PurchaseRequest,
    Supply,
    TransfusionConfirmation
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    getData () {
      new BloodRequestSupplyAndConfirmation({}, this._VisitType).find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.data = response
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
      })
    },
    activeClass (link) {
      return link === this.type ? 'active' : ''
    }
  }
}
</script>
