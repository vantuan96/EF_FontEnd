<template>
  <div>
    <div class="text-center m15" v-if="!data.Datas.length">
      <p>{{__t('Chưa có bảng hồi sinh tim phổi')}}</p>
      <button class="btn btn-warning" v-if="!viewOnly" @click="confirmPopup">{{__t('Tạo mới')}}</button>
    </div>
    <div v-else id="fix-table-warp">
      <div id="fake-table">
        <table class="taxble table-bordered table-bordered-x no-margin middel-table">
          <tr :key="makeidview + index" v-for="(row, index) in tableRows" v-if="!row.Remove">
            <template v-for="(col, ind) in row.Cols">
              <template v-if="col.type === 'label'">
                <th class="w100" :key="ind" v-if="!col.hidden" :rowspan="col.rowspan" :colspan="col.colspan" :class="'td-' + col.Code">
                  <div class="w100p">
                    {{__tran(col.label)}}
                    <button class="btn-sync-data btn"  @click="newRow(row)" v-if="row.hasBtn && !viewOnly">{{__t('THÊM')}}</button>
                  </div>
                </th>
              </template>
              <template v-else>
                <td :key="ind" :width="col.width + 'px'" class="no-wrap" style="position: relative;" v-if="!col.Remove">
                  <template v-if="col.type === 'title'">
                    <div v-if="col.editable && col.dataType === 'MedicationInfusion'">
                      <button @click="removeRow(col.dataIndex, col.dataType, col.dataIndexElement)" class="btn-pos-left" v-if="row.isNew"><i aria-hidden="true" class="fa fa-trash"></i></button>
                      <!-- {{data.Datas[col.dataIndex]}} -->
                      <MedicationInfusion :readonly="isReadOnly(data.Datas[col.dataIndex], data.Datas[col.dataIndex][col.dataType][col.dataIndexElement])" :editlabel="row.index > 1" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Code" />
                    </div>
                    <div v-else-if="col.editable && col.dataType === 'MedicationBolus'">
                      <button @click="removeRow(col.dataIndex, col.dataType, col.dataIndexElement)" class="btn-pos-left" v-if="row.isNew"><i aria-hidden="true" class="fa fa-trash"></i></button>
                      <MedicationBolus :readonly="isReadOnly(data.Datas[col.dataIndex], data.Datas[col.dataIndex][col.dataType][col.dataIndexElement])" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Code" />
                    </div>
                    <template v-else>{{__tran(col.label)}}</template>
                  </template>
                  <template v-if="col.type === 'text'">
                    <div v-if="col.dataType === 'Other' && ind === 2">
                      <button @click="removeRow(col.dataIndex, col.dataType, col.dataIndexElement)" class="btn-pos-left" v-if="row.isNew"><i aria-hidden="true" class="fa fa-trash"></i></button>
                    </div>
                    <div :readonly="isReadOnly(data.Datas[col.dataIndex])" class="group-radio md-radio" v-if="col.label === 'Loại (Mono/Bi)'">
                      <span>
                        <input tabindex="-1" readonly type="radio" @click="uncheck(data.Datas[col.dataIndex][col.dataType][col.dataIndexElement], 'Mono')" :id="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement + '-item_01'" :name="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement" value="Mono" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value">
                        <!-- {{data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value}} -->
                        <label class="no-margin" :for="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement + '-item_01'">Mono</label>
                      </span>
                      <span>
                        <input tabindex="-1" readonly type="radio" @click="uncheck(data.Datas[col.dataIndex][col.dataType][col.dataIndexElement], 'Bi')" :id="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement + '-item_02'" :name="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement" value="Bi" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value">
                        <!-- {{data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value}} -->
                        <label class="no-margin" :for="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement + '-item_02'">Bi</label>
                      </span>
                    </div>
                    <template v-else>
                      <template v-if="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement]">
                        <span v-if="isReadOnly(data.Datas[col.dataIndex])">{{data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value || 'N/A'}}</span>
                        <input readonly tabindex="-1" v-else :placeholder="__t('Nhập')" class="form-control" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value" />
                      </template>
                      <template v-else>
                        NA
                      </template>
                    </template>
                  </template>
                  <template v-if="col.type === 'date'">
                    <template v-if="data.Datas[col.dataIndex]">
                      <span v-if="isReadOnly(data.Datas[col.dataIndex])">{{data.Datas[col.dataIndex].Time}}</span>
                      <v-date-picker readonly v-else v-model="data.Datas[col.dataIndex].Time"  class="full-w" :format="vDateTimeFormat"/>
                    </template>
                    <template v-else>
                      NA
                    </template>
                  </template>
                  <template v-if="col.type === 'CreatedBy'">
                    <button disabled @click="removeCol(col.dataIndex, col.dataType, col.dataIndexElement)" class="btn-pos-top" v-if="col.isNew"><i aria-hidden="true" class="fa fa-trash"></i></button>
                    <ad-Info v-if="data.Datas[col.dataIndex].CreatedBy && !col.isNew" :ad="data.Datas[col.dataIndex].CreatedBy" />
                  </template>
                </td>
              </template>
            </template>
            <!-- <th class="text-center w50" v-if="index === 0" rowspan="1000" @click="newCol()">Thêm</th> -->
          </tr>
        </table>
      </div>
      <div id="fix-table">
        <table class="taxble table-bordered table-bordered-x no-margin middel-table">
          <tr :key="makeidview + index" v-for="(row, index) in tableRows" v-if="!row.Remove">
            <template v-for="(col, ind) in row.Cols">
              <template v-if="col.type === 'label'">
                <th class="w100" :key="ind" v-if="!col.hidden" :rowspan="col.rowspan" :colspan="col.colspan" :class="'td-' + col.Code">
                  <div class="w100p">
                    {{__tran(col.label)}}
                    <button class="btn-sync-data btn" @click="newRow(row)" v-if="row.hasBtn && !viewOnly">{{__t('THÊM')}}</button>
                  </div>
                </th>
              </template>
              <template v-else>
                <td :key="ind" :width="col.width + 'px'" class="no-wrap" style="position: relative;" v-if="!col.Remove">
                  <template v-if="col.type === 'title'">
                    <div v-if="col.editable && col.dataType === 'MedicationInfusion'">
                      <button @click="removeRow(col.dataIndex, col.dataType, col.dataIndexElement)" class="btn-pos-left" v-if="row.isNew"><i aria-hidden="true" class="fa fa-trash"></i></button>
                      <!-- {{data.Datas[col.dataIndex]}} -->
                      <MedicationInfusion :readonly="isReadOnly(data.Datas[col.dataIndex], data.Datas[col.dataIndex][col.dataType][col.dataIndexElement])" :editlabel="row.index > 1" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Code" />
                    </div>
                    <div v-else-if="col.editable && col.dataType === 'MedicationBolus'">
                      <button @click="removeRow(col.dataIndex, col.dataType, col.dataIndexElement)" class="btn-pos-left" v-if="row.isNew"><i aria-hidden="true" class="fa fa-trash"></i></button>
                      <MedicationBolus :readonly="isReadOnly(data.Datas[col.dataIndex], data.Datas[col.dataIndex][col.dataType][col.dataIndexElement])" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Code" />
                    </div>
                    <template v-else>{{__tran(col.label)}}</template>
                  </template>
                  <template v-if="col.type === 'text'">
                    <div v-if="col.dataType === 'Other' && ind === 2">
                      <button @click="removeRow(col.dataIndex, col.dataType, col.dataIndexElement)" class="btn-pos-left" v-if="row.isNew"><i aria-hidden="true" class="fa fa-trash"></i></button>
                    </div>
                    <div :readonly="isReadOnly(data.Datas[col.dataIndex])" class="group-radio md-radio" v-if="col.label === 'Loại (Mono/Bi)'">
                      <span>
                        <input type="radio" @click="uncheck(data.Datas[col.dataIndex][col.dataType][col.dataIndexElement], 'Mono')" :id="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement + '-xitem_01'" :name="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement" value="Mono" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value">
                        <!-- {{data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value}} -->
                        <label class="no-margin" :for="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement + '-xitem_01'">Mono</label>
                      </span>
                      <span>
                        <input type="radio" @click="uncheck(data.Datas[col.dataIndex][col.dataType][col.dataIndexElement], 'Bi')" :id="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement + '-xitem_02'" :name="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement" value="Bi" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value">
                        <!-- {{data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value}} -->
                        <label class="no-margin" :for="col.dataIndex + '-' + col.dataType + '-' + col.dataIndexElement + '-xitem_02'">Bi</label>
                      </span>
                    </div>
                    <template v-else>
                      <template v-if="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement]">
                        <span v-if="isReadOnly(data.Datas[col.dataIndex])">{{data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value || 'N/A'}}</span>
                        <input v-else :placeholder="__t('Nhập')" class="form-control" v-model="data.Datas[col.dataIndex][col.dataType][col.dataIndexElement].Value" />
                      </template>
                      <template v-else>
                        NA
                      </template>
                    </template>
                  </template>
                  <template v-if="col.type === 'date'">
                    <template v-if="data.Datas[col.dataIndex]">
                      <span v-if="isReadOnly(data.Datas[col.dataIndex])">{{data.Datas[col.dataIndex].Time}}</span>
                      <v-date-picker v-else v-model="data.Datas[col.dataIndex].Time"  class="full-w" :format="vDateTimeFormat"/>
                    </template>
                    <template v-else>
                      NA
                    </template>
                  </template>
                  <template v-if="col.type === 'CreatedBy'">
                    <button @click="removeCol(col.dataIndex, col.dataType, col.dataIndexElement)" class="btn-pos-top" v-if="col.isNew"><i aria-hidden="true" class="fa fa-trash"></i></button>
                    <ad-Info v-if="data.Datas[col.dataIndex].CreatedBy && !col.isNew" :ad="data.Datas[col.dataIndex].CreatedBy" />
                  </template>
                </td>
              </template>
            </template>
            <!-- <th class="text-center w50" v-if="index === 0" rowspan="1000" @click="newCol()">{{__t('THÊM')}}</th> -->
          </tr>
        </table>
      </div>
      <div class="fix-btn-table w50 text-center" @click="newCol()" v-if="!viewOnly">
        <div>
          <div><i class="fa fa-plus" aria-hidden="true"></i></div>
          {{__t('THÊM')}}
        </div>
      </div>
    </div>
    <!-- <pre>{{data.Datas}}</pre> -->
    <div v-if="data.Datas.length">
      <table class="table table-bordered table-bordered-x no-margin middel-table">
        <tr><th colspan="1000"></th></tr>
        <tr>
          <th width="200">{{__t('Khác')}}</th>
          <td colspan="1000">
            <textarea-autosize :readonly="viewOnly" :placeholder="__t('Ghi chú')" class="form-control" rows="3" v-model="data.Note"/>
          </td>
        </tr>
      </table>
      <br/><br/>
      <div class="row">
        <div class="col-md-4 col-sm-4 text-center">
        </div>
        <div class="col-md-4 col-sm-4 text-center">
        </div>
        <div class="col-md-4 col-sm-4 text-center">
          <p v-if="data.DoctorComfirm">{{data.DoctorComfirm}}</p>
          <div><b>{{__t('Bác sĩ')}}</b></div>
          <div v-if="data.DoctorComfirm">
            <ad-Info :ad="data.Doctor.Username" />
          </div>
          <div v-else>
            <i v-if="viewOnly">{{__t('Chưa xác nhận')}}</i>
            <button v-else @click="showDoctorConfirm('Doctor', 'Bác sĩ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
          </div>
        </div>
      </div>
      <br/><br/>
      <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
        <div class="box v-model-content-popup">
          <div class="box-header text-center">
            <h3 class="box-title">{{__t(popupTitle)}}.</h3>
            <div style="color: #fff">{{__t('Bác sĩ đang thực hiện tao tác xác nhận bảng hồi sinh tim phổi bao gồm thông tin hồi sinh tim phổi và bảng hồi sinh tim phổi. Để xác nhận, nhập thông tin đăng nhập phía dưới')}}</div>
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
      <div class="status-float-block" v-if="!viewOnly">
        <div class="action-btn-block">
          <div class="container">
            <div class="content-container">
              <div class="row">
                <div class="col-md-2 col-sm-2">
                  <div class="form-group1">
                    <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                  </div>
                </div>
                <div class="col-md-4 col-sm-4">
                  <div class="form-group1">
                    <p class="hidden-text">hidden-text</p>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="form-group1">
                    <button :disabled="isNotValidate" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"  v-shortkey="['ctrl', 's']" @shortkey="!isNotValidate && save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <logs v-if="!viewOnly" :EdId="this._VisitId" :Type="'CardiacArrestRecord/Table'" :noDetail="true" />
      <p>A03_050_050919_VE</p>
    </div>
  </div>
</template>
<script>
import MixinForm from '@/mixins/form.js'
import CardiacArrestRecord from '@/services/CardiacArrestRecord'
import VDatePicker from '@/components/VDateTimePicker.vue'
import MedicationInfusion from './MedicationInfusion.vue'
import MedicationBolus from './MedicationBolus.vue'
import _ from 'lodash'
import $ from 'jquery'
import moment from 'moment'
import Logs from '@/components/Logs.vue'
// import _ from 'lodash'
// import NProgress from 'nprogress'
export default {
  name: 'CardiacArrestRecordTable',
  props: ['formdata', 'VisitType', 'viewOnly', 'VisitId'],
  mixins: [MixinForm],
  components: {
    VDatePicker, MedicationInfusion, MedicationBolus, Logs
  },
  data () {
    return {
      makeidview: this.makeid(),
      loaded: false,
      data: {
        Datas: []
      },
      user: {},
      popupTitle: '',
      colTmp: null,
      texttran: []
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    isNotValidate: function () {
      if (this.data.Datas.find(e => !e.Time)) return true
      var times = this.data.Datas.map(e => {
        return moment(e.Time, this.vDateTimeFormat).valueOf()
      })
      var sorted = _.sortBy(times)
      return !(_.isEqual(times, sorted))
    },
    tableRows: function () {
      if (!this.data.Datas.length) {
        return []
      }
      var lastData = this.data.Datas[this.data.Datas.length - 1]
      var editTimeCols = []
      this.data.Datas.forEach((e, i) => {
        editTimeCols.push({
          type: 'date',
          dataType: 'Time',
          dataIndex: i,
          dataIndexElement: 'Time',
          isNew: e.isNew,
          Remove: e.Remove
        })
      })
      var rows = [
        {
          Id: 'Time',
          Code: 'Time',
          Remove: false,
          Cols: [
            {
              label: 'Giờ',
              colspan: 2,
              type: 'label'
            },
            {
              label: 'Giờ',
              type: 'label',
              hidden: true
            },
            ...editTimeCols
          ]
        }
      ]
      lastData.VitalSign.forEach((element, index) => {
        var code = this.JSONParse(element.Code)
        var editCols = []
        this.data.Datas.forEach((e, i) => {
          editCols.push({
            type: 'text',
            dataType: 'VitalSign',
            dataIndex: i,
            dataIndexElement: index,
            width: 180,
            isNew: e.isNew,
            Remove: e.Remove
          })
        })
        rows.push({
          Id: 'VitalSign-' + element.Id,
          Code: 'VitalSign',
          Remove: false,
          Cols: [
            {
              label: 'Dấu hiệu sinh tồn',
              rowspan: 4,
              type: 'label',
              hidden: index > 0
            },
            {
              label: code.label,
              type: 'title',
              width: 100
            },
            ...editCols
          ]
        })
      })
      lastData.DefibEnergy.forEach((element, index) => {
        var code = this.JSONParse(element.Code)
        var editCols = []
        this.data.Datas.forEach((e, i) => {
          editCols.push({
            type: 'text',
            dataType: 'DefibEnergy',
            dataIndex: i,
            dataIndexElement: index,
            width: 180,
            label: code.label,
            isNew: e.isNew,
            Remove: e.Remove
          })
        })
        rows.push({
          Id: 'DefibEnergy-' + element.Id,
          Code: 'DefibEnergy',
          Remove: false,
          Cols: [
            {
              label: 'Khử rung',
              rowspan: 2,
              type: 'label',
              hidden: index > 0
            },
            {
              label: code.label,
              type: 'title',
              width: 100
            },
            ...editCols
          ]
        })
      })
      lastData.MedicationBolus.forEach((element, index) => {
        var code = this.JSONParse(element.Code)
        var editCols = []
        this.data.Datas.forEach((e, i) => {
          editCols.push({
            type: 'text',
            dataType: 'MedicationBolus',
            dataIndex: i,
            dataIndexElement: index,
            width: 180,
            isNew: e.isNew,
            Remove: e.Remove
          })
        })
        rows.push({
          Id: 'MedicationBolus-' + element.Id,
          Code: 'MedicationBolus',
          hasBtn: true,
          index: index,
          isNew: element.isNew,
          Remove: element.Remove,
          Cols: [
            {
              label: 'Thuốc tiêm tĩnh mạch/ trong xương',
              rowspan: lastData.MedicationBolus.filter(e => !e.Remove).length,
              type: 'label',
              hidden: index > 0,
              isNew: element.isNew
            },
            {
              label: code.label,
              type: 'title',
              dataType: 'MedicationBolus',
              width: 100,
              editable: code.editable,
              dataIndex: 0,
              dataIndexElement: index,
              isNew: element.isNew
            },
            ...editCols
          ]
        })
      })
      lastData.MedicationInfusion.forEach((element, index) => {
        var code = this.JSONParse(element.Code)
        var editCols = []
        this.data.Datas.forEach((e, i) => {
          editCols.push({
            type: 'text',
            dataType: 'MedicationInfusion',
            dataIndex: i,
            dataIndexElement: index,
            width: 180,
            isNew: e.isNew,
            Remove: e.Remove
          })
        })
        rows.push({
          Id: 'MedicationInfusion-' + element.Id,
          Code: 'MedicationInfusion',
          hasBtn: true,
          index: index,
          isNew: element.isNew,
          Remove: element.Remove,
          Cols: [
            {
              label: 'Thuốc duy trì',
              rowspan: lastData.MedicationInfusion.filter(e => !e.Remove).length,
              type: 'label',
              hidden: index > 0,
              isNew: element.isNew
            },
            {
              label: code.label,
              type: 'title',
              width: 100,
              dataType: 'MedicationInfusion',
              editable: code.editable,
              dataIndex: 0,
              dataIndexElement: index,
              isNew: element.isNew
            },
            ...editCols
          ]
        })
      })
      lastData.Other.forEach((element, index) => {
        var editCols = []
        this.data.Datas.forEach((e, i) => {
          editCols.push({
            type: 'text',
            dataType: 'Other',
            dataIndex: i,
            dataIndexElement: index,
            width: 180,
            isNew: e.isNew,
            Remove: e.Remove
          })
        })
        rows.push({
          Id: 'Other-' + element.Id,
          Code: 'Other',
          hasBtn: true,
          Remove: element.Remove,
          isNew: element.isNew,
          Cols: [
            {
              label: 'Đường khác',
              rowspan: lastData.Other.filter(e => !e.Remove).length,
              type: 'label',
              dataType: 'Other',
              hidden: index > 0,
              colspan: 2,
              isNew: element.isNew
            },
            {
              label: 'Đường khác',
              rowspan: lastData.Other.length,
              type: 'label',
              dataType: 'Other',
              hidden: true,
              isNew: element.isNew
            },
            ...editCols
          ]
        })
      })
      var editTimeCols2 = []
      this.data.Datas.forEach((e, i) => {
        editTimeCols2.push({
          type: 'CreatedBy',
          dataType: 'CreatedBy',
          dataIndex: i,
          dataIndexElement: 'CreatedBy',
          isNew: e.isNew,
          Remove: e.Remove
        })
      })
      rows.push({
        Id: 'CreatedBy',
        Code: 'CreatedBy',
        Remove: false,
        Cols: [
          {
            label: 'Điều dưỡng ghi nhận',
            colspan: 2,
            type: 'label',
            Code: 'CreatedBy'
          },
          {
            label: 'Điều dưỡng ghi nhận',
            type: 'label',
            hidden: true
          },
          ...editTimeCols2
        ]
      })
      return rows
    }
  },
  methods: {
    uncheck (val, type) {
      if (val.Value === type) {
        val.Value = ''
      }
    },
    isReadOnly (e, elm) {
      if (this.viewOnly) return true
      if (elm) {
        return !(elm.isNew || elm.CreatedBy === this.$store.state.account.Username)
      }
      return !(e.isNew || e.CreatedBy === this.$store.state.account.Username)
    },
    confirm () {
      new CardiacArrestRecord(this._VisitType).update('Confirm/' + this._VisitId, this.user).then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.getData()
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    showDoctorConfirm (kind, title, id) {
      this.confirmId = id
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    removeRow (dataIndex, dataType, dataIndexElement) {
      this.data.Datas.forEach(elm => {
        elm[dataType][dataIndexElement].Remove = true
        elm[dataType] = elm[dataType].filter(e => !e.Remove)
      })
      // this.data.Datas[dataIndex]
      // this.data.Datas[dataIndex][dataType] = this.data.Datas[dataIndex][dataType].filter(e => !e.Remove)
      this.updateOrder()
      this.data.Datas = this.cloneObj(this.data.Datas)
      this.makeidview = this.makeid()
    },
    removeItem () {
      this.data.Datas = this.data.Datas
    },
    updateOrder () {
      this.data.Datas.forEach((elm, index) => {
        elm.Order = index
        elm.MedicationBolus.forEach((e, i) => {
          e.Order = i
        })
        elm.MedicationInfusion.forEach((e, i) => {
          e.Order = i
        })
        elm.Other.forEach((e, i) => {
          e.Order = i
        })
      })
    },
    removeCol (dataIndex, dataType, dataIndexElement) {
      this.data.Datas[dataIndex].Remove = true
      this.data.Datas = this.data.Datas.filter(e => !e.Remove)
      this.data.Datas = this.cloneObj(this.data.Datas)
      this.updateOrder()
      this.makeidview = this.makeid()
    },
    newCol () {
      var colTmp = this.cloneObj(this.data.Datas[this.data.Datas.length - 1])
      delete colTmp.Id
      colTmp.isNew = true
      colTmp.CreatedBy = this.$store.state.account.Username
      colTmp.Time = ''
      this.Remove = false
      colTmp.DefibEnergy.forEach(e => {
        delete e.Id
        e.CreatedBy = ''
        e.Value = ''
        // e.Remove = false
      })
      colTmp.MedicationBolus.forEach(e => {
        delete e.Id
        e.CreatedBy = ''
        e.Value = ''
        // e.Remove = false
      })
      colTmp.MedicationInfusion.forEach(e => {
        delete e.Id
        e.CreatedBy = ''
        e.Value = ''
        // e.Remove = false
      })
      colTmp.VitalSign.forEach(e => {
        delete e.Id
        e.CreatedBy = ''
        e.Value = ''
        // e.Remove = false
      })
      colTmp.Other.forEach(e => {
        delete e.Id
        e.CreatedBy = ''
        e.Value = ''
        // e.Remove = false
      })
      this.data.Datas.push(this.cloneObj(colTmp))
      setTimeout(() => {
        var leftPos = $('#fix-table').scrollLeft()
        $('#fix-table').animate({scrollLeft: leftPos + 200000}, 200)
      }, 100)
      this.updateOrder()
      setTimeout(() => {
        // this.save()
      }, 10)
    },
    newRow (type) {
      this.data.Datas.forEach(e => {
        var obj = this.cloneObj(e[type.Code][0])
        delete obj.Id
        var code = this.JSONParse(obj.Code)
        code.editable = true
        code.label = ''
        code.value = ''
        if (obj.Type === 'MedicationInfusion') {
          code.inputs = ['', '', '']
        }
        obj.Value = ''
        obj.Code = JSON.stringify(code)
        obj.Order = e[type.Code].length
        obj.isNew = true
        obj.CreatedBy = this.$store.state.account.Username
        e[type.Code].push(obj)
      })
      this.colTmp = this.cloneObj(this.data.Datas[this.data.Datas.length - 1])
      // this.data.Datas[this.data.Datas.length - 1].MedicationBolus.push(this.cloneObj(this.data.Datas[this.data.Datas.length - 1].MedicationBolus[0]))
      this.updateOrder()
      setTimeout(() => {
        // this.save()
      }, 10)
    },
    getData () {
      new CardiacArrestRecord(this._VisitType).find('Table/' + this._VisitId).then(response => {
        this.data = response
        this.colTmp = this.cloneObj(this.data.Datas[this.data.Datas.length - 1])
      })
    },
    create () {
      new CardiacArrestRecord(this._VisitType).update('Table/Create/' + this._VisitId, {}).then(response => {
        this.reload()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Bảng hồi sinh tim phổi'),
        text: this.$t('Bạn có chắc tạo mới dữ liệu cho Bảng hồi sinh tim phổi?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
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
    __tran (txt) {
      return this.__t(txt)
    },
    save () {
      new CardiacArrestRecord(this._VisitType).update('Table/' + this._VisitId, this.data).then(response => {
        this.toastedSuccess().getData()
        this.edited = false
      })
    }
  }
}
</script>
