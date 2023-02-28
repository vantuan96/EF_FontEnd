<template>
  <div class="ExForm-PageContent" id="ExForm-PageContent">
    <div class="content">
      CONTENT
    </div>
    <!-- <div class="text-center" v-else>
      <h4>{{__t('Chưa có thông tin !')}}</h4>
      <button class="btn v-yellow-btn" v-if="!IsLocked" @click="confirmPopupCreate()">{{__t('Tạo mới')}}</button>
    </div> -->
    <FloatBlock :openBack="true" @handleBack="handleBack">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-6 col-sm-6" v-if="!readonly">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
  </div>
</template>

<script>
import moment from 'moment'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
// import $ from 'jquery'

export default {
  name: 'ExForm-PageContent',
  props: ['viewOnly, VisitId'],
  components: {
    VDateTimePicker3
  },
  data () {
    return {
      DataSubmit: [],
      IsLocked: false,
      icd10Code: [],
      time: moment().format('HH:mm DD/MM/YYYY')
    }
  },
  mixins: [MixinMasterData],
  mounted () {
    this.getMasterDatas({Form: 'OPDPKLSV'}, () => {
      this.getData()
    })
  },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    },
    readonly () {
      return this.viewOnly
    }
  },
  methods: {
    getData () {
      // new ClinicalBreastExamNote().find('A03_116_200520_V/' + this._VisitId + '/' + this._ItemId).then((res) => {
      //   this.DataSubmit = res
      //   this.DoctorConfirmAt = res.DoctorConfirmAt
      //   this.mapData()
      // }).catch((e) => {
      //   console.log(e)
      // })
    },
    // popup cảnh báo dữ liệu chưa lưu
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value || [], true)
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = null
            }
          })
        }
      }
      this.dataMaster = JSON.stringify(this.MASTERDATA)
    },
    // xác nhận tạo mới
    confirmPopupCreate () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Tạo phiếu ...'),
        text: this.$t('Bạn có chắc chắn tạo ...?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreate()
            }
          },
          {
            title: this.$t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleSubmit () {
    },
    handleCreate () {
    }
  }
}
</script>

<style lang="stylus" scoped>
.BradenScoreboard-PageNurse {
</style>
