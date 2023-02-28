<template>
  <div v-if="loaded">
    <div v-if="DataSubmit.Customer">
        <customer-info :data="DataSubmit.Customer" :Visit="DataSubmit.Visit"/>
        <div v-if="errrrr" class="text-center msg-error">{{errrrr}}</div>
        <template v-else>
          <div class="v-tab mb-10">
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active">
                <a>
                  {{__t('Chỉ định')}}<br/>
                </a>
              </li>
              <li role="presentation">
                <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-History', params: this.$route.params}">
                  {{__t('Lịch sử chỉ định')}}<br/>
                </router-link>
              </li>
              <li role="presentation">
                <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-ViHC', params: this.$route.params}">
                  {{__t('ViHC')}}<br/>
                </router-link>
              </li>
            </ul>
        </div>
        <div class="tab-content">
          <div v-if="DataSubmit.Visit" class="main-content" id="PlaceDiagnostics-page">
            <div :class="'d-flex ' + 'step-' + step">
              <div class="flex-grow-1" :class="{'hidden': step !== 1}">
                <div class="box form-content mb-10">
                  <div class="box-body">
                    <div class="row">
                      <div class="col-md-12">
                        <label>{{__t('Tìm kiếm dịch vụ')}}:</label>
                      </div>
                      <div class="col-md-12">
                        <ServiceSelect :PatientLocationId="DataSubmit.Visit.PatientLocationId"/>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
                <OrderSetSelectTable />
                <div class="mb-10">
                  <Vcollapse @getData="open('VcollapseXN')" ref="VcollapseXN">
                    <template slot='title'>
                      <div class="d-flex">
                        <span>{{__t('Xét nghiệm')}}</span>
                      </div>
                    </template>
                    <template slot='content'>
                      <ServiceSelectTable :PatientLocationId="DataSubmit.Visit.PatientLocationId" :lastItemChargeByPID="lastItemChargeByPID" v-model="servicesItem[0]" @remove="removeService" :type="0"/>
                    </template>
                  </Vcollapse>
                </div>
                <div class="mb-10">
                  <Vcollapse @getData="open('VcollapseCDHA')" ref="VcollapseCDHA">
                    <template slot='title'>
                      {{__t('Chẩn đoán hình ảnh')}}
                    </template>
                    <template slot='content'>
                      <ServiceSelectTable :PatientLocationId="DataSubmit.Visit.PatientLocationId"  :lastItemChargeByPID="lastItemChargeByPID" v-model="servicesItem[1]" @remove="removeService" :type="1"/>
                    </template>
                  </Vcollapse>
                </div>
                <div class="">
                  <Vcollapse @getData="open('Vcollapse')" ref="Vcollapse">
                    <template slot='title'>
                      {{__t('Dịch vụ chung')}}
                    </template>
                    <template slot='content'>
                      <ServiceSelectTable :PatientLocationId="DataSubmit.Visit.PatientLocationId" :lastItemChargeByPID="lastItemChargeByPID" v-model="servicesItem[2]" @remove="removeService" :type="2"/>
                    </template>
                  </Vcollapse>
                </div>
              </div>
              <div class="ordered" v-if="allData.length || DataSubmit.Draft">
                <div v-if="DataSubmit.Draft && step === 1" class="ServiceOrderList">
                  <div class="mb-15 box form-content">
                    <h4><b>{{__t('Lưu nháp')}}</b></h4>
                    <p><b>{{__t('Tên bản nháp')}}:</b> {{DataSubmit.Draft.Title}}</p>
                    <p><b>{{__t('Ghi chú')}}:</b> {{DataSubmit.Draft.Note}}</p>
                    <p><b>{{__t('Lúc')}}:</b> {{DataSubmit.Draft.UpdatedAt | formatDate}} {{__t('bởi')}} <ad-Info :ad="DataSubmit.Draft.UpdatedBy" /></p>
                    <div class="text-right"><button class="btn btn-sm mr-10" @click="removeDraftConfirm()">Xóa</button><button @click="selectDraft()" class="btn btn-sm btn-warning">{{__t('Chọn')}}</button></div>
                  </div>
                </div>
                <ServiceOrderList :lastItemChargeByPID="lastItemChargeByPID"  v-if="allData.length" :step="step" />
              </div>
              <div class="box form-content" :class="{'hidden': step !== 2}">
                <div class="tbl-title">1. {{__t('Thông tin chung')}}</div>
                <table class="table v-table-1 no-margin col-1-1">
                  <tr>
                    <th width="1"><div class="w160">{{__t('Chẩn đoán/ Lịch sử lâm sàng')}} <span class="error-msg">*</span></div></th>
                    <td>
                      <textarea-autosize v-model="DataSubmit.Charge.Diagnosis" class="form-control" rows="3" :placeholder="__t('Nhập')"/>
                      <span class="error-msg" v-if="errorMsg['Diagnosis']">{{__t('Vui lòng nhập chẩn đoán')}}</span>
                      <span class="error-msg" v-if="errorMsg['DiagnosisLength']">{{__t('Vui lòng nhập chẩn đoán tối đa 150 ký tự')}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th width="1"><div class="w160">{{__t('Buồng')}}</div></th>
                    <td>
                      <input v-model="DataSubmit.Charge.room" class="form-control" :placeholder="__t('Nhập')"/>
                    </td>
                  </tr>
                  <tr>
                    <th width="1"><div class="w160">{{__t('Giường')}}</div></th>
                    <td>
                      <input v-model="DataSubmit.Charge.Bed" class="form-control" :placeholder="__t('Nhập')"/>
                    </td>
                  </tr>
                </table>
                <div class="tbl-title">2. {{__t('Thông tin chỉ định dịch vụ')}}</div>
                <div class="mb-10" :key="index" :data="servicesList" v-for="(servicesList, index) in servicesDetailItem" v-if="servicesList.length && index < 3">
                  <Vcollapse @getData="open('VcollapseXNStep' + index)" :class="'VcollapseXNStep' + index" :ref="'VcollapseXNStep' + index">
                    <template slot='title'>
                      <div class="d-flex">
                        <span>{{__t(Types[index])}}</span>
                      </div>
                    </template>
                    <template slot='content'>
                      <div class="box-collapse-content v-box-collapse">
                        <div class="panel-group" id="accordionXetNghiem" role="tablist" aria-multiselectable="true">
                          <template v-for="(service, indexxn) in servicesList">
                            <div :key="indexxn + '-' + index" :data="service" class="panel panel-default">
                              <div class="panel-heading" role="tab" :id="'headingOne-' + indexxn + '-' + index">
                                <h4 class="panel-title">
                                  <a role="button" data-toggle="collapse" :href="'#collapseboxxn-' + indexxn + '-' + index" aria-expanded="true" :aria-controls="'collapseboxxn-' + indexxn + '-' + index">
                                    {{service.Code}} - {{__label(service)}}<i class="fa fa-angle-double-down" aria-hidden="true"></i> <i class="fa fa-angle-double-up" aria-hidden="true"></i>
                                  </a>
                                </h4>
                              </div>
                              <div :id="'collapseboxxn-' + indexxn + '-' + index" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                <table class="table v-table-1 no-margin col-1-1">
                                  <tr v-if="service.AllowSetupQty">
                                    <th width="1"><div class="w160">{{__t('Số lượng')}}:</div></th>
                                    <td>
                                      <div class="d-flex flex-center chil-m1">
                                        <div v-if="service.AllowSetupQty">
                                          <MDNumberInput v-model="service.Qty"/>
                                        </div>
                                        <span class="error-msg" v-if="service.AllowSetupQty && !service.Qty && errorMsg['errorqty']">{{__t('Vui lòng nhập Số lượng')}}</span>
                                        <span class="error-msg" v-if="service.AllowSetupQty && service.Qty > maxqty && errorMsg['errorqtyMax']">{{__t('Số lượng tối đa được phép nhập là ') + maxqty}}</span>
                                      </div>
                                    </td>
                                  </tr>
                                  <!-- <tr>
                                    <th width="1"><div class="w160">Lặp lại</div></th>
                                    <td>
                                    <div class="d-flex flex-center chil-m1">
                                      <div>
                                        <div class="v-checkbox v-checkbox-2">
                                          <input  v-model="service.IsRepeat" type="checkbox" :id="'form-repeat' + indexxn + '-' + index">
                                          <label :for="'form-repeat' + indexxn + '-' + index"></label>
                                        </div>
                                      </div>
                                      <template v-if="service.IsRepeat">
                                      <div>
                                        Mỗi:
                                      </div>
                                      <div>
                                        <NumberInput v-model="service.RepeatValue"/>
                                      </div>
                                      <div>
                                        <v-select v-model="service.RepeatType" :clearable="false" :searchable="false" :items="[{label: 'Giờ', value: '1'}, {label: 'Ngày', value: '2'}, {label: 'Tuần', value: '3'}, {label: 'Tháng', value: '4'}]"/>
                                      </div>
                                      <div>
                                        Trong:
                                      </div>
                                      <div>
                                        <NumberInput v-model="service.RepeatRange"/>
                                      </div>
                                      <div>
                                        <v-select v-model="service.RepeatRangeType" :clearable="false" :searchable="false" :items="[{label: 'Giờ', value: '1'}, {label: 'Ngày', value: '2'}, {label: 'Tuần', value: '3'}, {label: 'Tháng', value: '4'}]"/>
                                      </div>
                                      </template>
                                    </div>
                                    </td>
                                  </tr> -->
                                  <tr>
                                    <th width="1"><div class="w160">{{__t('Yêu cầu')}}</div></th>
                                    <td>
                                      <textarea-autosize v-model="service.AdditionalInformation" class="form-control" rows="3" :placeholder="__t('Nhập')"/>
                                      <span class="error-msg" v-if="service.AdditionalInformation && service.AdditionalInformation.length > 150">{{__t('Vui lòng nhập tối đa 150 ký tự')}}</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th width="1"><div class="w160">{{__t('Ghi chú')}}</div></th>
                                    <td>
                                      <textarea-autosize v-model="service.Comments" class="form-control" rows="3" :placeholder="__t('Nhập')"/>
                                      <span class="error-msg" v-if="service.Comments && service.Comments.length > 150">{{__t('Vui lòng nhập tối đa 150 ký tự')}}</span>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </template>
                  </Vcollapse>
                </div>
              </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <FloatBlock v-if="allData.length" :hideBackBtn="step === 2">
              <template slot='top'>
                <h4 class="text-right color-white" style="padding: 0">
                  <b>{{__t('Tổng số')}}:</b> {{totalItems}} {{__t('Dịch vụ')}}<template v-if="step === 2">, <b>{{__t('Thành tiền')}}:</b> <b>{{totalAmount | currency}} VNĐ</b></template>
                </h4>
              </template>
              <template slot='backbtn' v-if="step === 2">
                <button class="btn pull-left btn-back v-white-btn" type="button" @click="next(1)"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> {{__t('btn.quay_lai')}}.</button>
              </template>
              <template slot='buttons'>
                <div class="col-md-5 col-sm-5">
                  <div class="form-group1 text-right">
                    <button type="button" class="btn btn-flat" @click="cancel()">{{ __t('Hủy toàn bộ dịch vụ') }}</button>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group1">
                    <button v-if="step === 1" type="button" class="btn btn-flat btn-info btn-block" @click="draft()">{{ __t('Lưu nháp') }}</button>
                    <button v-else type="button" class="btn btn-flat btn-info btn-block" @click="next(1)">{{ __t('Thêm chỉ định') }}</button>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group1">
                    <button type="button" v-if="step === 1"  class="btn btn-flat v-yellow-btn btn-block" @click="getPrice()">{{ __t('Tiếp tục') }}</button>
                    <button type="button" v-if="step === 2" :disabled="sending" class="btn btn-flat v-yellow-btn btn-block" @click="submitV2()">{{ __t('Xác nhận chỉ định') }}</button>
                  </div>
                </div>
              </template>
            </FloatBlock>
            <PathologyPopup :readonly="false"/>
            <MicrobiologyPopup :readonly="false"/>
            <RadiologyProcedurePlanRefPopup />
            <DraftPopup ref="DraftPopup" v-model="DataSubmit"/>
          </div>
          <div v-else class="text-center p-15">
            <p>{{__t('Không tìm thấy thông tin lượt khám với VisitCode')}} <b>{{$route.params.VisitCode}}</b></p>
            <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-History', params: this.$route.params}">
              {{__t('Xem lịch sử chỉ định của bệnh nhân')}}<br/>
            </router-link>
          </div>
        </div>
      </template>
    </div>
    <div v-else class="text-center">
      {{__t('Không tìm thấy thông tin bệnh nhân')}}
    </div>
  </div>
  <div v-else class="text-center">
    <v-loading/>
  </div>
</template>
<script>

import CustomerInfo from './CustomerInfo.vue'
import ServiceSelect from './ServiceSelect.vue'
import OrderSetSelectTable from './OrderSetSelectTable.vue'
import ServiceSelectTable from './ServiceSelectTable.vue'
import ServiceOrderList from './ServiceOrderList.vue'
import PathologyPopup from './PathologyPopup.vue'
import MicrobiologyPopup from './MicrobiologyPopup.vue'
import DraftPopup from './Draft.vue'
import RadiologyProcedurePlanRefPopup from './RadiologyProcedurePlanRefPopup.vue'
import constants from '@/constants'
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import Services from '@/services/Services'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import { mapGetters } from 'vuex'
import VSelect from '@/components/VSelect.vue'
import NProgress from 'nprogress'
export default {
  /**
   * The name of the page.
   */
  name: 'PlaceDiagnostics',
  mixins: [MixinPlaceDiagnostics],
  data () {
    return {
      lastItemChargeByPID: [],
      errorMsg: {},
      DataSubmit: {
        Charge: {
          Priority: 'R',
          IsRepeat: false
        }
      },
      IsRepeat: false,
      loaded: false,
      RickGroup: constants.RISKGROUP,
      tes: '',
      servicesItem: [[], [], [], []],
      servicesDetailItem: [[], [], [], []],
      step: 1,
      Types: ['Dịch vụ xét nghiệm', 'Dịch vụ CĐHA', 'Dịch vụ chung'],
      IsSelectDraft: false,
      errrrr: '',
      sending: false,
      maxqty: 1
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VSelect,
    DraftPopup,
    CustomerInfo,
    ServiceSelect,
    ServiceSelectTable,
    ServiceOrderList,
    PathologyPopup,
    MicrobiologyPopup,
    RadiologyProcedurePlanRefPopup,
    OrderSetSelectTable
  },
  watch: {
    servicesData: {
      handler (a, b) {
        this.setServicesDetailItem()
      },
      deep: true
    },
    allData: {
      handler (a, b) {
        if (this.allData.length === 0) this.step = 1
      },
      deep: true
    }
  },
  mounted () {
    this.removeAll()
    this.getData()
    // this.getCustomerServicePlaced()
    this.open('Vcollapse')
    this.open('VcollapseXN')
    this.open('VcollapsePK')
    this.open('VcollapseCDHA')
  },
  computed: {
    ...mapGetters({
      servicesData: 'PlaceDiagnostics/getServices'
    }),
    allData: function () {
      return [].concat(this.servicesData[0] || []).concat(this.servicesData[1] || []).concat(this.servicesData[2] || [])
    },
    totalAmount: function () {
      var ChargeItems = this.servicesDetailItem[0].concat(this.servicesDetailItem[1]).concat(this.servicesDetailItem[2])
      return ChargeItems.reduce((a, b) => {
        return a + b['Price'] * b.Qty
      }, 0)
    },
    totalItems: function () {
      var ChargeItems = this.servicesDetailItem[0].concat(this.servicesDetailItem[1]).concat(this.servicesDetailItem[2])
      return ChargeItems.reduce((a, b) => {
        return a + b.Qty
      }, 0)
    }
  },
  methods: {
    selectDraft () {
      if (this.DataSubmit.Draft.RawData) {
        var data = this.JSONParse(this.DataSubmit.Draft.RawData, true)
        data.forEach((arr, index) => {
          arr.forEach(item => {
            if (!this.allData.find(e => e.Id === item.Id)) this.add({items: [item], type: index})
          })
        })
      }
      this.IsSelectDraft = true
    },
    removeDraftConfirm () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn xóa bản ghi nháp này?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.removeDraft()
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
    removeDraft () {
      if (this.DataSubmit.Draft && this.DataSubmit.Draft.Id) {
        new DoctorPlaceDiagnosticsOrder()
          .draft({
            VisitCode: this.$route.params.VisitCode,
            PID: this.DataSubmit.PID,
            IsDeleted: true
          })
          .then(() => {
            this.DataSubmit.Draft = null
          }).catch(e => {
          })
      }
    },
    draft () {
      if (this.$refs['DraftPopup']) this.$refs['DraftPopup'].open(this.DataSubmit.Draft)
    },
    validateData (data) {
      this.errorMsg = {}
      // if (this.DataSubmit.Charge.Reason && this.DataSubmit.Charge.Reason.length > 150) this.errorMsg['ReasonLength'] = true
      if (this.DataSubmit.Charge.Diagnosis && this.DataSubmit.Charge.Diagnosis.length > 150) this.errorMsg['DiagnosisLength'] = true
      if (!this.DataSubmit.Charge.Diagnosis) this.errorMsg['Diagnosis'] = true
      if (this.IsRepeat) {
        // DataSubmit.Charge.RepeatValue, DataSubmit.Charge.RepeatType, DataSubmit.Charge.RepeatRange, DataSubmit.Charge.RepeatRangeType
        if (!this.DataSubmit.Charge.RepeatValue || !this.DataSubmit.Charge.RepeatType || !this.DataSubmit.Charge.RepeatRange || !this.DataSubmit.Charge.RepeatRangeType) {
          this.errorMsg['IsRepeat'] = true
        }
      }
      var errorqty = data.ChargeItems.find(e => !e.Qty)
      if (errorqty) {
        this.errorMsg['errorqty'] = true
      }
      var errorqtyMax = data.ChargeItems.find(e => e.Qty && e.Qty > this.maxqty)
      if (errorqtyMax) {
        this.errorMsg['errorqtyMax'] = true
      }
      if (Object.keys(this.errorMsg).length) {
        setTimeout(() => {
          this.sending = false
        }, 1000)
        throw this.errorMsg
      }
    },
    getCustomerServicePlaced () {
      new Services(this.$route.params).find('lastItemChargeByPID').then(res => {
        this.lastItemChargeByPID = res.items
      })
    },
    validateDataToStep2 () {
      var hasError = this.allData.find(e => (e.ItemType === 0 && !e.Microbiology && !this.isValidateDataMicrobiology(e)) || (e.ItemType === 1 && !e.Pathology))
      var hasErrorRadiologyProcedurePlanRef = this.allData.find(e => e.RadiologyProcedurePlanRef && e.RadiologyProcedurePlanRef.length && !e.RadiologyProcedureId)
      return hasError || hasErrorRadiologyProcedurePlanRef
    },
    getPrice () {
      if (this.allData.length === 0) {
        this.alert(this.__t('Thông báo'), 'Vui lòng chọn ít nhất 1 dịch vụ.')
        return false
      }
      if (this.validateDataToStep2()) {
        this.alert(this.__t('Thông báo'), 'Vui lòng nhập thông tin còn thiếu.')
        return false
      }
      new Services().GetPriceService(
        {
          Code: [...this.allData.map(e => e.Code)].join(';'),
          PatientVisitId: this.DataSubmit.Visit.PatientVisitId,
          PatientLocationId: this.DataSubmit.Visit.PatientLocationId
        }).then(({Items}) => {
        var objErr = []
        this.allData.forEach(item => {
          var currentItem = this.cloneObj(item)
          var itemPrice = Items.find(e => e.ServiceCode === currentItem.Code && !this.isNoPrice(e.Price))
          if (itemPrice) {
            currentItem.Price = itemPrice.Price
            currentItem.PriceWarMsg = itemPrice.PriceWarMsg
            if (!itemPrice.CostCentreId) {
              currentItem.msg = 'Chưa được thiết lập Cost Centre hoặc GL Account'
              objErr.push(itemPrice.ServiceCode + ': ' + currentItem.msg)
              this.remove({Id: currentItem.Id, type: currentItem.type})
              this.add({items: [currentItem], type: 3})
            } else if (!itemPrice.GLAcc) {
              currentItem.msg = 'Chưa được thiết lập GL Account'
              objErr.push(itemPrice.ServiceCode + ': ' + currentItem.msg)
              this.remove({Id: currentItem.Id, type: currentItem.type})
              this.add({items: [currentItem], type: 3})
            } else if (!itemPrice.ItemHospital) {
              currentItem.msg = 'Dịch vụ chưa được thiết lập cho Bệnh viện đang chỉ định'
              objErr.push(itemPrice.ServiceCode + ': ' + currentItem.msg)
              this.remove({Id: currentItem.Id, type: currentItem.type})
              this.add({items: [currentItem], type: 3})
            } else {
              this.update({form: currentItem, type: currentItem.type})
            }
            // else if (!currentItem.hasLabDepartment) {
            //   currentItem.msg = 'Lỗi cấu hình dịch vụ'
            //   objErr.push(itemPrice.ServiceCode + ' ' + currentItem.msg)
            //   this.remove({Id: currentItem.Id, type: currentItem.type})
            //   this.add({items: [currentItem], type: 3})
            // }
          } else {
            currentItem.msg = 'Chưa được thiết lập giá'
            this.remove({Id: currentItem.Id, type: currentItem.type})
            this.add({items: [currentItem], type: 3})
          }
        })
        if (this.allData.length === 0) {
          var stringErr = objErr.join(`, \n`)
          this.alert('Các dịch vụ bạn chọn chưa được thiết lập giá, Cost Centre hoặc GL Account vui lòng chọn dịch vụ tương ứng khác.', `${stringErr}`)
          this.removeAll()
        } else {
          this.next()
        }
      })
    },
    getData () {
      new DoctorPlaceDiagnosticsOrder({
        ...this.$route.params,
        ...this.$route.query
      }).find('CustomerVisitInfo')
        .then(response => {
          var diagnosis = response.Diagnosis.Diagnosis
          var Reason = response.Diagnosis.Reason
          if (response.Diagnosis.VisitType === 'IPD') {
            diagnosis = this.getDiagnosis(response.Diagnosis)
          }
          this.DataSubmit = response
          if (!this.DataSubmit.Visit.PatientLocationId) {
            this.errrrr = 'BN chưa được gán khu vực, vui lòng kiểm tra lại'
          }
          if (!this.DataSubmit.Visit.CostCentreId) {
            this.errrrr = 'Khu vực bệnh nhân chưa được thiết lập Cost Centre, vui lòng kiểm tra lại'
          }
          this.DataSubmit.Charge = {
            Priority: 'R',
            IsRepeat: false,
            Diagnosis: diagnosis,
            Reason: Reason,
            ...this.DataSubmit.Visit
          }
          this.maxqty = response.maxqty
          localStorage.setItem('AUTO_FOCUS_PXN_005', (this.DataSubmit.AUTO_FOCUS_PXN_KHOI_TE_BAO))
          localStorage.setItem('AUTO_FOCUS_PXN_004', (this.DataSubmit.AUTO_FOCUS_PXN_MO_BENH_HOC))
          localStorage.setItem('AUTO_FOCUS_PXN_006', (this.DataSubmit.AUTO_FOCUS_PXN_SINH_THIET_LANH))
          localStorage.setItem('AUTO_FOCUS_PXN_002', (this.DataSubmit.AUTO_FOCUS_PXN_TE_BAO))
          localStorage.setItem('AUTO_FOCUS_PXN_003', (this.DataSubmit.AUTO_FOCUS_PXN_PHU_KHOA))
          localStorage.setItem('MICROBIOLOGY_SERVICE_01', (this.DataSubmit.MICROBIOLOGY_SERVICE_01))
          localStorage.setItem('MICROBIOLOGY_SERVICE_02', (this.DataSubmit.MICROBIOLOGY_SERVICE_02))
          this.loaded = true
        }).catch(e => {
          console.log(e)
          this.loaded = true
        })
    },
    formatData (items) {
      return items.map(e => {
        var obj = {
          ...this.DataSubmit.Visit,
          PatientId: this.DataSubmit.PID,
          RadiologyProcedureId: e.RadiologyProcedureId,
          Quantity: 1,
          PatientVisitId: this.DataSubmit.Visit.PatientVisitId,
          PatientLocationId: this.DataSubmit.Visit.PatientLocationId,
          ItemType: e.ItemType,
          ServiceType: e.ServiceType,
          ServiceId: e.Id,
          ItemId: e.HISId,
          ServiceCode: e.Code,
          ServiceName: e.ViName,
          AdditionalInformation: e.AdditionalInformation,
          Comments: e.Comments,
          Priority: e.Priority,
          Reason: e.Reason,
          Date: e.Date,
          Qty: e.Qty,
          Price: e.Price
        }
        if (e.Microbiology) {
          obj.Microbiology = {
            Stratified: e.Microbiology.Stratified ? e.Microbiology.Stratified.code : '',
            STypeID: e.Microbiology.STypeID ? e.Microbiology.STypeID.code : '',
            STypeGroupID: e.Microbiology.STypeGroupID ? e.Microbiology.STypeGroupID.code : '',
            IsNotUse: e.Microbiology.IsNotUse
          }
        }
        if (e.Pathology) {
          obj.Pathology = {
            ...e.Pathology,
            StoreSpecimenWithSolution: e.Pathology.StoreSpecimenWithSolution ? e.Pathology.StoreSpecimenWithSolution.code : '',
            GynecologicalCytologyType: e.Pathology.GynecologicalCytologyType ? e.Pathology.GynecologicalCytologyType.join(',') : ''
          }
        }
        return obj
      })
    },
    submitV2 () {
      if (this.sending) return
      var requestId = this.makeid(18)
      this.sending = true
      var ChargeItems = this.servicesDetailItem[0].concat(this.servicesDetailItem[1]).concat(this.servicesDetailItem[2])
      this.DataSubmit.Charge.IsRepeat = this.IsRepeat
      var data = {
        VisitId: this.$route.query.VisitId,
        PID: this.DataSubmit.PID,
        Visit: {...this.DataSubmit.Visit, ActualVisitDate: this.string2Moment(this.DataSubmit.Visit.ActualVisitDate)},
        Charge: {
          ...this.DataSubmit.Charge,
          VisitId: this.$route.query.VisitId,
          PatientVisitId: this.DataSubmit.Visit.PatientVisitId,
          PatientLocationId: this.DataSubmit.Visit.PatientLocationId,
          VisitCode: this.$route.params.VisitCode
        },
        ChargeItems: this.formatData(ChargeItems)
      }
      this.validateData(data)
      NProgress.start()
      new DoctorPlaceDiagnosticsOrder({noLoading: true, PID: this.DataSubmit.PID, RequestId: requestId})
        .submitCharge(data)
        .then(({ChargeId}) => {
          new DoctorPlaceDiagnosticsOrder({noLoading: true, PID: this.DataSubmit.PID, RequestId: requestId})
            .submitDrs(ChargeId)
            .then(({Failed, OK, Total}) => {
              this.removeDraft()
              if (OK === Total) {
                this.submitErr('Chỉ định thành công')
              } else if (Failed === Total) {
                this.submitErr('Chỉ định thất bại, vui lòng xem chi tiết để biết thêm thông tin')
              } else {
                this.submitErr(`Chỉ định thành công ${OK} dịch vụ, chỉ định thất bại ${Failed} dịch vụ, vui lòng xem chi tiết để biết thêm thông tin`)
              }
            }).catch(e => {
              this.submitErr(e.data && e.data.ViMessage ? e.data.ViMessage : 'Chỉ định thất bại, vui lòng xem chi tiết để biết thêm thông tin')
            })
        }).catch(e => {
          console.log()
          this.submitErr(e.data && e.data.ViMessage ? e.data.ViMessage : 'Chỉ định thất bại, vui lòng thử lại sau')
        })
    },
    submitErr (err) {
      this.sending = false
      NProgress.done()
      this.alert(this.__t('Thông báo'), err || 'Chỉ định thất bại, vui lòng thử lại sau')
      this.$router.push({path: '/DoctorPlaceDiagnosticsOrderHistory/' + this.DataSubmit.PID + '/VisitCode'})
      this.removeAll()
    },
    submit () {
      if (this.sending) return
      this.sending = true
      var ChargeItems = this.servicesDetailItem[0].concat(this.servicesDetailItem[1]).concat(this.servicesDetailItem[2])
      this.DataSubmit.Charge.IsRepeat = this.IsRepeat
      var data = {
        VisitId: this.$route.query.VisitId,
        PID: this.DataSubmit.PID,
        Visit: {...this.DataSubmit.Visit, ActualVisitDate: this.string2Moment(this.DataSubmit.Visit.ActualVisitDate)},
        Charge: {
          ...this.DataSubmit.Charge,
          VisitId: this.$route.query.VisitId,
          PatientVisitId: this.DataSubmit.Visit.PatientVisitId,
          PatientLocationId: this.DataSubmit.Visit.PatientLocationId,
          VisitCode: this.$route.params.VisitCode
        },
        ChargeItems: this.formatData(ChargeItems)
      }
      this.validateData(data)
      new DoctorPlaceDiagnosticsOrder()
        .charge(data)
        .then(({Failed, OK, Total}) => {
          if (OK === Total) {
            this.alert(this.__t('Thông báo'), 'Chỉ định thành công')
          } else if (Failed === Total) {
            this.alert(this.__t('Thông báo'), 'Chỉ định thất bại, vui lòng xem chi tiết để biết thêm thông tin')
          } else {
            this.alert(this.__t('Thông báo'), `Chỉ định thành công ${OK} dịch vụ, chỉ định thất bại ${Failed} dịch vụ, vui lòng xem chi tiết để biết thêm thông tin`)
          }
          this.removeDraft()
          this.$router.push({path: '/DoctorPlaceDiagnosticsOrderHistory/' + this.DataSubmit.PID + '/VisitCode'})
          this.removeAll()
        }).catch(e => {
          this.sending = false
          console.log(e)
        })
    },
    setServicesDetailItem () {
      this.servicesData.forEach((items, type) => {
        this.$set(this.servicesDetailItem, type, this.cloneObj(items))
      })
    },
    next (step = 2) {
      this.step = step
      this.open('VcollapseXNStep0')
      this.open('VcollapseXNStep1')
      this.open('VcollapseXNStep2')
      if (step === 1) {
        this.servicesDetailItem.forEach((items, type) => {
          items.forEach(item => {
            this.update({form: item, type: type})
          })
        })
      }
    },
    cancel () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn hủy toàn bộ dịch vụ đã chọn?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.removeAll()
              this.step = 1
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
    removeService (data, type) {
      console.log(data, type)
    },
    selectedService (data, type) {
      this.$set(this.servicesDetailItem, type, data)
    },
    open (type) {
      if (this.$refs[type]) {
        if (Array.isArray(this.$refs[type])) {
          this.$refs[type][0].setHasData()
        } else {
          this.$refs[type].setHasData()
        }
      }
    }
  }
}
</script>
