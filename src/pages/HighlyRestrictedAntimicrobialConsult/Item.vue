<template>
  <div class="main-content" id="HighlyRestrictedAntimicrobialConsult">
    <!-- <h2 class="text-center" v-if="!ViewOnly"><b>{{__t('Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý')}}</b></h2> -->
    <div v-if="loaded">
      <template v-if="DataSubmit">
        <Print :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA"/>
        <table class="table standing-order-tbl td-re">
          <tr>
            <th colspan="4">I. {{__t('Thông tin người bệnh')}}</th>
          </tr>
          <tr>
            <td width="25%"><b>{{__t('Khoa')}}: </b>{{__label(DataSubmit.Customer.Specialty)}}</td>
            <td colspan="3"><b>{{__t('Cân nặng2')}}: </b>{{(DataSubmit.Customer.Weight || 'N/A')}} kg, <b>{{__t('Chiều cao2')}}: </b>{{(DataSubmit.Customer.Height || 'N/A')}} cm</td>
          </tr>
          <tr>
            <td><b>{{__label(MASTERDATA['IEOHIREANCOLLE'])}}:</b></td>
            <td colspan="3">
              <AllergiesInfo :data="DataSubmit.Customer" />
            </td>
          </tr>
          <tr v-if="MASTERDATA['IEOHIREANCODOI']">
            <td><b>{{__label(MASTERDATA['IEOHIREANCODOI'])}}:</b></td>
            <td colspan="2">
              <div class="flex-box flex-center">
                <CheckboxValue v-model="MASTERDATA['IEOHIREANCODOI'].Items[0].Value" v-if="isReadOnly"/>
                <div class="v-checkbox" v-else>
                  <input type="checkbox" :id="'IEOHIREANCODOIradio-0'" v-model="MASTERDATA['IEOHIREANCODOI'].Items[0].Value">
                  <label :for="'IEOHIREANCODOIradio-0'"></label>
                </div>
                <span class="displaytbl"><span>{{__label(MASTERDATA['IEOHIREANCODOI'].Items[0])}}</span></span>
                <div class="ml-10" style="flex-grow: 1;" v-if="MASTERDATA['IEOHIREANCODOI'].Items[0].Value">
                  <div class="fake-input" v-if="isReadOnly">{{MASTERDATA['IEOHIREANCODOI'].Items[8].Value || 'N/A'}}</div>
                  <textarea-autosize v-else class="form-control" rows="1" :placeholder="__t('Nhập đường vào')" v-model="MASTERDATA['IEOHIREANCODOI'].Items[8].Value"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td colspan="3">
              <template  v-for="(item, index) in MASTERDATA['IEOHIREANCODOI'].Items">
                <div class="w25p" :key="index" v-if="index > 0 && item.DataType === 'Checkbox'">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                    <span class="v-checkbox" v-else>
                      <input type="checkbox" :id="'IEOHIREANCODOIradio-' + index" v-model="item.Value">
                      <label :for="'IEOHIREANCODOIradio-' + index"></label>
                    </span>
                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                  </div>
                </div>
              </template>
              <div class="w45p" v-if="MASTERDATA['IEOHIREANCODOI'].Items[6].Value">
                <div class="fake-input" v-if="isReadOnly">{{MASTERDATA['IEOHIREANCODOI'].Items[7].Value || 'N/A'}}</div>
                <textarea-autosize v-else class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IEOHIREANCODOI'].Items[7].Value"/>
              </div>
            </td>
          </tr>
          <tr>
            <th colspan="4">II. {{__t('Lâm sàng')}}</th>
          </tr>
          <tr v-if="MASTERDATA['IEOHIREANCOCS']">
            <td colspan="4">
              <p><b>{{__label(MASTERDATA['IEOHIREANCOCS'].Items[0])}}</b></p>
              <div class="fake-input" v-if="isReadOnly">{{MASTERDATA['IEOHIREANCOCS'].Items[0].Value || 'N/A'}}</div>
              <textarea-autosize v-else class="form-control" rows="3" v-model="MASTERDATA['IEOHIREANCOCS'].Items[0].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IEOHIREANCOCA']">
            <td colspan="4">
              <p><b>{{__label(MASTERDATA['IEOHIREANCOCA'].Items[0])}}</b></p>
              <ListSignificantMedications v-if="!isReadOnly" @copy="copyToAntimicrobialOrder"/>
              <div class="fake-input" v-if="isReadOnly">{{MASTERDATA['IEOHIREANCOCA'].Items[0].Value || 'N/A'}}</div>
              <textarea-autosize v-else class="form-control" rows="3" v-model="MASTERDATA['IEOHIREANCOCA'].Items[0].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IEOHIREANCOMIR']">
            <th colspan="4">III. {{__label(MASTERDATA['IEOHIREANCOMIR'])}}</th>
          </tr>
          <tr v-if="!isReadOnly">
            <td colspan="4">
              <SyncPrincipalTest :VisitId="this._VisitId" :VisitType="this._VisitType" :Results="['lab']"  @copy="copyToForm" :copyAllData="true"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IEOHIREANCOMIR']">
            <td class="no-padding" colspan="4">
              <table class="table table-bordered no-margin" v-if="DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults">
                <template v-if="DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults.filter(e => !e.removed).length">
                  <thead class="focus-th-bg">
                    <tr>
                      <th width="150">
                        {{__t('Ngày')}}
                      </th>
                      <th width="250">
                        {{__t('Vi khuẩn')}}
                      </th>
                      <th>
                        {{__t('Mẫu bệnh phẩm')}}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(result, index) in DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults"  v-if="!result.removed" :key="index">
                      <td style="position: relative">
                        <button v-if="!result.Id" class="btn-pos-left" @click="result.removed = true"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <span v-if="isReadOnly">{{result.Date || 'N/A'}}</span>
                        <VDatePicker v-else v-model="result.Date" :allday="false" :hideTooltip="true" :format="'DD/MM/YYYY'"/>
                      </td>
                      <td>
                        <span v-if="isReadOnly">{{result.Culture || 'N/A'}}</span>
                        <textarea-autosize v-else class="form-control" v-model="result.Culture"/>
                      </td>
                      <td>
                        <div class="group-radio">
                          <span v-for="(item, ind) in MASTERDATA['IEOHIREANCOMIR'].Items" :key="'IEOHIREANCOMIR' + ind" v-if="item.DataType === 'Checkbox'">
                            <span v-if="isReadOnly">{{result.Specimen === item.Data && result.Specimen !== '6' ? __label(item) : ''}}</span>
                            <template v-else>
                              <input type="radio" :id="index + 'IEOHIREANCOMIRradio-' + ind" v-model="result.Specimen" :value="item.Data">
                              <label :for="index + 'IEOHIREANCOMIRradio-' + ind">{{__label(item)}}</label>
                            </template>
                          </span>
                        </div>
                        <span v-if="isReadOnly">{{result.Specimen === '6' ? (result.Others || 'N/A') : ''}}</span>
                        <template v-else>
                          <textarea-autosize v-if="result.Specimen === '6'" :placeholder="__t('Nhập')" class="form-control mt-10" v-model="result.Others"/>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="!isReadOnly">
                      <td class="text-center" colspan="3">
                        <button class="btn btn-warning" @click="newMicrobiologicalResults()" >{{__t('Thêm mới')}}</button>
                      </td>
                    </tr>
                  </tbody>
                </template>
                <template v-else>
                  <tbody>
                    <tr>
                      <td class="text-center">
                        <button  v-if="!isReadOnly" class="btn btn-warning" @click="newMicrobiologicalResults()" >{{__t('Thêm mới')}}</button>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </table>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IEOHIREANCOANO']">
            <th colspan="4">IV. {{__label(MASTERDATA['IEOHIREANCOANO'])}}</th>
          </tr>
          <tr v-if="MASTERDATA['IEOHIREANCOANO']">
            <td class="no-padding" colspan="4">
              <table class="table table-bordered no-margin" v-if="DataSubmit.HighlyRestrictedAntimicrobialConsultAntimicrobialOrder">
                <template v-if="DataSubmit.HighlyRestrictedAntimicrobialConsultAntimicrobialOrder.filter(e => !e.removed).length">
                  <thead class="focus-th-bg">
                    <tr>
                      <th>
                        {{__t('Kháng sinh')}}
                      </th>
                      <th width="250">
                        {{__t('Liều dùng/ lần')}}
                      </th>
                      <th width="100">
                        {{__t('Số lần/ ngày')}}
                      </th>
                      <th width="100">
                        {{__t('Số ngày')}}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(result, index) in DataSubmit.HighlyRestrictedAntimicrobialConsultAntimicrobialOrder" v-if="!result.removed" :key="index + 'x993'">
                      <td style="position: relative">
                        <button v-if="!result.Id" class="btn-pos-left" @click="result.removed = true"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <span v-if="isReadOnly">{{result.Antimicrobial || 'N/A'}}</span>
                        <Medication v-else v-model="result.Antimicrobial"/>
                      </td>
                      <td>
                        <span v-if="isReadOnly">{{result.Dose || 'N/A'}}</span>
                        <input type="text" v-else class="form-control" v-model="result.Dose"/>
                      </td>
                      <td>
                        <span v-if="isReadOnly">{{result.Frequency || 'N/A'}}</span>
                        <input type="text" v-else class="form-control" v-model="result.Frequency"/>
                      </td>
                      <td>
                        <span v-if="isReadOnly">{{result.Duration || 'N/A'}}</span>
                        <input type="text" v-else class="form-control" v-model="result.Duration"/>
                      </td>
                    </tr>
                    <tr v-if="!isReadOnly">
                      <td class="text-center" colspan="4">
                        <button class="btn btn-warning" @click="newAntimicrobialOrder()" >{{__t('Thêm mới')}}</button>
                      </td>
                    </tr>
                  </tbody>
                </template>
                <template v-else>
                  <tbody>
                    <tr>
                      <td class="text-center">
                        <button v-if="!isReadOnly" class="btn btn-warning" @click="newAntimicrobialOrder()" >{{__t('Thêm mới')}}</button>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </table>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IEOHIREANCOHRA']">
            <td colspan="4"><b>{{__label(MASTERDATA['IEOHIREANCOHRA'])}}:</b></td>
          </tr>
          <tr>
            <td colspan="4">
              <template  v-for="(item, index) in MASTERDATA['IEOHIREANCOHRA'].Items">
                <div class="w25p" :key="index" v-if="item.DataType === 'Checkbox'">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                    <span class="v-checkbox" v-else>
                      <input type="checkbox" :id="'IEOHIREANCOHRAradio-' + index" v-model="item.Value">
                      <label :for="'IEOHIREANCOHRAradio-' + index"></label>
                    </span>
                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                  </div>
                </div>
              </template>
              <div class="w45p" v-if="MASTERDATA['IEOHIREANCOHRA'].Items[4].Value">
                <div class="fake-input" v-if="isReadOnly">{{MASTERDATA['IEOHIREANCOHRA'].Items[5].Value || 'N/A'}}</div>
                <textarea-autosize v-else class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IEOHIREANCOHRA'].Items[5].Value"/>
              </div>
            </td>
          </tr>
        </table>
        <div class="row">
          <div class="col-md-6 col-sm-6 text-center">
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <p v-if="DataSubmit.ConfirmDate">{{DataSubmit.ConfirmDate}}</p>
            <p><b>{{__t('Bác sĩ xác nhận')}}</b></p>
            <div v-if="DataSubmit.ConfirmDate">
              <EformSignature :title="''" :ad="DataSubmit.ConfirmDoctor" />
            </div>
            <div v-else>
              <button v-if="!ViewOnly && !IsLocked" @click="showDoctorConfirm('Doctor', 'Bác sĩ xác nhận')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
              <!-- <button v-if="!ViewOnly && !isReadOnly" @click="showDoctorConfirm('Doctor', 'Bác sĩ xác nhận')" class="btn v-white-btn">{{__t('Xác nhận')}}</button> -->
              <!-- <button v-if="!ViewOnly && hasRole('IEOHIREANCOCONFIRM')" @click="showDoctorConfirm('Doctor', 'Bác sĩ xác nhận')" class="btn v-white-btn">{{__t('Xác nhận')}}</button> -->
              <span v-else>{{__t('Chưa xác nhận')}}</span>
            </div>
          </div>
        </div>
        <br/><br/>
        <div class="pomc-upload-area mb-10" v-if="MASTERDATA['IEOHIREANCOUPF']">
          <div v-if="ViewOnly || isReadOnly">
            <p>{{__t('Đính kèm bản scan xác nhận')}}</p>
            <drop-files id="mini-upload" :readonly="true" v-model="MASTERDATA['IEOHIREANCOUPF'].Items[0].Value" :dataDropfile="dataDropfile"/>
          </div>
          <div class="row" v-else>
            <div class="col-md-7 col-sm-7">
              <p><b>{{__t('Upload ảnh')}}:</b></p>
              <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
              <p>{{__t('Đính kèm bản scan xác nhận')}}</p>
            </div>
            <div class="col-md-5 col-sm-5">
              <drop-files id="mini-upload" v-model="MASTERDATA['IEOHIREANCOUPF'].Items[0].Value" :dataDropfile="dataDropfile"/>
            </div>
          </div>
        </div>
        <br/><br/>
        <div>
          <p><strong>{{__t('Ghi chú')}}</strong>: {{__t('biên bản này đồng thời là biên bản hội chẩn thuốc dấu * cho người bệnh có bảo hiểm y tế.')}}</p>
          <p>{{__t('noVI001')}}</p>
          <logs :EdId="this.$route.params.Id" :Type="'HighlyRestrictedAntimicrobialConsult'" :noDetail="true" />
          <p>A01_060_120421_VE</p>
        </div>
        <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
          <div class="box v-model-content-popup">
            <div class="box-header text-center">
              <h3 class="box-title">{{__t(popupTitle)}}.</h3>
              <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
            </div>
            <div class="form-confirm">
              <div class="form-group has-feedback">
                <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
                <span class="glyphicon glyphicon-user form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
                </div>
                <div class="col-xs-6">
                  <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
                </div>
              </div>
              <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
              <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
            </div>
          </div>
        </modal>
        <FloatBlock v-if="!ViewOnly" :openBack="true" @handleBack="handleBack">
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2" v-if="!IsLocked">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
                <button class="btn btn-info pull-right" type="button" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
              </div>
            </div>
            <div class="col-md-6 col-sm-6" v-if="!IsLocked">
              <div class="form-group1">
                <button v-if="!isReadOnly" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <div v-else class="text-center p20">
        <div v-if="hasErrForm">Có lỗi xảy ra!</div>
      </div>
    </div>
  </div>
</template>
<script>
import MixinForm from '@/mixins/form.js'
import Print from './Print'
import HighlyRestrictedAntimicrobialConsult from '@/services/HighlyRestrictedAntimicrobialConsult'
// import HighlyRestrictedAntimicrobialConsultChecked from '@/services/HighlyRestrictedAntimicrobialConsultChecked'
import MixinMasterData from '@/mixins/masterdata.js'
import Logs from '@/components/Logs.vue'
import DropFiles from '@/components/DropFiles.vue'
import SyncPrincipalTest from '@/components/SyncPrincipalTest.vue'
import ListSignificantMedications from '@/components/ListSignificantMedications.vue'
import $ from 'jquery'
import UploadFileService from '@/services/IPD/UploadFileService'
export default {
  name: 'HighlyRestrictedAntimicrobialConsultIndex',
  props: ['ViewOnly', 'VisitId', 'VisitType', 'formId', 'dataDropfile'],
  mixins: [MixinForm, MixinMasterData],
  components: {Logs, DropFiles, SyncPrincipalTest, ListSignificantMedications, Print},
  data () {
    return {
      DataSubmit: null,
      loaded: false,
      IsLocked: false,
      user: {},
      popupTitle: '',
      AntibioticsTreatmentBefore: null,
      dataMaster: null,
      checkEdited: false,
      FormCode: 'A01_060_120421_VE'
    }
  },
  watch: {
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    },
    formId: {
      handler () {
        this.getMasterDatas({Form: 'IEOHIREANCO'}, () => {
          this.getDataDetail()
        })
      }
    }
  },
  computed: {
    isReadOnly: function () {
      return this.DataSubmit.ConfirmDoctor !== null || this.ViewOnly || this.IsLocked || !this.hasRole('IEOHIREANCOPUT')
      // return this.DataSubmit.ConfirmDoctor !== null || this.ViewOnly || this.IsLocked || !this.hasUpdate
      // || this.getCurrentUsername() !== this.DataSubmit.CreatedBy
    },
    _ItemId: function () {
      return this.$route.params.Item || this.formId
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'IEOHIREANCO'}, () => {
      this.getDataDetail()
    })
  },
  methods: {
    print () {
      this.$htmlToPaperWithFooter('printMe', this.__t('Ghi chú: biên bản này đồng thời là biên bản hội chẩn thuốc dấu * cho người bệnh có bảo hiểm y tế. <br/>' + this.__t('noVI001')), 'A01_060_120421_VE')
    },
    copyToAntimicrobialOrder (str) {
      // this.DataSubmit.HighlyRestrictedAntimicrobialConsultAntimicrobialOrder.push({
      //   Antimicrobial: item.TenThuoc,
      //   Dose: item.LieuDung,
      //   Duration: '',
      //   Frequency: '',
      //   removed: false
      // })
      str = this.trim_(str)
      if (this.MASTERDATA['IEOHIREANCOCA'].Items[0].Value && this.MASTERDATA['IEOHIREANCOCA'].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['IEOHIREANCOCA'].Items[0].Value ? (this.trim_(this.MASTERDATA['IEOHIREANCOCA'].Items[0].Value) + '\n') : ''
        this.MASTERDATA['IEOHIREANCOCA'].Items[0].Value = this.trim_(old + '-' + str, ', ')
        this.toastedInfo('Đã copy')
      }
      // this.MASTERDATA['IEOHIREANCOCA'].Items[0].Value = value
    },
    newMicrobiologicalResults (item) {
      this.DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults.push({
        Date: '',
        Culture: '',
        Specimen: '',
        removed: false
      })
    },
    newAntimicrobialOrder () {
      this.DataSubmit.HighlyRestrictedAntimicrobialConsultAntimicrobialOrder.push({
        Antimicrobial: '',
        Dose: '',
        Duration: '',
        Frequency: '',
        removed: false
      })
    },
    copyToForm (value, type) {
      if (type === 2) {
        var UpdateTime = value.UpdateTime ? value.UpdateTime.split(' ')[1] : ''
        var Culture = value.Result ? this.trim(value.Result.replace(/\r\n\r\n/g, '')) : ''
        // if (!this.DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults.find(e => e.Date === UpdateTime && e.Culture === Culture)) {
        this.DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults.push({
          Date: UpdateTime,
          Culture: Culture,
          Specimen: '',
          removed: false
        })
      }
    },
    getDataDetail () {
      // if (this._VisitType === 'IPD') {
      //   new HighlyRestrictedAntimicrobialConsultChecked({hidemsg: true}, this._VisitType).find(this.FormCode + '/' + this._VisitId).then(formdata => {
      //     this.IsLocked = formdata.IsLocked
      //   }).catch(e => {
      //     this.loaded = true
      //   })
      // }
      new HighlyRestrictedAntimicrobialConsult({hidemsg: true}, this._VisitType).find(this.FormCode + '/' + this._VisitId + '/' + this._ItemId).then(formdata => {
        if (this._VisitType === 'IPD') {
          this.IsLocked = formdata.IsLocked
        }
        if (!formdata.Datas) formdata.Datas = []
        this.DataSubmit = formdata
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: formdata.Id || formdata.ID
        }
        this.mapMdData2Data()
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.checkEdited = false
        this.loaded = true
        this.loadAntibioticsTreatmentBefore()
      }).catch(e => {
        if (e.status !== 404) this.hasErrForm = true
        this.loaded = true
      })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    submit () {
      var arr = this.MASTERDATA['IEOHIREANCOUPF'].Items[0].Value ? this.MASTERDATA['IEOHIREANCOUPF'].Items[0].Value : []
      this.mapData2MDData()
      return new HighlyRestrictedAntimicrobialConsult({}, this.getVisitGroupCode()).update(this.FormCode + '/' + this._VisitId + '/' + this._ItemId, {
        ...this.DataSubmit,
        HighlyRestrictedAntimicrobialConsultMicrobiologicalResults: this.DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults.filter(e => !e.removed),
        HighlyRestrictedAntimicrobialConsultAntimicrobialOrder: this.DataSubmit.HighlyRestrictedAntimicrobialConsultAntimicrobialOrder.filter(e => !e.removed)
      }, 'Update/').then(response => {
        this.toastedSuccess().getDataDetail()
        this.removedFile(arr)
        this.edited = false
        this.reload()
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    async confirm () {
      var arr = this.MASTERDATA['IEOHIREANCOUPF'].Items[0].Value ? this.MASTERDATA['IEOHIREANCOUPF'].Items[0].Value : []
      if (this.edited) {
        await this.submit()
      } else {
        this.removedFile(arr)
      }
      new HighlyRestrictedAntimicrobialConsult({}, this.getVisitGroupCode()).update('Confirm/' + this.FormCode + '/' + this._VisitId + '/' + this._ItemId, this.user).then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.getDataDetail()
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    openFile () {
      $('#dropzone').click()
    },
    handleBack () {
      this.edited = false
      if (this.checkEdited) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // popup canh bao
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
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
