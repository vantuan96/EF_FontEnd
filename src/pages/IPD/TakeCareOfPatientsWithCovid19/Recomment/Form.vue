<template>
  <div class="main-content">
    <template v-if="loaded">
      <h3 class="text-center">{{__t('Chăm sóc người bệnh Covid-19 - Lưu ý khi bàn giao ca')}}</h3>
      <div class="sync-ed-box">
        <div class="box border-box">
          <div class="box-body">
            <div class="row">
              <div class="col-md-12" >
                <div>
                  <label>{{__t('Thời gian bàn giao')}}</label>
                </div>
                <v-date-picker :noclearable="true" :hideTooltip="true" class="w1510 display-inline" :format="'HH:mm DD/MM/YYYY'" v-model="DataSubmit.HandOverAt"/>
              </div>
            </div>
            <div class=" mt-10">
              <md-input-text v-if="MASTERDATA['IPDTCOPRC19TG']" v-model="MASTERDATA['IPDTCOPRC19TG']"/>
              <md-input-text v-if="MASTERDATA['IPDTCOPRC19HH']" v-model="MASTERDATA['IPDTCOPRC19HH']"/>
            </div>
            <div class="row">
              <template :data="item" v-for="(item, index) in MASTERDATA['IPDTCOPRC19MH'].Items">
                <div class="col-md-4"  :key="item.Code + '-' +index">
                  <div class="form-group display-inline-block">
                    <label>{{__label(item)}}</label>
                    <div>
                      <div class="v-addone-input-group2">
                        <number-input inline v-model="item.Value" :placeholder="__t('Nhập')"/>
                        <span>{{__t('Điểm')}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="row">
              <div class="col-md-12" >
                <label>{{__label(MASTERDATA['IPDTCOPRC19CT'])}}</label>
                <MDCheckbox :indexs="[0, 1, 2]" :noFlex="true" v-model="MASTERDATA['IPDTCOPRC19CT']"/>
                <div class="flex-box">
                  <MDCheckbox :indexs="[3]" :noFlex="true" v-model="MASTERDATA['IPDTCOPRC19CT']"/>
                  <input :placeholder="__t('Nhập')" class="form-control" v-if="MASTERDATA['IPDTCOPRC19CT'].Items[3].Value" v-model="MASTERDATA['IPDTCOPRC19CT'].Items[4].Value"/>
                </div>
                <div class="flex-box">
                  <MDCheckbox :indexs="[5]" :noFlex="true" v-model="MASTERDATA['IPDTCOPRC19CT']"/>
                  <input :placeholder="__t('Nhập')" class="form-control" v-if="MASTERDATA['IPDTCOPRC19CT'].Items[5].Value" v-model="MASTERDATA['IPDTCOPRC19CT'].Items[6].Value"/>
                </div>
                <div class="mt-10">
                  <div class="flex-box flex-center">
                    <span class="mr-5">{{__t('TD sinh hiệu mỗi')}}</span>
                    <number-input inline v-model="MASTERDATA['IPDTCOPRC19CT'].Items[7].Value" :placeholder="__t('Nhập')"/>
                    <span class="ml-5">{{__t('giờ')}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  name: 'TakeCareOfPatientsWithCovid19RecommentForm',
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      loaded: false,
      DataSubmit: {
        HandOverAt: null
      }
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
    this.getMasterDatas({Form: 'IPDTCOPRC19'}, () => {
      if (this.isNewForm) {
        this.DataSubmit.HandOverAt = moment(new Date()).format(this.vDateTimeFormat)
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
        new TakeCareOfPatientsWithCovid19().update('/Recomment/' + this.submitUrl, DataSubmit).then(response => {
          this.toastedSuccess()
          this.edited = false
          this.back()
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    getData () {
      new TakeCareOfPatientsWithCovid19().find('Recomment/' + this.$route.params.Id + '/' + this.$route.params.ItemId).then(response => {
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
