<template>
  <div>
    <basepopup name="GiaiPhauBenh" width="965px" :isShowFooter="false" :clickToClose="false">
      <div slot="title" class="text-center">
        <h3 class="box-title">{{titlePopup}}</h3>
      </div>
      <div class="text-center" v-if="IsNew">
        <h4>{{__t('Chưa có thông tin !')}}</h4>
      </div>
      <template v-else>
        <div class="red italic" style="margin-bottom: 15px;">{{__t('Chỉ người tạo phiếu được chỉnh sửa nội dung và không được chỉnh sửa nếu dịch vụ đã thực hiện!')}}</div>
        <div style="overflow-x: auto;max-height: 66vh;">
          <template v-if="loaded">
            <template v-if="form && form.PathologyDto">
              <div class="box-body padding-15" style="border: 1px solid #F1F1F1;">
                <template v-if="PathologyTypes">
                  <!-- <h4 v-if="readonly"><b>{{(PathologyTypes.find(e => e.Code === form.PathologyDto.PathologyType) || {}).ViName}}</b></h4> -->
                  <span class="no-wrap" v-if="readonly">
                    <template v-if="form.PathologyDto.PathologyType">
                      <b class="el-radio-view">
                        {{(PathologyTypes.find(e => e.Code === form.PathologyDto.PathologyType) || {}).ViName}}
                      </b>
                    </template>
                    <b class="el-radio-view disable" v-else>
                      N/A
                    </b>
                  </span>
                  <div class="group-radio" v-else>
                    <template  v-for="(status, index) in PathologyTypes">
                      <input :data="status" :key="index" type="radio" :id="'a' + index" name="status" :value="status.Code" v-model="form.PathologyDto.PathologyType" @change="handleChange">
                      <label :class="'status-' + status.Code" :id="'status-' + status.Id" :key="'a' + index" :for="'a' + index">{{__label(status)}}</label>
                    </template>
                  </div>
                </template>
              </div>
              <table class="table v-table-1 no-margin col-1-1 mt-15" v-if="form.PathologyDto.PathologyType !== '001'">
                <tr v-if="form.PathologyDto.PathologyType === '003'">
                  <th width="1"><div class="w160">{{__t('Chu kỳ kinh nguyệt cuối')}}<span class="required">*</span></div></th>
                  <td>
                    <div class="flex-box flex-center">
                      <textarea-autosize id="LatestMenstrualPeriod" :readonly="readonly" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="form.PathologyDto.LatestMenstrualPeriod"/>
                    </div>
                  </td>
                </tr>
                <tr v-if="form.PathologyDto.PathologyType === '003'">
                  <th width="1"><div class="w160">{{__t('Sau mãn kinh')}}</div></th>
                  <td>
                    <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="form.PathologyDto.PostMenopause"/>
                  </td>
                </tr>
                <tr v-if="['004', '006'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Phương pháp phẫu thuật')}}</div></th>
                  <td>
                    <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.SurgeryMethod"/>
                  </td>
                </tr>
                <tr v-if="['002', '004', '005', '006'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Vị trí lấy bệnh phẩm')}}<span class="required">*</span></div></th>
                  <td>
                    <textarea-autosize id="SiteOfSpecimen" :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.SiteOfSpecimen"/>
                  </td>
                </tr>
                <tr v-if="['002', '003', '004', '005', '006'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Thời gian lấy mẫu')}}<span class="required">*</span></div></th>
                  <td>
                    <VDateTimePicker5
                      :readonly="readonly"
                      :max="form.PathologyDto.TimeOfStore"
                      v-model="form.PathologyDto.CollectionTime"
                      class="select-boox"
                      :format="vDateTimeFormat"
                      id="DateAndTimeOfSpecimenCollection"
                      :nobang="true"
                      :allday="'allday'"/>
                  </td>
                </tr>
                <tr v-if="['002', '003', '004'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Cố định bằng dung dịch')}}<span class="required">*</span></div></th>
                  <td>
                    <span class="fake-input disable" v-if="readonly">{{(StoreSpecimenWithSolutionOption.find(e => e.value === form.PathologyDto.StoreSpecimenWithSolution) || {}).label}}</span>
                    <v-select id="StoreSpecimenWithSolution" :fullwidth="true" :styleSelect="'width: 100%;'" v-else v-model="form.PathologyDto.StoreSpecimenWithSolution" :items="StoreSpecimenWithSolutionOption" />
                  </td>
                </tr>
                <tr v-if="['002', '003', '004'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('TG mẫu được cố định')}}<span class="required">*</span></div></th>
                  <td>
                    <VDateTimePicker5
                      :readonly="readonly"
                      v-model="form.PathologyDto.TimeOfStore"
                      class="select-boox"
                      :format="vDateTimeFormat"
                      :allday="'allday'"
                      :nobang="true"
                      id="FixativeTime"/>
                    <!-- <v-date-time-picker :allday="'allday'" :readonly="readonly" v-model="form.PathologyDto.TimeOfStore" class=" select-boox" :format="vDateTimeFormat"/> -->
                  </td>
                </tr>
                <tr v-if="['004', '006'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Định hướng mẫu BP')}}</div></th>
                  <td>
                    <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.SpecimenOrientation"/>
                  </td>
                </tr>
                <tr v-if="['002', '004', '005', '006'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Tóm tắt dấu hiệu lâm sàng chính và các xét nghiệm khác')}}<span class="required">*</span></div></th>
                  <td>
                    <textarea-autosize id="ClinicalHistoryAndLabTests" :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.ClinicalHistoryAndLabTests"/>
                  </td>
                </tr>
                <tr v-if="['002', '004', '005', '006'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Quá trình điều trị')}}<span class="required">*</span></div></th>
                  <td>
                    <textarea-autosize id="Treatment" :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.Treatment"/>
                  </td>
                </tr>
                <tr v-if="['002', '004', '005', '006'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Nhận xét đại thể')}}<span class="required">*</span></div></th>
                  <td>
                    <textarea-autosize id="GrosDescription" :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.GrosDescription"/>
                  </td>
                </tr>
                <tr v-if="['002', '004', '005', '006'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Kết quả lần trước')}}<span class="required">*</span></div></th>
                  <td>
                    <textarea-autosize id="PreviousResults" :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.PreviousResults"/>
                  </td>
                </tr>
                <tr v-if="['003'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Tiền sử xét nghiệm tế bào cổ tử cung và điều trị trước đó')}}<span class="required">*</span></div></th>
                  <td>
                    <textarea-autosize id="CervicalCytologyTestHistoryAndTreatmentBefore" :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.CervicalCytologyTestHistoryAndTreatmentBefore"/>
                  </td>
                </tr>
                <tr v-if="['003'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Tiền sử ung thư tế bào biểu mô trước đó')}}</div></th>
                  <td>
                    <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.HistoryOfSquamousCellCarcinoma"/>
                  </td>
                </tr>
                <tr v-if="['002', '003', '004', '005', '006'].includes(form.PathologyDto.PathologyType)">
                  <th width="1"><div class="w160">{{__t('Chẩn đoán lâm sàng')}}<span class="required">*</span></div></th>
                  <td>
                    <textarea-autosize id="ClinicalDiagnosis" :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="form.PathologyDto.ClinicalDiagnosis"/>
                  </td>
                </tr>
                <tr v-if="['003'].includes(form.PathologyDto.PathologyType)">
                  <td colspan="2">
                    <div class="service-list d-flex x23" :class="{'disable': readonly}">
                      <div class="service-item d-flex" style="width: 33%" :key="index" :data="service" v-for="(service, index) in GynecologicalCytologyTypes">
                        <div class="v-checkbox v-checkbox-2">
                          <input type="checkbox" :id="'xntbhpk-' + index" v-model="form.PathologyDto[service.Key]">
                          <label :for="'xntbhpk-' + index"></label>
                        </div>
                        <span>{{__label(service)}}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </template>
          </template>
          <div v-else class="loading-text"><v-loading/></div>
          <div class="none" id="PathologyPrintEln">
            <div :key="indexxn + 'ooXl'" :data="chargeItem" v-for="(chargeItem, indexxn) in Items">
              <template v-if="chargeItem.Selected">
                <PathologyPrint002 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '002'"/>
                <PathologyPrint003 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '003'"/>
                <PathologyPrint004 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '004'"/>
                <PathologyPrint002 :title="'005'" :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '005'"/>
                <PathologyPrint006 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '006'"/>
              </template>
            </div>
          </div>
        </div>
      </template>
      <div slot="footer">
        <div class="flex align-center space-between" style="padding: 10px 0px;">
          <button type="button" class="btn btn-block v-white-btn mrr10" style="flex-grow: 1" @click="handleClose()">{{__t('Đóng')}}</button>
          <button v-if="!IsNew && form && form.PathologyDto && form.PathologyDto.PathologyType !== '001'"
            class="btn btn-sm btn-warning mrr10"
            style="flex-grow: 1;font-size: 14px;"
            @click="handlePrint()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In Phiếu khai GPB')}}</button>
          <button type="button" class="btn btn-block v-yellow-btn full-width" style="margin-top: 0px;flex-grow: 1" v-if="!readonly" @click="handleSubmit()">{{__t('Đồng ý')}}</button>
        </div>
      </div>
    </basepopup>
  </div>
</template>
<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import MixinMasterData from '@/mixins/masterdata.js'
import VSelect from '@/components/VSelect.vue'
import VDateTimePickerV2 from '@/components/VDateTimePickerV2.vue'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
import $ from 'jquery'
// import moment from 'moment'
import PathologyMicrobiology from '@/services/PathologyMicrobiology'
import PathologyPrint002 from '@/pages/DoctorPlaceDiagnosticsOrder/PlaceDiagnostics/PathologyPrint/P002.vue'
import PathologyPrint003 from '@/pages/DoctorPlaceDiagnosticsOrder/PlaceDiagnostics/PathologyPrint/P003.vue'
import PathologyPrint004 from '@/pages/DoctorPlaceDiagnosticsOrder/PlaceDiagnostics/PathologyPrint/P004.vue'
import PathologyPrint006 from '@/pages/DoctorPlaceDiagnosticsOrder/PlaceDiagnostics/PathologyPrint/P006.vue'
export default {
  name: 'GiaiPhauBenhPopup',
  props: ['dataRow', 'readonly', 'Id', 'Type', 'titlePopup', 'ServiceCode', 'IsNew'],
  mixins: [MixinPlaceDiagnostics, MixinMasterData],
  data () {
    return {
      loaded: false,
      PathologyTypes: [{
        ViName: 'Không dùng',
        EnName: 'Not use',
        Code: '001',
        Id: '001'
      }, {
        ViName: 'PXN Tế bào',
        EnName: 'Cytopathology',
        Code: '002',
        Id: '002'
      }, {
        ViName: 'XN tế bào học phụ khoa',
        EnName: 'Gyn cytopathology',
        Code: '003',
        Id: '003'
      }, {
        ViName: 'PXN mô bệnh học',
        EnName: 'Histopathology',
        Code: '004',
        Id: '004'
      }, {
        ViName: 'PXN khối tế bào',
        EnName: 'Cell block',
        Code: '005',
        Id: '005'
      }, {
        ViName: 'PXN sinh thiết lạnh',
        EnName: 'Frosen section',
        Code: '006',
        Id: '006'
      }],
      StoreSpecimenWithSolutionOption: [
        {
          label: 'Không',
          value: '0'
        }, {
          label: 'NBF 10%',
          value: '1'
        }, {
          label: 'Cellfix',
          value: '2'
        }, {
          label: 'Cồn 95',
          value: '3'
        }, {
          label: 'Khác',
          value: '4'
        }
      ],
      GynecologicalCytologyTypes: [
        {
          ViName: 'Dụng cụ tránh thai',
          EnName: 'I.U.D',
          Value: 1,
          Key: 'IsBirthControlMethod'
        },
        {
          ViName: 'Điều trị xạ trị',
          EnName: 'Irradiationa therapy',
          Value: 2,
          Key: 'IsRadiationTheorapy'
        },
        {
          ViName: 'Hậu sản',
          EnName: 'Postpartum',
          Value: 3,
          Key: 'IsPostpartum'
        },
        {
          ViName: 'Điều trị hormone',
          EnName: 'Hormone therapy',
          Value: 4,
          Key: 'IsHormoneTreatment'
        },
        {
          ViName: 'Chảy máu sau mãn kinh',
          EnName: 'Postmenopausal bleeding',
          Value: 5,
          Key: 'IsPostMenopauseBleeding'
        },
        {
          ViName: 'Dùng thuốc tránh thai',
          EnName: 'Birth control pills',
          Value: 6,
          Key: 'IsBirthControlPills'
        },
        {
          ViName: 'Cắt tử cung',
          EnName: 'Hyst',
          Value: 7,
          Key: 'IsUterusremoval'
        },
        {
          ViName: 'Mang thai',
          EnName: 'Pregnant',
          Value: 8,
          Key: 'IsPregnant'
        },
        {
          ViName: 'Đang cho con bú',
          EnName: 'Breastfeeding',
          Value: 9,
          Key: 'IsBreastfeeding'
        }
      ],
      form: {},
      Items: null,
      Charge: {},
      Customer: {},
      User: {}
    }
  },
  watch: {
    dataRow (val) {
      if (val) {
        this.getData()
      }
    }
  },
  components: {
    VDateTimePicker, VSelect, VDateTimePickerV2, VDateTimePicker5, PathologyPrint002, PathologyPrint003, PathologyPrint004, PathologyPrint006
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    async getData () {
      let newItem = this.cloneObj(this.dataRow)
      this.form = newItem
      if (newItem.PathologyDto && newItem.PathologyDto.UpdatedAt === newItem.PathologyDto.CreatedAt) {
        if (!this.form.PathologyDto.PathologyType) {
          let item002 = (localStorage.getItem('AUTO_FOCUS_PXN_002') || '').split(',')
          if (item002.includes(this.ServiceCode)) {
            this.form.PathologyDto.PathologyType = '002'
          }
          let item003 = (localStorage.getItem('AUTO_FOCUS_PXN_003') || '').split(',')
          if (item003.includes(this.ServiceCode)) {
            this.form.PathologyDto.PathologyType = '003'
          }
          let item004 = (localStorage.getItem('AUTO_FOCUS_PXN_004') || '').split(',')
          if (item004.includes(this.ServiceCode)) {
            this.form.PathologyDto.PathologyType = '004'
          }
          let item005 = (localStorage.getItem('AUTO_FOCUS_PXN_005') || '').split(',')
          if (item005.includes(this.ServiceCode)) {
            this.form.PathologyDto.PathologyType = '005'
          }
          let item006 = (localStorage.getItem('AUTO_FOCUS_PXN_006') || '').split(',')
          if (item006.includes(this.ServiceCode)) {
            this.form.PathologyDto.PathologyType = '006'
          }
        }
        // if (!this.form.PathologyDto.CollectionTime) {
        //   this.form.PathologyDto.CollectionTime = moment(new Date()).format('HH:mm DD/MM/YYYY')
        // }
        // if (!this.form.PathologyDto.TimeOfStore) {
        //   this.form.PathologyDto.TimeOfStore = moment(new Date()).format('HH:mm DD/MM/YYYY')
        // }
      }
      this.loaded = true
    },
    handleClose () {
      this.$modal.hide('GiaiPhauBenh')
    },
    handleSubmit () {
      let data = {
        form: this.form,
        Id: this.Id,
        Type: this.Type
      }
      this.clearData()
      this.validateForm()
      this.$emit('handleUpdate', data)
    },
    handleChange (val) {
      $('.error').removeClass('error')
    },
    clearData () {
      if (this.form.PathologyDto.PathologyType === '001') {
        this.form.PathologyDto.LatestMenstrualPeriod = ''
        this.form.PathologyDto.PostMenopause = ''
        this.form.PathologyDto.SurgeryMethod = ''
        this.form.PathologyDto.SiteOfSpecimen = ''
        this.form.PathologyDto.CollectionTime = ''
        this.form.PathologyDto.StoreSpecimenWithSolution = ''
        this.form.PathologyDto.TimeOfStore = ''
        this.form.PathologyDto.SpecimenOrientation = ''
        this.form.PathologyDto.ClinicalHistoryAndLabTests = ''
        this.form.PathologyDto.Treatment = ''
        this.form.PathologyDto.GrosDescription = ''
        this.form.PathologyDto.PreviousResults = ''
        this.form.PathologyDto.CervicalCytologyTestHistoryAndTreatmentBefore = ''
        this.form.PathologyDto.HistoryOfSquamousCellCarcinoma = ''
        this.form.PathologyDto.ClinicalDiagnosis = ''
        this.clearType()
      }
      if (this.form.PathologyDto.PathologyType === '002') {
        this.form.PathologyDto.LatestMenstrualPeriod = ''
        this.form.PathologyDto.PostMenopause = ''
        this.form.PathologyDto.SpecimenOrientation = ''
        this.form.PathologyDto.CervicalCytologyTestHistoryAndTreatmentBefore = ''
        this.form.PathologyDto.HistoryOfSquamousCellCarcinoma = ''
        this.form.PathologyDto.SurgeryMethod = ''
        this.clearType()
      }
      if (this.form.PathologyDto.PathologyType === '003') {
        this.form.PathologyDto.SurgeryMethod = ''
        this.form.PathologyDto.SiteOfSpecimen = ''
        this.form.PathologyDto.SpecimenOrientation = ''
        this.form.PathologyDto.ClinicalHistoryAndLabTests = ''
        this.form.PathologyDto.Treatment = ''
        this.form.PathologyDto.GrosDescription = ''
        this.form.PathologyDto.PreviousResults = ''
      }
      if (this.form.PathologyDto.PathologyType === '004') {
        this.form.PathologyDto.LatestMenstrualPeriod = ''
        this.form.PathologyDto.PostMenopause = ''
        this.form.PathologyDto.CervicalCytologyTestHistoryAndTreatmentBefore = ''
        this.form.PathologyDto.HistoryOfSquamousCellCarcinoma = ''
        this.clearType()
      }
      if (this.form.PathologyDto.PathologyType === '005') {
        this.form.PathologyDto.LatestMenstrualPeriod = ''
        this.form.PathologyDto.PostMenopause = ''
        this.form.PathologyDto.SurgeryMethod = ''
        this.form.PathologyDto.StoreSpecimenWithSolution = ''
        this.form.PathologyDto.TimeOfStore = ''
        this.form.PathologyDto.SpecimenOrientation = ''
        this.form.PathologyDto.CervicalCytologyTestHistoryAndTreatmentBefore = ''
        this.form.PathologyDto.HistoryOfSquamousCellCarcinoma = ''
        this.clearType()
      }
      if (this.form.PathologyDto.PathologyType === '006') {
        this.form.PathologyDto.LatestMenstrualPeriod = ''
        this.form.PathologyDto.PostMenopause = ''
        this.form.PathologyDto.StoreSpecimenWithSolution = ''
        this.form.PathologyDto.TimeOfStore = ''
        this.form.PathologyDto.CervicalCytologyTestHistoryAndTreatmentBefore = ''
        this.form.PathologyDto.HistoryOfSquamousCellCarcinoma = ''
        this.clearType()
      }
      if (this.form.PathologyDto.CollectionTime && this.form.PathologyDto.CollectionTime === 'Invalid date') {
        this.form.PathologyDto.CollectionTime = ''
      }
      if (this.form.PathologyDto.TimeOfStore && this.form.PathologyDto.TimeOfStore === 'Invalid date') {
        this.form.PathologyDto.TimeOfStore = ''
      }
    },
    clearType () {
      this.GynecologicalCytologyTypes.forEach(service => {
        this.form.PathologyDto[service.Key] = false
      })
    },
    // validate form
    validateForm () {
      let errors = []
      // form.PathologyDto.CollectionTime
      if (['002', '003', '004', '005', '006'].includes(this.form.PathologyDto.PathologyType)) {

      }
      if (['002', '004', '005', '006'].includes(this.form.PathologyDto.PathologyType)) {
        if (!this.form.PathologyDto.SiteOfSpecimen) {
          const obj = {
            ViName: 'Vị trí lấy bệnh phẩm',
            EnName: 'Position of sample',
            Code: 'SiteOfSpecimen'
          }
          errors.push(obj)
        }
        if (!this.form.PathologyDto.ClinicalHistoryAndLabTests) {
          const obj = {
            ViName: 'Tóm tắt dấu hiệu lâm sàng chính và các xét nghiệm khác',
            EnName: 'Fixative solution',
            Code: 'ClinicalHistoryAndLabTests'
          }
          errors.push(obj)
        }
        if (!this.form.PathologyDto.Treatment) {
          const obj = {
            ViName: 'Quá trình điều trị',
            EnName: 'Treament process',
            Code: 'Treatment'
          }
          errors.push(obj)
        }
        if (!this.form.PathologyDto.GrosDescription) {
          const obj = {
            ViName: 'Nhận xét đại thể',
            EnName: 'Gross features',
            Code: 'GrosDescription'
          }
          errors.push(obj)
        }
        if (!this.form.PathologyDto.PreviousResults) {
          const obj = {
            ViName: 'Kết quả lần trước',
            EnName: 'Previous results',
            Code: 'PreviousResults'
          }
          errors.push(obj)
        }
      }
      if (['002', '003', '004'].includes(this.form.PathologyDto.PathologyType)) {
        if (!this.form.PathologyDto.StoreSpecimenWithSolution) {
          const obj = {
            ViName: 'Cố định bằng dung dịch',
            EnName: 'Fixative solution',
            Code: 'StoreSpecimenWithSolution'
          }
          errors.push(obj)
        }
        if (!this.form.PathologyDto.TimeOfStore) {
          const obj = {
            ViName: 'TG mẫu được cố định',
            EnName: 'Fixative time',
            Code: 'FixativeTime'
          }
          errors.push(obj)
        }
      }
      if (['002', '003', '004', '005', '006'].includes(this.form.PathologyDto.PathologyType)) {
        if (!this.form.PathologyDto.CollectionTime) {
          const obj = {
            ViName: 'Thời gian lấy mẫu',
            EnName: 'Date and time of specimen collection',
            Code: 'DateAndTimeOfSpecimenCollection'
          }
          errors.push(obj)
        }
        if (!this.form.PathologyDto.ClinicalDiagnosis) {
          const obj = {
            ViName: 'Chẩn đoán lâm sàng',
            EnName: 'Clinical diagnosis',
            Code: 'ClinicalDiagnosis'
          }
          errors.push(obj)
        }
      }
      if (this.form.PathologyDto.PathologyType === '003') {
        if (!this.form.PathologyDto.LatestMenstrualPeriod) {
          const obj = {
            ViName: 'Chu kỳ kinh nguyệt cuối',
            EnName: 'Last menstrual cycle',
            Code: 'LatestMenstrualPeriod'
          }
          errors.push(obj)
        }
      }
      if (['003'].includes(this.form.PathologyDto.PathologyType)) {
        if (!this.form.PathologyDto.CervicalCytologyTestHistoryAndTreatmentBefore) {
          const obj = {
            ViName: 'Tiền sử xét nghiệm tế bào cổ tử cung và điều trị trước đó',
            EnName: 'Histology of a Pap test',
            Code: 'CervicalCytologyTestHistoryAndTreatmentBefore'
          }
          errors.push(obj)
        }
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    handlePrint () {
      if (!this.readonly) {
        let data = {
          form: this.form,
          Id: this.Id,
          Type: this.Type
        }
        this.clearData()
        this.validateForm()
        if (data) {
          new PathologyMicrobiology()
            .update('/Update/' + data.Type + '/' + data.Id, data.form).then(res => {
              this.print()
            }).catch(e => {
              console.log(e)
            })
        }
      } else {
        this.print()
      }
    },
    print () {
      if (this.form) {
        this.User = this.form.User
        this.Charge = this.form.data
        this.Charge.AreaName = this.form.ChargeData.AreaName
        this.Customer = this.form.Customer
        this.Items = (this.cloneObj(this.form.data.Items.filter(e => e.Pathology && e.Status === 'Placed' && e.Pathology.PathologyType !== '001')) || []).map(e => {
          e.IsOpen = false
          e.Selected = true
          e.Pathology = this.form.PathologyDto
          return e
        })
      }
      setTimeout(() => {
        this.$htmlToPaperPrint2('PathologyPrintEln', false, '')
      }, 900)
    }
  }
}
</script>

<style scoped>
.error {
  border: 1px solid red;
}
</style>
