<template>
  <div>
    <template v-if="loaded">
      <div class="content box-body" v-if="HasData" style="border: 1px solid #ccc;">
        <div class="flex align-center">
          <div class="fw600 mrr5">{{__label(MASTERDATA['KHHTP01'])}}:</div>
          <div class="mrr20" v-if="Info" style="width: 109px;">{{getFTime2(Info.Requestdate)}}</div>
          <div class="fw600 mrr5">{{__label(MASTERDATA['KHHTP02'])}}:</div>
          <ad-info v-if="Info" :ad="Info.AnesthesiologistName"/>
        </div>
        <div class="mrt10 fw600 box-block">{{__label(MASTERDATA['KHHTP03'])}}:</div>
        <div class="mrt10 flex align-center">
          <div class="mrr5">{{__label(MASTERDATA['KHHTP04'])}}:</div>
          <div v-if="Info && Info.Diagnosis">{{getChuanDoan({DiagnosisAndICD: Info.Diagnosis})}}</div>
        </div>
        <div class="mrt10 flex align-center">
          <div class="mrr5 white-space">{{__label(MASTERDATA['KHHTP05'])}}:</div>
          <MDText v-if="MASTERDATA['KHHTP05']" rows="1" v-model="MASTERDATA['KHHTP05'].Items[0].Value" :readonly="readonly" :placeholder="__t('Nhập')"/>
        </div>
        <div class="mrt10">
          <div class="mrr5">{{__label(MASTERDATA['KHHTP07'])}}:</div>
        </div>
        <div class="row mrt10" v-if="InitialAssessment">
          <div class="col-md-2 col-25">
            <div class="form-group">
              <label>{{__t('Mạch')}}</label><i> ({{__t('nhịp/ phút')}})</i>
              <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.Pulse || 'N/A'}}</div>
            </div>
          </div>
          <div class="col-md-2 col-25">
            <div class="form-group">
              <label>{{__t('Huyết áp')}}</label><i> ({{__t('mmHg')}})</i>
              <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.BP || 'N/A'}}</div>
            </div>
          </div>
          <div class="col-md-2 col-25">
            <div class="form-group">
              <label>{{__t('Nhiệt độ')}}</label><i> (°C)</i>
              <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.T || 'N/A'}}</div>
            </div>
          </div>
          <div class="col-md-2 col-25">
            <div class="form-group">
              <label>SpO2</label><i> (%)</i>
              <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.SpO2 || 'N/A'}}</div>
            </div>
          </div>
          <div class="col-md-2 col-25">
            <div class="form-group">
              <label>{{__t('Nhịp thở-mdc')}}</label><i> ({{__t('lần/phút')}})</i>
              <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.RR || 'N/A'}}</div>
            </div>
          </div>
        </div>
        <div class="row" v-if="InitialAssessment">
          <div class="col-md-2 col-25">
            <div class="form-group">
              <label>{{__t('Chiều cao')}}</label><i> ({{__t('cm')}})</i>
              <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.Height || 'N/A'}}</div>
            </div>
          </div>
          <div class="col-md-2 col-25">
            <div class="form-group">
              <label>{{__t('Cân nặng')}}</label><i> (kg)</i>
              <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.Weight || 'N/A'}}</div>
            </div>
          </div>
          <div class="col-md-2 col-25">
            <div class="form-group">
              <label>BMI</label>
              <input class="form-control" readonly :value="bmiCalculation">
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="InitialAssessment.PrePregnancyWeight">
            <div class="form-group" style="width: 235px;">
              <label>{{__t('Cân nặng trước khi mang thai')}}</label><i> (kg)</i>
              <div style="margin:0 !important; width:90% !important;" class="fake-input disable">{{InitialAssessment.PrePregnancyWeight || 'N/A'}}</div>
            </div>
          </div>
        </div>
        <div class="mrt10 fw600 mrb10 box-block">{{__label(MASTERDATA['KHHTP08'])}}:</div>
        <template v-for="(number, index) in arrNumber">
          <div class="flex align-center" :key="index">
            <MdRadiosInput4 style="min-width: 220px;" :vcheckbox="true" v-if="MASTERDATA['KHHTP08']" class="mrr10" :readonly="readonly" v-model="MASTERDATA['KHHTP08']" :indexs="[number]"/>
            <MDText v-if="MASTERDATA['KHHTP08'] && MASTERDATA['KHHTP08'].Items[number].Value" rows="1" v-model="MASTERDATA['KHHTP08'].Items[number+1].Value" :id="MASTERDATA['KHHTP08'].Items[number+1].Code" :readonly="readonly" :placeholder="__t('Nhập')"/>
          </div>
        </template>
        <div class="mrt10 fw600 box-block">{{__label(MASTERDATA['KHHTP21'])}}:</div>
        <template v-for="(code, index) in ['KHHTP22', 'KHHTP25', 'KHHTP34', 'KHHTP37']">
          <div :key="index" class="flex align-center mrt10">
            <div class="fw600 mrr5" style="min-width: 173px">{{__label(MASTERDATA[code])}}:</div>
            <MdRadiosInput4 v-if="MASTERDATA[code]" :showNa="true" :readonly="readonly" v-model="MASTERDATA[code]"/>
          </div>
        </template>
        <div class="mrt10"></div>
        <div class="fw600 box-block">{{__label(MASTERDATA['KHHTP41'])}}:</div>
        <div style="padding: 10px 0px; margin-bottom: -30px;">
          <TblWithMasterData
            :FormCode="'OPDPKGM1'"
            :VisitId="_VisitId"
            :VisitType="'OPD'"
            :FormID="DataSubmit.Id"
            :formatTime="vDateFormat"
            :dontGetDate="true"
            :readonly="true"
            ref="TblWithMasterData"/>
        </div>
        <div class="mrt10 fw600 box-block">{{__label(MASTERDATA['KHHTP42'])}}:</div>
        <div class="mrt10">
          <label class="fw400 mrr5">{{__label(MASTERDATA['KHHTP43'])}}:</label>
          <span v-if="Info">{{Info.TypeOfSurgery || 'N/A'}}</span>
        </div>
        <div class="mrt10">
          <label class="fw400 mrr5">{{__label(MASTERDATA['KHHTP44'])}}:</label>
          <span v-if="Info">{{getFTime2(Info.DateOfSurgery) || 'N/A'}}</span>
        </div>
        <div class="flex align-center mrt10">
          <div class="fw400 mrr5" style="min-width: 173px">{{__label(MASTERDATA['KHHTP45'])}}:</div>
          <MdRadiosInput4 v-if="MASTERDATA['KHHTP45']" :showNa="true" :readonly="readonly" v-model="MASTERDATA['KHHTP45']"/>
        </div>
        <div class="flex align-center mrt10">
          <div class="fw400 mrr5" style="min-width: 173px">{{__label(MASTERDATA['KHHTP48'])}}:</div>
          <MdRadiosInput4 v-if="MASTERDATA['KHHTP48']" :showNa="true" :readonly="readonly" v-model="MASTERDATA['KHHTP48']"/>
        </div>
        <div class="flex align-center mrt10">
          <div class="fw400 mrr5" style="min-width: 173px">{{__label(MASTERDATA['KHHTP52'])}}:</div>
          <MdRadiosInput4 v-if="MASTERDATA['KHHTP52']" :showNa="true" :readonly="readonly" v-model="MASTERDATA['KHHTP52']"/>
        </div>
        <div class="mrt10 fw600 box-block">{{__label(MASTERDATA['KHHTP56'])}}:</div>
        <MdRadiosInput4 class="mrt10" :mrr="20" :vcheckbox="true" v-if="MASTERDATA['KHHTP56']" :readonly="readonly" :indexs="[0, 1, 2, 3, 4]" v-model="MASTERDATA['KHHTP56']"/>
        <div class="flex align-center">
          <MdRadiosInput4 style="min-width: 95px" :vcheckbox="true" v-if="MASTERDATA['KHHTP56']" :readonly="readonly" :indexs="[5]" v-model="MASTERDATA['KHHTP56']"/>
          <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['KHHTP56'] && MASTERDATA['KHHTP56'].Items[5].Value" rows="1" :readonly="readonly" v-model="MASTERDATA['KHHTP56'].Items[6].Value" :id="MASTERDATA['KHHTP56'].Items[6].Code"/>
        </div>
        <FloatBlock :openBack="true" @handleBack="handleBack" v-if="!viewOnly">
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
      <div class="text-center" v-else>
        <h4 v-if="nullPKGM">{{__t('Người bệnh không chỉ định khám chuyên khoa tại Phiếu khám gây mê!')}}</h4>
        <h4 v-else>{{__t('Chưa có thông tin')}}</h4>
        <button class="btn v-yellow-btn" v-if="!IsLocked" @click="confirmPopupCreate()">{{__t('Tạo mới')}}</button>
      </div>
      <div>
        <LogForm :DataSubmit="DataSubmit"/>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import moment from 'moment'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import FormApi from '@/services/FormAPI.js'
import TblWithMasterData from '@/components/global/TblWithMasterData'
import AskThePatientBeforeSurgeryService from '@/services/IPD/AskThePatientBeforeSurgeryService'
// import $ from 'jquery'

export default {
  name: 'CKHoHapTienPhau-PageContent',
  props: ['viewOnly', 'VisitId'],
  components: {
    VDateTimePicker3, TblWithMasterData
  },
  data () {
    return {
      DataSubmit: [],
      IsLocked: false,
      time: moment().format('HH:mm DD/MM/YYYY'),
      APIService: null,
      HasData: false,
      loaded: false,
      arrNumber: [0, 2, 4, 6, 8, 10],
      Id: '',
      text: 'AAAAAAA',
      Info: null,
      InitialAssessment: null,
      nullPKGM: false
    }
  },
  mixins: [MixinMasterData],
  mounted () {
    this.APIService = new FormApi({
      VisitType: 'OPD',
      VisitId: this._VisitId,
      FormCode: 'FORMOPDPYKKCKHHTP'
    })
    this.getMasterDatas({Form: 'KHHTP'}, () => {
      this.SynsDataAnesthesia()
      this.getData()
      setTimeout(() => {
        this.loaded = true
      }, 500)
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
      return this.viewOnly || this.IsLocked || !this.hasRole('APIUDOPDFORMOPDPYKKCKHHTP')
    },
    bmiCalculation: function () {
      var weight = this.InitialAssessment.Weight ? parseFloat(this.InitialAssessment.Weight) : 0
      var height = this.InitialAssessment.Height ? (parseFloat(this.InitialAssessment.Height) / 100) : 0
      if (height === 0) {
        return 'N/A'
      } else {
        return (weight / (height * height)).toFixed(2)
      }
    }
  },
  methods: {
    getData () {
      this.APIService.GetList().then(res => {
        if (res && res.Datas && res.Datas.length) {
          this.HasData = res
          this.Id = res.Datas[0].Id
          this.getDateil()
        }
      }).catch((e) => {
        console.log(e)
        this.loaded = true
      })
    },
    SynsDataAnesthesia () {
      new AskThePatientBeforeSurgeryService().find('OPD/SynsDataAnesthesia/' + this._VisitId + '/FORMOPDPYKKCKHHTP').then(res => {
        this.Info = res.Datas
        this.IsLocked = res.IsLock24h
        if (this.Info.Treatment) {
          this.Info.Treatment = this.JSONParse(this.Info.Treatment || [], true)
        }
        if (res.Datas && res.Datas.VitalSigns && res.Datas.VitalSigns.VitalSigns) {
          this.InitialAssessment = res.Datas.VitalSigns.VitalSigns
        }
      }).catch(err => {
        if (err.data.FORM_NOT_FOUND.ViMessage === 'NB không có chỉ định khám chuyên khoa tại Phiếu khám gây mê') {
          this.nullPKGM = true
        }
        this.IsLocked = err.data.IsLock24h
      })
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
        title: this.$t('Phiếu yêu cầu khám chuyên khoa hô hấp tiền phẫu'),
        text: this.$t('Tạo mới Phiếu yêu cầu khám chuyên khoa hô hấp tiền phẫu'),
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
    async handleSubmit () {
      await this.checkDataSubmit()
      await this.validateForm()
      await this.mapData2MDData()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      this.APIService.UpdateForm(this.Id, DataSubmit).then(res => {
        this.toastedSuccess()
        this.reload()
      }).catch((e) => {
      })
    },
    checkDataSubmit () {
      if (this.MASTERDATA['KHHTP08'] && !this.MASTERDATA['KHHTP08'].Items[0].Value) {
        this.MASTERDATA['KHHTP08'].Items[1].Value = ''
      }
      if (this.MASTERDATA['KHHTP08'] && !this.MASTERDATA['KHHTP08'].Items[2].Value) {
        this.MASTERDATA['KHHTP08'].Items[3].Value = ''
      }
      if (this.MASTERDATA['KHHTP08'] && !this.MASTERDATA['KHHTP08'].Items[4].Value) {
        this.MASTERDATA['KHHTP08'].Items[5].Value = ''
      }
      if (this.MASTERDATA['KHHTP08'] && !this.MASTERDATA['KHHTP08'].Items[6].Value) {
        this.MASTERDATA['KHHTP08'].Items[7].Value = ''
      }
      if (this.MASTERDATA['KHHTP08'] && !this.MASTERDATA['KHHTP08'].Items[8].Value) {
        this.MASTERDATA['KHHTP08'].Items[9].Value = ''
      }
      if (this.MASTERDATA['KHHTP08'] && !this.MASTERDATA['KHHTP08'].Items[10].Value) {
        this.MASTERDATA['KHHTP08'].Items[11].Value = ''
      }
      if (this.MASTERDATA['KHHTP56'] && !this.MASTERDATA['KHHTP56'].Items[5].Value) {
        this.MASTERDATA['KHHTP56'].Items[6].Value = ''
      }
    },
    handleCreate () {
      this.APIService.CreateForm({}).then(res => {
        this.toastedSuccess()
        this.reload()
      })
    },
    getDateil () {
      if (!this.Id) return
      this.APIService.GetDetail('/' + this.Id).then(res => {
        this.DataSubmit = res.data
        this.mapData()
      }).catch((e) => {
        console.log(e)
      })
    },
    // validate form
    validateForm () {
      let errors = []
      if (this.getValueOfMASTERDATA2('KHHTP08', 'KHHTP19')) {
        if (!this.getValueOfMASTERDATA2('KHHTP08', 'KHHTP20')) {
          errors.push(this.MASTERDATA['KHHTP08'].Items[11])
        }
      }
      if (this.getValueOfMASTERDATA2('KHHTP56', 'KHHTP62')) {
        if (!this.getValueOfMASTERDATA2('KHHTP56', 'KHHTP63')) {
          errors.push(this.MASTERDATA['KHHTP56'].Items[6])
        }
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    getLabel (data) {
      let label = {ViName: 'N/A', EnName: 'N/A'}
      if (data && data.length) {
        data.find(elm => {
          if (elm.Value) {
            label = {
              ViName: elm.ViName,
              EnName: elm.EnName
            }
          }
        })
      }
      return label
    }
  }
}
</script>

<style lang="stylus" scoped>
.box-block {
  background: #337ab7;
  padding: 7px 15px;
  font-weight: bold;
  color: #fff;
  margin: 0 -10.1px;
  border: 1px solid #337ab7;
}
</style>
