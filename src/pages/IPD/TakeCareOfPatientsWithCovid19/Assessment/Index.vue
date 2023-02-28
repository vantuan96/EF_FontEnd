<template>
  <div>
    <template v-if="loaded">
      <template v-if="Datas.length">
        <table class="standing-order-tbl">
          <tr>
            <th width="1" class="no-wrap">{{__t('STT')}}</th>
            <th width="100" class="no-wrap">{{__t('Ngày, giờ')}}</th>
            <th>{{__t('Nội dung đánh giá')}}</th>
            <th width="1" class="no-wrap">{{__t('Điều dưỡng chăm sóc')}}</th>
          </tr>
          <tr :data="item" :key="index" v-for="(item, index) in Datas">
            <td>{{index + 1}}</td>
            <td class="no-wrap">{{item.AssessmentAt}}</td>
            <td>
              <Details :key="index" :Datas="item.Datas" :readonly="IsLocked" :MASTERDATA="cloneObj(MASTERDATA)"/>
            </td>
            <td class="text-center">
              <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
              <div v-if="!readonly && !IsLocked"><router-link v-if="!confirmed(item) && item.CreatedBy === getCurrentUsername()" :to="{name: 'TakeCareOfPatientsWithCovid19Form', params: { Id: $route.params.Id, ItemId: item.Id }}" class="btn btn-sync-data">{{__t('Sửa')}}</router-link></div>
            </td>
          </tr>
        </table>
      </template>
      <div v-else class="text-center no-data-msg">
        {{__t('Chưa có đánh giá')}}
      </div>
      <div class="text-center" v-if="!readonly && !IsLocked"><router-link class="btn v-green-btn v-bottom-btn" :to="{name: 'TakeCareOfPatientsWithCovid19Form', params: { Id: $route.params.Id, ItemId: 'new' }}"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('Thêm đánh giá')}}</router-link></div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import TakeCareOfPatientsWithCovid19 from '@/services/IPD/TakeCareOfPatientsWithCovid19'
import Details from './View.vue'
import moment from 'moment'
import MixinMasterData from '@/mixins/masterdata.js'
export default {
  name: 'TakeCareOfPatientsWithCovid19Assessment',
  props: ['VisitId', 'VisitType', 'readonly'],
  mixins: [MixinMasterData],
  data () {
    return {
      loaded: false,
      IsLocked: false,
      Datas: [],
      LastConfirmDateTime: null
    }
  },
  components: {
    Details
  },
  mounted () {
    this.getMasterDatas({Form: 'IPDTCOPWC19'}, () => {
      this.getData()
    })
  },
  methods: {
    confirmed (item) {
      return this.LastConfirmDateTime && item.AssessmentAt && moment(this.LastConfirmDateTime) >= this.string2Moment(item.AssessmentAt)
    },
    getData () {
      if (this._VisitType === 'IPD') {
        new TakeCareOfPatientsWithCovid19().find('Assessment/CheckFormLocked/' + this._VisitId).then(response => {
          this.IsLocked = response.IsLocked
        })
      }
      new TakeCareOfPatientsWithCovid19().find('Assessment/' + this._VisitId).then(response => {
        this.Datas = response.Results
        this.LastConfirmDateTime = response.LastConfirmDateTime
        setTimeout(() => {
          this.loaded = true
        }, 500)
      })
    },
    newItem () {}
  }
}
</script>
