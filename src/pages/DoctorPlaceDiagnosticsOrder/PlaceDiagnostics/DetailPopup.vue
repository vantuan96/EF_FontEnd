<template>
  <div>
    <modal name="DetailPopup" transition="pop-out" id="DetailPopup" height="auto" :clickToClose="false" :width="modalWidth" >
      <div class="box v-model-content-popup" v-if="item">
        <div class="box-header text-center">
          <h3 class="box-title">{{item.Service.Code}} - {{item.Service.ViName}}.</h3>
        </div>
        <div class="box-body padding-15">
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <table class="table v-table-1 no-margin col-1-1">
                <tr>
                  <th width="1"><div class="w160">{{__t('Yêu cầu')}}</div></th>
                  <td>
                    <p class="fake-input">{{item.AdditionalInformation}}</p>
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Ghi chú')}}</div></th>
                  <td>
                    <p class="fake-input">{{item.Comments}}</p>
                  </td>
                </tr>
                <!-- vi sinh -->
                <tr v-if="item.Microbiology">
                  <th width="1"><div class="w160">{{__t('Thông tin vi sinh')}}</div></th>
                  <td v-if="!item.Microbiology.IsNotUse">
                    <template v-if="form && form.MicrobiologyDto">
                      <div class="flex-box flex-center">
                        <label class="text-left no-wrap mr-10 lb-w2" required>{{__t('Loại mẫu')}}:</label>
                        <div id="STypeGroupID" class="input-group mr-5" style="flex-grow: 1">
                          <v-select :readonly="readonly" :fullwidth="true" :styleSelect="'width: 100%;'" v-model="form.MicrobiologyDto.STypeGroupID" :items="TypeGroupList" />
                        </div>
                        <div class="input-group mr-5" :class="getClassError()" style="flex-grow: 1">
                          <v-select :readonly="readonly" :fullwidth="true" :styleSelect="'width: 100%;'" v-model="form.MicrobiologyDto.STypeID" :items="STypeIDList" />
                        </div>
                        <div>
                          <p class="fake-input disable">{{form.MicrobiologyDto.STypeID ? getSTypeIDName(form.MicrobiologyDto.STypeID) : ''}}</p>
                        </div>
                      </div>
                      <div class="flex-box flex-center mt-10 mb-10">
                        <label v-if="hasValidate002" class="text-left no-wrap mr-10 lb-w2" required>{{__t('Phân tầng kháng sinh')}}:</label>
                        <label v-else class="text-left no-wrap mr-10 lb-w2">{{__t('Phân tầng kháng sinh')}}:</label>
                        <div class="input-group mr-5 full-width" id="Stratified">
                          <v-select :readonly="readonly" :fullwidth="true" :styleSelect="'width: 100%;'" v-model="form.MicrobiologyDto.Stratified" :items="GroupList" />
                        </div>
                      </div>
                    </template>
                  </td>
                  <td v-else>{{__t('Không dùng')}}</td>
                </tr>
                <!-- giai phau benh -->
                <tr v-if="item.Pathology">
                  <th width="1"><div class="w160">{{__t('Thông tin giải phẫu bệnh')}}</div></th>
                  <td>
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
                  </td>
                </tr>
                <!-- trang thai -->
                <tr>
                  <th width="1"><div class="w160">{{__t('Trạng thái')}}:</div></th>
                  <td>
                    <div><b>{{item.Status}}</b></div>
                    <div v-if="item.RadiologyScheduledStatus">Radiology Scheduled Status: {{RADIOLOGYSCHEDULEDPROCEDURESTATUS[item.RadiologyScheduledStatus]}}</div>
                    <div v-if="item.PaymentStatus">Payment Status: {{CHARGEPAYMENTSTATUS[item.PaymentStatus]}}</div>
                    <div v-if="item.PlacerOrderStatus">Placer Order Status: {{CPOEPLACERORDERSTATUS[item.PlacerOrderStatus]}}</div>
                    <div v-if="item.SpecimenStatus">Specimen Status: {{SPECIMENSTATUSES[item.SpecimenStatus]}}</div>
                    <div v-if="item.DiagnosticReported">Diagnostic Report: {{__t('Đã tiếp nhận')}}</div>
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('DRS Code')}}:</div></th>
                  <td>
                    <div><b>DRS{{item.PlacerIdentifyNumber}}</b></div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row" v-if="!readonly">
            <div class="col-sm-6 col-md-6"><button type="button"  class="btn btn-block" @click="close()">{{__t('Đồng ý')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button"  class="btn btn-block v-yellow-btn" @click="handleSubmit()">{{__t('Lưu')}}</button></div>
          </div>
          <div class="row" v-else>
            <div class="col-sm-12 col-md-12"><button type="button"  class="btn btn-block" @click="close()">{{__t('Đồng ý')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import MixinMasterData from '@/mixins/masterdata.js'
import EventBus from '@/lib/eventBus'
import constants from '@/constants'
import PathologyMicrobiology from '@/services/PathologyMicrobiology'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VSelect from '@/components/VSelect.vue'
import VDateTimePickerV2 from '@/components/VDateTimePickerV2.vue'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
import $ from 'jquery'
const MODAL_WIDTH = 970
export default {
  name: 'DetailPopup',
  mixins: [MixinPlaceDiagnostics, MixinMasterData],
  data () {
    return {
      rawObj: {},
      showGuild: false,
      item: null,
      TYPEGROUPLIST: null,
      modalWidth: MODAL_WIDTH,
      GroupList: [
        {label: 'Nhóm 1', value: '01'},
        {label: 'Nhóm 2', value: '02'},
        {label: 'Nhóm 3', value: '03'}
      ],
      GynecologicalCytologyTypes: [
        {
          ViName: 'Dụng cụ tránh thai',
          EnName: 'Dụng cụ tránh thai',
          Value: 1,
          Key: 'IsBirthControlMethod'
        },
        {
          ViName: 'Điều trị xạ trị',
          EnName: 'Điều trị xạ trị',
          Value: 2,
          Key: 'IsRadiationTheorapy'
        },
        {
          ViName: 'Hậu sản',
          EnName: 'Hậu sản',
          Value: 3,
          Key: 'IsPostpartum'
        },
        {
          ViName: 'Điều trị hormone',
          EnName: 'Điều trị hormone',
          Value: 4,
          Key: 'IsHormoneTreatment'
        },
        {
          ViName: 'Chảy máu sau mãn kinh',
          EnName: 'Chảy máu sau mãn kinh',
          Value: 5,
          Key: 'IsPostMenopauseBleeding'
        },
        {
          ViName: 'Dùng thuốc tránh thai',
          EnName: 'Dùng thuốc tránh thai',
          Value: 6,
          Key: 'IsBirthControlPills'
        },
        {
          ViName: 'Cắt tử cung',
          EnName: 'Cắt tử cung',
          Value: 7,
          Key: 'IsUterusremoval'
        },
        {
          ViName: 'Mang thai',
          EnName: 'Mang thai',
          Value: 8,
          Key: 'IsPregnant'
        },
        {
          ViName: 'Đang cho con bú',
          EnName: 'Đang cho con bú',
          Value: 9,
          Key: 'IsBreastfeeding'
        }
      ],
      // StoreSpecimenWithSolutionOption: [
      //   {
      //     label: 'Không',
      //     code: '0'
      //   }, {
      //     label: 'NBF 10%',
      //     code: '1'
      //   }, {
      //     label: 'Cellfix',
      //     code: '2'
      //   }, {
      //     label: 'Cồn 95',
      //     code: '3'
      //   }, {
      //     label: 'Khác',
      //     code: '4'
      //   }
      // ],
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
      PathologyTypes: [{
        ViName: 'Không dùng',
        EnName: 'Không dùng',
        Code: '001',
        Id: '001'
      }, {
        ViName: 'PXN Tế bào',
        EnName: 'PXN Tế bào',
        Code: '002',
        Id: '002'
      }, {
        ViName: 'XN tế bào học phụ khoa',
        EnName: 'XN tế bào học phụ khoa',
        Code: '003',
        Id: '003'
      }, {
        ViName: 'PXN mô bệnh học',
        EnName: 'PXN mô bệnh học',
        Code: '004',
        Id: '004'
      }, {
        ViName: 'PXN khối tế bào',
        EnName: 'PXN khối tế bào',
        Code: '005',
        Id: '005'
      }, {
        ViName: 'PXN sinh thiết lạnh',
        EnName: 'PXN sinh thiết lạnh',
        Code: '006',
        Id: '006'
      }],
      CHARGEPAYMENTSTATUS: constants.CHARGEPAYMENTSTATUS,
      RADIOLOGYSCHEDULEDPROCEDURESTATUS: constants.RADIOLOGYSCHEDULEDPROCEDURESTATUS,
      CPOEPLACERORDERSTATUS: constants.CPOEPLACERORDERSTATUS,
      SPECIMENSTATUSES: constants.SPECIMENSTATUSES,
      dataRow: null,
      readonly: false,
      Id: '',
      Type: null,
      form: {}
    }
  },
  components: {
    VDateTimePicker, VSelect, VDateTimePickerV2, VDateTimePicker5
  },
  computed: {
    STypeIDList () {
      if (this.form.MicrobiologyDto.STypeGroupID === null) return []
      return ((this.TypeGroupList.find(e => this.form.MicrobiologyDto.STypeGroupID && e.value === this.form.MicrobiologyDto.STypeGroupID) || {}).Items || []).map(e => {
        return {
          label: e.Code + ' - ' + e.ViName,
          value: e.Code,
          Items: e.Items,
          name: e.ViName
        }
      })
    },
    TypeGroupList () {
      var arr = []
      var md = []
      if (this.TYPEGROUPLIST) {
        md = this.TYPEGROUPLIST.map(e => {
          return {
            label: e.ViName,
            value: e.Code,
            Items: e.Items
          }
        })
      }
      return [...new Set(arr.concat(md))]
    },
    hasValidate002: function () {
      var item002 = (localStorage.getItem('MICROBIOLOGY_SERVICE_02') || '').split(',')
      if (item002.includes(this.ServiceCode)) {
        return true
      }
      return false
    }
  },
  watch: {
  },
  created () {
    this.getTypeGroupList()
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    EventBus.$on('openDetailPopup', this.open)
  },
  beforeDestroy () {
    EventBus.$off('openDetailPopup')
  },
  methods: {
    getTypeGroupList () {
      if (this.TYPEGROUPLIST) return
      this.getRawMasterDatas({Form: 'Microbiology'}, (data) => {
        this.TYPEGROUPLIST = data
      })
    },
    close () {
      this.$modal.hide('DetailPopup')
      this.showGuild = false
    },
    ok () {
      this.form.IsOk = true
      this.update({form: this.form, type: this.form.type})
      this.$modal.hide('DetailPopup')
      this.showGuild = false
    },
    open (form) {
      this.item = this.cloneObj(form)
      console.log('form: ', form)
      this.Type = form.ItemType
      this.IsNew = false
      if (form.Microbiology) {
        this.Id = form.Microbiology.Id
      }
      if (form.Pathology) {
        this.Id = form.Pathology.Id
      }
      if (form.Id && this.Id) {
        new PathologyMicrobiology()
          .find('Detail/' + this.Type + '/' + form.Id).then(res => {
            this.dataRow = res
            this.readonly = res.IsReadonly
            if (this.Type === 0) {
              if (res.IsReadonly && res.MicrobiologyDto && res.MicrobiologyDto.CreatedAt === res.MicrobiologyDto.UpdatedAt) {
                this.IsNew = true
              }
            }
            if (this.Type === 1) {
              if (res.IsReadonly && res.PathologyDto && res.PathologyDto.CreatedAt === res.PathologyDto.UpdatedAt) {
                this.IsNew = true
              }
            }
            this.getDataPopUp()
          }).catch(e => {
            console.log(e)
          })
      } else {
        this.readonly = true
        this.form = this.cloneObj(form)
        this.$modal.show('DetailPopup')
      }
    },
    getDataPopUp () {
      let newItem = this.cloneObj(this.dataRow)
      this.form = newItem
      console.log('newItem: ', newItem)
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
      }
      this.$modal.show('DetailPopup')
    },
    handleSubmit () {
      if (this.Type === 1) {
        this.clearData()
        this.validateForm()
      } else {
        if (!this.form.MicrobiologyDto.STypeGroupID) {
          this.form.MicrobiologyDto.STypeID = ''
        }
        this.validateForm2()
      }
      setTimeout(() => {
        new PathologyMicrobiology()
          .update('/Update/' + this.Type + '/' + this.Id, this.form).then(res => {
            this.toastedSuccess()
            this.reload()
          }).catch(e => {
            console.log(e)
          })
      }, 100)
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
    validateForm2 () {
      let errors = []
      if (!this.form.MicrobiologyDto.STypeGroupID) {
        const obj = {
          ViName: 'Loại mẫu',
          EnName: 'Type of specimen',
          Code: 'STypeGroupID'
        }
        errors.push(obj)
      }
      if (!this.form.MicrobiologyDto.Stratified && this.hasValidate002) {
        const obj = {
          ViName: 'Phân tầng kháng sinh',
          EnName: 'Antibiotic stratification',
          Code: 'Stratified'
        }
        errors.push(obj)
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    getClassError () {
      console.log($('#STypeGroupID').className)
      return ''
    },
    handleChange (val) {
      $('.error').removeClass('error')
    },
    getSTypeIDName (val) {
      let name = ''
      this.STypeIDList.find(e => {
        if (e.value === val) {
          name = e.name
        }
      })
      return name
    }
  }
}
</script>
