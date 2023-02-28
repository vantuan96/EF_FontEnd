<template>
  <div>
    <div v-if="loaded">
      <!-- <div v-if="nullContent" class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div> -->
      <div class="text-center" v-if="nullContent">
        <p v-if="!IsLocked && hasRole('NCCNBROV1POST')">{{__t('Chưa có Phiếu đánh giá nguy cơ di truyền trong sàng lọc nguy cơ ung thư vú')}}</p>
        <div v-else style="color: red;" class="italic">
        <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
      </div>
        <!-- <div v-else class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div> -->
        <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked && hasRole('NCCNBROV1POST')">{{__t('Tạo mới')}}</button>
        <!-- <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button> -->
      </div>
      <div :class="{'isReadOnly': isReadOnly}" v-else>
        <div class="row">
          <div class="col-md-6">
            <div v-if="DataSubmit" class="flex-box flex-center mb-10">
              <label class="display-inline ml-5 mr-5" style="font-weight: bold">{{__t('Giờ đánh giá')}}:</label>
              <div class="search-name">
                <VDatePicker :readonly="true" :hideTooltip="false" class="display-inline" :format="'HH:mm DD/MM/YYYY'" v-model="CreatedAt"/>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div v-if="DataSubmit" class="flex-box flex-center" style="transform: translateY(5px)">
              <label class="display-inline ml-5 mr-5" style="font-weight: bold; margin-bottom: 0">Người thực hiện:</label>
              <div class="search-name">
                <ad-Info :ad="CreatedBy" />
              </div>
            </div>
          </div>
        </div>
        <div class="tbl-title">{{__t('Tiêu chuẩn đánh giá')}}</div>
        <table class="table v-table-1 no-margin col-1-1" id="NCCNBROV1-block1">
          <tr>
            <td>
              <p style="font-style: italic">Cá nhân phù hợp với một hoặc một số tiêu chuẩn dưới đây được xem là có nguy cơ di truyền</p>
              <!-- Checkbox-1 -->
              <div class="mt-10" v-if="MASTERDATA['OPDNCCNBROV1']">
                <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV1'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDNCCNBROV1radio-' + index" v-model="item.Value">
                        <label :for="'OPDNCCNBROV1radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox-2 -->
              <div class="mt-10" v-if="MASTERDATA['OPDNCCNBROV3']">
                <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV3'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDNCCNBROV3radio-' + index" v-model="item.Value">
                        <label :for="'OPDNCCNBROV3radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox-3 -->
              <div class="mt-10" v-if="MASTERDATA['OPDNCCNBROV5']">
                <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV5'].Items">
                  <div v-if="index === 0" :key="index">
                    <div :key="index" v-if="item.DataType === 'Checkbox'">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                        <span class="v-checkbox" v-else>
                          <input type="checkbox" :id="'OPDNCCNBROV5radio-' + index" v-model="item.Value">
                          <label :for="'OPDNCCNBROV5radio-' + index"></label>
                        </span>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- Checkbox-3 child -->
                <div :class="{'pointer-none disable-text': !isReadOnly && !MASTERDATA['OPDNCCNBROV5'].Items[0].Value}" class="row">
                  <div class="col-md-12">
                    <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV5'].Items">
                      <div v-if="index > 0" :key="index">
                        <div :key="index" v-if="item.DataType === 'Checkbox'">
                          <div class="checkbox-rounded flex-box flex-center ml-20">
                            <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                            <span class="v-checkbox" v-else>
                              <input type="checkbox" :id="'OPDNCCNBROV5radio-' + index" v-model="item.Value">
                              <label :for="'OPDNCCNBROV5radio-' + index"></label>
                            </span>
                            <span class="displaytbl"><span>{{__label(item)}}</span></span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <!-- Checkbox-4 -->
              <div class="mt-10" v-if="MASTERDATA['OPDNCCNBROV11']">
                <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV11'].Items">
                  <div v-if="index === 0" :key="index">
                    <div :key="index" v-if="item.DataType === 'Checkbox'">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                        <span class="v-checkbox" v-else>
                          <input type="checkbox" :id="'OPDNCCNBROV11radio-' + index" v-model="item.Value">
                          <label :for="'OPDNCCNBROV11radio-' + index"></label>
                        </span>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- Checkbox-4 child -->
                <div :class="{'pointer-none disable-text': !isReadOnly && !MASTERDATA['OPDNCCNBROV11'].Items[0].Value}">
                  <!-- Checkbox-4 child 1 -->
                  <div class="checkbox-rounded flex-box flex-center ml-20" :class="{'pointer-none disable-text': !(getYearOfAge <= 50)}">
                    <CheckboxValue v-model="MASTERDATA['OPDNCCNBROV11'].Items[1].Value" v-if="isReadOnly"/>
                    <span class="v-checkbox" v-else>
                      <input type="checkbox" :id="'OPDNCCNBROV11radio-' + 1" v-model="MASTERDATA['OPDNCCNBROV11'].Items[1].Value">
                      <label :for="'OPDNCCNBROV11radio-' + 1"></label>
                    </span>
                    <span class="displaytbl"><span>{{__label(MASTERDATA['OPDNCCNBROV11'].Items[1])}}</span></span>
                  </div>
                  <!-- Checkbox-4 child 2 -->
                  <div class="checkbox-rounded flex-box flex-center ml-20" :class="{'pointer-none disable-text': !(getYearOfAge <= 60)}">
                    <CheckboxValue v-model="MASTERDATA['OPDNCCNBROV11'].Items[2].Value" v-if="isReadOnly"/>
                    <span class="v-checkbox" v-else>
                      <input type="checkbox" :id="'OPDNCCNBROV11radio-' + 2" v-model="MASTERDATA['OPDNCCNBROV11'].Items[2].Value">
                      <label :for="'OPDNCCNBROV11radio-' + 2"></label>
                    </span>
                    <span class="displaytbl"><span>{{__label(MASTERDATA['OPDNCCNBROV11'].Items[2])}}</span></span>
                  </div>
                  <!-- Checkbox-4 child 3 -->
                  <div class="checkbox-rounded flex-box flex-center ml-20">
                    <CheckboxValue v-model="MASTERDATA['OPDNCCNBROV11'].Items[3].Value" v-if="isReadOnly"/>
                    <span class="v-checkbox" v-else>
                      <input type="checkbox" :id="'OPDNCCNBROV11radio-' + 3" v-model="MASTERDATA['OPDNCCNBROV11'].Items[3].Value">
                      <label :for="'OPDNCCNBROV11radio-' + 3"></label>
                    </span>
                    <span class="displaytbl"><span>{{__label(MASTERDATA['OPDNCCNBROV11'].Items[3])}}</span></span>
                  </div>
                  <!-- Checkbox-4 child 4 -->
                  <div class="checkbox-rounded flex-box flex-center ml-20">
                    <CheckboxValue v-model="MASTERDATA['OPDNCCNBROV11'].Items[4].Value" v-if="isReadOnly"/>
                    <span class="v-checkbox" v-else>
                      <input type="checkbox" :id="'OPDNCCNBROV11radio-' + 4" v-model="MASTERDATA['OPDNCCNBROV11'].Items[4].Value">
                      <label :for="'OPDNCCNBROV11radio-' + 4"></label>
                    </span>
                    <span class="displaytbl"><span>{{__label(MASTERDATA['OPDNCCNBROV11'].Items[4])}}</span></span>
                  </div>
                </div>
                <!-- Ung thư vú ở mọi lứa tuổi và -->
                <div :class="{'pointer-none disable-text': !isReadOnly && !MASTERDATA['OPDNCCNBROV11'].Items[4].Value}" class="row ml-10">
                  <div class="col-md-12">
                    <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV17'].Items">
                      <div :key="index">
                        <div :key="index" v-if="item.DataType === 'Checkbox'">
                          <div class="flex-box flex-center ml-20">
                            <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                            <span class="v-checkbox" v-else>
                              <input type="checkbox" :id="'OPDNCCNBROV17radio-' + index" v-model="item.Value">
                              <label :for="'OPDNCCNBROV17radio-' + index"></label>
                            </span>
                            <span class="displaytbl"><span>{{__label(item)}}</span></span>
                          </div>
                        </div>
                        <div class="row ml-20" :class="{'pointer-none disable-text': !isReadOnly && !MASTERDATA['OPDNCCNBROV17'].Items[0].Value}" v-if="index === 1">
                          <div class="col-md-6" v-if="!isReadOnly">
                            <MDRadio v-if="MASTERDATA['OPDNCCNBROV17']" v-model="MASTERDATA['OPDNCCNBROV17']" :indexs="[1, 2, 3]" :fullWidth="false"/>
                            <MDRadio v-if="MASTERDATA['OPDNCCNBROV17']" v-model="MASTERDATA['OPDNCCNBROV17']" :indexs="[4, 5, 6]" :fullWidth="false"/>
                          </div>
                          <div class="col-md-6" v-else>
                            <MDRadioView v-if="MASTERDATA['OPDNCCNBROV17']" :data="MASTERDATA['OPDNCCNBROV17'].Items"/>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDNCCNBROV25']">
                <!-- Checkbox-5 -->
                <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV25'].Items">
                  <div v-if="index === 0" :key="index">
                    <div :key="index" v-if="item.DataType === 'Checkbox'">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                        <span class="v-checkbox" v-else>
                          <input type="checkbox" :id="'OPDNCCNBROV25radio-' + index" v-model="item.Value">
                          <label :for="'OPDNCCNBROV25radio-' + index"></label>
                        </span>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- Checkbox-5 child-->
                <div :class="{'pointer-none disable-text': !isReadOnly && !MASTERDATA['OPDNCCNBROV25'].Items[0].Value}">
                  <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV25'].Items">
                    <div v-if="index > 0" :key="index">
                      <div :key="index" v-if="item.DataType === 'Checkbox'">
                        <div class="checkbox-rounded flex-box flex-center ml-20">
                          <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                          <span class="v-checkbox" v-else>
                            <input type="checkbox" :id="'OPDNCCNBROV25radio-' + index" v-model="item.Value">
                            <label :for="'OPDNCCNBROV25radio-' + index"></label>
                          </span>
                          <span class="displaytbl"><span>{{__label(item)}}</span></span>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDNCCNBROV34']">
                <!-- Checkbox-6 -->
                <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV34'].Items">
                  <div v-if="index === 0" :key="index">
                    <div :key="index" v-if="item.DataType === 'Checkbox'">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                        <span class="v-checkbox" v-else>
                          <input type="checkbox" :id="'OPDNCCNBROV34radio-' + index" v-model="item.Value">
                          <label :for="'OPDNCCNBROV34radio-' + index"></label>
                        </span>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- Checkbox-6 child-->
                <div :class="{'pointer-none disable-text': !isReadOnly && !MASTERDATA['OPDNCCNBROV34'].Items[0].Value}">
                  <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV34'].Items">
                    <div v-if="index > 0" :key="index">
                      <div :key="index" v-if="item.DataType === 'Checkbox'">
                        <div class="checkbox-rounded flex-box flex-center ml-20">
                          <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                          <span class="v-checkbox" v-else>
                            <input type="checkbox" :id="'OPDNCCNBROV34radio-' + index" v-model="item.Value">
                            <label :for="'OPDNCCNBROV34radio-' + index"></label>
                          </span>
                          <span class="displaytbl"><span>{{__label(item)}}</span></span>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div class="tbl-title">{{__t('Kết quả đánh giá')}}</div>
        <table class="table v-table-1 no-margin col-1-1"  id="NCCNBROV1-block2">
          <tr>
            <td>
              <div class="pointer-none" v-if="MASTERDATA['OPDNCCNBROV40']">
                <template v-for="(item, index) in MASTERDATA['OPDNCCNBROV40'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center ml-20">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDNCCNBROV40radio-' + index" v-model="item.Value">
                        <label :for="'OPDNCCNBROV40radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- <div v-if="DataSubmit.Confirm" class="row text-center">
                <div class="col-md-6 col-md-offset-6" v-if="DataSubmit.Confirm.Doctor.UserName">
                  <div style="font-weight: normal">{{ Confirm1 }}</div>
                  <eform-signature
                    :ad="DataSubmit.Confirm.Doctor.UserName"
                    :title="__t('Bác sĩ')"
                  />
                </div>
                <div class="col-md-6 col-md-offset-6" v-else>
                  <p class="mb-10">
                    <b>{{ __t('Bác sĩ') }}</b>
                  </p>
                  <button @click="showDoctorConfirm('MEDICALSTAFF1', 'Bác sĩ')" class="btn v-white-btn">
                    {{ __t('Xác nhận') }}
                  </button>
                </div>
              </div> -->
            </td>
          </tr>
        </table>
        <p class="mt-10" style="font-style: italic">(1) Genetic/Familial High -Risk Assessment: Breast and Ovarian (NCCN BR/OV-1). Version 3,2019- Jan 18, 2019.</p>
      </div>
      <!-- footer -->
      <FloatBlock v-if="!isReadOnly" @handleBack='handleBack()' :openBack="true">
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-6 col-sm-6" v-if="!IsLocked">
            <div class="form-group1">
              <button v-if="!nullContent" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
      <!-- <DoctorConfirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSave="popupSave"/> -->
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import OPDNCCNBROV1 from '@/services/OPD/NCCNBROV1'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import DoctorConfirm from '@/components/IPD/ForNeonatalMaternity/PopupDoctorConfirm.vue'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import _ from 'lodash'
import moment from 'moment'
export default {
  components: {
    UsersSelect2,
    VDateTimePicker,
    DoctorConfirm
  },
  mixins: [MixinForm, MixinMasterData],
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      FormCode: 'A01_201_201119_V',
      DataSubmit: {},
      dataMaster: {},
      loaded: false,
      IsLocked: false,
      nullContent: true,
      CreatedAt: '',
      CreatedBy: '',
      popupTitle: '',
      TypeConfirm: '',
      checkEdited: false
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'A01_201_201119_V'}, () => {
      this.getData()
    })
    console.log(this.getYearOfAge)
  },
  watch: {
    MASTERDATA: {
      handler () {
        this.checkResult()
        this.resetUncheck()
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    }
  },
  computed: {
    getYearOfAge () {
      return Math.floor(moment(new Date()).diff(moment(this.$store.getters['account/getDateOfBirth'], 'DD/MM/YYYY'), 'years', true))
    },
    isReadOnly () {
      return this.viewOnly || this.IsLocked || this.getCurrentUsername() !== this.CreatedBy || !this.hasRole('NCCNBROV1POST')
      // return this.viewOnly || this.IsLocked
    },
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    }
  },
  methods: {
    getData () {
      new OPDNCCNBROV1().find(this.FormCode + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.nullContent = false
        this.IsLocked = response.IsLocked
        this.DataSubmit = response
        if (response.Datas.length) {
          this.$emit('hiddenLog')
        }
        this.CreatedBy = response.CreatedBy
        this.CreatedAt = moment(response.CreatedAt).format('HH:mm DD/MM/YYYY')
        this.$emit('TimeLog', moment(response.UpdatedAt).format('HH:mm DD/MM/YYYY'), response.UpdateBy)
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
              }
            })
          }
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        setTimeout(() => {
          this.checkEdited = false
        }, 800)
        this.loaded = true
      }).catch(e => {
        this.IsLocked = e.data.IsLocked24h
        this.loaded = true
        this._401ResponseError(e)
      })
    },
    create () {
      new OPDNCCNBROV1().update('/' + 'Create' + '/' + this.FormCode + '/' + this._VisitId).then(response => {
        this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    handleSubmit () {
      var obj = {}
      this.DataSubmit.Datas = []
      this.resetUncheck()
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
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new OPDNCCNBROV1().update('/Update/' + this.FormCode + '/' + this._VisitId, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    resetUncheck () {
      if (!this.MASTERDATA['OPDNCCNBROV5'].Items[0].Value) {
        this.resetMdData('OPDNCCNBROV5')
      }
      if (!this.MASTERDATA['OPDNCCNBROV11'].Items[0].Value) {
        this.resetMdData('OPDNCCNBROV11')
      }
      if (!this.MASTERDATA['OPDNCCNBROV11'].Items[4].Value) {
        this.resetMdData('OPDNCCNBROV17')
      }
      if (!this.MASTERDATA['OPDNCCNBROV17'].Items[0].Value) {
        this.MASTERDATA['OPDNCCNBROV17'].Items.forEach(item => {
          if (item.DataType === 'Radio') {
            item.Value = null
          }
        })
      }
      if (!this.MASTERDATA['OPDNCCNBROV25'].Items[0].Value) {
        this.resetMdData('OPDNCCNBROV25')
      }
      if (!this.MASTERDATA['OPDNCCNBROV34'].Items[0].Value) {
        this.resetMdData('OPDNCCNBROV34')
      }
    },
    async popupSave (data) {
      if (!this.isConfirmed) {
        await this.ConfirmKyNhay(data)
      } else {
        this.ConfirmKyNhay(data)
      }
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    checkResult () {
      if (this.MASTERDATA) {
        if (this.MASTERDATA['OPDNCCNBROV1'].Items[0].Value || this.MASTERDATA['OPDNCCNBROV3'].Items[0].Value ||
        this.MASTERDATA['OPDNCCNBROV5'].Items[0].Value || this.MASTERDATA['OPDNCCNBROV11'].Items[0].Value ||
        this.MASTERDATA['OPDNCCNBROV17'].Items[0].Value || this.MASTERDATA['OPDNCCNBROV25'].Items[0].Value || this.MASTERDATA['OPDNCCNBROV34'].Items[0].Value) {
          this.MASTERDATA['OPDNCCNBROV40'].Items[0].Value = true
          this.MASTERDATA['OPDNCCNBROV40'].Items[1].Value = false
        } else {
          this.MASTERDATA['OPDNCCNBROV40'].Items[0].Value = false
          this.MASTERDATA['OPDNCCNBROV40'].Items[1].Value = true
        }
      }
    },
    handleBack () {
      if (this.checkEdited) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới phiếu đánh giá nguy cơ di truyền trong sàng lọc nguy cơ ung thư vú'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
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
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-checkbox input[type=checkbox] + label:before {
  width: 25px;
  height: 25px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox-rounded {
  .v-checkbox input[type=checkbox] + label:before {
    border-radius: 50%;
  }
}
.pointer-none {
  pointer-events: none;
}
.disable-text {
  color: #b1b1b1;
  .v-checkbox input[type=checkbox] + label:before {
    border-color: #b1b1b1
  }
}
.isReadOnly {
  .value-checkbox {
    margin-bottom: 5px;
  }
  .displaytbl {
    span {
      transform: translateY(-3px);
    }
  }
}
</style>
