<template>
  <div class="main-content">
    <template v-if="loaded && DataSubmit">
      <h3 class="text-center">{{__t('Chăm sóc người bệnh Covid-19')}}</h3>
      <div class="sync-ed-box">
        <table class="standing-order-tbl" :class="{'disable': isReadonly}">
          <tr>
            <td class="bg-head b-b-2" colspan="2"><label>{{__t('Thời gian đánh giá')}}</label></td>
            <td class="b-b-2"><v-date-picker :noclearable="true" :hideTooltip="true" class="w1510 display-inline" :format="'HH:mm DD/MM/YYYY'" v-model="DataSubmit.AssessmentAt"/></td>
          </tr>
          <tr v-if="MASTERDATA['IPDTCOPWC19HH']">
            <td class="p-r bg-head font-bold b-b-2" rowspan="4" width="50px">
              <div class="text-rotate-90 no-wrap">{{__t('Đánh giá người bệnh')}}</div>
            </td>
            <td class="bg-head font-bold" width="270">
              {{__label(MASTERDATA['IPDTCOPWC19HH'])}}
            </td>
            <td>
              <MDRadio :indexs="[0, 1, 2]" :noFlex="true" v-if="MASTERDATA['IPDTCOPWC19HH']" v-model="MASTERDATA['IPDTCOPWC19HH']"/>
              <div class="flex-box">
                <MDRadio :indexs="[3]" :noFlex="true" v-if="MASTERDATA['IPDTCOPWC19HH']" v-model="MASTERDATA['IPDTCOPWC19HH']"/>
                <MdRextarea v-if="MASTERDATA['IPDTCOPWC19HH'].Items[3].Value" v-model="MASTERDATA['IPDTCOPWC19HH'].Items[4]"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDTCOPWC19DN']">
            <td  class="bg-head font-bold">
              {{__label(MASTERDATA['IPDTCOPWC19DN'])}}
            </td>
            <td>
              <MDRadio :indexs="[0, 1, 2]" :noFlex="true" v-if="MASTERDATA['IPDTCOPWC19DN']" v-model="MASTERDATA['IPDTCOPWC19DN']"/>
              <div class="flex-box">
                <MDRadio :indexs="[3]" :noFlex="true" v-if="MASTERDATA['IPDTCOPWC19DN']" v-model="MASTERDATA['IPDTCOPWC19DN']"/>
                <MdRextarea v-if="MASTERDATA['IPDTCOPWC19DN'].Items[3].Value" v-model="MASTERDATA['IPDTCOPWC19DN'].Items[4]"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDTCOPWC19DD']">
            <td  class="bg-head font-bold">
              {{__label(MASTERDATA['IPDTCOPWC19DD'])}}
            </td>
            <td>
              <div class="flex-box">
                <MDRadio :noFlex="true" :indexs="[0]" v-model="MASTERDATA['IPDTCOPWC19DD']"/>
                <input :placeholder="__t('Nhập')" class="form-control" v-if="MASTERDATA['IPDTCOPWC19DD'].Items[0].Value" v-model="MASTERDATA['IPDTCOPWC19DD'].Items[1].Value"/>
              </div>
              <div class="flex-box">
                <MDRadio :noFlex="true" :indexs="[2]" v-model="MASTERDATA['IPDTCOPWC19DD']"/>
                <input :placeholder="__t('Nhập')" class="form-control" v-if="MASTERDATA['IPDTCOPWC19DD'].Items[2].Value" v-model="MASTERDATA['IPDTCOPWC19DD'].Items[3].Value"/>
              </div>
              <MDRadio :noFlex="true" :indexs="[4]" v-model="MASTERDATA['IPDTCOPWC19DD']"/>
              <div class="flex-box">
                <MDRadio :noFlex="true" :indexs="[5]" v-model="MASTERDATA['IPDTCOPWC19DD']"/>
                <MdRextarea v-if="MASTERDATA['IPDTCOPWC19DD'].Items[5].Value" v-model="MASTERDATA['IPDTCOPWC19DD'].Items[6]"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDTCOPWC19TCK']">
            <td  class="bg-head font-bold b-b-2">
              {{__label(MASTERDATA['IPDTCOPWC19TCK'])}}
            </td>
            <td class=" b-b-2">
              <MDCheckbox v-model="MASTERDATA['IPDTCOPWC19TCK']"/>
              <label>{{__t('Khác')}}:</label>
              <MDCustomTextboxs v-model="MASTERDATA['IPDTCOPWC19TCK'].Items[6].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDTCOPWC19HTHH']">
            <td class="p-r bg-head font-bold b-b-2" rowspan="3" width="50px">
              <div class="text-rotate-90 no-wrap">{{__t('Chăm sóc')}}</div>
            </td>
            <td class="bg-head font-bold" width="270">
              {{__label(MASTERDATA['IPDTCOPWC19HTHH'])}}
            </td>
            <td>
              <MDRadio :noFlex="true" :indexs="[0, 1]" v-model="MASTERDATA['IPDTCOPWC19HTHH']"/>
              <div class="flex-box">
                <MDRadio :noFlex="true" :indexs="[2]" v-model="MASTERDATA['IPDTCOPWC19HTHH']"/>
                <input :placeholder="__t('Nhập')" class="form-control" v-if="MASTERDATA['IPDTCOPWC19HTHH'].Items[2].Value" v-model="MASTERDATA['IPDTCOPWC19HTHH'].Items[10].Value"/>
                <span class="no-wrap ml-5" v-if="MASTERDATA['IPDTCOPWC19HTHH'].Items[2].Value">{{MASTERDATA['IPDTCOPWC19HTHH'].Items[10].Note}}</span>
              </div>
              <MDRadio :noFlex="true" :indexs="[3, 4, 5, 6]" v-model="MASTERDATA['IPDTCOPWC19HTHH']"/>
              <div class="flex-box">
                <MDRadio :noFlex="true" :indexs="[7]" v-model="MASTERDATA['IPDTCOPWC19HTHH']"/>
                <input :placeholder="__t('Nhập')" class="form-control" v-if="MASTERDATA['IPDTCOPWC19HTHH'].Items[7].Value" v-model="MASTERDATA['IPDTCOPWC19HTHH'].Items[11].Value"/>
              </div>
              <div class="flex-box">
                <MDRadio :noFlex="true" :indexs="[8]" v-model="MASTERDATA['IPDTCOPWC19HTHH']"/>
                <input :placeholder="__t('Nhập')" class="form-control" v-if="MASTERDATA['IPDTCOPWC19HTHH'].Items[8].Value" v-model="MASTERDATA['IPDTCOPWC19HTHH'].Items[9].Value"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDTCOPWC19CSCB']">
            <td  class="bg-head font-bold">
              {{__label(MASTERDATA['IPDTCOPWC19CSCB'])}}
            </td>
            <td>
              <MDCheckbox :noFlex="true" :indexs="[0, 1, 2, 3]" v-model="MASTERDATA['IPDTCOPWC19CSCB']"/>
              <div class="flex-box">
                <MDCheckbox :noFlex="true" :indexs="[4]" v-model="MASTERDATA['IPDTCOPWC19CSCB']"/>
                <input :placeholder="__t('Nhập')" class="form-control" v-if="MASTERDATA['IPDTCOPWC19CSCB'].Items[4].Value" v-model="MASTERDATA['IPDTCOPWC19CSCB'].Items[10].Value"/>
              </div>
              <MDCheckbox :noFlex="true" :indexs="[5]" v-model="MASTERDATA['IPDTCOPWC19CSCB']"/>
              <MDCheckbox :noFlex="true" :indexs="[6]" v-model="MASTERDATA['IPDTCOPWC19CSCB']"/>
              <MDCheckbox :noFlex="true" :indexs="[7]" v-model="MASTERDATA['IPDTCOPWC19CSCB']"/>
              <MDCheckbox :noFlex="true" :indexs="[8]" v-model="MASTERDATA['IPDTCOPWC19CSCB']"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDTCOPWC19CSK']">
            <td  class="bg-head font-bold  b-b-2">
              {{__label(MASTERDATA['IPDTCOPWC19CSK'])}}
            </td>
            <td class=" b-b-2">
              <MDCheckbox :noFlex="true" v-model="MASTERDATA['IPDTCOPWC19CSK']"/>
              <label>{{__t('Khác')}}:</label>
              <MDCustomTextboxs v-model="MASTERDATA['IPDTCOPWC19CSK'].Items[2].Value"/>
            </td>
          </tr>
          <tr v-if="DataSubmit && DataSubmit.CreatedBy">
            <td colspan="3">
              {{__t('Điều dưỡng chăm sóc')}} <ad-Info v-if="DataSubmit.CreatedBy" :ad="DataSubmit.CreatedBy" /> {{__t('lúc')}} {{DataSubmit.CreatedAt}}
            </td>
          </tr>
        </table>
        <FloatBlock v-if="!isReadonly">
          <template slot='buttons'>
            <div class="col-md-4">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group1">
                <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import TakeCareOfPatientsWithCovid19 from '@/services/IPD/TakeCareOfPatientsWithCovid19'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import NProgress from 'nprogress'
import moment from 'moment'
import VDatePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'TakeCareOfPatientsWithCovid19AssessmentForm',
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      loaded: false,
      DataSubmit: {}
    }
  },
  components: {
    VDatePicker
  },
  computed: {
    isReadonly: function () {
      return this.DataSubmit.CreatedBy && this.DataSubmit.CreatedBy !== this.getCurrentUsername()
    },
    isNewForm: function () {
      return this.$route.params.ItemId && this.$route.params.ItemId === 'new'
    },
    submitUrl: function () {
      if (this.isNewForm) return 'Create/' + this.$route.params.Id
      return 'Update/' + this.$route.params.Id + '/' + this.$route.params.ItemId
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'IPDTCOPWC19'}, () => {
      if (this.isNewForm) {
        this.DataSubmit.AssessmentAt = moment(new Date()).format(this.vDateTimeFormat)
        this.loaded = true
      } else {
        this.getData()
      }
    })
  },
  methods: {
    submit () {
      NProgress.start()
      this.mapData2MDData()
      var DataSubmit = Object.assign({}, this.DataSubmit)
      setTimeout(() => {
        new TakeCareOfPatientsWithCovid19().update('/Assessment/' + this.submitUrl, DataSubmit).then(response => {
          this.toastedSuccess()
          this.edited = false
          this.back()
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    getData () {
      new TakeCareOfPatientsWithCovid19().find('Assessment/' + this.$route.params.Id + '/' + this.$route.params.ItemId).then(response => {
        this.DataSubmit = response
        this.mapMdData2Data()
        setTimeout(() => {
          this.loaded = true
        }, 500)
      })
    },
    newItem () {}
  }
}
</script>
