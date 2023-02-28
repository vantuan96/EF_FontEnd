<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <StandingOrderViewOnlyOPD :DataSubmit="DataSubmit" :MASTERDATATMP="MASTERDATA" />
      <br/>
      <p><b>{{__t('Trạng thái')}}:</b> {{__label(DataSubmit.Status)}}</p>
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

import StandingOrderForRetailService from '@/services/ED/StandingOrderForRetailService'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDStandingOrderForRetailService',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  data () {
    return {
      DataSubmit: {},
      hasData: false
    }
  },
  mixins: [],
  components: {
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getData () {
      new StandingOrderForRetailService({}, this._VisitType).find(this._VisitId + '?hidemsg=' + true).then(response => {
        response.Datas.map((e, index) => {
          if (e.Note) {
            var n = this.JSONParse(e.Note)
            e.Note = n || []
          } else {
            e.Note = []
          }
          if (!e.Route) {
            e.Route = ''
          }
          return e
        })
        if (response.Status && response.Status.EnName === 'In hospital') response.Status.ViName = 'BN đang thực hiện dịch vụ lẻ'
        response.ListStatus.forEach(e => {
          if (e.EnName === 'In hospital') e.ViName = 'BN đang thực hiện dịch vụ lẻ'
        })
        this.DataSubmit = response
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
      })
    }
  }
}
</script>
